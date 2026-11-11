module.exports = (objRep) => {
    const { monkeysModel, db } = objRep;

    return (req, res, next) => {
        monkeysModel.remove(res.locals.monkey);
        db.saveDatabase(err => {
            if (err) {
                return next(err);
            }
            return next();
        });
    };
};