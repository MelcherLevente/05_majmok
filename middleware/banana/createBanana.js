module.exports = (objRep) => {
    const { bananas } = objRep;
    return (req, res, next) => {
        if (typeof req.body.color == 'undefined' || typeof req.body.sweet == 'undefined') {
            return res.status(400).json({ error: `Missing color or sweet` });
        }
        const newBanana = {
            id: objRep.nextBananaId,
            color: req.body.color,
            sweet: req.body.sweet,
            monkeyId: req.body.monkeyId
        }
        bananas.push(newBanana);
        objRep.nextBananaId++;
        res.locals.banana = newBanana;
        return next();
    }
}