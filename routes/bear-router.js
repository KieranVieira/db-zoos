const express = require('express');
const knex = require('knex');
const knexConfig = require('../knexfile')

const router = express.Router();

const db = knex(knexConfig.development)

router.post('/', (req, res) => {
    try{
        db('bears')
            .insert(req.body)
            .then(id => {
                res.status(201).json({ message: `Bear was added with Id ${id}`})
            })
            .catch(error => {
                res.status(400).json({ error })
            })
    }catch(error){
        res.status(500).json({
            message: "Server could not post bear",
            error
        })
    }
})

router.get('/', (req, res) => {
    db('bears')
        .then(bears => {
            res.status(200).json(bears);
        })
        .catch(error => {
            res.status(500).json({ message: "Server could not get bear data", error })
        })
});

module.exports = router;