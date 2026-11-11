module.exports = (objRep) => {
    const { bananasModel, db, uuid } = objRep;
    return (req, res, next) => {
        if (typeof req.body.color == 'undefined' || typeof req.body.sweet == 'undefined') {
            return res.status(400).json({ error: `Missing color or sweet` });
        }
        const newBanana = {
            id: uuid.v4(),
            color: req.body.color,
            sweet: req.body.sweet,
            monkeyId: req.body.monkeyId ?? null
        }
        res.locals.banana = bananasModel.insert(newBanana);
        db.saveDatabase(err => {
            if (err) {
                return next(err);
            }
            return next();
        });
    }
}