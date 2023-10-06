const express = require('express')
const app = express();
const PORT = 3000;
const cors = require('cors')
const dayjs = require('dayjs')
const multer = require('multer')
const path = require('path')

//My SQL Connection  and config
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'dos_db'
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + path.extname(file.originalname)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })

//const upload = multer({ dest: '../uploads/' })

// Also allows parsing of req.body.
app.use(express.json());
app.use(cors());

//password check using an use request
app.use('/login', (req, res) => {
  const args=[[
    req.body.username
  ]]

  const stmt = "select pword from userstable where username= ?"
  connection.query(stmt,[args], (err, rows, fields) => {
    if (err) {
      throw err
      connection.end();
    }
    if(req.body.password == rows[0].pword){
      res.send({
        token: "abc123"
      });
    }
    else {
      res.send({
        token: null
      });
    }
  }) 

});

// Create a new material using a post request
app.post('/newMaterial', (req, res) => {

    const args = [
        req.body.pk,
        req.body.name,
        req.body.cat,
        req.body.note,
        req.body.qty,
        req.body.nvl,
        req.body.asset,
        req.body.stat,
        req.body.part,
        req.body.serial,
        req.body.loc,
        req.body.ben
    ]
    const stmt = "INSERT INTO materiallisttable (PK, MaterialName, Category, AdditionalNotes, Quantity, NVL, AssetNumber, CurrentState, LamPartNumber, SerialNumber, Location, BEN) VALUES(?) ON DUPLICATE KEY UPDATE MaterialName = VALUES(MaterialName), Category = VALUES(Category), AdditionalNotes = VALUES(AdditionalNotes), Quantity = VALUES(Quantity), NVL = VALUES(NVL), AssetNumber = VALUES(AssetNumber), CurrentState = VALUES(CurrentState), LamPartNumber = VALUES(LamPartNumber), SerialNumber = VALUES(SerialNumber), Location = Values(Location), BEN = Values(BEN)"
    connection.query(stmt, [args], (err, results, rows, fields) => {
        if (err) {
            throw err
            connection.end();
        }
        else{
            res.status(200).json({ Error: 'Success' })
        }
    })
});


// Create a new Ticket using a post request
app.post('/newTicket', (req, res) => {
  var stmt = ""
  var args = []
    if (req.body.ticketStatus == 'inProgress') {
        req.body.progDate = dayjs().format('YYYY-MM-DD HH:mm:ss')
    }
    if (req.body.progDate == 'Invalid Date') {
        req.body.progDate = null
    }
    if (req.body.closeDate == 'Invalid Date') {
        req.body.closeDate = null
    }
    if (req.body.ticketStatus == 'Closed') {
        req.body.closeDate = dayjs().format('YYYY-MM-DD HH:mm:ss')
    }

  if(req.body.ticketNum =='new ticket'){
      if (!req.body.openDate) {
          req.body.openDate = dayjs().format('YYYY-MM-DD HH:mm:ss')
      }
      else if (req.body.openDate == 'Invalid Date') {
          req.body.openDate = dayjs()
      }
    args = [
      req.body.ticketStatus,
      req.body.ben,
      req.body.ticketDescription,
      req.body.department,
      req.body.toolBay,
      req.body.openDate,
      req.body.progDate,
      req.body.closeDate

    ]
    stmt = "INSERT INTO ticketsTable (TicketStatus, BEN, TicketDescription, Department, ToolBay, OpenDate, ProgDate, CloseDate) VALUES(?) ON DUPLICATE KEY UPDATE TicketStatus = VALUES(TicketStatus), BEN = VALUES(BEN), TicketDescription = VALUES(TicketDescription), Department = VALUES(Department), ToolBay = VALUES(ToolBay), OpenDate = VALUES(OpenDate), ProgDate = VALUES(ProgDate), CloseDate = VALUES(CloseDate)"
  }
  else{
      console.log(req.body)
    args = [
      req.body.ticketStatus,
      req.body.ticketNum,
      req.body.ben,
      req.body.ticketDescription,
      req.body.department,
      req.body.toolBay,
      req.body.openDate,
      req.body.progDate,
      req.body.closeDate

    ]
    stmt = "INSERT INTO ticketsTable (TicketStatus, TicketNum, BEN, TicketDescription, Department, ToolBay, OpenDate, ProgDate, CloseDate) VALUES(?) ON DUPLICATE KEY UPDATE TicketStatus = VALUES(TicketStatus), TicketNum = VALUES(TicketNum), BEN = VALUES(BEN), TicketDescription = VALUES(TicketDescription), Department = VALUES(Department), ToolBay = VALUES(ToolBay), OpenDate = VALUES(OpenDate), ProgDate  = VALUES(ProgDate), CloseDate = VALUES(CloseDate)"
  }

  
  //WIP
    connection.query(stmt, [args], (err, rows, fields) => {
      if (err) {
          throw err
          connection.end();
      }
      else {
        res.status(200).json({ Error: 'Success' })
      }
  })
});

