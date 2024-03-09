"use client"

import React, { useState } from 'react';
import styles from './signup.module.css'; // Ensure this is the correct path to your CSS module

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.signupPage}>
      <div className={styles.logoSection}>
        <div className={styles.logoContainer}>
            <img src="/logo.jpeg" alt="Logo" className={styles.logo} />
            <h1 className={styles.logoTitle}>ECHO</h1>
        </div>
    </div>

      <div className={styles.formSection}>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.signupForm}>
          <h1 className={styles.formTitle}>Get Started</h1>
            <div className={styles.formField}>
              <label htmlFor="firstName" className={styles.label}>First Name</label>
              <input
                className={styles.inputField}
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formField}>
              <label htmlFor="lastName" className={styles.label}>Last Name</label>
              <input
                className={styles.inputField}
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formField}>
              <label htmlFor="email" className={styles.label}>Email ID</label>
              <input
                className={styles.inputField}
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formField}>
              <label htmlFor="password" className={styles.label}>Password</label>
              <input
                className={styles.inputField}
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className={styles.submitButton}>SIGN UP</button>

            <p className={styles.loginLink}>
              Already an user? <a href="/login">LOG IN</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}