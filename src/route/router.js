const express = require("express")
const { protect } = require("../middleware/authentication")
const userController = require("../controller/user.js")
const checklistController = require("../controller/checklist.js")
const checklistItemController = require("../controller/checklistitem.js")

const route = express.Router();

route
    .post("/login", userController.login)
    .post("/register", userController.register)
    //checklist
    .get("/checklist", protect, checklistController.getChecklists)
    .post("/checklist", protect, checklistController.postChecklist)
    .delete("/checklist/:id", protect, checklistController.deleteChecklist)
    //checklist item
    .get("/checklist/:checklistId/item", protect, checklistItemController.getChecklistItem)
    .post("/checklist/:checklistId/item", protect, checklistItemController.postChecklistItem)
    .get("/checklist/:checklistId/item/:checklistItemId", protect, checklistItemController.getChecklistItemDetail)
    .put("/checklist/:checklistId/item/:checklistItemId", protect, checklistItemController.updateStatus)
    .delete("/checklist/:checklistId/item/:checklistItemId", protect, checklistItemController.deleteChecklistItem)
    .get("/checklist/:checklistId/item/rename/:checklistItemId", protect, checklistItemController.renameChecklistItem)

module.exports = route;