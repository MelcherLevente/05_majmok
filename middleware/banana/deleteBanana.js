module.exports = (objRep) => {
    const { bananasModel, db } = objRep;

    return (req, res, next) => {
        bananasModel.remove(res.locals.banana);
        db.saveDatabase(err => {
            if (err) {
                return next(err);
            }
            return next();
        });
    };
};