var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "data/migration_001/sqlite.db"

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) { return console.error(err.message); }
  console.log('Connected to the %DB% database.'.replace('%DB%', DBSOURCE));
});

module.exports = db
