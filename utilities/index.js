// utilities/index.js
function currencyFormatUSD(value) {
  if (value == null) return '—';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

function numberWithCommas(value) {
  if (value == null) return '—';
  return Number(value).toLocaleString('en-US');
}

/**
 * Build an HTML fragment for the vehicle details.
 * Returns a string of HTML.
 */
function buildVehicleDetailHTML(vehicle) {
  const price = currencyFormatUSD(vehicle.price);
  const mileage = numberWithCommas(vehicle.mileage);

  // If no fullsize_image_url provided, use a placeholder or the uploaded sample
  const imageUrl = vehicle.fullsize_image_url || '/images/placeholder-car.png';

  // Make sure to escape user content in a real app or pass data to EJS partials.
  return `
    <article class="vehicle-detail" aria-labelledby="vehicle-heading">
      <div class="vehicle-image">
        <img src="${imageUrl}" alt="${vehicle.year} ${vehicle.make} ${vehicle.model} full view" />
      </div>

      <div class="vehicle-info">
        <h1 id="vehicle-heading">${vehicle.year} ${vehicle.make} ${vehicle.model}</h1>
        <p class="vehicle-price">${price}</p>
        <ul class="vehicle-specs">
          <li><strong>Mileage:</strong> ${mileage} miles</li>
          <li><strong>Exterior Color:</strong> ${vehicle.exterior_color || 'Unknown'}</li>
          <li><strong>Interior Color:</strong> ${vehicle.interior_color || 'Unknown'}</li>
          <li><strong>Fuel Type:</strong> ${vehicle.fuel_type || 'Unknown'}</li>
          <li><strong>Drivetrain:</strong> ${vehicle.drivetrain || 'Unknown'}</li>
          <li><strong>Transmission:</strong> ${vehicle.transmission || 'Unknown'}</li>
          <li><strong>Stock #:</strong> ${vehicle.stock || 'N/A'}</li>
          <li><strong>VIN:</strong> ${vehicle.vin || 'N/A'}</li>
        </ul>

        <section class="vehicle-description" aria-label="Vehicle description">
          <h2>Description</h2>
          <p>${vehicle.description || 'No description available.'}</p>
        </section>
      </div>
    </article>
  `;
}

module.exports = {
  buildVehicleDetailHTML,
  currencyFormatUSD,
  numberWithCommas
};
