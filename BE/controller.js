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
        const uniqueSuffix = Date.now() + '-' + file.originalname
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

//Create a new SWIC log.
app.post('/newSwicLog', (req, res) => {
  var stmt = ""
  var args = []
    if (req.body.logStatus == 'inProgress') {
        req.body.progDate = dayjs().format('YYYY-MM-DD HH:mm:ss')
    }
    if (req.body.progDate == 'Invalid Date') {
        req.body.progDate = null
    }
    if (req.body.closeDate == 'Invalid Date') {
        req.body.closeDate = null
    }
    if (req.body.logStatus == 'Closed') {
        req.body.closeDate = dayjs().format('YYYY-MM-DD HH:mm:ss')
    }
  if(req.body.logStatus =='New Release'){
      if (!req.body.openDate) {
          req.body.openDate = dayjs().format('YYYY-MM-DD HH:mm:ss')
      }
      else if (req.body.openDate == 'Invalid Date') {
          req.body.openDate = dayjs()
      } 
    args = [
      req.body.logStatus,
      req.body.ben,
      req.body.systemNotes,
      req.body.portLocation,
      req.body.customerFab,
      req.body.openDate,
      req.body.progDate,
      req.body.closeDate

    ]
    stmt = "INSERT INTO ticketsTable (LogStatus, BEN, SystemNotes, PortLocation, CustomerFab, OpenDate, ProgDate, CloseDate) VALUES(?) ON DUPLICATE KEY UPDATE LogStatus = VALUES(LogStatus), BEN = VALUES(BEN), SystemNotes = VALUES(SystemNotes), CustomerFab = VALUES(CustomerFab), PortLocation = VALUES(PortLocation), OpenDate = VALUES(OpenDate), ProgDate = VALUES(ProgDate), CloseDate = VALUES(CloseDate)"
  }
  else{
    args = [
      req.body.logStatus,
      req.body.customerFab,
      req.body.ben,
      req.body.systemNotes,
      req.body.portLocation,
      req.body.openDate,
      req.body.progDate,
      req.body.closeDate

    ]
    stmt = "INSERT INTO ticketsTable (TicketStatus, customerFab, BEN, systemNotes, portLocation, OpenDate, ProgDate, CloseDate) VALUES(?) ON DUPLICATE KEY UPDATE TicketStatus = VALUES(TicketStatus), TicketNum = VALUES(TicketNum), BEN = VALUES(BEN), TicketDescription = VALUES(TicketDescription), Department = VALUES(Department), ToolBay = VALUES(ToolBay), OpenDate = VALUES(OpenDate), ProgDate  = VALUES(ProgDate), CloseDate = VALUES(CloseDate)"
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
        req.body.key,
        req.body.curLoc,
        req.body.com,
        req.body.stat

    ]
    const stmt = "INSERT INTO caltoolstable (NVL, ManufacturerName, ModelName, Description, SerialNumber, Area, PermLoc, CalibrationDue, PK, CurLoc, Comments, Status) VALUES(?) ON DUPLICATE KEY UPDATE NVL = VALUES(NVL), ManufacturerName = VALUES(ManufacturerName), ModelName = VALUES(ModelName), Description = VALUES(Description), SerialNumber = VALUES(SerialNumber), Area = VALUES(Area), PermLoc = VALUES(PermLoc), CalibrationDue = VALUES(CalibrationDue), CurLoc = VALUES(CurLoc), Comments = VALUES(Comments), Status = VALUES(Status)"
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

// Create a new scan using a post request; scan also updates location in cal tools table 
app.post('/newScan', (req, res) => {

    const args = [[
        req.body.nvl,
        req.body.employeeID,
        req.body.newLoc,
        req.body.dateTime,
    ]]
    const args2 = [[
        req.body.newLoc,
    ]]
    const args3 = [[
        req.body.nvl,
    ]]
    const stmt = "INSERT INTO toolhistorytable (nvl, employeeID, newLoc, curDate) VALUES ?"
    const stmt2 = "UPDATE caltoolstable SET CurLoc = ? WHERE NVL = ?"
    //WIP
    connection.query(stmt, [args], (err, rows, fields) => {
        if (err) {
            throw err
            connection.end();
        }
        else {
            connection.query(stmt2, [args2, args3], (err, rows, fields) => {
                if (err) {
                    throw err
                    connection.end();
                }
                else {
                    res.status(200).json({ Error: 'Success' })
                }
            })
        }
    
    })
  
  });

// read headers using a get request
app.post('/headers', (req, res) => {
  console.log("Table name in headers")
  console.log(req.body.tName)
  const args=[[
    req.body.tName
  ]]
  const stmt = "Select COLUMN_NAME,DATA_TYPE from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME= ? order by ordinal_position"
  connection.query(stmt,[args], (err, rows, fields) => {
    if (err) {
      throw err
      connection.end();
    }
    console.log(rows)
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
  var stmt1stHalf ="INSERT INTO materialOrdersTable ("
  var stmt2ndHalf =") VALUES(?) ON DUPLICATE KEY UPDATE "
  var stmt = ""
  var args = []
  var ID =0;
  if (req.body.OpenDate == 'Invalid Date') {
      req.body.OpenDate = dayjs().format('YYYY-MM-DD')
  }
  else if (!req.body.OpenDate) {
      req.body.OpenDate = dayjs().format('YYYY-MM-DD')
  }
  if (req.body.SubmitDate == 'Invalid Date') {
      req.body.SubmitDate = null
  }
  if (req.body.Status == 'submitted') {
      req.body.SubmitDate = dayjs().format('YYYY-MM-DD')
  }
  if (req.body.ClosedDate == 'Invalid Date') {
      req.body.ClosedDate = null
  }
  if (req.body.Status == 'arrived') {
      req.body.ClosedDate = dayjs().format('YYYY-MM-DD')
  }
  
  for(var attr in req.body){
    if(attr == 'RequestNumber' & req.body[attr] == 'new ticket'){
      Function.prototype(); //no op
    }
    else if(attr == 'AttachFile' & req.body[attr] == 'undefined'){
      Function.prototype(); // no op
    }
    else if(attr == 'lineItems'){
      Function.prototype(); // no op
    }
    else{
      args.push(req.body[attr]);
      stmt1stHalf = stmt1stHalf + attr + ", "
      stmt2ndHalf = stmt2ndHalf + attr + "=VALUES(" +attr+"), "
    }
  }
  stmt1stHalf = stmt1stHalf.slice(0,-2)
  stmt2ndHalf = stmt2ndHalf.slice(0,-2)
  stmt = stmt1stHalf + stmt2ndHalf

  connection.query(stmt, [args], (err, results, fields) => {
      if (err) {
          throw err
          connection.end();
          queryPassed = 0;
      }
      else if (results.insertId === undefined) {
          ID = req.body.RequestNumber
      }
      else if (results.insertId === 0) {
          ID = req.body.RequestNumber
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
      req.body.lineItems[i].PartName,
      req.body.lineItems[i].PartNumber,
      req.body.lineItems[i].PricePer,
      req.body.lineItems[i].Quantity,
      req.body.lineItems[i].Status,
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
    const stmt = "SELECT * FROM orderlineitemstable WHERE RequestNumber= ?"
    connection.query(stmt, [args], (err, rows, fields) => {
        if (err) {
            throw err
            connection.end();
        }
        res.json(rows)
    })

})

app.get('/loadLineData', (req, res) => {
    const args = [[
        req.body.localRequestNum,
    ]]
    const stmt = "SELECT * FROM orderlineitemstable"
    connection.query(stmt, [args], (err, rows, fields) => {
        if (err) {
            throw err
            connection.end();
        }
        res.json(rows)
    })

})

app.post('/newAttachment', upload.single('attachment'), (req, res) => {
    // req.file is the name of your file in the form above, here 'uploaded_file'
    // req.body will hold the text fields, if there were any
    //connection.end()]
    res.json({message: "success"})
});

app.post('/searchTable', (req, res) => {

    var args = [];
    if(req.body.tName.length==1){
      args = [[
        req.body.tName,
      ]]
    }
    else if(req.body.tName.length==2){
      args = [[
        req.body.tName[0],
      ]]
    }
    else{
      console.log('too many tables provided')
    }

    const headers = [];
    var stmt = "Select COLUMN_NAME,DATA_TYPE from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME= ? order by ordinal_position"
    connection.query(stmt, [args], (err, rows, fields) => {
      if (err) {
          throw err
          connection.end();
      }
      for(let i = 0; i < rows.length; i++){
        headers.push(rows[i].COLUMN_NAME)
      }
      if(req.body.tName.length==1){
        stmt = "SELECT * FROM " + req.body.tName + " WHERE " ;
      
        for(let i = 0; i < headers.length; i++){
          stmt = stmt + headers[i]+" LIKE " + "'%" + req.body.value + "%'" + " OR "
        }
        stmt = stmt.slice(0,-3)
        connection.query(stmt, [args], (err, rows, fields) => {
          if (err) {
              throw err
              connection.end();
          }
          res.json(rows)
        })
      }
      else if(req.body.tName.length==2){
        args = [[
          req.body.tName[1],
        ]]
        var stmt = "Select COLUMN_NAME,DATA_TYPE from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME= ? order by ordinal_position"
        connection.query(stmt, [args], (err, rows, fields) => {
          for(let i =0; i<rows.length;i++){
            if(headers.includes(rows[i].COLUMN_NAME)){
              console.log('found duplicate header')
              for(let j=0;j<headers.length;j++){
                if(rows[i].COLUMN_NAME === headers[j]){
                  headers[j] = req.body.tName[0] + '.' + headers[j]
                }
              }
              headers.push(req.body.tName[1]+'.'+rows[i].COLUMN_NAME)
            }
            else{
              headers.push(rows[i].COLUMN_NAME)
            }
          }
          stmt = "SELECT * FROM " + req.body.tName[0] + " INNER JOIN " + req.body.tName[1] + " ON materialorderstable.RequestNumber = orderlineitemstable.RequestNumber" +" WHERE " ;
      
          for(let i = 0; i < headers.length; i++){
            stmt = stmt + headers[i]+" LIKE " + "'%" + req.body.value + "%'" + " OR "
          }
          stmt = stmt.slice(0,-3)
          console.log(stmt)
          connection.query(stmt, [args], (err, rows, fields) => {
            if (err) {
                throw err
                connection.end();
            }
            res.json(rows)
          })

        })
      }
      else{
        console.log('too many tables provided')
      }
    })
})

//retrieve calibrated tools information
app.get('/stagTools', (_, res) => {
    connection.query('Select * from caltoolstable WHERE Status = "Active"', (err, rows, fields) => {
        if (err) {
            throw err
            connection.end();
        }
        res.json(rows)
    })
    //connection.end()
});