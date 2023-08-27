import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';



const rows = [{id:1 , name:'Mathematics'},
{id:2 , name:'English'},
{id:3 , name:'History'},
{id:4 , name:'Science'},
{id:5 , name:'Geography'},
{id:6 , name:'French'},
];


const SubjectsTable = () => {
    return (
        <TableContainer component={Paper} style={{
            float: 'left',
            margin: '10px',
            borderRadius: 10,
          }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={{
        fontSize: '2rem',
        fontWeight: 'bold',
      }}>Your Courses</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell style={{
        fontSize: '1.5rem',
        fontWeight: 'bold'
      }} component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="right"><Button variant="outlined">Watch Videos</Button></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
            </Table>
        </TableContainer>

    )
};

export default SubjectsTable;