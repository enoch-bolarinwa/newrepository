const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {

  // FIX: define data BEFORE logging it
  let data = await invModel.getClassifications()
  console.log(data) // now this works

  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'

  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })

  list += "</ul>"
  return list
}

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid = '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

utilities.buildVehicleDetailHTML = function (data) {
  const price = data.inv_price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  const miles = data.inv_miles.toLocaleString("en-US");

  return `
    <section class="vehicle-detail">
      <div class="vehicle-detail__image">
        <img src="${data.inv_image}" alt="Image of ${data.inv_make} ${data.inv_model}">
      </div>

      <div class="vehicle-detail__content">
        <h2>${data.inv_make} ${data.inv_model} (${data.inv_year})</h2>

        <p class="price">Price: <strong>${price}</strong></p>
        <p><strong>Mileage:</strong> ${miles} miles</p>
        <p><strong>Color:</strong> ${data.inv_color}</p>
        <p><strong>Description:</strong> ${data.inv_description}</p>
      </div>
    </section>
  `;
};


module.exports = Util
