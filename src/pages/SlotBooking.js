import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';


function SlotBooking() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [dateButtons, setDateButtons] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false); 

    const history = useHistory();

    const handleLeftButtonClick = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() - 7);
        setCurrentDate(newDate);
    };

    const handleRightButtonClick = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + 7);
        setCurrentDate(newDate);
    };

    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const weekday = date.toLocaleString('default', { weekday: 'short' });
        return `${day} ${month} ${weekday}`;
    };


    const handleDateClick = (date) => {
        const formattedDate = formatDate(date);

        // Retrieve the list of selected dates from localStorage
        const selectedDatesString = localStorage.getItem('selectedDates');
        const selectedDates = selectedDatesString ? JSON.parse(selectedDatesString) : [];

        // Check if the date has already been selected
        if (!selectedDates.includes(formattedDate)) {
            // Update the selectedDate state
            setSelectedDate(date);

            // Store the updated selected date in the list
            selectedDates.push(formattedDate);
            localStorage.setItem('selectedDates', JSON.stringify(selectedDates));
        }

        // Retrieve existing user data from localStorage
        const userDataString = localStorage.getItem('user');
        let userData = [];

        if (userDataString) {
            userData = JSON.parse(userDataString);
        }

        // Update the selectedDate for the logged-in user
        const userIndex = userData.findIndex((user) => !user.selectedDate);
        if (userIndex !== -1) {
            userData[userIndex].selectedDate = formattedDate;
            localStorage.setItem('user', JSON.stringify(userData));
        }
    };


    const handleTimeClick = (time) => {
        // Retrieve existing user data from localStorage
        const userDataString = localStorage.getItem('user');
        let userData = [];

        if (userDataString) {
            userData = JSON.parse(userDataString);
        }

        userData.forEach((user) => {
            if (!user.selectedTime) {
                // If user doesn't have a selectedDate yet, set it to the formattedDate
                user.selectedTime = time;
            }
        });

        // Store the updated user data in localStorage
        localStorage.setItem('user', JSON.stringify(userData));

        // Update the selectedTime state
        setSelectedTime(time);

        // Check if both date and time have been selected
        if (selectedDate && time) {
            // Show the confirmation message
            setShowConfirmation(true);

            // Automatically navigate to the '/student' page after a delay (e.g., 2 seconds)
            setTimeout(() => {
                history.push('/student');
            }, 2000); // 2000 milliseconds (2 seconds)
        }
    };
    

    useEffect(() => {
        const dateButtons = Array.from({ length: 2 }, (_, index) => {
            const date = new Date(currentDate);

            // Find the nearest upcoming Thursday
            while (date.getDay() !== 4) {
                date.setDate(date.getDate() + 1);
            }

            // If index is 1, add 1 day to get the following Friday
            if (index === 1) {
                date.setDate(date.getDate() + 1);
            }

            return date;
        });

        setDateButtons(dateButtons);
    }, [currentDate]);

    // Retrieve the list of selected dates from localStorage
    const selectedDatesString = localStorage.getItem('selectedDates');
    const selectedDates = selectedDatesString ? JSON.parse(selectedDatesString) : [];

    return (
        <>
            <div className='container'>
                <div className='date-form'>
                    <div className='button-container'>
                        <button className='start-btn' onClick={handleLeftButtonClick}>
                            <i aria-hidden="true">
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </i>
                        </button>
                        {dateButtons.map((date, index) => (
                            <button
                                key={index}
                                className={`start-btn ${selectedDate && selectedDate.getTime() === date.getTime() ? 'selected' : ''
                                    } ${selectedDates.includes(formatDate(date)) ? 'disabled' : ''}`}
                                onClick={() => {
                                    if (!selectedDates.includes(formatDate(date))) {
                                        handleDateClick(date);
                                    }
                                }}
                            >
                                {formatDate(date)}
                            </button>
                        ))}
                        <button className='start-btn' onClick={handleRightButtonClick}>
                            <i aria-hidden="true">
                                <FontAwesomeIcon icon={faChevronRight} />
                            </i>
                        </button>
                    </div>
                    <div className='button-container'>
                        <button
                            className={`start-button ${selectedTime === '10:00 AM' ? 'selected' : ''}`}
                            onClick={() => handleTimeClick('10:00 AM')}
                        >
                            10:00 AM
                        </button>
                    </div>
                    <div>
                        {selectedDate && selectedTime && (
                            <p>
                                You have selected {formatDate(selectedDate)} and {selectedTime}.
                            </p>
                        )}
                    </div>
                    {showConfirmation && (
                        <p>...</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default SlotBooking;


