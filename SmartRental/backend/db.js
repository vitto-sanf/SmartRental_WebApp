const dotenv = require("dotenv");
dotenv.config();
const mongodb = require("mongodb");

let _db;

mongodb.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
  if (err) {
    console.log(err);
  }
  _db = client.db(); // Accesso al database tramite il client
});

module.exports = {
  getDb: function() {
    return _db;
  }
};
