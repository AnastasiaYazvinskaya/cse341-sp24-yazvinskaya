const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getContacts = async (req, res, next) => {
    const result = await mongodb.getDb().db('cse341').collection('contact').find();
    result.toArray().then((list) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(list);
    });
};
const getContact = async (req, res, next) => {
    const id = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('cse341').collection('contact').find({_id: id});
    result.toArray().then((list) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(list[0]);
    });
};

module.exports = { getContacts, getContact };


