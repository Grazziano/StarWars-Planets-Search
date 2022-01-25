import React from 'react';
import './App.css';
import Table from './components/Table/Table';
import TableProvider from './context/TableProvider';

function App() {
  return (
    <TableProvider>
      <Table />
    </TableProvider>
  );
}

export default App;
