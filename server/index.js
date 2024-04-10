const express = require("express");
const cors = require('cors');

const executeQuery = require('./executeQuery');

const app = express();
app.use(express.json());

const allowedHosts = ['http://localhost:3000'];
app.use(cors({
  origin: function (origin, callback) {
    // Check if the origin is in the allowed hosts array
    if (allowedHosts.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.post('/sendQuery', async (req, res) => {
  const sqlQuery = req.body.sqlQuery;

  try {
    const result = await executeQuery(sqlQuery);
    // console.log( "Result here :",result);
    // res.send(result);
    res.status(200).json({ success: true, result });
  } catch (error) {
    // console.log("Error here :", error);
    // res.send(error);
    res.status(500).json({ success: false, message: error });
  }
});

app.listen(8080, () => {
  console.log("server running on port 8080");
});