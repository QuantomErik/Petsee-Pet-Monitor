/* import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(`Thank you ${formData.name}, we have received your message!`);
  }

  return (
    <Container>
      <h2>Contact Us</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter name" name="name" value={formData.name} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicMessage">
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Your message" name="message" value={formData.message} onChange={handleChange} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Contact;
 */


import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef();
  const [isSubmitted, setIsSubmitted] = useState(false); 

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_1tpllji', 
      'template_h11lyoj', 
      form.current, 
      'kzUIZNBLdSoa2gXG0'
    )
    .then(
      () => {
        console.log('SUCCESS!');
        setIsSubmitted(true);
      },
      (error) => {
        console.log('FAILED...', error.text);
      }
    );
  };

  return (
    <div id="contact" className="contact flex flex-col items-center justify-start bg-gray-900 text-white">
      <h1 className="text-4xl font-bold">Contact Me</h1>
      {isSubmitted ? (
        <div className="mt-4 text-lg text-center">
          <p>Thank you for your message!</p>
          <p>I will get back to you as soon as possible.</p>
        </div>
      ) : (
        <form ref={form} onSubmit={sendEmail} className="mt-4 text-lg flex flex-col items-center w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6 w-full">
            <div className="w-full px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input 
                className="appearance-none block w-full bg-gray-700 text-white border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-800" 
                id="name" 
                type="text" 
                name="user_name" 
                required 
              />
            </div>
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input 
                className="appearance-none block w-full bg-gray-700 text-white border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-800" 
                id="email" 
                type="email" 
                name="user_email" 
                required 
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6 w-full">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="message">
                Message
              </label>
              <textarea 
                className="appearance-none block w-full bg-gray-700 text-white border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-800" 
                id="message" 
                name="message" 
                rows="5" 
                required
              ></textarea>
            </div>
          </div>
          <div className="flex justify-center w-full">
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
              type="submit"
            >
              Send
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Contact;










