module.exports = (objRep) => {
    const { monkeys } = objRep;
    return (req, res, next) => {
        const deletedMonkeyById = monkeys[res.locals.monkeyIndex];
        monkeys.splice(res.locals.monkeyIndex, 1);
        return res.status(201).json({ deletedMonkeyById });
    }
}