// Create a new Tool using a post request
app.post('/newTool', (req, res) => {

    const args = [
        req.body.id,
        req.body.manu,
        req.body.model,
        req.body.desc,
        req.body.serial,
        req.body.area,
        req.body.loc,
        req.body.caldue,
        req.body.key

    ]
    const stmt = "INSERT INTO caltoolstable (NVL, ManufacturerName, ModelName, Description, SerialNumber, Area, Location, CalibrationDue, PK) VALUES(?) ON DUPLICATE KEY UPDATE NVL = VALUES(NVL), ManufacturerName = VALUES(ManufacturerName), ModelName = VALUES(ModelName), Description = VALUES(Description), SerialNumber = VALUES(SerialNumber), Area = VALUES(Area), Location = VALUES(Location), CalibrationDue = VALUES(CalibrationDue)"
    //WIP
    connection.query(stmt, [args], (err, rows, fields) => {
        if (err) {
            throw err
            connection.end();
        }
        else {
            res.status(200).json({ Error: 'Success' })
        }
    })
});

// Create a new scan using a post request
app.post('/newScan', (req, res) => {

    const args = [[
        req.body.nvl,
        req.body.employeeID,
        req.body.newLoc,
        req.body.dateTime,
    ]]
    const stmt = "INSERT INTO toolhistorytable (nvl, employeeID, newLoc, curDate) VALUES ? "
    //WIP
    connection.query(stmt, [args], (err, rows, fields) => {
        if (err) {
            throw err
            connection.end();
        }
        else{
          res.status(200).json({ Error: 'Success' })
        }
    })
  
  });

// read headers using a get request
app.post('/headers', (req, res) => {
  const args=[[
    req.body.tName
  ]]
  const stmt = "Select COLUMN_NAME,DATA_TYPE from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME= ? order by ordinal_position"
  connection.query(stmt,[args], (err, rows, fields) => {
    if (err) {
      throw err
      connection.end();
    }
    res.json(rows)
  })
  //connection.end()
});



// select * from toolhistorytable where nvl=given nvl
app.post('/searchNVL', (req, res) => {
  const args = [[
    req.body.searchNVL,
  ]]
  const stmt = "SELECT * FROM toolhistorytable WHERE NVL = ? order by CurDate DESC"
  connection.query(stmt, [args], (err, rows, fields) => {
    if (err) {
        throw err
        connection.end();
    }
    res.json(rows)
  })

})

// select * from toolhistorytable, reads all of toolHistoryTable
app.get('/toolhistory', (_, res) => {
  connection.query("SELECT * FROM toolhistorytable", (err, rows, fields) => {
      if (err) {
          throw err
          connection.end();
      }
      res.json(rows)
  })
});
  // read exercises using a get request
app.get('/items', (_, res) => {
  connection.query('Select * from materiallisttable', (err, rows, fields) => {
    if (err) {
      throw err
      connection.end();
    }
    res.json(rows)
  })
  //connection.end()
  });
  
    // load tickets
app.get('/loadOpenTickets', (_, res) => {
  connection.query('Select * from ticketstable WHERE TicketStatus IN ("Open", "inProgress")', (err, rows, fields) => {
    if (err) {
      throw err
      connection.end();
    }
    res.json(rows)
  })
  //connection.end()
  });
  app.get('/loadClosedTickets', (_, res) => {
    connection.query('Select * from ticketstable WHERE TicketStatus = "Closed"', (err, rows, fields) => {
      if (err) {
        throw err
        connection.end();
      }
      res.json(rows)
    })
    //connection.end()
  });
//retrieve calibrated tools information
app.get('/calTools', (_, res) => {
    connection.query('Select * from caltoolstable WHERE Status = "Active"', (err, rows, fields) => {
        if (err) {
            throw err
            connection.end();
        }
        res.json(rows)
    })
    //connection.end()
});
  
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });

// Create a new Passdown using a post request
app.post('/newPass', (req, res) => {
    if (req.body.pk === 'new') {
        const args = [[
            req.body.date,
            req.body.shift,
            req.body.tech,
            req.body.depar,
            req.body.pass,

        ]]
        const stmt = "INSERT INTO passdowntable ( Date, Shift, Technician, Department, Passdown) VALUES ?"
        //WIP
        connection.query(stmt, [args], (err, rows, fields) => {
            if (err) {
                throw err
                connection.end();
            }
            else {
                res.status(200).json({ Error: 'Success' })
            }
        })
    }
    else {
        const args = [[
            req.body.pk,
            req.body.date,
            req.body.shift,
            req.body.tech,
            req.body.depar,
            req.body.pass,

        ]]
        const stmt = "INSERT INTO passdowntable (PK, Date, Shift, Technician, Department, Passdown) VALUES ? ON DUPLICATE KEY UPDATE Date = VALUES(Date), Shift = VALUES(Shift), Technician = VALUES (Technician), Department = VALUES(Department), Passdown = VALUES(Passdown)"
        //WIP
        connection.query(stmt, [args], (err, rows, fields) => {
            if (err) {
                throw err
                connection.end();
            }
            else {
                res.status(200).json({ Error: 'Success' })
            }
        })
    }
});

app.get('/passdowns', (_, res) => {
    connection.query('Select * from passdowntable', (err, rows, fields) => {
        if (err) {
            throw err
            connection.end();
        }
        res.json(rows)
    })
    //connection.end()
});

app.post('/deactivate', (req, res) => {
    const args = [
      req.body.recPk,
      req.body.recStat
    ]

    const stmt = "INSERT INTO caltoolstable (PK, Status) VALUES(?) ON DUPLICATE KEY UPDATE Status = 'Inactive'"
    //WIP
    connection.query(stmt, [args], (err, results, rows, fields) => {
        if (err) {
            throw err
            connection.end();
        }
        else {
            res.status(200).json({ Error: 'Success' })
        }
    })
});
app.post('/newRequest', function (req, res)  {
    console.log('in new request')
    console.log(req.body.attachment.substr(12))
    var stmt = ""
    var args = []
    var ID =0;
    if (req.body.openDate == 'Invalid Date') {
        req.body.openDate = dayjs().format('YYYY-MM-DD')
    }
    else if (!req.body.openDate) {
        req.body.openDate = dayjs().format('YYYY-MM-DD')
    }
    if (req.body.subDate == 'Invalid Date') {
        req.body.subDate = null
    }
    if (req.body.requestStatus == 'submitted') {
        req.body.subDate = dayjs().format('YYYY-MM-DD')
    }
    if (req.body.closeDate == 'Invalid Date') {
        req.body.closeDate = null
    }
    if (req.body.requestStatus == 'arrived') {
        req.body.closeDate = dayjs().format('YYYY-MM-DD')
    }
    if (req.body.reqNum == 'new ticket') {
        args = [
            req.body.requestStatus,
            req.body.needDate,
            req.body.openDate,
            req.body.subDate,
            req.body.closeDate,
            req.body.adminCom,
            req.body.costCenter,
            req.body.requestorEmail,
            req.body.orderMethod,
            req.body.purchNum,
            req.body.preferredVendor,
            req.body.priority,
            req.body.requestor,
            req.body.comments,
            req.body.attachment.substr(12)
        ]
        stmt = "INSERT INTO materialOrdersTable (Status, NeedBy, OpenDate, SubmitDate, ClosedDate, AdminComments, CostCenter, Email, OrderMethod, PurchNumber, PreferredVendor, Priority, Requestor, RequestorComments, AttachFile) VALUES(?) ON DUPLICATE KEY UPDATE Status=VALUES(Status), NeedBy=VALUES(NeedBy), OpenDate=VALUES(OpenDate), SubmitDate=VALUES(SubmitDate), ClosedDate=VALUES(ClosedDate), AdminComments=VALUES(AdminComments), CostCenter=VALUES(CostCenter), Email=VALUES(Email), OrderMethod=VALUES(OrderMethod), PurchNumber=Values(PurchNumber), PreferredVendor=VALUES(PreferredVendor), Priority=VALUES(Priority), Requestor=VALUES(Requestor), RequestorComments=VALUES(RequestorComments), AttachFile=VALUES(AttachFile)"
    }
    else {
        console.log('file name is ' + req.file)
        args = [
            req.body.reqNum,
            req.body.requestStatus,
            req.body.needDate,
            req.body.openDate,
            req.body.subDate,
            req.body.closeDate,
            req.body.adminCom,
            req.body.costCenter,
            req.body.requestorEmail,
            req.body.orderMethod,
            req.body.purchNum,
            req.body.preferredVendor,
            req.body.priority,
            req.body.requestor,
            req.body.comments,
            req.body.attachment.substr(12)
        ]
        stmt = "INSERT INTO materialOrdersTable (RequestNumber, Status, NeedBy, OpenDate, SubmitDate, ClosedDate, AdminComments, CostCenter, Email, OrderMethod, PurchNumber, PreferredVendor, Priority, Requestor, RequestorComments, AttachFile) VALUES(?) ON DUPLICATE KEY UPDATE Status=VALUES(Status), NeedBy=VALUES(NeedBy), OpenDate=VALUES(OpenDate), SubmitDate=VALUES(SubmitDate), ClosedDate=VALUES(ClosedDate), AdminComments=VALUES(AdminComments), CostCenter=VALUES(CostCenter), Email=VALUES(Email), OrderMethod=VALUES(OrderMethod), PurchNumber=Values(PurchNumber), PreferredVendor=VALUES(PreferredVendor), Priority=VALUES(Priority), Requestor=VALUES(Requestor), RequestorComments=VALUES(RequestorComments), AttachFile=VALUES(AttachFile)"
    }

    connection.query(stmt, [args], (err, results, fields) => {
        if (err) {
            throw err
            connection.end();
            queryPassed = 0;
        }
        else if (results.insertId === undefined) {
            ID = req.body.reqNum
        }
        else if (results.insertId === 0) {
            ID = req.body.reqNum
        }
        else {
            ID = results.insertId;
        }
        handleLineInserts(ID,req,res)
        
    })

    
});

