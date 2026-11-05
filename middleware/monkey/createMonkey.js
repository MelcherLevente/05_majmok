module.exports = (objRep) => {
    const { monkeysModel, db, uuid } = objRep;
    return (req, res, next) => {
        if (typeof req.body.name == 'undefined' || typeof req.body.sex == 'undefined' || typeof req.body.species == 'undefined') {
            req.status(400).json({ Error: `Missing name, sex or species` })
        }
        const newMonkey = {
            id: uuid.v4(),
            name: req.body.name,
            sex: req.body.sex,
            species: req.body.species
        }
        res.locals.monkey = monkeysModel.insert(newMonkey);

        db.saveDatabase(err => {
            if (err){
                return next(err);
            }
            return next();
        });
    }
}