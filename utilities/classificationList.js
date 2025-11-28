// utilities/classificationList.js

const pool = require("../database")

module.exports = async function (classification_id = null) {
  const data = await pool.query("SELECT * FROM classification ORDER BY classification_name")

  let list = `<select name="classification_id" id="classificationList" required>`
  list += `<option value="">Choose a Classification</option>`

  data.rows.forEach((row) => {
    list += `<option value="${row.classification_id}"`

    if (classification_id != null && row.classification_id == classification_id) {
      list += " selected"
    }

    list += `>${row.classification_name}</option>`
  })

  list += "</select>"

  return list
}
