const connection = require("../config/db")

const getChecklists = (email) => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM checklist", (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(error)
        }
      })
    })
  }

  const postChecklist = (data) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO checklist set ?", data, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(error)
        }
      })
    })
  }

  const deleteChecklist = (id) => {
    return new Promise((resolve, reject) => {
      connection.query("DELETE FROM checklist WHERE id = ?", id, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(error)
        }
      })
    })
  }

  module.exports = {
    getChecklists,
    postChecklist,
    deleteChecklist
}