import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { TableHead } from '@material-ui/core';
import "./list.css";
export const TableList = (props) => {
  const { children, headers } = props;
  return (
    <TableContainer className="paper-list" >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map((item) => <TableCell key={item}>{item}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
         {children}
        </TableBody>
      </Table>
    </TableContainer>)
}