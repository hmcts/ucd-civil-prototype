const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

module.exports = router


require('./views/ocmc/default-judgments/routes.js')(router);
require('./views/ocmc/hearing-notice/routes.js')(router);
require('./views/damages/default-judgments/routes.js')(router);
require('./views/ocmc/standard-directions-orders/routes.js')(router);
require('./views/ocmc/general-applications/routes.js')(router);
require('./views/citizen-UI/prototypes/prototype-May-2022/routes.js')(router);
