// utilities/nav.js

const pool = require("../database")

async function buildNav() {
  const data = await pool.query("SELECT * FROM classification ORDER BY classification_name")

  let nav = `<ul class="nav">`

  data.rows.forEach(row => {
    nav += `<li><a href="/inv/type/${row.classification_id}">${row.classification_name}</a></li>`
  })

  nav += `</ul>`

  return nav
}

module.exports = { buildNav }
