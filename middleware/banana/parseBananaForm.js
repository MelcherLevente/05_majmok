module.exports = (objRep) => {
    return (req, res, next) => {
        // a bejelölt checkbox 'on' szöveget küld, a be nem jelölt semmit
        req.body.sweet = req.body.sweet === 'on';
        // a „nincs gazdája” opció üres szöveget küld
        if (req.body.monkeyId === '') {
            req.body.monkeyId = null;
        }
        return next();
    };
};
