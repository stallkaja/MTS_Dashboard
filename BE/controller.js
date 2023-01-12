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
    ]]
    console.log(args);
    const stmt = "INSERT INTO toolhistorytable (nvl, employeeID, newLoc) VALUES ? "
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
app.get('/headers', (_, res) => {
  connection.query("Select COLUMN_NAME,DATA_TYPE from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='materiallisttable' order by ordinal_position", (err, rows, fields) => {
    if (err) {
      throw err
      connection.end();
    }
    //console.log(rows)
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
app.get('/searchNVL', (req, res) => {
  console.log(req)
  const args = [[
    req.body.nvl,
  ]]
  console.log(args)
  const stmt = "SELECT * FROM toolhistorytable WHERE ?"
  connection.query(stmt, [args], (err, rows, fields) => {
    if (err) {
        throw err
        connection.end();
    }
    console.log(rows)
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
})
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

//replace an exercsise using a put request
app.put('/exercises/:id', (req, res) => {
    const args = {
      _id: req.params.id,
      name: req.body.name,
      reps: req.body.reps,
      weight: req.body.weight,
      unit: req.body.unit,
      date: req.body.date
    }
    //the rest of this route handler needs to be updated to use MySQL not mongo DB
    exercises.replaceExercise(args)
      .then(nModified => {
        if (nModified === 1){
          res.json(args) 
        } else {
          res.status(404).json({ Error: 'Resource not found' })
        }
      })
      .catch(error => {
        console.error(error)
        res.status(400).json({ Error: 'Request failed' })
      });
  });


//delete an exercise
app.delete('/items/:id', (req, res) => {
  console.log(req.params.id)
  
  connection.query('DELETE FROM testData WHERE materialPK='+req.params.id, (err, rows, fields) => {
    if (err) {
      throw err
      connection.end();
    }
    res.status(204).send()
  })
  /*
    exercises.deleteExercise(req.params.id)
      .then(deletedCount => {
        if (deletedCount === 1) {
          res.status(204).send()
        } else {
          res.status(404).json({ Error: 'Resource not found' })
        }
      })
      .catch(error => {
        console.error(error)
        res.status(400).json({ Error: 'Request failed' })
      });
  */
  });
  
  
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });

