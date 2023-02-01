const mongo = require('../connect');
const { ObjectId } = require('mongodb');

//get method 
module.exports.getbooks = async (req, res, next) => {
    //this give books detail
    let books;
    try {
        books = await mongo.selectedDb.collection("Books").find().toArray();
    } catch (error) {
        console.error(error);
    }
    if (!books) {
        return res.status(404).json({ message: "No Books Found" })
    }
    return res.status(200).send(books)

};
//getById
module.exports.findById = async (req, res, next) => {
    try {
        let find = await mongo.selectedDb.collection("Books").findOne({ _id: ObjectId(req.params.id) });

        res.status(200).send(find);
        next();
    } catch (error) {
        console.log(error);
        res.status(404).send({ message: "Not able to find" })
    }
}
//post method 
module.exports.createbook = async (req, res, next) => {
    let addbooks;
    try {
        addbooks = await mongo.selectedDb.collection("Books").insertOne({
            name: req.body.name,
            author: req.body.author,
            description: req.body.description,
            price: req.body.price,
            available: req.body.available,
            image: req.body.image
        });
        res.status(200).send({ addbooks });
        next();
    } catch (error) {
        console.log(error);
        res.status(404).send({ message: "Not able to Add the Book" })
    }
};
//update method
module.exports.updatebook = async (req, res, next) => {
    try {
        let update = await mongo.selectedDb.collection("Books").findOneAndUpdate({ _id: ObjectId(req.params.id) },
            {
                $set: {
                    name: req.body.name,
                    author: req.body.author,
                    description: req.body.description,
                    price: req.body.price,
                    available: req.body.available,
                    image: req.body.image
                }
            },
            { returnDocument: "after" });

        res.status(200).send(update);
        next();
    } catch (error) {
        console.log(error);
        res.status(404).send({ message: "Not Able TO Update" })
    }
};
//delete data module
module.exports.deletebook = async (req, res, next) => {
    try {

        const id = req.params.id;
        const deletedData = await mongo.selectedDb.collection("Books").deleteOne({ _id: ObjectId(id) });
        res.send(deletedData)
    } catch (err) {
        console.error(err);
        res.status(500).send(err)
    }
}

