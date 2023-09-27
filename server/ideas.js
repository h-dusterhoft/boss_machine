const express = require('express');
const ideasRouter = express.Router();

module.exports = ideasRouter;

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require('./db');

const checkMillionDollarIdea = require('./checkMillionDollarIdea');

ideasRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'));
});

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
   const newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
});

ideasRouter.get('/:ideaId', (req, res, next) => {
    const ideaId = req.params.ideaId;
    const foundIdea = getFromDatabaseById('ideas', ideaId);
    if (foundIdea) {
        res.send(foundIdea);
    } else {
        res.status(404).send();
    }
});

ideasRouter.put('/:ideaId', (req, res, next) => {
    const updatedIdea = updateInstanceInDatabase('ideas', req.body);
    if (updatedIdea) {
        res.send(updatedIdea);
    } else {
        res.status(404).send();
    }
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
    const ideaId = req.params.ideaId;
    const deletedIdea = deleteFromDatabasebyId('ideas', ideaId);
    if (deletedIdea) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});