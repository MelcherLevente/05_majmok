module.exports = (objRep) => {
    const { bananas } = objRep;
    return (req, res, next) => {
        if (typeof req.body.color !== 'undefined') {
            res.locals.banana.color = req.body.color;
        }
        if (typeof req.body.sweet !== 'undefined') {
            res.locals.banana.sweet = req.body.sweet;
        }
        if (typeof req.body.monkeyId !== 'undefined') {
            res.locals.banana.monkeyId = req.body.monkeyId;
        }
        if ((typeof req.body.color === 'undefined') && (typeof req.body.sweet === 'undefined')) {
            return res.status(400).json({ error: 'Missing color or sweet' })
        }
        return next();
    }
}