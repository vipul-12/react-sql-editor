const sqlite3 = require('sqlite3').verbose();

const executeQuery = (query, params = []) => new Promise((resolve, reject) => {
    const db = new sqlite3.Database('./database/sqlite3.db', sqlite3.OPEN_READWRITE, (error) => {
        if (error) {
            return console.error(error.message);
        } else {
            console.log("Database connected");
        }
    });

    const queryType = query.split(' ')[0];
    let response;

    switch (queryType.toUpperCase()) {
        case "SELECT":
        case "PRAGMA":
            db.all(query, params, function (err, rows) {
                if (err) {
                    reject(err.message);
                    return;
                }
                let response = {
                    message: queryType,
                    count: rows.length,
                    rows: rows,
                }
                if (queryType === "PRAGMA" && response.rows.length === 0) response.message = "PRAGMA error";
                resolve(response);
            });
            break;
        case "CREATE":
            db.run(query, params, function (err) {
                if (err) {
                    reject(err.message);
                    return;
                }
                response = {
                    message: "Table created successfully",
                };
                resolve(response);
            });
            break;
        case "DROP":
            db.run(query, params, function (err) {
                if (err) {
                    reject(err.message);
                    return;
                }
                response = {
                    message: "Table Dropped successfully",
                };
                resolve(response);
            });
            break;
        default:
            db.run(query, params, function (err) {
                if (err) {
                    reject(err.message);
                    return;
                }
                response = {
                    message: "Query executed successfully",
                    changes: this.changes,
                    lastID: this.lastID
                };
                resolve(response);
            });
    }

    db.close();

});

module.exports = executeQuery;