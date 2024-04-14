import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import styles from './Table.module.css';

const columns = [
  { id: 'company', label: 'Company', minWidth: 170 },
  { id: 'symbol', label: 'Symbol', minWidth: 100 },
  {
    id: 'price',
    label: 'Price',
    minWidth: 100
  },
  {
    id: 'high',
    label: 'High',
    minWidth: 100
  },
  {
    id: 'low',
    label: 'Low',
    minWidth: 100
  },
  {
    id: 'open',
    label: 'Open',
    minWidth: 100
  },
  {
    id: 'close',
    label: 'Close',
    minWidth: 100
  },
];


const rows = [
  { company: 'Apple Inc.', symbol: 'AAPL', price: 150.25, high: 152.40, low: 148.60, open: 149.50, close: 150.75},
  { company: 'Microsoft Corporation', symbol: 'MSFT', price: 305.75, high: 310.20, low: 302.50, open: 304.00, close: 306.50},
  { company: 'Amazon.com, Inc.', symbol: 'AMZN', price: 3200.50, high: 3225.75, low: 3185.25, open: 3195.00, close: 3202.50},
  { company: 'Alphabet Inc. (Google)', symbol: 'GOOGL', price: 2800.00, high: 2825.50, low: 2785.75, open: 2795.00, close: 2805.50},
  { company: 'Facebook, Inc.', symbol: 'FB', price: 330.80, high: 335.25, low: 327.50, open: 329.00, close: 332.00},
  { company: 'Tesla, Inc.', symbol: 'TSLA', price: 750.60, high: 755.80, low: 745.30, open: 747.50, close: 752.00},
  { company: 'Meta Platforms, Inc. (formerly Facebook)', symbol: 'META', price: 250.30, high: 255.50, low: 248.75, open: 249.50, close: 252.00},
  { company: 'NVIDIA Corporation', symbol: 'NVDA', price: 315.40, high: 320.75, low: 312.50, open: 314.00, close: 317.00},
  { company: 'JPMorgan Chase & Co.', symbol: 'JPM', price: 150.75, high: 152.20, low: 149.50, open: 150.00, close: 151.00},
  { company: 'Johnson & Johnson', symbol: 'JNJ', price: 175.80, high: 178.25, low: 173.50, open: 174.00, close: 177.00},
  { company: 'Visa Inc.', symbol: 'V', price: 200.25, high: 202.40, low: 198.60, open: 199.50, close: 201.00},
  { company: 'Walmart Inc.', symbol: 'WMT', price: 140.50, high: 142.75, low: 138.25, open: 139.00, close: 141.00},
  { company: 'Procter & Gamble Company', symbol: 'PG', price: 135.60, high: 137.20, low: 134.00, open: 134.50, close: 136.00},
  { company: 'Verizon Communications Inc.', symbol: 'VZ', price: 55.75, high: 56.20, low: 55.00, open: 55.25, close: 55.50},
  { company: 'Coca-Cola Company', symbol: 'KO', price: 60.30, high: 61.00, low: 59.50, open: 60.00, close: 60.50},
  { company: 'Pfizer Inc.', symbol: 'PFE', price: 45.20, high: 46.00, low: 44.80, open: 45.00, close: 45.50},
  { company: 'The Home Depot, Inc.', symbol: 'HD', price: 320.90, high: 325.00, low: 318.50, open: 319.00, close: 322.00},
  { company: 'Cisco Systems, Inc.', symbol: 'CSCO', price: 55.40, high: 56.00, low: 54.80, open: 55.00, close: 55.50},
  { company: 'Intel Corporation', symbol: 'INTC', price: 50.75, high: 51.20, low: 50.00, open: 50.25, close: 51.00},
  { company: 'Bank of America Corporation', symbol: 'BAC', price: 40.60, high: 41.00, low: 40.25, open: 40.40, close: 40.80},
  { company: 'AT&T Inc.', symbol: 'T', price: 25.30, high: 25.50, low: 25.00, open: 25.10, close: 25.40},
  { company: 'Abbott Laboratories', symbol: 'ABT', price: 120.80, high: 122.00, low: 119.50, open: 120.00, close: 121.00},
  { company: 'Adobe Inc.', symbol: 'ADBE', price: 600.25, high: 605.50, low: 597.80, open: 599.00, close: 602.00},
  { company: 'Exxon Mobil Corporation', symbol: 'XOM', price: 65.20, high: 66.00, low: 64.50, open: 64.75, close: 65.50},
];

function StickyTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }} className={styles.paper}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  className = {styles.cell}
                  style={{ minWidth: column.minWidth}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} className={styles.tableCell}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className={styles.pagination}
      />
    </Paper>
  );
};

export default StickyTable;