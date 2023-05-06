const express = require('express')
const app = express();
const PORT = 3000;

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


// Create a new material using a post request
app.post('/newMaterial', (req, res) => {

    const args = [[
        req.body.name,
        req.body.cat,
        req.body.note,
        req.body.qty,
        req.body.nvl,
        req.body.asset,
        req.body.stat,
        req.body.part,
        req.body.serial,
        //req.body.date,
        //req.body.loc,
        
    ]]
    console.log(args);
    const stmt = "INSERT INTO materiallisttable (MaterialName, Category, AdditionalNotes, Quantity, NVL, AssetNumber, CurrentState, LamPartNumber, SerialNumber) VALUES ? "
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

// Create a new scan using a post request
app.post('/newScan', (req, res) => {

    const args = [[
        req.body.nvl,
        req.body.employeeID,
        req.body.newLoc,
        req.body.date,
    ]]
    console.log(args);
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
  console.log(req.body);
  const args=[[
    req.body.tName
  ]]
  const stms = "Select COLUMN_NAME,DATA_TYPE from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME= ? order by ordinal_position"
  connection.query(stms,[args], (err, rows, fields) => {
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
    //console.log(rows)
    res.json(rows)
  })
  //connection.end()
});

// select * from toolhistorytable where nvl=given nvl
app.post('/searchNVL', (req, res) => {
  console.log(req.body)
  const args = [[
    req.body.searchNVL,
  ]]
  const stmt = "SELECT * FROM toolhistorytable WHERE NVL = ?"
  connection.query(stmt, [args], (err, rows, fields) => {
    if (err) {
        throw err
        connection.end();
    }
    console.log(rows)
    console.log('sending data')
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
      console.log(rows)
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
    console.log(rows)
    res.json(rows)
  })
  //connection.end()
  });
  
    // load tickets
app.get('/loadOpenTickets', (_, res) => {
  connection.query('Select * from ticketstable WHERE TicketStatus="Open"', (err, rows, fields) => {
    if (err) {
      throw err
      connection.end();
    }
    console.log(rows)
    res.json(rows)
  })
  //connection.end()
  });
  app.get('/loadClosedTickets', (_, res) => {
    connection.query('Select * from ticketstable WHERE TicketStatus="Closed"', (err, rows, fields) => {
      if (err) {
        throw err
        connection.end();
      }
      console.log(rows)
      res.json(rows)
    })
    //connection.end()
    });
  
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });

