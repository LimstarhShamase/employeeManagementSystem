const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const DATA_PATH = path.join(__dirname, 'data', 'employees.json');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Get all employees
app.get('/api/employees', (req, res) => {
  fs.readFile(DATA_PATH, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading employee data');
    res.json(JSON.parse(data));
  });
});

// Add new employee
app.post('/api/employees', (req, res) => {
  const newEmployee = req.body;
  fs.readFile(DATA_PATH, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading employee data');
    const employees = JSON.parse(data);
    employees.push(newEmployee);
    fs.writeFile(DATA_PATH, JSON.stringify(employees, null, 2), err => {
      if (err) return res.status(500).send('Error writing employee data');
      res.status(201).send('Employee added');
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
