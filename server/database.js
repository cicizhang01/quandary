var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE quandary (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text,
            category text,
            description text,
            featuredImage text,
            image text,
            location text,
            data text,
            time text
          )`, // NOTE: list in col would require something like pickle
              // data and time don't have special datatypes
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = `INSERT INTO quandary
                (name, category, description, featuredImage, image, location, data, time)
                VALUES (?,?,?,?,?,?,?,?)`
                db.run(insert,
                    ['Charity Ball',
                    'Fundraising',
                    'Spend an elegant night of dinner and dancing with us as we raise money for our new rescue farm.',
                    'https://placekitten.com/500/500',
                    'https://placekitten.com/500/500',
                    '1234 Fancy Ave',
                    '12-25-2019',
                    '11:30'
                  ])
                db.run(insert,
                    ['Rescue Center Goods Drive',
                    'Adoptions',
                    'Come to our donation drive to help us replenish our stock of pet food, toys, bedding, etc. We will have live bands, games, food trucks, and much more.',
                    'https://placekitten.com/500/500',
                    'https://placekitten.com/500/500',
                    '1234 Dog Alley',
                    '11-21-2019',
                    '12:00'
                  ])
            }
        });
    }
});


module.exports = db