function handleLineInserts(ID,req,res){
  args =[]
  var payload =[]
  for(let i =0;i<req.body.lineItems.length;i++){
    payload = [
      ID,
      req.body.lineItems[i].partName,
      req.body.lineItems[i].partNumber,
      req.body.lineItems[i].price,
      req.body.lineItems[i].quantity,
      req.body.lineItems[i].lineStatus,
      req.body.lineItems[i].pk,
    ]
    args.push(payload)
  }
  stmt ="INSERT INTO orderlineitemstable (RequestNumber, PartName, PartNumber, PricePer, Quantity, Status, PK) VALUES ? ON DUPLICATE KEY UPDATE RequestNumber=VALUES(RequestNumber), PartName=VALUES(PartName), PartNumber=VALUES(PartNumber), PricePer=VALUES(PricePer), Quantity=VALUES(Quantity), Status=VALUES(Status)"
  connection.query(stmt, [args], (err, results, fields) => {
    if (err) {
        throw err
        connection.end();
    }
    else {
        res.status(200).json({ Error: 'Success' })
    }
})
}

// select * from ptoTable, reads all of ptoTable
app.get('/loadPtoTable', (_, res) => {
  connection.query("SELECT * FROM ptoTable", (err, rows, fields) => {
      if (err) {
          throw err
          connection.end();
      }
      res.json(rows)
  })
});

// Create a new pto request using a post request
app.post('/ptoRequest', (req, res) => {
  var stmt = ""
  var args = []
  let cleanDate = (String(req.body.selectedValue).split('T')[0])
    args = [
      req.body.name,
      cleanDate,
    ]
    stmt = "INSERT INTO ptoTable (name, date) VALUES(?) ON DUPLICATE KEY UPDATE name = VALUES(name), date = VALUES(date)"
  
  
  //WIP
    connection.query(stmt, [args], (err, rows, fields) => {
      if (err) {
          throw err
          connection.end();
      }
      else {
        res.status(200).json({ Error: 'Success' })
      }
  })
  
});

app.get('/loadOpenOrders', (_, res) => {
    connection.query('Select * from materialorderstable WHERE Status = "awaitingApproval"', (err, rows, fields) => {
        if (err) {
            throw err
            connection.end();
        }
        res.json(rows)
    })
    //connection.end()
});

app.get('/loadSubOrders', (_, res) => {
    connection.query('Select * from materialorderstable WHERE Status = "Submitted"', (err, rows, fields) => {
        if (err) {
            throw err
            connection.end();
        }
        res.json(rows)
    })
    //connection.end()
});

app.get('/loadClosedOrders', (_, res) => {
    connection.query('Select * from materialorderstable WHERE Status = "Arrived"', (err, rows, fields) => {
        if (err) {
            throw err
            connection.end();
        }
        res.json(rows)
    })
    //connection.end()
});

app.post('/loadLineItems', (req, res) => {
    const args = [[
        req.body.localRequestNum,
    ]]
    const stmt = "SELECT * FROM orderlineitemstable WHERE RequestNumber = ?"
    connection.query(stmt, [args], (err, rows, fields) => {
        if (err) {
            throw err
            connection.end();
        }
        res.json(rows)
        console.log(rows)
    })

})


app.post('/newAttachment', upload.single('attachment'), (req, res) => {
    // req.file is the name of your file in the form above, here 'uploaded_file'
    // req.body will hold the text fields, if there were any
    //connection.end()
    res.json({message: "success"})
});