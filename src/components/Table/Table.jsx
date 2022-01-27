import React, { useContext } from 'react';
import TableContext from '../../context/TableContext';
import './Table.css';

const columnFilterOptions = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
];

const comparisonFilterOptions = ['maior que', 'menor que', 'igual a'];

const Table = () => {
  const {
    data,
    userTyping,
    handleChange,
    handleDropdownChange,
    filterDropdown,
    dropdown,
  } = useContext(TableContext);

  const { name } = userTyping.filters.filterByName;
  const filterPlanets = data.filter((planet) => planet.name.includes(name));

  const { column, comparison, value } = dropdown;

  const multipleFilter = filterPlanets.filter((planet) => {
    const { filterByNumericValues } = userTyping.filters;

    if (filterByNumericValues.length === 0) return true;
    // console.log(filterByNumericValues);

    const newPlanet = Number(planet[column]);
    const newValue = Number(value);

    const filters = {
      'maior que': newPlanet > newValue,
      'menor que': newPlanet < newValue,
      'igual a': newPlanet === newValue,
    };

    // console.log(filters[comparison]);

    return filters[comparison];
  });

  return (
    <>
      <form className="form">
        <input
          className="input-text"
          data-testid="name-filter"
          type="text"
          placeholder="Filter by name..."
          onChange={ (event) => handleChange(event) }
        />
      </form>

      <form action="">
        <select
          name=""
          id="column"
          data-testid="column-filter"
          onChange={ handleDropdownChange }
        >
          {
            columnFilterOptions.map((option) => (
              <option key={ option } value={ option }>{ option }</option>
            ))
          }
        </select>

        <select
          name=""
          id="comparison"
          data-testid="comparison-filter"
          onChange={ handleDropdownChange }
        >
          {
            comparisonFilterOptions.map((option) => (
              <option key={ option } value={ option }>{ option }</option>
            ))
          }
        </select>

        <input
          type="number"
          name=""
          id="value"
          data-testid="value-filter"
          defaultValue={ 0 }
          onChange={ handleDropdownChange }
        />

        <button
          type="button"
          data-testid="button-filter"
          onClick={ filterDropdown }
        >
          Find
        </button>
      </form>

      <table className="Table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          {
            multipleFilter.map((planet, index) => (
              <tr key={ `${planet}-${index}` }>
                {
                  // console.log(Object.values(planet))
                  // console.log(Object.keys(planet))
                  Object.keys(planet)
                    .filter((key) => key !== 'residents')
                    .map((plan) => <td key={ plan }>{ planet[plan] }</td>)
                }
              </tr>
            ))
          }
          {/* {
            filterPlanets.map((planet, index) => (
              <tr key={ index }>
                <td>{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films}</td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
              </tr>
            ))
          } */}
        </tbody>
      </table>
    </>
  );
};

export default Table;
