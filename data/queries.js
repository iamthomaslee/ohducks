const promise = require('bluebird');

// Initialization Options
const options = {
    promiseLib: promise
};

const pgp = require('pg-promise')(options);
const db = pgp(
    {
        connectionString: process.env.DATABASE_URL,
        ssl: true,
        // connectionString: 'postgres://postgres:postgres@localhost:5432/ohducks',
    }
);

// map query functions
module.exports = {
    addRecord: addRecord,
    getRecords: getRecords,
    getRecord: getRecord,
};

// define functions
/**
 *   add a record
 **/
function addRecord(req, res) {
    req.body.manyducks = parseInt(req.body.manyducks);
    req.body.muchfood = parseInt(req.body.muchfood);
    req.body.feedregular = parseInt(req.body.feedregular);
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

/**
 *   get recent 20 records
 **/
function getRecords(req, res) {
    const queryString = 'select * from ohducks_v1 order by id desc limit 20;';
    db.any(queryString)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved 100 recent records'
                });
        })
        .catch(function (err) {
            return err;
        });
}

/**
 *   get a record with id
 **/
function getRecord(req, res) {
    const id = parseInt(req.params.id);
    db.one('select * from ohducks_v1 where id = $1', id)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved record with id'
                });
        })
        .catch(function (err) {
            return err;
        });
}