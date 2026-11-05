module.exports = (objRep) => {
    const { bananas } = objRep;

    return (req, res, next) => {
        bananas.forEach(banana => {
            if (banana.monkeyId === res.locals.monkey.id) {
                banana.monkeyId = null;
            }
        });

        return next();
    };
};