import React, { useContext } from 'react';
import TableContext from '../../context/TableContext';
import './Table.css';

const Table = () => {
  const { data, userTyping, handleChange } = useContext(TableContext);
  const { name } = userTyping.filters.filterByName;
  const filterPlanets = data.filter((planet) => planet.name.includes(name));

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
          }
        </tbody>
      </table>
    </>
  );
};

export default Table;
