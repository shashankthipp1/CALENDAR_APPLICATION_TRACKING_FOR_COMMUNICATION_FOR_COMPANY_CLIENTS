// src/emailService.js

export const sendEmailWithOTP = (email, otp) => {
    // This is a mock function. In a real application, you would send the OTP to the user's email
    console.log(`Sending OTP ${otp} to ${email}`);
    
    // Simulate an email being sent
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true); // Simulate successful email sending
      }, 1000);
    });
  };