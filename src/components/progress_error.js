import * as React from 'react';
import { DataGrid, GridColDef} from '@mui/x-data-grid';
import ControlledSwitches from "./switch";
import Switch from '@mui/material/Switch';


const label = { inputProps: { 'aria-label': 'Switch demo' } };

const columns: GridColDef[] = [
    { field: 'week', headerName: 'Week', width: 200},
    { field: 'topic', headerName: 'Topic', width: 200},
    { field: 'online', headerName: 'Online', width: 200 },
    { field: 'class', headerName: 'In class', width: 200},

];

const rows = [
    { id: 1, week: 1, topic: 'Sum', online: <ControlledSwitches/>, class: <ControlledSwitches/> },
    { id: 2 , week: 2, topic: 'Addition', online: <Switch {...label} defaultChecked />, class: <ControlledSwitches/> },

];

export default function DataTable() {
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>
    );
}