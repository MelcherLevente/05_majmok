module.exports = (objRep) => {
    const { bananas } = objRep;
    return (req, res, next) => {
        const deletedBananaById = bananas[res.locals.bananaIndex];
        bananas.splice(res.locals.bananaIndex, 1);
        return res.status(201).json({ deletedBananaById });
    }
}
