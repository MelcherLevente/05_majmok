module.exports = (objRep) => {
    const { bananas } = objRep;
    return (req, res, next) => {
        const bananaId = req.body.bananaId;
        // nincs megadva vagy null: gazdátlan banán, nincs mit ellenőrizni
        if (bananaId === undefined || bananaId === null) {
            return next();
        }
        // csak egész szám lehet
        if (!Number.isInteger(bananaId)) {
            return res.status(400).json({ error: 'bananaId must be an integer' });
        }
        // létezik-e ilyen banán
        const banana = bananas.find(m => m.id === bananaId);
        if (banana === undefined) {
            return res.status(400).json({ error: 'Banana does not exist' });
        }
        next();
    }
}

