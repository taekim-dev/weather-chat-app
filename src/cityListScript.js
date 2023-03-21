const fs = require('fs');

// Read the original JSON file
const rawData = fs.readFileSync('city.list.json');
const cityList = JSON.parse(rawData);

// Filter out unnecessary data and create a new city list
const filteredCityList = cityList.map(city => ({
  id: city.id,
  name: city.name,
  country: city.country,
}));

// Write the filtered city list to a new JSON file
fs.writeFileSync('filteredCityList.json', JSON.stringify(filteredCityList, null, 2));
