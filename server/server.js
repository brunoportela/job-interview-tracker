const express = require('express');
const { model } = require('mongoose');
const app = express();
const path = require('path');
const models = require('./models/interviewModels');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET
app.get('/api/interviews', (req, res) => {
  models.Interview.find({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send('GET failed!');
    });
});

// POST
app.post('/api/interviews', (req, res) => {
  console.log(req.body);
  const newLead = req.body;
  models.Interview.create(newLead)
    .then((data) => {
      res.status(200).send('created!');
    })
    .catch((err) => {
      res.status(400).send('POST failed!');
    });
});

// PUT
app.put('/api/interviews/:id', (req, res) => {
  const id = req.params.id;
  const updatedInteview = req.body;
  models.Interview.findByIdAndUpdate(id, updatedInteview, { new: true })
    .then((data) => {
      console.log('updated: ', data);
      res.status(200).send('updated!');
    })
    .catch((err) => {
      console.log('PUT failed!');
      res.status(400).send('PUT failed!');
    });
});

// DELETE
app.delete('/api/interviews/:id', (req, res) => {
  const id = req.params.id;
  models.Interview.findByIdAndDelete(id)
    .then((data) => {
      console.log('deleted: ', data);
      res.status(200).send('deleted!');
    })
    .catch((err) => {
      res.status(400).send('DELETE failed!');
    });
});

// listen to port 3000
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
