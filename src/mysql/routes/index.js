const Router = require('express').Router();
const UserRoutes = require('./UserRoutes');

// Router.get('/', (req, res) => {
//     res.send("Hello World");
// });

Router.use('/user', UserRoutes)

module.exports = Router;