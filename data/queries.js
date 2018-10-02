const promise = require('bluebird');

// Initialization Options
const options = {
    promiseLib: promise
};

const pgp = require('pg-promise')(options);
const db = pgp(
    {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }
);

// map query functions
module.exports = {
    addRecord: addRecord,
};

// define functions
function addRecord(req, res) {
    req.body.manyducks = parseInt(req.body.manyducks);
    req.body.muchfood = parseInt(req.body.muchfood);
    req.body.feedregular = parseInt(req.body.feedregular);
    console.log("feedregular: "+req.body.feedregular);
    const queryString = `insert into ohducks_v1(feedtime,whatfood,feedlocation,manyducks,kindfood,muchfood,feedregular,createdon) values ('${req.body.feedtime}', '${req.body.whatfood}', '${req.body.feedlocation}', ${req.body.manyducks}, '${req.body.kindfood}', ${req.body.muchfood}, ${req.body.feedregular}, now());`;
    db.none(queryString)
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'A record was submitted.'
                });
        })
        .catch(function (err) {
            return err;
        });
}