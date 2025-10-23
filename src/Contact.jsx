import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_iykffzy', // replace with your EmailJS Service ID
        'template_s4a42ma', // replace with your EmailJS Template ID
        form.current,
        'vs3Im3hkjONae4fty' // replace with your EmailJS Public Key
      )
      .then(
        (result) => {
          alert('Message sent successfully!');
          form.current.reset();
        },
        (error) => {
          alert('Failed to send message. Please try again later.');
          console.error(error.text);
        }
      );
  };

  return (
    <section className="contact">
      <h2>Contact Us</h2>
      <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="user_name" required />

        <label>Email</label>
        <input type="email" name="user_email" required />

        <label>Message</label>
        <textarea name="message" required />

        <button type="submit">Send</button>
      </form>
    </section>
  );
};

export default Contact;
