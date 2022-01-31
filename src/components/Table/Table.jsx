import React, { useContext } from 'react';
import TableContext from '../../context/TableContext';
import './Table.css';
import TableHead from './TableHead';

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
    handleColumnChange,
    handleOrderChange,
    handleTableOrder,
  } = useContext(TableContext);

  // const { name } = userTyping.filters.filterByName;
  const { filterByName: { name }, order: { sort, column: col } } = userTyping.filters;
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
  }).sort((planA, planB) => {
    const op = { numeric: true };
    if (sort === 'ASC') {
      return new Intl.Collator(undefined, op).compare(planA[col], planB[col]);
    }
    if (sort === 'DESC') {
      return new Intl.Collator(undefined, op).compare(planB[col], planA[col]);
    }
    return 0;
  });

  // console.log(multipleFilter.sort((a, b) => {
  //   if (a[column] < b[column]) {
  //     return -1;
  //   }
  //   if (a[column] > b[column]) {
  //     return 1;
  //   }
  //   return 0;
  // }));

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

      <select name="" id="" data-testid="column-sort" onChange={ handleColumnChange }>
        {
          data.map((planet, index) => {
            const plan = Object.keys(planet)
              .filter((planetName) => planetName !== 'residents')[index];
            // console.log(plan);
            return <option key={ index } value={ plan }>{ plan }</option>;
          })
        }
      </select>

      <label htmlFor="ASC">
        ASC
        <input
          type="radio"
          data-testid="column-sort-input-asc"
          value="ASC"
          id="ASC"
          name="radio-order"
          onChange={ handleOrderChange }
        />
      </label>
      <label htmlFor="DESC">
        DESC
        <input
          type="radio"
          data-testid="column-sort-input-desc"
          value="DESC"
          id="DESC"
          name="radio-order"
          onChange={ handleOrderChange }
        />
      </label>

      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ handleTableOrder }
      >
        Order
      </button>

      <table className="Table">
        <TableHead />
        <tbody>
          {multipleFilter.map((planet, key) => (
            <tr key={ key }>
              <td data-testid="planet-name">{ planet.name }</td>
              {
                Object.keys(planet).slice(1).map((k) => <td key={ k }>{ planet[k] }</td>)
              }
            </tr>
          ))}
          {/* {
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
          } */}
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
