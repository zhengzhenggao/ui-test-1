import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableProps,
  TableRow,
} from '@mui/material';
import React from 'react';

export type StyledTableProps<T> = {
  name: string;
  headers: string[];
  dataMatchHeaders: string[];
  data: Array<T>;
} & TableProps;

export const StyledTable = <T,>(props: StyledTableProps<T>) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Index</TableCell>
            {props.headers.map((eachHeader, index) => {
              return (
                <TableCell key={`${props.name}_header_index_${index}`} align='left'>
                  {eachHeader}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((eachRow, index) => {
            return (
              <TableRow
                key={`${props.name}_row_index_${index}`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align='left'>{index + 1}</TableCell>

                {props.dataMatchHeaders.map((eachData, index) => {
                  const tEachRow = eachRow as T as Record<string, unknown>;
                  return (
                    <TableCell align='left' key={`${props.name}_data_index_${index}`}>
                      {tEachRow[eachData as keyof Record<string, unknown>] as string}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
