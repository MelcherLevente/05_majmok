module.exports = (objRep) => {
    const { monkeysModel, db } = objRep;
    return (req, res, next) => {
        if (typeof req.body.name === 'undefined' &&
            typeof req.body.sex === 'undefined' &&
            typeof req.body.species === 'undefined') {
            return res.status(400).json({ error: 'Missing name, sex or species' });
        }
        const monkey = res.locals.monkey;
        if (typeof req.body.name !== 'undefined') {
            monkey.name = req.body.name;
        }
        if (typeof req.body.sex !== 'undefined') {
            monkey.sex = req.body.sex;
        }
        if (typeof req.body.species !== 'undefined') {
            monkey.species = req.body.species;
        }
        monkeysModel.update(monkey);
        db.saveDatabase(err => {
            if (err) {
                return next(err);
            }
            return next();
        });
    };
};