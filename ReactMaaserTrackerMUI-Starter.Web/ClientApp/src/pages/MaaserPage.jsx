import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const MaaserPage = () => {

    const [maaserPayments, setMaaserPayments] = useState([]);

    useEffect(() => {
        getMaaser();
    }, []);

    const getMaaser = async () => {
        const { data } = await axios.get('/api/maaser/getallmaaser');
        setMaaserPayments(data);
    }

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
      <Typography variant="h2" gutterBottom component="div">
        Maaser Payments History
      </Typography>
      <TableContainer component={Paper} sx={{ maxWidth: '80%', width: '80%' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: '18px' }}>Recipient</TableCell>
              <TableCell align="right" sx={{ fontSize: '18px' }}>Amount</TableCell>
              <TableCell align="right" sx={{ fontSize: '18px' }}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {maaserPayments.map((maaser) => (
              <TableRow key={maaser.id}>
                <TableCell component="th" scope="row" sx={{ fontSize: '18px' }}>
                  {maaser.recipient}
                </TableCell>
                <TableCell align="right" sx={{ fontSize: '18px' }}>${maaser.amount}</TableCell>
                <TableCell align="right" sx={{ fontSize: '18px' }}>{maaser.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default MaaserPage;
