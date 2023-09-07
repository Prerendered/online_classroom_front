import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// this needs to change according to subjects
const rows = [
{id:1 , name:'Sum'},
{id:2 , name:'Substraction'},
{id:3 , name:'Multiplication'},
{id:4 , name:'Division'},
{id:5 , name:'Factors'},
{id:6 , name:'Perimeter'},
{id:7 , name:'Area'},
{id:8 , name:'Ratio'},
];

//table containing the topics that the students can get access to
//topics lead student to videos
const viewTopic = () => {

    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();

    //this redirects to the video page.
    //need to change video according to topic
    //seems like add an id to the browser page would fix, e.g, if topic is sum, browser is /view-video/sum
    const handleClickOpen = () => {
        navigate('/view-video');
    };

    // const handleClose = () => {
    //     setOpen(false);
    // };

    return (
        <TableContainer component={Paper} style={{
            alignItems: 'center',
            padding: '5%',
            borderRadius: '10',
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
                                <Button variant="outlined" onClick={handleClickOpen}>View Video</Button>                           
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
            </Table>
        </TableContainer>

    )
};

export default viewTopic;
