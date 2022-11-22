const { teamModel } = require("../models")

const getAll = async (req, res) => {
    try {
        const db = await teamModel.find()
        if (db.length) return res.status(200).send(db)
        return res.status(400).send("Cant find products")
    } catch (err) {
        console.log(err);
        return res.status(400).send(err)
    }

}

const getOne = async (req, res) => {
    const { product_id } = req.params
    try {
        if (product_id) {
            const product = await teamModel.findById(product_id)
            return res.status(200).send(product)
        }
        if (!product_id) return res.status(400).send("Id hasnt been recieved")
        return res.status(400).send("product not found")
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}

const create = async (req, res) => {
    try {
        const { name, conference, logo } = req.body
        const newproduct = { title, jersey, team }
        const existsInDb = await teamModel.findOne({ name: name })
        if (existsInDb) return res.status(400).send("Already Registered")
        await teamModel.create(newproduct)
        return res.status(200).send(newproduct)
    } catch (error) {
        console.log(error)
        return res.status(400).send(error)
    }
}


const update = async (req, res) => {
    const { product_id } = req.params;
    const { name, conference, logo } = req.body
    try {
        if (!product_id) return res.status(400).send("Id hasnt been recieved")
        if (jersey && team) {
            const updateproduct = await teamModel.findByIdAndUpdate(product_id,
                { jersey, team })
            return res.status(200).send(updateproduct)
        }
        if (jersey && !team) {
            const updateproduct = await teamModel.findByIdAndUpdate(product_id,
                { jersey })
            return res.status(200).send(updateproduct)
        }
        if (!jersey && team) {
            const updateproduct = await teamModel.findByIdAndUpdate(product_id,
                { team })
            return res.status(200).send(updateproduct)
        }
        if (!jersey && !team) return res.status(400).send("No elements for update")

    } catch (error) {
        console.log(error)
        return res.status(400).send(error)
    }
}


const deleteproduct = async(req, res)=>{
    const {product_id} = req.params;
    if (!product_id) return res.status(400).send("Id hasnt been recieved")
    try {
        const deleteproduct = await teamModel.findByIdAndDelete(product_id)
        return res.status(200).send(`${deleteproduct.name} removed`)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}

module.exports = {getAll, getOne, update, deleteproduct, create}