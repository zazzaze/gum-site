const userRoutes = require('./account_routes');

module.exports = function(app,db){
    userRoutes(app,db);
};