import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import firebase from "firebase/compat/app";
import { db } from "../firebase";

import { v4 as uuidv4 } from 'uuid'; // Import the uuid library for generating unique tokens


function Student() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  useEffect(() => {
    db.collection("users")
      .orderBy("createdAt")
      .limit(50)
      .onSnapshot((snapshot) => {
        const userData = snapshot.docs.map((doc) => doc.data());

        const { userId, password } = userData; // Assuming you want to use the first document's data
        setUserId(userId);
        setPassword(password);

      });
  }, []);
  const handleLogin = async (e) => {
    e.preventDefault();

    // Generate a unique token
    const token = uuidv4();

    const userData = {
      userId: userId,
      password: password,
      token: token,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    // Retrieve existing user data from localStorage or initialize an empty array
    const existingUserData = JSON.parse(localStorage.getItem('user')) || [];

    // Append the new user data to the existing data
    existingUserData.push(userData);

    try {
      await db.collection("users").add(userData);

      // Store user data and token in local storage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(existingUserData));

      setUserId("");
      setPassword("");

      history.push('/slot');

    } catch (error) {
      // Handle any errors that occur during submission
      console.error("Error adding user data to Firebase: ", error.message);
    }

  }


  return (
    <>
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="userId">User Id</label>
            <input
              type="userId"
              id="userId"
              name="userId"
              placeholder="Enter your User Id"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default Student;





