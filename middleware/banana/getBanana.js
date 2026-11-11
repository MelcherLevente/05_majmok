module.exports = (objRep) => {
    const { bananasModel } = objRep;
    return (req, res, next) => {
        const banana = bananasModel.findOne({ id: req.params.id });
        if (!banana) {
            return res.status(404).json({ error: `Banana not found with id: ${req.params.id}` });
        }
        res.locals.banana = banana;
        return next();
    };
}