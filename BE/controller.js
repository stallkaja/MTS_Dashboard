const express = require('express')
const app = express();
const PORT = 3000;
const cors = require('cors')

//My SQL Connection  and config
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'dos_db'
})



// Also allows parsing of req.body.
app.use(express.json());



app.use(cors());

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
        req.body.materialPK
    ]
    const stmt = "INSERT INTO materiallisttable (MaterialName, Category, AdditionalNotes, Quantity, NVL, AssetNumber, CurrentState, LamPartNumber, SerialNumber, Location, materialPK) VALUES(?) ON DUPLICATE KEY UPDATE MaterialName = VALUES(MaterialName), Category = VALUES(Category), AdditionalNotes = VALUES(AdditionalNotes), Quantity = VALUES(Quantity), NVL = VALUES(NVL), AssetNumber = VALUES(AssetNumber), CurrentState = VALUES(CurrentState), LamPartNumber = VALUES(LamPartNumber), SerialNumber = VALUES(SerialNumber), Location = Values(Location), materialPK = VALUES(materialPK)"
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


// Create a new Ticket using a post request
app.post('/newTicket', (req, res) => {

  const args = [
      req.body.ticketStatus,
      req.body.ticketNum,
      req.body.ben,
      req.body.ticketDescription,
      req.body.department,
      req.body.toolBay

    ]
  const stmt = "INSERT INTO ticketsTable (TicketStatus, TicketNum, BEN, TicketDescription, Department, ToolBay) VALUES(?) ON DUPLICATE KEY UPDATE TicketStatus = VALUES(TicketStatus), TicketNum = VALUES(TicketNum), BEN = VALUES(BEN), TicketDescription = VALUES(TicketDescription), Department = VALUES(Department), ToolBay = VALUES(ToolBay)"
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
        req.body.caldue

    ]
    const stmt = "INSERT INTO caltoolstable (NVL, ManufacturerName, ModelName, Description, SerialNumber, Area, Location, CalibrationDue) VALUES(?) ON DUPLICATE KEY UPDATE ManufacturerName = VALUES(ManufacturerName), ModelName = VALUES(ModelName), Description = VALUES(Description), SerialNumber = VALUES(SerialNumber), Area = VALUES(Area), Location = VALUES(Location), CalibrationDue = VALUES(CalibrationDue)"
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

// read tool history headers using a get request
app.get('/ToolHistoryHeaders', (_, res) => {
  connection.query("Select COLUMN_NAME,DATA_TYPE from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='toolHistorytable' order by ordinal_position", (err, rows, fields) => {
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
  connection.query('Select * from ticketstable WHERE TicketStatus = "Open"', (err, rows, fields) => {
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
    connection.query('Select * from caltoolstable', (err, rows, fields) => {
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

    const args = [[
        req.body.date,
        req.body.shift,
        req.body.tech,
        req.body.depar,
        req.body.pass
    ]]
    const stmt = "INSERT INTO passdowntable (Date, Shift, Technician, Department, Passdown) VALUES ?"
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