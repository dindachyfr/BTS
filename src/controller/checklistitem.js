const modelChecklistItem = require("../models/checklistItem.js")
const modelUsers = require("../models/user")

const getChecklistItem = async (req, res, next) => {
    try {
        const email = req.email
        const [user] = await modelUsers.findByEmail(email)

        if(user){
            const result = await modelChecklistItem.getChecklistItem()
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

const postChecklistItem = async (req, res, next) => {
    try {
        const email = req.email
        const [user] = await modelUsers.findByEmail(email)

        if(user){
            const {itemName} = req.body
            const {checklistId} = req.params
            const result = await modelChecklistItem.postChecklistItem({itemName, checklist_id: checklistId})
            res.json({
                status: 200,
                result,
                message: `new checklist item has been successfully added to checklist with id: ${checklistId}`
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

const getChecklistItemDetail = async (req, res, next) => {
    try {
        const email = req.email
        const [user] = await modelUsers.findByEmail(email)

        if(user){
            const {checklistId, checklistItemId} = req.params
            const [result] = await modelChecklistItem.getChecklistItemDetail(checklistId, checklistItemId)
            res.json({
                status: 200,
                result,
                message: `checklist item with id: ${checklistItemId} and checklistId: ${checklistId} has been successfully fetched`
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

const updateStatus = async (req, res, next) => {
    try {
        const email = req.email
        const [user] = await modelUsers.findByEmail(email)

        if(user){
            const {checklistId, checklistItemId} = req.params
            const [checklistItem] = await modelChecklistItem.getChecklistItemDetail(checklistId, checklistItemId)
            let isChecked
            checklistItem.status == '0' ? isChecked = '1' : '0'
            const result = await modelChecklistItem.updateStatus(checklistId, checklistItemId, isChecked)
            res.json({
                status: 200,
                result,
                message: `checklist item status with id: ${checklistItemId} and checklistId: ${checklistId} has been successfully updated`
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

const deleteChecklistItem = async (req, res, next) => {
    try {
        const email = req.email
        const [user] = await modelUsers.findByEmail(email)

        if(user){
            const {checklistId, checklistItemId} = req.params
            const result = await modelChecklistItem.deleteChecklistItem(checklistId, checklistItemId)
            res.json({
                status: 200,
                result,
                message: `checklist item status with id: ${checklistItemId} and checklistId: ${checklistId} has been successfully updated`
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

// renameChecklistItem
const renameChecklistItem = async (req, res, next) => {
    try {
        const email = req.email
        const [user] = await modelUsers.findByEmail(email)

        if(user){
            const {checklistId, checklistItemId} = req.params
            const {itemName} = req.body
            const result = await modelChecklistItem.renameChecklistItem(checklistId, checklistItemId, {itemName})
            res.json({
                status: 200,
                result,
                message: `checklist item itemName with id: ${checklistItemId} and checklistId: ${checklistId} has been successfully updated`
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
    getChecklistItem,
    postChecklistItem,
    getChecklistItemDetail,
    updateStatus,
    deleteChecklistItem,
    renameChecklistItem
}