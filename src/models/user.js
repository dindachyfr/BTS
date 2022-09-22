const connection = require("../config/db")

const findByEmail = (email) => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM user WHERE email = ?", email, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(error)
        }
      })
    })
  }
  
  const register = (data) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO user SET ?", data, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(error)
        }
      })
    })
  }
  
  module.exports = {
    findByEmail,
    register
  }