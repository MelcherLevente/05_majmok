const getMonkeysMW = require('../middleware/monkey/getMonkeys');
const getMonkeyMW = require('../middleware/monkey/getMonkey');
const createMonkeyMW = require('../middleware/monkey/createMonkey');
const deleteMonkeyBananasMW = require('../middleware/monkey/deleteMonkeyBananas');
const deleteMonkeyMW = require('../middleware/monkey/deleteMonkey');
const updateMonkeyMW = require('../middleware/monkey/updateMonkey');

const getBananasMW = require('../middleware/banana/getBananas');
const getBananaMW = require('../middleware/banana/getBanana');
const createBananaMW = require('../middleware/banana/createBanana');
const deleteBananaMW = require('../middleware/banana/deleteBanana');
const updateBananaMW = require('../middleware/banana/updateBanana');
const checkMonkeyIdMW = require('../middleware/banana/checkMonkeyId');

function addRoutes(app, db, monkeysModel, bananasModel) { 
    const monkeys = [
    {
        id: 1,
        name: 'Joe',
        sex: 'male',
        species: 'gibbon'

    },
    {
        id: 2,
        name: 'Josephine',
        sex: 'female',
        species: 'gorilla'
    },
    {
        id: 3,
        name: 'Lajos',
        sex: 'male',
        species: 'orangutan'
    }
    ]

    let bananas = [
        {
            id: 1,
            color: "yellow",
            sweet: false,
            monkeyId: 1
        },
        {
            id: 2,
            color: "yellow",
            sweet: true,
            monkeyId: 2
        },
        {
            id: 3,
            color: "green",
            sweet: true,
            monkeyId: 3
        }, {
            id: 4,
            color: "green",
            sweet: false,
            monkeyId: 4
        }
    ]

    const objRep = {
        monkeys,
        bananas,
        monkeysModel,
        bananasModel,
        nextMonkeyId: 4,
        nextBananaId: 5,
        db
    }

    app.get('/monkey', getMonkeysMW(objRep), (req, res, next)=> res.json(res.locals.monkeys));
    app.post('/monkey', createMonkeyMW(objRep), (req, res, next) => res.status(201).json(res.locals.monkey));
    app.get('/monkey/:id', getMonkeyMW(objRep),  (req, res, next)=> res.json(res.locals.monkey));
    app.delete('/monkey/:id', getMonkeyMW(objRep),deleteMonkeyBananasMW(objRep), deleteMonkeyMW(objRep), (req, res, next) => res.json(res.locals.monkey));    
    app.patch('/monkey/:id', getMonkeyMW(objRep), updateMonkeyMW(objRep), (req, res, next)=> res.json(res.locals.monkey));

    app.get('/banana', getBananasMW(objRep), (req, res, next)=> res.json(res.locals.bananas)); // Minden banán
    app.post('/banana', checkMonkeyIdMW(objRep), createBananaMW(objRep), (req, res, next) => res.status(201).json(res.locals.banana));
    app.get('/banana/:id', getBananaMW(objRep), (req, res, next) => res.json(res.locals.banana));
    app.delete('/banana/:id', getBananaMW(objRep), deleteBananaMW(objRep), (req, res, next) => res.json(res.locals.banana));
    app.patch('/banana/:id', getBananaMW(objRep), checkMonkeyIdMW(objRep), updateBananaMW(objRep), (req, res, next) => res.json(res.locals.banana));
}

module.exports = addRoutes;