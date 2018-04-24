const express = require('express');
const knex = require('../knex');
const router = express.Router();

//Users will access this using the userId query to get all of their own personal notes.
router.get('/notes', (req, res, next) => {

    const userId  = req.query.userId;

    knex.select('notes.id', 'content', 'duedate', 'user_id')
        .from('notes')
        .modify(function(queryBuilder) {
            if (userId) {
                queryBuilder.where('user_id', userId)
            }
        })
        .then((results) => {
            res.json(results)
        })
        .catch((err) => next(err));
})

router.get('/notes/:id', (req, res, next) => {
    const { id } = req.params;

    knex.select()
        .from('notes')
        .where({id})
        .then((result) => {
            res.json(result)
        })
        .catch((err) => next(err))
})

router.post('/notes', (req,res,next) => {
    const { content, duedate, user_id } = req.body;

    const newNote = { content, duedate, user_id }

    knex('notes')
        .insert(newNote)
        .returning(['content', 'duedate', 'user_id'])
        .then((result) => {
            res.json(result);
        })
        .catch((err) => next(err));

})

router.put('/notes/:id', (req,res,next) => {
    const { id } = req.params;
    const { content, duedate, user_id } = req.body;

    const updateNote = { content, duedate, user_id }

    knex.select()
        .from('notes')
        .where({id})
        .update(updateNote)
        .returning(['content', 'duedate', 'user_id'])
        .then((result) => {
            res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
        })
        .catch((err) => next(err));

})

router.delete('/notes/:id', (req,res,next) => {
    const { id } = req.params;

    knex.select()
        .from('notes')
        .where({id})
        .del()
        .then((result) => {
            if (result) {
                res.status(204).end();
            } else {
                next()
            }
        })
        .catch(err => next(err))

})


module.exports = router;