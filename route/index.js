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

function addRoutes(app){ 
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
            monkeyId: null
        },
        {
            id: 2,
            color: "yellow",
            sweet: true,
            monkeyId: null
        },
        {
            id: 3,
            color: "green",
            sweet: true,
            monkeyId: null
        }, {
            id: 4,
            color: "green",
            sweet: false,
            monkeyId: null
        }
    ]

    let globalBananaId = bananas.length + 1;

    const objRep = {
        monkeys,
        bananas,
        nextMonkeyId: 4,
        nextBananaId: 5
    }

    const getBananas = (req, res, next) => {
        console.table(bananas);
        return res.json(bananas);
    }

    // const getMonkeyIndex = (req, res, next) => {
    //     const monkeyIdAsNumber = parseInt(req.params.id, 10);
    //     let foundId = -1;
    //     for (let i = 0; i < monkeys.length; i++) {
    //         if (monkeys[i].id === monkeyIdAsNumber) {
    //             foundId = i;
    //             break;
    //         }
    //     }

    //     if (foundId === -1) {
    //         return res.status(404).json({
    //             Error: `Requested monkeyID not found! ${req.params.id}`
    //         });
    //     }
    //     res.locals.monkeyIndex = foundId
    //     return next();
    // }

    // const getMonkey = (req, res, next) => {
    //     res.status(200).json(monkeys[res.locals.monkeyIndex]);
    // }

    const getBananaIndex = (req, res, next) => {
        const bananaIdAsNumber = parseInt(req.params.id, 10);
        let foundId = -1;
        for (let i = 0; i < bananas.length; i++) {
            if (bananas[i].id === bananaIdAsNumber) {
                foundId = i;
                break;
            }
        }

        if (foundId === -1) {
            return res.status(404).json({
                Error: `Requested bananaID not found! ${req.params.id}`
            });
        }
        res.locals.bananaIndex = foundId
        return next();
    }

    const getBanana = (req, res, next) => {
        res.status(200).json(bananas[res.locals.bananaIndex]);

    }

    const createBanana = (req, res, next) => {
        if (typeof req.body.color == 'undefined' || typeof req.body.sweet == 'undefined') {
            req.status(400).json({ Error: `Missing color or sweet` })
        }
        const newBanana = {
            id: globalBananaId,
            color: req.body.color,
            sweet: req.body.sweet,
            monkeyId: req.body.monkeyId ?? null
        };

        bananas.push(newBanana);
        globalBananaId++;
        return res.status(201).json(newBanana);
    };

    const deleteBanana = (req, res, next) => {
        const deletedBananaById = bananas[res.locals.bananaIndex];
        bananas.splice(res.locals.bananaIndex, 1);
        return res.status(200).json({ deletedBananaById })
    }

    const updateBanana = (req, res, next) => {
        if (typeof req.body.color !== 'undefined') {
            bananas[res.locals.bananaIndex].color = req.body.color;
        }
        if (typeof req.body.sweet !== 'undefined') {
            bananas[res.locals.bananaIndex].sweet = req.body.sweet;
        }
        if (typeof req.body.monkeyId !== 'undefined') {
            bananas[res.locals.bananaIndex].monkeyId = req.body.monkeyId;
        }

        if ((typeof req.body.color === 'undefined') && (typeof req.body.sweet === 'undefined')) {
            return res.status(400).json({ error: 'Missing color, sweet!' })
        }
        return res.status(200).json(bananas[res.locals.bananaIndex]);
    }

    const checkMonkeyId = (req, res, next) => {
        const monkeyId = req.body.monkeyId;
        // nincs megadva vagy null: gazdátlan banán, nincs mit ellenőrizni
        if (monkeyId === undefined || monkeyId === null) {
            return next();
        }
        // csak egész szám lehet
        if (!Number.isInteger(monkeyId)) {
            return res.status(400).json({ error: 'monkeyId must be an integer' });
        }
        // létezik-e ilyen majom
        const monkey = monkeys.find(m => m.id === monkeyId);
        if (monkey === undefined) {
            return res.status(400).json({ error: 'Monkey does not exist' });
        }
        next();
    }

    // const deleteMonkeyBananas = (req, res, next) => {
    //     const monkeyID = monkeys[res.locals.monkeyIndex].id;
    //     bananas = bananas.filter(b => b.monkeyId !== monkeyID);
    //     next();
    // };

    app.get('/monkey', getMonkeysMW(objRep));
    app.post('/monkey', createMonkeyMW(objRep));
    app.get('/monkey/:id', getMonkeyMW(objRep),  (req, res, next)=> res.json(res.locals.monkey));
    app.delete('/monkey/:id', getMonkeyMW(objRep), deleteMonkeyBananasMW(objRep), deleteMonkeyMW(objRep));
    app.patch('/monkey/:id', getMonkeyMW(objRep), updateMonkeyMW(objRep));

    app.get('/banana', getBananas); // Minden banán
    app.post('/banana', checkMonkeyId, createBanana);
    app.get('/banana/:id', getBananaIndex, getBanana);
    app.delete('/banana/:id', getBananaIndex, deleteBanana);
    app.patch('/banana/:id', getBananaIndex, checkMonkeyId, updateBanana);
}

module.exports = addRoutes;