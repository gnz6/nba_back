const { teamModel } = require("../models")

const getAll = async (req, res) => {
    try {
        const db = await teamModel.find()
        if (db.length) return res.status(200).send(db)
        return res.status(400).send("Cant find teams")
    } catch (err) {
        console.log(err);
        return res.status(400).send(err)
    }

}

const getOne = async (req, res) => {
    const { team_id } = req.params
    try {
        if (team_id) {
            const team = await teamModel.findById(team_id)
            return res.status(200).send(team)
        }
        if (!team_id) return res.status(400).send("Id hasnt been recieved")
        return res.status(400).send("team not found")
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}

const create = async (req, res) => {
    try {
        const { name, conference, logo } = req.body
        const newteam = { name, conference, logo }
        const existsInDb = await teamModel.findOne({ name: name })
        if (existsInDb) return res.status(400).send("Already Registered")
        await teamModel.create(newteam)
        return res.status(200).send(newteam)
    } catch (error) {
        console.log(error)
        return res.status(400).send(error)
    }
}


// const update = async (req, res) => {
//     const { team_id } = req.params;
//     const { name, conference, logo } = req.body
//     try {
//         if (!team_id) return res.status(400).send("Id hasnt been recieved")
//         if (name && conference && logo) {
//             const updateteam = await teamModel.findByIdAndUpdate(team_id,
//                 { name, conference, logo })
//             return res.status(200).send(updateteam)
//         }
//         if (jersey && !team) {
//             const updateteam = await teamModel.findByIdAndUpdate(team_id,
//                 { jersey })
//             return res.status(200).send(updateteam)
//         }
//         if (!jersey && team) {
//             const updateteam = await teamModel.findByIdAndUpdate(team_id,
//                 { team })
//             return res.status(200).send(updateteam)
//         }
//         if (!jersey && !team) return res.status(400).send("No elements for update")

//     } catch (error) {
//         console.log(error)
//         return res.status(400).send(error)
//     }
// }


const deletedteam = async(req, res)=>{
    const {team_id} = req.params;
    if (!team_id) return res.status(400).send("Id hasnt been recieved")
    try {
        const deleteteam = await teamModel.findByIdAndDelete(team_id)
        return res.status(200).send(`${deleteteam.name} removed`)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}

module.exports = {getAll, getOne,  deletedteam, create}