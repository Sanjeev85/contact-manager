import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [allContacts, setAllContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedContact, setSelectedContact] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [indexToEdit, setIndexToEdit] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/contacts');
        if (res.status === 200) {
          setAllContacts(res.data.allContacts);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);

  // Function to filter and sort contacts
  const filteredAndSortedContacts = allContacts
    .filter((contact) =>
      contact.ContactName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      // Sort by name (ascending)
      if (sortBy === 'name') {
        const nameA = a.ContactName.toLowerCase();
        const nameB = b.ContactName.toLowerCase();
        if (sortDirection === 'asc') {
          return nameA.localeCompare(nameB);
        } else {
          return nameB.localeCompare(nameA);
        }
      }
    });

  // Function to handle contact deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/contacts/${id}`);
      // Update the contacts list after deletion
      const contactListAfterDeletion = allContacts.filter(
        (contact) => contact._id !== id
      );
      setAllContacts(contactListAfterDeletion);
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  // Function to handle contact editing
  const handleEdit = (contact, index) => {
    setSelectedContact(contact);
    setIndexToEdit(index);
    setEditMode(true);
  };

  // Function to handle contact update
  const handleUpdate = async (updatedContact) => {
    // console.log('contact to update', updatedContact);
    try {
      await axios.put(
        `http://localhost:3000/api/contacts/${updatedContact._id}`,
        updatedContact
      );
      // Update the contacts list after editing
      setAllContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact._id === updatedContact._id ? updatedContact : contact
        )
      );
      setSelectedContact(null);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  // Function to reset editing mode
  const handleCancelEdit = () => {
    setSelectedContact(null);
    setEditMode(false);
  };

  // Function to trigger download action
  const handleDownload = async () => {
    axios.get('http://localhost:3000/api/contacts/export');
  };

  return (
    <div className='min-h-screen bg-gray-100'>
      <div className='bg-white shadow-md'>
        <nav className='flex justify-between items-center bg-gray-800 text-white p-4'>
          <h1 className='text-2xl font-semibold'>Contacts Page</h1>
          <div>
            <button className='bg-blue-500 text-white p-2 mx-2 rounded hover:bg-blue-600'>
              <a href={`/addContact`}>Add Contact</a>
            </button>
            <button
              className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600'
              onClick={handleDownload}>
              Download
            </button>
          </div>
        </nav>

        <div className='p-4'>
          <div className='flex justify-between mb-4'>
            <input
              type='text'
              placeholder='Search by name...'
              className='border p-2 w-2/3'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className='flex items-center space-x-2'>
              <label className='text-gray-700'>Sort by:</label>
              <select
                className='border p-2'
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}>
                <option value='name'>Name</option>
              </select>
              <select
                className='border p-2'
                value={sortDirection}
                onChange={(e) => setSortDirection(e.target.value)}>
                <option value='asc'>Ascending</option>
                <option value='desc'>Descending</option>
              </select>
            </div>
          </div>
          <table className='w-full table-auto'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='px-4 py-2'>Name</th>
                <th className='px-4 py-2'>Email</th>
                <th className='px-4 py-2'>Phone</th>
                <th className='px-4 py-2'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedContacts.map((contact, index) => (
                <tr
                  key={contact.id}
                  className='hover:bg-gray-100'>
                  <td className='border px-4 py-2'>
                    {selectedContact?.id === contact.id &&
                    editMode &&
                    indexToEdit === index ? (
                      <input
                        type='text'
                        value={selectedContact.ContactName}
                        onChange={(e) =>
                          setSelectedContact({
                            ...selectedContact,
                            ContactName: e.target.value,
                          })
                        }
                      />
                    ) : (
                      contact.ContactName
                    )}
                  </td>
                  <td className='border px-4 py-2'>
                    {selectedContact?.id === contact.id &&
                    editMode &&
                    indexToEdit === index ? (
                      <input
                        type='text'
                        value={selectedContact.email}
                        onChange={(e) =>
                          setSelectedContact({
                            ...selectedContact,
                            email: e.target.value,
                          })
                        }
                      />
                    ) : (
                      contact.email
                    )}
                  </td>
                  <td className='border px-4 py-2'>
                    {selectedContact?.id === contact.id &&
                    editMode &&
                    indexToEdit === index ? (
                      <input
                        type='text'
                        value={selectedContact.phone}
                        onChange={(e) =>
                          setSelectedContact({
                            ...selectedContact,
                            phone: e.target.value,
                          })
                        }
                      />
                    ) : (
                      contact.phone
                    )}
                  </td>
                  <td className='border px-4 py-2'>
                    {selectedContact?.id === contact.id &&
                    editMode &&
                    indexToEdit === index ? (
                      <div>
                        <button
                          className='bg-green-500 text-white p-1 rounded mr-2'
                          onClick={() => handleUpdate(selectedContact)}>
                          Save
                        </button>
                        <button
                          className='bg-red-500 text-white p-1 rounded'
                          onClick={handleCancelEdit}>
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button
                          className='bg-blue-500 text-white p-1 rounded mr-2'
                          onClick={() => handleEdit(contact, index)}>
                          Edit
                        </button>
                        <button
                          className='bg-red-500 text-white p-1 rounded'
                          onClick={() => handleDelete(contact._id)}>
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
