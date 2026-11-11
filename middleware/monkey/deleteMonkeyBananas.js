module.exports = (objRep) => {
    const { bananasModel, db } = objRep;

    return (req, res, next) => {
        bananasModel.findAndRemove({ monkeyId: res.locals.monkey.id });
        return next();
    };
};