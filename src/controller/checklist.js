const modelChecklist = require("../models/checklist.js")
const modelUsers = require("../models/user")

const getChecklists = async (req, res, next) => {
    try {
        const email = req.email
        const [user] = await modelUsers.findByEmail(email)

        if(user){
            const result = await modelChecklist.getChecklists()
            res.json({
                status: 200,
                result,
                message: "data have been successfully fetched"
            })
        } else{
            const errorRes = new Error("You are not authorized to do this action")
            errorRes.status = 403
            return next(errorRes)
        }
    } catch (error) {
        const errorRes = new Error("Internal Server Error")
        errorRes.status = 500
        console.log(error)
        next(errorRes)
    }
}

const postChecklist = async (req, res, next) => {
    try {
        const email = req.email
        const [user] = await modelUsers.findByEmail(email)

        if(user){
            const {name} = req.body
            const result = await modelChecklist.postChecklist({name})
            res.json({
                status: 200,
                result,
                message: "new checklist has been successfully made"
            })
        } else{
            const errorRes = new Error("You are not authorized to do this action")
            errorRes.status = 403
            return next(errorRes)
        }
    } catch (error) {
        const errorRes = new Error("Internal Server Error")
        errorRes.status = 500
        console.log(error)
        next(errorRes)
    }
}

const deleteChecklist = async (req, res, next) => {
    try {
        const email = req.email
        const [user] = await modelUsers.findByEmail(email)

        if(user){
            const {id} = req.params
            const result = await modelChecklist.deleteChecklist(id)
            res.json({
                status: 200,
                result,
                message: "a checklist has been successfully made"
            })
        } else{
            const errorRes = new Error("You are not authorized to do this action")
            errorRes.status = 403
            return next(errorRes)
        }
    } catch (error) {
        const errorRes = new Error("Internal Server Error")
        errorRes.status = 500
        console.log(error)
        next(errorRes)
    }
}


module.exports = {
    getChecklists,
    postChecklist,
    deleteChecklist
}