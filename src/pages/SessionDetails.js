import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function SessionDetails() {
  // State variables to store user data
  const [userData, setUserData] = useState(null);

  const history = useHistory();

  const handleLogout = () => {
    history.push('/dean');
  }

  useEffect(() => {
    // Retrieve user data from local storage
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setUserData(userData);
    }
  }, []);

  // Get the current date and time
  const currentDate = new Date();
  const currentTime = currentDate.getHours() * 60 + currentDate.getMinutes(); // Current time in minutes since midnight

  // Filter sessions based on the current date and time
  const filteredSessions = userData
    ? userData.filter((userDataItem) => {
        // Parse the selected date and time from the userDataItem
        const selectedDateParts = userDataItem.selectedDate.split(' ');
        const selectedDay = parseInt(selectedDateParts[0], 10);
        const selectedMonth = selectedDateParts[1];
        const selectedYear = currentDate.getFullYear(); // Use the current year for comparison

        // Create a new date object for the selected date and time
        const selectedDate = new Date(`${selectedMonth} ${selectedDay}, ${selectedYear} ${userDataItem.selectedTime}`);
        const selectedTime = selectedDate.getHours() * 60 + selectedDate.getMinutes(); // Selected time in minutes since midnight

        // Compare the selectedDate and selectedTime with the current date and time
        return selectedDate > currentDate || (selectedDate.getDate() === currentDate.getDate() && selectedTime > currentTime);
      })
    : [];

  return (
    <div className='container'>
      <div className='session-form'>
        <button className='logout' onClick={handleLogout}>Logout</button>
      <h2 className='heading'>Pending session</h2>
      {userData ? (
        <div className='message'>
          {filteredSessions.length > 0 ? (
            filteredSessions.map((userDataItem, index) => (
              <p key={index}>{`${userDataItem.userId} booked ${userDataItem.selectedDate} and ${userDataItem.selectedTime}`}</p>
            ))
          ) : (
            <p>No pending sessions found.</p>
          )}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
    </div>
  );
}

export default SessionDetails;








