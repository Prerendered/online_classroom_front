import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

// change these to take data from db
const rows_Maths = [
  {id:1 , name:'Sum'},
  {id:2 , name:'Substraction'},
  {id:3 , name:'Multiplication'},
  {id:4 , name:'Division'},
  {id:5 , name:'Factors'},
  {id:6 , name:'Perimeter'},
  {id:7 , name:'Area'},
  {id:8 , name:'Ratio'},
];

const rows_Eng = [
  {id:1 , name:'Grammar'},
  {id:2 , name:'Vocabulary'},
  {id:3 , name:'Verbs'},
  {id:4 , name:'Active Voice'},
  {id:5 , name:'Passive Voice'},
];

const ViewTopic = ({ subjectName }) => {

  let rows;

  // Determine which set of topics to use based on the subjectName prop
  switch(subjectName) {
    case 'Mathematics':
      rows = rows_Maths;
      break;
    case 'English':
      rows = rows_Eng;
      break;
    default:
      rows = [];  // Empty array or you could have a default set of topics
  }

  const navigate = useNavigate();

  // this takes the name of the subject and passes it as the url.
  const handleClickOpen = (name) => {
    navigate(`/view-video/${name}`);
  };

  return (
    <TableContainer component={Paper} style={{
      alignItems: 'center',
      padding: '5%',
      borderRadius: 10,
    }}>
      <Table>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
              <TableCell style={{
                fontSize: '1rem',
              }} component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">
                <Button variant="outlined" onClick={() => handleClickOpen(row.name)}>View Video</Button>                           
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
};

export default ViewTopic;
