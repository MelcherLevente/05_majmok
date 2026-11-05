module.exports = (objRep) => {
    const { monkeys } = objRep;
    return (req, res, next) => {
        const monkeyIdAsNumber = parseInt(req.params.id, 10);
        let foundId = -1;
        for (let i = 0; i < monkeys.length; i++) {
            if (monkeys[i].id === monkeyIdAsNumber) {
                foundId = i;
                break;
            }
        }
        if (foundId === -1) {
            return res.status(404).json({ error: `Monkey not found with id: ${req.params.id}` });
        }
        res.locals.monkey = monkeys[foundId];
        res.locals.monkeyIndex = foundId;
        return next();
    }
};
// module.exports = (objRep) => {
//     const { monkeys } = objRep;
//     return (req, res, next) => {

//         // const bookIdAsNumber = parseInt(req.params.id, 10);
//         const monkey = monkeys.find(m => m.id === parseInt(req.params.id, 10)); // új sor


//         if (!monkey) {
//             return res.status(404).json({ error: `Monkey not found with id: ${req.params.id}` });
//         }
//         res.locals.monkey = monkey;
//         return next();
//     };
// };