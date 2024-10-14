module.exports = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Une erreur s\'est produite' });
};