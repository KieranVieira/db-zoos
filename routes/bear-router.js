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

router.get('/:id', (req, res) => {
    db('bears')
        .where({ id: req.params.id })
        .first()
        .then(bear => {
            if(bear){
                res.status(200).json(bear);
            }else{
                res.status(404).json({
                    message: "Could not find bear with given ID" 
                })
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Server could not get bear data", error })
        })
})

router.delete('/:id', (req, res) => {
    db('bears')
        .where({ id: req.params.id })
        .del()
        .then(count => {
            if(count){
                res.status(204).end();
            }else{
                res.status(404).json({
                    message: "Could not find bear with given ID" 
                })
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Server could not delete bear data", error })
        })
})

router.put('/:id', (req, res) => {
    try{
        db('bears')
            .where({ id: req.params.id })
            .update(req.body)
            .then(count => {
                if(count){
                    res.status(200).json({ message: `Bear with ID ${req.params.id} was updated to ${req.body.name}` })
                }else{
                    res.status(404).json({ message: `Bear could not be found with ID ${req.params.id}` })
                }
            })
            .catch(error => {
                res.status(400).json({ 
                    message: "Bad Request, please provide a name of the bear", 
                    error 
                })
            })
    }catch(error){
        res.status(500).json({
            message: "Server could not update the bear",
            error
        })
    }
})

module.exports = router;