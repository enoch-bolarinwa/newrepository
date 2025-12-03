/***********************************************
 * Account Model
 ***********************************************/
const db = require("../database"); // <-- adjust if your db file is in another folder

/* ============================================
   GET ACCOUNT BY ID
============================================ */
async function getById(account_id) {
  const sql = `
    SELECT *
    FROM account
    WHERE account_id = $1
  `;
  return db.oneOrNone(sql, [account_id]);
}


/* ============================================
   UPDATE ACCOUNT INFORMATION (firstname, lastname, email)
============================================ */
async function updateAccount(firstname, lastname, email, account_id) {
  const sql = `
    UPDATE account
    SET firstname = $1,
        lastname = $2,
        email = $3
    WHERE account_id = $4
    RETURNING *
  `;
  return db.oneOrNone(sql, [
    firstname,
    lastname,
    email,
    account_id
  ]);
}


/* ============================================
   UPDATE ACCOUNT PASSWORD (HASHED PASSWORD)
============================================ */
async function updatePassword(passwordHash, account_id) {
  const sql = `
    UPDATE account
    SET password = $1
    WHERE account_id = $2
    RETURNING *
  `;
  return db.oneOrNone(sql, [passwordHash, account_id]);
}


/* ============================================
   EXPORTS
============================================ */
module.exports = {
  getById,
  updateAccount,
  updatePassword
};
