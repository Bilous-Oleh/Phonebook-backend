const Contact = require("../db/models/contactModel")

const getAllContacts = async (req, res) => {
    const {_id: owner} = req.user;
    const allContacts = await Contact.find({owner});   
    res.json(allContacts);
}

const addContact = async (req, res) => {
    const {_id: owner} = req.user;
    const result = await Contact.create({owner, ...req.body});
    res.status(201).json(result);

}

const deleteContact = async (req, res) => {
    const {id} = req.params;
    const result = await Contact.findByIdAndDelete(id);
    if(!result) {
        res.status(404).json({message:"contact not found"});
    }
    res.json({
        message: "contact was delete"
    })
}

module.exports = {
    getAllContacts,
    deleteContact,
    addContact
}