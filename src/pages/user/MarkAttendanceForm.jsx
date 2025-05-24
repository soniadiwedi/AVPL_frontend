import React, { useState, useEffect } from "react";
import { baseUrl } from "../../utils/data";
import { useAuth } from "../../components/context/AuthContext";
import usePostQuery from "../../hooks/usePostQuery";

// Import Material UI components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import TextField from '@mui/material/TextField'; // Not directly used for the select
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress'; // For loading indicator
import Alert from '@mui/material/Alert'; // For error and success messages
import Snackbar from '@mui/material/Snackbar'; // To show messages temporarily

function MarkAttendanceForm() {
  const [status, setStatus] = useState("present");
  const { user } = useAuth();
  // Assuming usePostQuery handles baseUrl and endpoint correctly
  const { data, createPost, loading, error } = usePostQuery(`${baseUrl}/api/attendance/mark`);

  // State for managing Snackbar visibility
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info"); // 'success', 'error', 'warning', 'info'

  // Effect to show Snackbar when data or error changes
  useEffect(() => {
    if (data) {
      setSnackbarMessage(data.message || "Attendance marked successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } else if (error) {
 
      const errorMessage = error|| "An unexpected error occurred.";
      setSnackbarMessage(errorMessage);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  }, [data, error]); // Depend on data and error state changes

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous messages
    setSnackbarOpen(false);
    setSnackbarMessage("");
    // setSnackbarSeverity("info"); // Reset severity if needed

    if (!user || !user._id) {
      console.error("User is not authenticated or user ID is missing.");
      // Optionally show an error to the user via Snackbar
      setSnackbarMessage("User not authenticated. Please log in.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    const payload = {
      userId: user._id, // Ensure user._id is available
      status,
    };

    await createPost(payload);
    // Messages will be handled by the useEffect hook after createPost updates data or error
  };

  return (
    
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        // sx prop allows styling using theme values and CSS
        display: 'flex',
        flexDirection: 'column',
        gap: 2, // Adds space between form elements
        p: 3, // Padding
        border: '1px solid #ccc', // Simple border
        borderRadius: 2, // Rounded corners
        maxWidth: 400, // Limit form width
        margin: '20px auto', // Center the form
        bgcolor: 'background.paper', // Use theme background color
        boxShadow: 3, // Add a shadow for depth
      }}
      noValidate // Optional: disables browser's default validation
      autoComplete="off" // Optional: disables autocomplete
    >
      {/* Use Typography for headings */}
      <Typography variant="h6" component="h3" gutterBottom>
        Mark Attendance
      </Typography>

      {/* Use FormControl for grouping Label, Select, and HelperText */}
      <FormControl fullWidth disabled={loading}> {/* Disable form while loading */}
        <InputLabel id="attendance-status-label">Status</InputLabel>
        <Select
          labelId="attendance-status-label"
          id="attendance-status-select"
          value={status}
          label="Status" // Corresponds to the InputLabel
          onChange={(e) => setStatus(e.target.value)}
        >
          {/* Use MenuItem for select options */}
          <MenuItem value="present">Present</MenuItem>
          <MenuItem value="late">Late</MenuItem>
        </Select>
      </FormControl>

      {/* Use Button for the submit button */}
      <Button
        type="submit"
        variant="contained" // Styled button
        color="primary" // Use theme primary color
        disabled={loading} // Disable button while loading
        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null} // Show loading spinner
      >
        {loading ? 'Marking...' : 'Mark Attendance'}
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000} // Hide after 6 seconds
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} // Position at bottom center
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>


    </Box>
  );
}

export default MarkAttendanceForm;
