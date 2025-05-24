import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import AttendanceTracker from './AttendanceTracker';
import AttendanceFilter from '../components/admin/AttendanceFilter';

import TicketsComponent from '../components/admin/TicketsComponent';
import TravelRequest from '../components/admin/TravelRequest';



const ReportsComponent = () => (
  <Box sx={{ p: 3, border: '1px dashed #ccc', mt: 2 }}>
    <Typography variant="h6" color="purple.main">Reports Content</Typography>
    <Typography>This is where the content for the Reports section will go.</Typography>
  </Box>
);

const FacilityPage = () => {
  const [activeTab, setActiveTab] = useState('attendance');

  const renderContent = () => {
    switch (activeTab) {
      case 'attendance':
        return <AttendanceFilter />;
      case 'tickets':
        return <TicketsComponent />;
      case 'travel request':
        return <TravelRequest />;
      default:
        return <AttendanceTracker />;
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        p: 3,
        // bgcolor: '#f3e5f5', // light purple background
        minHeight: '80vh',
        width: '100%',
      }}
    >
      <Stack
        spacing={2}
        direction="row"
        justifyContent="left"
        sx={{ mb: 3, flexWrap: 'wrap' }}
      >
        <Button
          variant={activeTab === 'attendance' ? 'contained' : 'outlined'}
          sx={{
            color: activeTab === 'attendance' ? '#fff' : '#6a1b9a',
            bgcolor: activeTab === 'attendance' ? '#6a1b9a' : 'transparent',
            borderColor: '#6a1b9a',
            '&:hover': {
              bgcolor: '#7b1fa2',
              color: '#fff',
            },
          }}
          onClick={() => setActiveTab('attendance')}
        >
          Attendance Track
        </Button>

        <Button
          variant={activeTab === 'tickets' ? 'contained' : 'outlined'}
          sx={{
            color: activeTab === 'tickets' ? '#fff' : '#6a1b9a',
            bgcolor: activeTab === 'tickets' ? '#6a1b9a' : 'transparent',
            borderColor: '#6a1b9a',
            '&:hover': {
              bgcolor: '#7b1fa2',
              color: '#fff',
            },
          }}
          onClick={() => setActiveTab('tickets')}
        >
          All Tickets
        </Button>

        <Button
          variant={activeTab === 'reports' ? 'contained' : 'outlined'}
          sx={{
            color: activeTab === 'reports' ? '#fff' : '#6a1b9a',
            bgcolor: activeTab === 'reports' ? '#6a1b9a' : 'transparent',
            borderColor: '#6a1b9a',
            '&:hover': {
              bgcolor: '#7b1fa2',
              color: '#fff',
            },
          }}
          onClick={() => setActiveTab('travel request')}
        >
         Travel Request
        </Button>
      </Stack>

      <Divider sx={{ width: '100%', mb: 3, borderColor: '#ce93d8' }} />

      <Box sx={{ width: '100%' }}>
        {renderContent()}
      </Box>
    </Box>
  );
};

export default FacilityPage;
