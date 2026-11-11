module.exports = (objRep, templateFile) => {
    return (req, res, next) => {
        return res.render(templateFile, res.locals);
    };
};