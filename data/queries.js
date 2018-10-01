const promise = require('bluebird');

// Initialization Options
const options = {
    promiseLib: promise
};

const pgp = require('pg-promise')(options);
const db = pgp(
    {
        //connectionString: process.env.DATABASE_URL,
        connectionString: 'postgres://postgres:postgres@localhost:5432/ohducks',
        //ssl: true,
    }
);

// map query functions
module.exports = {
    addRecord: addRecord,
};

// define functions
function addRecord(req, res) {
    req.body.many = parseInt(req.body.many);
    req.body.much = parseInt(req.body.much);
    const queryString = `insert into ohducks_v1(feedtime,whatfood,feedlocation,manyducks,kindfood,muchfood,createdon) values ('${req.body.feedtime}', '${req.body.whatfood}', '${req.body.feedlocation}', ${req.body.manyducks}, '${req.body.kindfood}', ${req.body.muchfood}, now());`;
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