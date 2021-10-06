const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

module.exports = router


require('./views/ocmc/default-judgments/routes.js')(router);
require('./views/damages/default-judgments/routes.js')(router);