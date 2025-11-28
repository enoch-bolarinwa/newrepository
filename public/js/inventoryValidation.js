document.getElementById("inventoryForm")
  .addEventListener("submit", function (e) {

  const year = document.querySelector("[name='inv_year']")
  const price = document.querySelector("[name='inv_price']")
  const miles = document.querySelector("[name='inv_miles']")

  if (year.value < 1900 || year.value > 2100) {
    alert("Enter a valid year.")
    e.preventDefault()
  }

  if (price.value <= 0) {
    alert("Enter a valid price.")
    e.preventDefault()
  }

  if (miles.value < 0) {
    alert("Miles cannot be negative.")
    e.preventDefault()
  }
})
