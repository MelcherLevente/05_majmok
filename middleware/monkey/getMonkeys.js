module.exports = (objRep) => {
    const {monkeysModel} = objRep;
    return (req, res, next) => {
        const monkeys = monkeysModel.find();
        res.locals.monkeys = monkeys;
        return next();
    }
}