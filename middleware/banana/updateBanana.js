module.exports = (objRep) => {
    const { bananasModel, db } = objRep;
    return (req, res, next) => {
        if (typeof req.body.color !== 'undefined') {
            banana.color = req.body.color;
        }
        if (typeof req.body.sweet !== 'undefined') {
            banana.sweet = req.body.sweet;
        }
        if (typeof req.body.monkeyId !== 'undefined') {
            banana.monkeyId = req.body.monkeyId;
        }
        if ((typeof req.body.color === 'undefined') && (typeof req.body.sweet === 'undefined')) {
            return res.status(400).json({ error: 'Missing color or sweet' })
        }
        bananasModel.update(banana);
        db.saveDatabase(err => {
            if (err) {
                return next(err);
            }
            return next();
        });
    }
}