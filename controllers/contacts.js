const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getContacts = async (req, res, next) => {
    //#swagger.tags=['Contacts']
    const result = await mongodb.getDb().db('cse341').collection('contact').find();
    result.toArray().then((list) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(list);
    });
};
const getContact = async (req, res, next) => {
    //#swagger.tags=['Contacts']
    const id = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('cse341').collection('contact').find({_id: id});
    result.toArray().then((list) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(list[0]);
    });
};
const addContact = async (req, res, next) => {
    //#swagger.tags=['Contacts']
    const newContact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const result = await mongodb.getDb().db('cse341').collection('contact').insertOne(newContact);
    
    if (result.acknowledged) {
        console.log(`New contact created with the following id: ${result.insertedId}`);
        res.status(201).json(result);
    } else {
        res.status(500).json(result.error || 'Contact creation failed');
    }
};
const editContact = async (req, res, next) => {
    //#swagger.tags=['Contacts']
    const id = new ObjectId(req.params.id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const result = await mongodb.getDb().db('cse341').collection('contact').replaceOne({_id: id}, contact);
    if (result.modifiedCount > 0) {
        console.log(`Contact updated with the following id: ${result.insertedId}`);
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Somethng goes wrong');
    }
};
const deleteContact = async (req, res, next) => {
    //#swagger.tags=['Contacts']
    const id = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('cse341').collection('contact').deleteOne({_id: id});
    if (result.deletedCount > 0) {
        console.log(`Contact deleted with the following id: ${id}`);
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Somethng goes wrong');
    }
};

module.exports = { getContacts, getContact, addContact, editContact, deleteContact };



