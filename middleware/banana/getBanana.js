module.exports = (objRep) => {
    const { bananas } = objRep;
    return (req, res, next) => {
        const bananaIdAsNumber = parseInt(req.params.id, 10);
        const banana = bananas.find(e => e.id === bananaIdAsNumber);
        if (!banana) {
            return res.status(404).json({ error: `Banana not found with id: ${req.params.id}` });
        }
        res.locals.banana = banana;
        return next();
    };
}