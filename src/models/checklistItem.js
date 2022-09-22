const connection = require("../config/db")

const getChecklistItem = () => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM checklistItem JOIN checklist ON (checklistItem.checklist_id = checklist.id)", (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const postChecklistItem = (data) => {
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO checklistItem set ?", data, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const getChecklistItemDetail = (checklistId, checklistItemId) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM checklistItem JOIN checklist ON (checklistItem.checklist_id = checklist.id) where checklistItem.checklist_id = ? and checklistItem.id = ?", [checklistId, checklistItemId], (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

//updateStatus
const updateStatus = (checklistId, checklistItemId, isChecked) => {
    return new Promise((resolve, reject) => {
        connection.query("UPDATE checklistItem set isChecked = ? WHERE id = ? and checklist_id = ?", [isChecked,checklistItemId, checklistId], (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const deleteChecklistItem = (checklistId, checklistItemId) => {
    return new Promise((resolve, reject) => {
        connection.query("DELETE from checklistItem WHERE id = ? and checklist_id = ?", [checklistItemId, checklistId], (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

//renameChecklistItem
const renameChecklistItem = (checklistId, checklistItemId, itemName) => {
    return new Promise((resolve, reject) => {
        connection.query("UPDATE checklistItem set ? WHERE id = ? and checklist_id = ?", [itemName, checklistItemId, checklistId], (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}
module.exports = {
    getChecklistItem,
    postChecklistItem,
    getChecklistItemDetail,
    updateStatus,
    deleteChecklistItem,
    renameChecklistItem
}