import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageSourcesPage = () => {
    const [sources, setSources] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedSource, setSelectedSource] = useState({ name: '', id: 0 });
    const [editingSource, setEditingSource] = useState(null);

    useEffect(() => {
        getSources();
    }, []);

    const getSources = async () => {
        const { data } = await axios.get('/api/income/getallsources');
        setSources(data);
    }

    const handleOpen = (source) => {    
        if (source !== null) {
            setSelectedSource(source);
            setEditingSource(source);
        }
        else {
            setSelectedSource({ name: '', id: 0 });
            setEditingSource(null);
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedSource({ name: '', id: 0 });
        setEditingSource(null);
    };

    const handleAddEdit = async () => {
        if (editingSource) {
            setSources(sources.map(source => source === editingSource ? selectedSource : source));
            await axios.post(`/api/income/editsource`, { id: selectedSource.id, name: selectedSource.name });
        } else {
            setSources([...sources, selectedSource]);
            await axios.post(`/api/income/addsource?name=${selectedSource.name}`);
        }
        handleClose();
    };

    const handleDelete = async (source) => {
        await axios.post(`/api/income/deletesource`, source);
        setSources(sources.filter(s => s !== source));
    };

    return (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                <Button onClick={() => handleOpen(null)} variant="contained" color="primary" sx={{ minWidth: '200px' }}>
                    Add Source
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontSize: '18px' }}>Source</TableCell>
                            <TableCell align="right" sx={{ fontSize: '18px' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sources.map((source) => (
                            <TableRow key={source.id}>
                                <TableCell sx={{ fontSize: '18px' }}>{source.name}</TableCell>
                                <TableCell align="right" sx={{ fontSize: '18px' }}>
                                    <Button color="primary" variant="outlined" sx={{ margin: '0 5px' }} onClick={() => handleOpen(source)}>Edit</Button>
                                    <Button color="secondary" variant="outlined" sx={{ margin: '0 5px' }} onClick={() => handleDelete(source)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                <DialogTitle>{editingSource ? 'Edit Source' : 'Add Source'}</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" label="Source" type="text" fullWidth value={selectedSource.name} onChange={(e) => setSelectedSource({ name: e.target.value, id: selectedSource.id })} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddEdit} color="primary">
                        {editingSource ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default ManageSourcesPage;


