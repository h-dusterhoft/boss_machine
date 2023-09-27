const express = require('express');
const minionsRouter = express.Router();

module.exports = minionsRouter;

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require('./db');

minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
});

minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});

minionsRouter.get('/:minionId', (req, res, next) => {
    const minionId = req.params.minionId;
    const foundMinion = getFromDatabaseById('minions', minionId);
    if (foundMinion) {
        res.send(foundMinion);
    } else {
        res.status(404).send();
    }
});

minionsRouter.put('/:minionId', (req, res, next) => {
    const updatedMinion = updateInstanceInDatabase('minions', req.body);
    if (updatedMinion) {
        res.send(updatedMinion);
    } else {
        res.status(404).send();
    }
});

minionsRouter.delete('/:minionId', (req, res, next) => {
    const minionId = req.params.minionId;
    const deletedMinion = deleteFromDatabasebyId('minions', minionId);
    if (deletedMinion) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});