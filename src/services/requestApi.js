const requestApi = async () => {
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const result = await fetch(url);
  const json = await result.json();
  return json.results;
};

export default requestApi;
