const { usersModel, peopleModel } = require("../models")

const addFav = async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id } = req.body;
        if (!id || !user_id) return res.status(404).send("Need id and user to add a favourite")
        const findUser = await usersModel.findOne({ _id: user_id })
        let character = await peopleModel.findOne({ _id: id })

        const favRepeat = findUser.favs.includes(id) ? true : false

        if (favRepeat) return res.status(404).send("Already a fav")
        await usersModel.updateOne({ _id: user_id },
            { $push: { favs: id } },
            { new: true, useFindAndModify: false }
        );
        res.status(200).send("Fav added")

    } catch (error) {
        console.log(error);
        res.status(400).send("Cant add this fav")
    }
}

const deleteFav = async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id } = req.body;
        if (!id || !user_id) return res.status(400).json({ msg: "Need id and user to delete a favourite", data: `user id : ${user_id} character id : ${id}` })

        const user = await usersModel.findOne({ _id: user_id })
        const character = await peopleModel.findOne({ _id: id })
        if (!user) return res.status(400).send("User not found")
        if (!character) return res.status(400).send("Character not found")
        if (user && character) {
            const update = await usersModel.updateOne({ _id: user_id },
                { $pull: { favs: id } },
                { new: true, useFindAndModify: false }
            )
            return res.status(200).send(update);
        }
    } catch (error) {
        console.log(error);
        res.status(400).send("Cant delete this fav")

    }
}

module.exports = { deleteFav, addFav }