const express = require('express');
const knex = require('knex');
const knexConfig = require('../knexfile')

const router = express.Router();

const db = knex(knexConfig.development)

router.get('/', (req, res) => {
    res.send('bears')
});

module.exports = router;