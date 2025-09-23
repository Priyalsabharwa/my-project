const express = require('express');
const app = express();
const port = 3000;

// Define a route for GET requests to the root path
app.get('/', (req, res) => {
  res.send({
    url: req.url,
    method: req.method
  });
});

// Define a route for POST requests to /submit
app.post('/submit', (req, res) => {
  res.send('Data submitted!');
});
app.put('/update', (req,res) =>{
    res.send('data updated');
});
app.delete('/delete', (req,res)=> {
    res.send('data deleted');
});
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
