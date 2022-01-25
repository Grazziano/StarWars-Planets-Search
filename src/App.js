import React from 'react';
import './App.css';
import Table from './components/Table/Table';
import Title from './components/Title/Title';
import TableProvider from './context/TableProvider';

function App() {
  return (
    <TableProvider>
      <Title title="Star Wars - Planets" />
      <Table />
    </TableProvider>
  );
}

export default App;
