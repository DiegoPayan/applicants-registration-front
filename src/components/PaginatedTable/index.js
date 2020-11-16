import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';


import './paginatedTable.css';


export default function PaginatedTable(props) {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(props.rowsPerPage);
  const [value, setValue] = React.useState("");
  const [status, setStatus] = React.useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };
  const onEnter = (e) => {
    if (e.key === 'Enter') {
      props.onSearch(value)
    }
  }
  const onChange = (e) => {
    setValue(e.target.value)
  }
  const onChangeStatus = (e) => {
    setStatus(e.target.value)
    props.onSearchByStatus(e.target.value)
  }

  const onSearch = () => {
    props.onSearch(value)
  }

  let columns = props.columns || [];
  let data = props.data || [];

  return (
    <div>
      <div className="title-table">{props.title}
        {props.onSearchByStatus &&
          <select name="select" id="bystatus" className="txt-select" value={status}
            onChange={onChangeStatus}>
            {[{ value: "", label: "Todos", selected: true }, { value: "ACTIVO", label: "Activo" }, { value: "INACTIVO", label: "Inactivo" }].map((option) => (
              <option key={option.value} value={option.value} selected={option.selected}>
                {option.label}
              </option>
            ))}
          </select>}

        {props.onSearch && <div component="form" className="paper-ipt">
          <InputBase
            className=""
            placeholder="Buscar"
            value={value}
            onKeyDown={onEnter}
            onChange={onChange}
            inputProps={{ 'aria-label': 'Buscar' }}
          />
          <Divider className="" orientation="vertical" />

          <IconButton onClick={onSearch} type="submit" className="" aria-label="search">
            <SearchIcon />
          </IconButton>

        </div>}

      </div>
      <br />
      <div>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }} className="tableHead" >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, key) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={key}>
                    {columns.map((column) => {
                      return (
                        <TableCell id={row[column.id]} onClick={() => column.onClick && column.onClick(row)} style={{ width: column.width }} key={column.id} align={column.align} >
                          {row[column.id]}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {data.length > 0 && props.paginated &&
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            labelRowsPerPage='Filas por página'
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
          />
        }
      </div>
    </div>
  );
}
PaginatedTable.defaultProps = {
  rowsPerPage: 10
}