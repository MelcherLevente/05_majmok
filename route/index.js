const uuid = require('uuid');

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

const renderMW = require('../middleware/render');

function addRoutes(app, db, monkeysModel, bananasModel) {
    const objRep = {
        monkeysModel,
        bananasModel,
        db,
        uuid
    }

    app.get('/api/monkey', getMonkeysMW(objRep), (req, res, next) => res.status(200).json(res.locals.monkeys));
    app.post('/api/monkey', createMonkeyMW(objRep), (req, res, next) => res.status(201).json(res.locals.monkey));
    app.get('/api/monkey/:id', getMonkeyMW(objRep), (req, res, next) => res.status(200).json(res.locals.monkey));
    app.delete('/api/monkey/:id', getMonkeyMW(objRep), deleteMonkeyBananasMW(objRep), deleteMonkeyMW(objRep), (req, res, next) => res.status(200).json(res.locals.monkey));
    app.patch('/api/monkey/:id', getMonkeyMW(objRep), updateMonkeyMW(objRep), (req, res, next) => res.status(200).json(res.locals.monkey));

    app.get('/api/banana', getBananasMW(objRep), (req, res, next) => res.status(200).json(res.locals.bananas)); // Minden banán
    app.post('/api/banana', checkMonkeyIdMW(objRep), createBananaMW(objRep), (req, res, next) => res.status(201).json(res.locals.banana));
    app.get('/api/banana/:id', getBananaMW(objRep), (req, res, next) => res.status(200).json(res.locals.banana));
    app.delete('/api/banana/:id', getBananaMW(objRep), deleteBananaMW(objRep), (req, res, next) => res.status(200).json(res.locals.banana));
    app.patch('/api/banana/:id', getBananaMW(objRep), checkMonkeyIdMW(objRep), updateBananaMW(objRep), (req, res, next) => res.status(200).json(res.locals.banana));

    app.get('/',
        (req, res, next) => res.redirect('/monkeys'));
    app.get('/monkeys',
        getMonkeysMW(objRep),
        getBananasMW(objRep),
        renderMW(objRep, 'monkeys'))

    app.get('/newmonkey',
        renderMW(objRep, 'monkeyform'));
    app.post('/newmonkey',
        createMonkeyMW(objRep),
        (req, res, next) => res.redirect('/monkeys'));

}

module.exports = addRoutes;