module.exports = (objRep) => {
    const { bananas } = objRep;
    return (req, res, next) => {
        const bananaIdAsNumber = parseInt(req.params.id, 10);
        let foundId = -1;
        for (let i = 0; i < bananas.length; i++) {
            if (bananas[i].id === bananaIdAsNumber) {
                foundId = i;
                break;
            }
        }
        if (foundId === -1) {
            return res.status(404).json({ error: `Banana not found with id: ${req.params.id}` });
        }
        res.locals.banana = bananas[foundId];
        res.locals.bananaIndex = foundId;
        return next();
    }
};