import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TableContext from './TableContext';
import requestApi from '../services/requestApi';

const TableProvider = ({ children }) => {
  const [data, setData] = useState([]);

  const fetchPlanets = async () => {
    try {
      const results = await requestApi();
      setData([...results]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  return (
    <TableContext.Provider value={ { data } }>
      { children }
    </TableContext.Provider>
  );
};

TableProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TableProvider;
