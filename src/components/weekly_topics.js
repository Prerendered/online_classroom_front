import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Switch, createTheme, ThemeProvider } from '@mui/material';


const theme = createTheme({
    palette: {
        primary: {
            main: '#00ADB5', // Purple color as primary
        },
        secondary: {
            main: '#00ADB5', // Green color as secondary
        },
    },
});

function SwitchCell({ value, rowId, field, handleSwitchToggle }) {
    return (
        <Switch
            checked={value}
            onChange={() => handleSwitchToggle(rowId, field)}
            inputProps={{ 'aria-label': 'Switch demo' }}
        />
    );
}

export default function DataTable() {
    const [switchStates, setSwitchStates] = React.useState({
        1: {
            online: false, // Set the initial state for online switch for row with id 1
            class: false, // Set the initial state for class switch for row with id 1
        },
        2: {
            online: true, // Set the initial state for online switch for row with id 2
            class: false, // Set the initial state for class switch for row with id 2
        },
        3: {
            online: false, // Set the initial state for online switch for row with id 3
            class: true, // Set the initial state for class switch for row with id 3
        },
        4: {
            online: true, // Set the initial state for online switch for row with id 4
            class: true, // Set the initial state for class switch for row with id 4
        },
        5: {
            online: false, // Set the initial state for online switch for row with id 5
            class: false, // Set the initial state for class switch for row with id 5
        },
        6: {
            online: true, // Set the initial state for online switch for row with id 6
            class: false, // Set the initial state for class switch for row with id 6
        },
        7: {
            online: false, // Set the initial state for online switch for row with id 7
            class: true, // Set the initial state for class switch for row with id 7
        },
        8: {
            online: true, // Set the initial state for online switch for row with id 8
            class: true, // Set the initial state for class switch for row with id 8
        },
        9: {
            online: false, // Set the initial state for online switch for row with id 9
            class: false, // Set the initial state for class switch for row with id 9
        },
        10: {
            online: true, // Set the initial state for online switch for row with id 10
            class: false, // Set the initial state for class switch for row with id 10
        },

    });

    function handleSwitchToggle(rowId, field) {
        setSwitchStates((prevSwitchStates) => ({
            ...prevSwitchStates,
            [rowId]: {
                ...prevSwitchStates[rowId],
                [field]: !prevSwitchStates[rowId][field],
            },
        }));
    }

    const columns: GridColDef[] = [
        { field: 'week', headerName: 'Week', width: 300, fontWeight: 'bold', fontSize: '40px' },
        { field: 'topic', headerName: 'Topic', width: 300 },
        {
            field: 'online',
            headerName: 'Online',
            width: 300,
            fontWeight: 'bold',
            renderCell: (params) => (
                <SwitchCell
                    value={switchStates[params.row.id].online}
                    rowId={params.row.id}
                    field="online"
                    handleSwitchToggle={handleSwitchToggle}
                />
            ),
        },
        {
            field: 'class',
            headerName: 'In class',
            width: 200,
            renderCell: (params) => (
                <SwitchCell
                    value={switchStates[params.row.id].class}
                    rowId={params.row.id}
                    field="class"
                    handleSwitchToggle={handleSwitchToggle}
                />
            ),
        },
    ];

    const rows = [
        { id: 1, week: 1, topic: 'Sum' },
        { id: 2, week: 2, topic: 'Addition' },
        { id: 3, week: 3, topic: 'Subtraction' },
        { id: 4, week: 4, topic: 'Multiplication' },
        { id: 5, week: 5, topic: 'Division' },
        { id: 6, week: 6, topic: 'Fractions' },
        { id: 7, week: 7, topic: 'Decimals' },
        { id: 8, week: 8, topic: 'Percentages' },
        { id: 9, week: 9, topic: 'Algebra' },
        { id: 10, week: 10, topic: 'Geometry' },

    ];

    return (
        <ThemeProvider theme={theme}>
            <div style={{ height: 500, width: '100%' }}>

                    <DataGrid sx={{ '& .MuiDataGrid-columnHeaderTitle':
                            { fontSize: '20px', fontWeight: 'bold' } }

                    }
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        checkboxSelection
                    />

            </div>
        </ThemeProvider>
    );
}