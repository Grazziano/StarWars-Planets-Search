import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TableContext from './TableContext';
import requestApi from '../services/requestApi';

const TableProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [userTyping, setUserTyping] = useState({
    filters: {
      filterByName: { name: '' },
    },
  });

  const fetchPlanets = async () => {
    try {
      const results = await requestApi();
      setData([...results]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { target: { value } } = event;
    setUserTyping({
      filters: {
        ...userTyping.filters,
        filterByName: { name: value },
      },
    });
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  return (
    <TableContext.Provider value={ { data, userTyping, handleChange } }>
      { children }
    </TableContext.Provider>
  );
};

TableProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TableProvider;
