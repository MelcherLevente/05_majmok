module.exports = (objRep) => {
    const {bananasModel} = objRep;
    return (req, res, next) => {
        const bananas = bananasModel.find();
        res.locals.bananas = bananas;
        return next();
    }
}