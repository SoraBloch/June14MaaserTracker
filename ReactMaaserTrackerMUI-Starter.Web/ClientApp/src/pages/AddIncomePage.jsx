import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Autocomplete, Typography } from '@mui/material';
import dayjs from 'dayjs';

const AddIncomePage = () => {
    const navigate = useNavigate();

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [sources, setSources] = useState([]);
    const [source, setSource] = useState('');
    const [amount, setAmount] = useState();

    useEffect(() => {
        getSources();
    }, []);

    const getSources = async () => {
        const { data } = await axios.get('/api/income/getallsources');
        setSources(data);
    }

    const onAddIncomeClick = async () => {
        await axios.post(`/api/income/addincome`, { sourceName: source, amount, date: selectedDate });
        navigate('/income');
    }

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '80vh' }}>
            <Typography variant="h2" component="h1" gutterBottom>
                Add Income
            </Typography>
            <Autocomplete
                options={sources}
                getOptionLabel={(option) => option.name}
                fullWidth
                margin="normal"
                renderInput={(params) => <TextField {...params} label="Source" variant="outlined" />}
                onChange={(e, option) => setSource(option.name)}
            />
            <TextField
                label="Amount"
                variant="outlined"
                type="number"
                InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                fullWidth
                margin="normal"
                onChange={e => setAmount(e.target.value)}
            />
             <TextField
                label="Date"
                type="date"
                value={dayjs(selectedDate).format('YYYY-MM-DD')}
                onChange={e => setSelectedDate(e.target.value)}
                renderInput={(params) => <TextField {...params} fullWidth margin="normal" variant="outlined" />}
            />
            <Button onClick={onAddIncomeClick} variant="contained" color="primary">Add Income</Button>
        </Container>
    );
}

export default AddIncomePage;
