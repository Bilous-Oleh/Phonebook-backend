const {isValidObjectId}= require("mongoose");

const isValidId = (req, res, next) => {
    const {id} = req.params;
    if(!isValidObjectId(id)) {
        res.status(400).json({message:`${id} not valid`});
    }
    next();
}

module.exports = isValidId;