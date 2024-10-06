document.addEventListener('DOMContentLoaded', function() {
  const ipField = document.getElementById('ip');
  const countryField = document.getElementById('country');
  const ipTypeField = document.getElementById('ip-type');
  const flagField = document.getElementById('flag');

  // Mapping of country codes to full country names
  const countryNames = {
    "IN": "India",
    "US": "United States",
    "GB": "United Kingdom",
    // Add more countries as needed
  };

  // Fetch IP information from the API using your token
  fetch('https://ipinfo.io/json?token=4cc07ac45e4848')
    .then(response => response.json())
    .then(data => {
      const ip = data.ip;
      const countryCode = data.country;
      const org = data.org;

      // Update the UI with the fetched details
      ipField.textContent = ip;

      // Display the full country name using the country code
      const fullCountryName = countryNames[countryCode] || countryCode;  // Default to code if name not found
      countryField.textContent = fullCountryName;

      // Display the country flag
      flagField.innerHTML = `<img src="https://www.countryflags.io/${countryCode}/shiny/64.png">`;

      // Determine the IP type based on organization data
      let ipType = 'Unknown';
      if (org.toLowerCase().includes('vpn')) {
        ipType = 'VPN IP';
      } else if (org.toLowerCase().includes('business')) {
        ipType = 'Business IP';
      } else if (org.toLowerCase().includes('residential')) {
        ipType = 'Residential IP';
      } else if (org.toLowerCase().includes('datacenter')) {
        ipType = 'Datacenter IP';
      }

      ipTypeField.textContent = ipType;
    })
    .catch(error => {
      ipField.textContent = 'Error fetching IP';
      console.error(error);
    });
});
