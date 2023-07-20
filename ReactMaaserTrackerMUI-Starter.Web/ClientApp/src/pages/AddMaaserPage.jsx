import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const AddMaaserPage = () => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState();

    const onAddMaaserClick = async () => {
        if (recipient === '') {
            return;
        } else {
            await axios.post(`api/maaser/addmaaser`, { recipient, amount, date: selectedDate })
            navigate('/maaser');
        }
    }
    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '80vh' }}>
            <Typography variant="h2" component="h1" gutterBottom>
                Add Maaser
            </Typography>
            <TextField
                variant="outlined"
                fullWidth margin="normal"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                label="Recipient"
            />
            <TextField
                variant="outlined"
                fullWidth margin="normal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                label="Amount"
                type="number"
            />
            <TextField
                label="Date"
                type="date"
                value={dayjs(selectedDate).format('YYYY-MM-DD')}
                onChange={e => setSelectedDate(e.target.value)}
                renderInput={(params) => <TextField {...params} fullWidth margin="normal" variant="outlined" />}
            />
            <Button onClick={onAddMaaserClick} variant="contained" color="primary">Add Maaser</Button>
        </Container>
    );
}

export default AddMaaserPage;
