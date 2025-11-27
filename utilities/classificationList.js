// utilities/classificationList.js

const invModel = require("../models/inventory-model")

module.exports = async function (classification_id = null) {
  let data = await invModel.getClassifications()
  let list = `<select name="classification_id" id="classificationList" required>`
  list += `<option value="">Choose a Classification</option>`

  data.rows.forEach((row) => {
    list += `<option value="${row.classification_id}"`

    if (classification_id != null &&
        row.classification_id == classification_id)
      list += " selected "

    list += `>${row.classification_name}</option>`
  })

  list += "</select>"
  return list
}
