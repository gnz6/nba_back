const {usersModel} = require("../models")
const {sign} = require("jsonwebtoken")
const {SECRET} = process.env

const signUp = async (req, res)=>{
    try {
        const {name, email, password } = req.body
        const findUser = await usersModel.find({email})
        if(findUser.length) return res.status(400).send("Email already registered")

        const newUser = {
            name,
            email, 
            password: await usersModel.encryptPassword(password)
        }

        await usersModel.create(newUser)
        const token = sign({ id: newUser._id}, `${SECRET}`, {expiresIn:86400})
        return res.send(`${newUser.email} registered.`)
    } catch (error) {
        console.log(error)        
      return res.send( error)        
    }
}


const logIn = async(req,res)=>{
    const{ email, password} = req.body;
    try{
    const findUser = await usersModel.findOne({email})
    if (!findUser) return res.status(400).send("This email is not registered")

    const matches =  await usersModel.comparePassword(password, findUser.password)
    if(!matches) return res.status(400).send("Wrong password")
    const token = sign({ id: findUser._id}, `${SECRET}`, {expiresIn:86400})
    
    return res.status(200).send({token, findUser})

     }catch(error){
        console.log(error)        
        return res.send( error)
    }    
}


const googleLogin = async(req, res)=>{
    const {email, name } = req.body;
    const findUser = await usersModel.findOne({email})
    try {
        if(!findUser){
            const newUser = {
                name, email
            }
            const findUser = await usersModel.create(newUser)
            const token = sign({ id: newUser._id}, `${SECRET}`, {expiresIn:86400})
            return res.send({token, findUser})

        }else{
            const token = sign({ id: findUser._id}, `${SECRET}`, {expiresIn:86400})
            console.log(findUser);
             return res.status(200).send({token, findUser})
        }

    } catch (error) {
        console.log(error)        
        return res.send({error: error.message})       
    }
}

// const forgotPassword = async(req,res)=>{
//     const {email} = req.body;
//     try {
//         const findUser = await usersModel.findOne({email})
//         if(!findUser) return res.status(200).send("User not registered");
//         const secret = `${SECRET} ${findUser.password}`;
//         const payload = {
//            email: findUser.email,
//            id: findUser._id 
//         }

//         const token = sign(payload, secret, {expiresIn: "15m"});
//         const url = `http://localhost:3000/resetPassword/${findUser._id}/${token}`
//         // nodemailer notification
//         return res.status(200).send("Reset link has been sent to your email")


//     } catch (error) {
//         console.log(error)        
//         return res.send({error: error.message})       
//     }
// }

// const resetPassword =async(req,res)=>{
//     const {userId} = req.params;
//     const {id, email ,password, confirmPassword} = req.body;

//     try {
//         const findUser = await usersModel.findOne({email})
//         if(id !== userId) return res.send("Invalid Id")

//         const newToken = sign({id: userId}, `${SECRET}`, {expiresIn: 86400});
//         if(findUser.password){
//             const matches = await usersModel.comparePassword(password, findUser.password)
//             if(matches) return res.status(200).send("Cant repeat previous password")
//         }
//         const update = await usersModel.findByIdAndUpdate(id, {
//             password : await usersModel.encryptPassword(password)
//         })

//         return res.status(200).send("Password Updated")
//     } catch (error) {
//         console.log(error)        
//         return res.send({error: error.message})       
//     }
// }

const getUsers =async(req,res)=>{
    const allUsers = await usersModel.find()
    if(allUsers.length) return res.status(200).send(allUsers)
    return res.status(400).send("Cant find users")
}

const getUser = async(req, res)=>{
    const {id}= req.params
    try {
        const user = await usersModel.findById(id)
            console.log(user);
            return res.status(200).send(user)
        
    } catch (error) {
        console.log(error.message);
        res.send(error.message)
    }
}

module.exports = {signUp, logIn, googleLogin, getUsers, getUser}