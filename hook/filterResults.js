function filteredResults(data, searchString) {
    return data.filter(obj => {
      return Object.values(obj).some(value =>
        typeof value === 'string' && value.toLowerCase().includes(searchString.toLowerCase())
      );
    });
  }

export default filteredResults;