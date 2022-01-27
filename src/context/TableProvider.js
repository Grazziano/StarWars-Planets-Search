import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TableContext from './TableContext';
import requestApi from '../services/requestApi';

const TableProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [userTyping, setUserTyping] = useState({
    filters: {
      filterByName: { name: '' },
      filterByNumericValues: [],
    },
  });

  const [dropdown, setDropdown] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '0',
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
    const {
      target: { value },
    } = event;
    setUserTyping({
      filters: {
        ...userTyping.filters,
        filterByName: { name: value },
      },
    });
  };

  const handleDropdownChange = (event) => {
    const {
      target: { id, value },
    } = event;
    // console.log(id, value);
    setDropdown({
      ...dropdown,
      [id]: value,
    });
  };

  const filterDropdown = () => {
    // console.log('TESTE', dropdown);
    setUserTyping({
      filters: {
        ...userTyping.filters,
        filterByNumericValues: [
          ...userTyping.filters.filterByNumericValues,
          dropdown,
        ],
      },
    });
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  return (
    <TableContext.Provider
      value={ {
        data,
        userTyping,
        dropdown,
        handleChange,
        handleDropdownChange,
        filterDropdown,
        setDropdown,
      } }
    >
      {children}
    </TableContext.Provider>
  );
};

TableProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TableProvider;
