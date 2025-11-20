// utilities/index.js
function formatVehicleHTML(vehicle) {
  const price = vehicle.price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  })
  const mileage = vehicle.mileage.toLocaleString("en-US")

  return `
    <div class="vehicle-detail">
      <div class="vehicle-image">
        <img src="${vehicle.image}" alt="${vehicle.make} ${vehicle.model}" />
      </div>
      <div class="vehicle-info">
        <h1>${vehicle.year} ${vehicle.make} ${vehicle.model}</h1>
        <p><strong>Price:</strong> ${price}</p>
        <p><strong>Mileage:</strong> ${mileage} miles</p>
        <p><strong>Color:</strong> ${vehicle.color}</p>
        <p><strong>Transmission:</strong> ${vehicle.transmission}</p>
        <p><strong>Drivetrain:</strong> ${vehicle.drivetrain}</p>
      </div>
    </div>
  `
}

module.exports = { formatVehicleHTML }
