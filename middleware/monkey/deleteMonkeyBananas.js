module.exports = (objRep) => {
    const { monkeys } = objRep;
    return (req, res, next) => {
    const deletedMonkey = monkeys[res.locals.monkeyIndex];
    monkeys.splice(res.locals.monkeyIndex, 1);
    return res.status(200).json({ deletedMonkey });
    };

}
    
    
    