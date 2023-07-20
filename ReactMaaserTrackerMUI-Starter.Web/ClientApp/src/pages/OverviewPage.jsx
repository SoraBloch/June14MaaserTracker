import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Paper } from '@mui/material';

const OverviewPage = () => {
    const [totalIncome, setTotalIncome] = useState();
    const [totalMaaser, setTotalMaaser] = useState();
    const [maaserObligated, setMaaserObligated] = useState(0);
    const [remainingMaaser, setRemainingMaaser] = useState(0);


    useEffect(() => {
        const getData = async () => {
            await getTotalIncome();
            await getTotalMaaser();
            getMaaserObligated();
            getRemainingMaaser();
        }
        getData();
    }, []);

    const getTotalIncome = async () => {
        const { data } = await axios.get('/api/income/gettotalincome');
        setTotalIncome(data);
    }

    const getTotalMaaser = async () => {
        const { data } = await axios.get('/api/maaser/gettotalmaaser');
        setTotalMaaser(data);
    }

    const getMaaserObligated = () => {
        const maaserObligated = totalIncome / 10;
        setMaaserObligated(maaserObligated);
    }

    const getRemainingMaaser = () => {
        const remainingMaaser = maaserObligated - totalMaaser;
        console.log(remainingMaaser)
        if (remainingMaaser < 0) {
            setRemainingMaaser(0);
        }
        else {
            setRemainingMaaser(remainingMaaser);
        }
    }

    return (
        <Container
            maxWidth="md"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh',
                textAlign: 'center'
            }}
        >
            <Paper elevation={3} sx={{ padding: '120px', borderRadius: '15px' }}>
                <Typography variant="h2" gutterBottom>
                    Overview
                </Typography>
                <Box sx={{ marginBottom: '20px' }}>
                    <Typography variant="h5" gutterBottom>
                        Total Income: ${totalIncome}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        Total Maaser: ${totalMaaser}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="h5" gutterBottom>
                        Maaser Obligated: ${totalIncome/10}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        Remaining Maaser obligation: ${totalIncome / 10 - totalMaaser > 0 ? totalIncome / 10 - totalMaaser : 0}
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
}

export default OverviewPage;
