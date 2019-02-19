const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile')

const db = knex(knexConfig.development)

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.post('/api/zoos', (req, res) => {
  try {
    db('zoos')
      .insert(req.body)
      .then(item => {
        res.status(201).json(item)
      })
      .catch(error => {
        res.status(400).json({
          message: 'Bad request, include required fields.',
          error
        })
      })
  } catch (error) {
    res.status(500).json({ message:"Server couldn't add item", error })
  }
});

server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then(zoos => {
      res.status(200).json(zoos)
    })
    .catch(error => {
      res.status(500).json({ message: "Couldn't fetch zoo data", error })
    })
});

server.get('/api/zoos/:id', (req, res) => {
  db('zoos')
    .where({ id: req.params.id })
    .first()
    .then(zoos => {
      if(zoos){
        res.status(200).json(zoos)
      }else{
        res.status(404).json({
          message: "Cannot find zoo with this Id",
        })
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Couldn't fetch zoo data", error })
    })
});



const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
