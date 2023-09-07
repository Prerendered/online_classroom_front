import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ViewTopic from './topic_popups';

const rows = [
{id:1 , name:'Mathematics'},
{id:2 , name:'English'},
{id:3 , name:'History'},
{id:4 , name:'Science'},
{id:5 , name:'Geography'},
{id:6 , name:'French'},
];

//table containing the subject that the students can get access to
const SubjectsTable = () => {

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <TableContainer component={Paper} style={{
            alignItems: 'center',
            float: 'left',
            padding: '5%',
            margin: '0.2%',
            borderRadius: 10,
            height: '93%',
          }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={{
                                fontSize: '2rem',
                                fontWeight: 'bold',
                            }}>Your Courses
                        </TableCell>
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
                            <TableCell align="right">

                                <Button variant="outlined" onClick={handleClickOpen}>Choose Topics</Button>

                                    <Dialog
                                        maxWidth='md'
                                        fullWidth={true}
                                        fullScreen={fullScreen}
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="responsive-dialog-title"
                                        BackdropProps={{
                                            style: {
                                                backgroundColor: 'rgba(0, 0, 0, 0.25)' // set the background opacity when dialog is up
                                            }
                                        }}
                                    >
                                        <DialogTitle id="responsive-dialog-title" style={{fontWeight:'bold', fontSize:'2rem'}}>
                                            {"Topics:"}
                                        </DialogTitle>
                                        <DialogContent>
                                            <ViewTopic />
                                        </DialogContent>
                                        <DialogActions>
                                        <Button autoFocus onClick={handleClose}>
                                            Close
                                        </Button>
                                        </DialogActions>
                                    </Dialog>
                            
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
            </Table>
        </TableContainer>

    )
};

export default SubjectsTable;
