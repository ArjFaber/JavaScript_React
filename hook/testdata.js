const data = require('./Data/data.json');
arrayOfObjects = Object.values(data);

const searchString = "147844"; // The string you want to search for (case-insensitive)

const filteredResults = arrayOfObjects.filter(obj => {
  // Customize the filter logic for different property types
  return Object.values(obj).some(value =>
    typeof value === 'string' && value.toLowerCase().includes(searchString.toLowerCase())
    
  );
});

console.log(filteredResults);
