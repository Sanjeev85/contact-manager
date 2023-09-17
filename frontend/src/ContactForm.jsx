import React, { useState } from 'react';
import axios from 'axios';

function ContactForm({ onAddContact }) {
  const [newContact, setNewContact] = useState({
    ContactName: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewContact({
      ...newContact,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3000/api/contacts', newContact);

    // Clear the form fields after submission
    setNewContact({
      ContactName: '',
      email: '',
      phone: '',
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='w-full md:w-2/3 lg:w-1/2 mx-auto mt-4'>
      {/* Navbar with a different title */}
      <div className='bg-gray-800 text-white p-4'>
        <h1 className='text-2xl font-semibold'>My Contact App</h1>
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700'>Name:</label>
        <input
          type='text'
          name='ContactName'
          value={newContact.ContactName}
          onChange={handleChange}
          className='border p-2 w-full'
          required
        />
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700'>Email:</label>
        <input
          type='email'
          name='email'
          value={newContact.email}
          onChange={handleChange}
          className='border p-2 w-full'
          required
        />
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700'>Phone Number:</label>
        <input
          type='text'
          name='phone'
          value={newContact.phone}
          onChange={handleChange}
          className='border p-2 w-full'
          required
        />
      </div>
      <div className='mb-4'>
        <button
          type='submit'
          className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full'>
          Add Contact
        </button>
      </div>
    </form>
  );
}

export default ContactForm;
