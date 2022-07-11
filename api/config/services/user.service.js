const pool = require("../../config/database");

module.exports = {
  create: (data, callback) => {
    pool.query(
      "INSERT INTO Users SET?",
      {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        email: data.email,
        password: data.password,
      },
      (error, results, fields) => {
        if (error) return callback(error);
        return callback(null, results);
      }
    );
  },
  getUser: (callback) => {
    pool.query(
      "SELECT id, firstName, lastName, gender, email, password FROM Users",
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getUserById: (id, callback) => {
    pool.query(
      "SELECT id, firstName, lastName, gender, email, password FROM Users WHERE id = ?",
      [id],
      (error, results, fields) => {
        if (error) return callback(error);
        return callback(null, results);
      }
    );
  },
  updateUser: (id, data, callback) => {
    const values = [
      data.firstName,
      data.lastName,
      data.gender,
      data.email,
      data.password,
      id,
    ];
    pool.query(
      "UPDATE Users SET firstName=?, lastName=?, gender=?, email=?, password=? WHERE id=?",
      values,
      (error, results, fields) => {
        if (error) return callback(error);
        console.log(results);
        return callback(null, results);
      }
    );
  },
  deleteUser: (data, callback) => {
    pool.query(
      "DELETE FROM Users WHERE id = ?",
      [data],
      (error, results, fields) => {
        if (error) return callback(error);
        return callback(null, results[0]);
      }
    );
  },
  // login
  getUserByEmail: (email, callback) => {
    pool.query(
      "SELECT * FROM Users WHERE email = ?",
      [email],
      (error, results, fields) => {
        if (error) console.log(error);
        return callback(null, results)
      }
    )
  }
};
