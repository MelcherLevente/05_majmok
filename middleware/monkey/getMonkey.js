module.exports = (objRep) => {
    const { monkeys } = objRep;
    return (req, res, next) => {
        const monkeyIdAsNumber = parseInt(req.params.id, 10);
        const monkey = monkeys.find(e => e.id === monkeyIdAsNumber);
        if (!monkey) {
            return res.status(404).json({ error: `Monkey not found with id: ${req.params.id}` });
        }
        res.locals.monkey = monkey;
        return next();
    };
}