const express = require('express');
const app = express();
const path = require('path');

// uncomment the below for proxy challenge

const datas = [{ name: 'test', id: '2893r7fuyseoichfniw' }];

app.get('/api/datas', (req, res) => {
  return res.status(200).send(datas);
});

// // statically serve everything in the build folder on the route '/build'
// app.use('/build', express.static(path.join(__dirname, '../build')));
// // serve index.html on the route '/'

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

// listen to port 3000
app.listen(3000, () => console.log('Server Running'));
