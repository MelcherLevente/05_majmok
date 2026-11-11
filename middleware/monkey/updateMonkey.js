module.exports = (objRep) => {
    const { monkeysModel, db } = objRep;
    return (req, res, next) => {
        if (typeof req.body.name !== 'undefined') {
            res.locals.monkey.name = req.body.name;
        }
        if (typeof req.body.sex !== 'undefined') {
            res.locals.monkey.sex = req.body.sex;
        }
        if (typeof req.body.species !== 'undefined') {
            res.locals.monkey.species = req.body.species;
        }
        if (typeof req.body.bananaId !== 'undefined') {
            res.locals.monkey.bananaId = req.body.bananaId;
        }
        if ((typeof req.body.name === 'undefined') && (typeof req.body.sex === 'undefined') && (typeof req.body.species === 'undefined')) {
            return res.status(400).json({ error: 'Missing name, sex or species' })
        }
        monkeysModel.update(monkey);
        db.saveDatabase(err => {
            if (err) {
                return next(err);
            }
            return next();
        });
    }
}