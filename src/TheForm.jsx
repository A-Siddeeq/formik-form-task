import React, { useState } from 'react';
import * as Yup from 'yup';
import './App.css'

const TheForm = () => {
  const YupSchema = Yup.object().shape({
    name: Yup.string().required('Name cannot be empty'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    age: Yup.number().positive().integer(),
    street: Yup.string().required('Street is required'),
    city: Yup.string().required('City is required'),
    friend: Yup.array().of(Yup.string().required('Add at least one friend')).min(1, "Add at least one friend's name"),
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    street: '',
    city: '',
    friend: [],
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    age: '',
    street: '',
    city: '',
    friend: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    setFormErrors({
      ...formErrors,
      [name]: '',
    });
  };

  const handleAddFriend = () => {
    setFormData({
      ...formData,
      friend: [...formData.friend, ''],
    });
  };

  const handleDeleteFriend = (index) => {
    const updatedFriends = [...formData.friend];
    updatedFriends.splice(index, 1);
    setFormData({
      ...formData,
      friend: updatedFriends,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

 {/*CODE NOT WORKING WITHOUT THIS ABOTEARLY 😂LOL */}
    YupSchema.validate(formData, { abortEarly: false } )
      .then(() => {
        console.log('Form submitted:', formData);
        
        setFormData({
          name: '',
          email: '',
          age: '',
          street: '',
          city: '',
          friend: [],
        });
      })
      .catch((errors) => {

        const newErrors = {};
        errors.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setFormErrors(newErrors);
      });
  };

  const handleFriendChange = (value, index) => {
    const updatedFriends = [...formData.friend];
    updatedFriends[index] = value;
    setFormData({
      ...formData,
      friend: updatedFriends,
    });
  };

  return (
    <div className='container'>
      <h1>KODECAMP REACT 4.0</h1>
      <h2>Formik Form Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            value={formData.name}
            onChange={handleChange}
            onBlur={handleChange}
            id="name"
            name="name"
            type="text"
            placeholder="Name"
          />
          {formErrors.name && <p style={{ color: 'red' }}>{formErrors.name}</p>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            value={formData.email}
            onChange={handleChange}
            onBlur={handleChange}
            id="email"
            name="email"
            type="email"
            placeholder="Email"
          />
          {formErrors.email && <p style={{ color: 'red' }}>{formErrors.email}</p>}
        </div>

        <div>
          <label htmlFor="age">Age</label>
          <input
            value={formData.age}
            onChange={handleChange}
            onBlur={handleChange}
            id="age"
            name="age"
            type="number"
            placeholder="Age"
          />
          {formErrors.age && <p style={{ color: 'red' }}>{formErrors.age}</p>}
        </div>

        <div>
          <label htmlFor="street">Street</label>
          <input
            value={formData.street}
            onChange={handleChange}
            onBlur={handleChange}
            id="street"
            name="street"
            type="text"
            placeholder="Street"
          />
          {formErrors.street && <p style={{ color: 'red' }}>{formErrors.street}</p>}
        </div>

        <div>
          <label htmlFor="city">City</label>
          <input
            value={formData.city}
            onChange={handleChange}
            onBlur={handleChange}
            id="city"
            name="city"
            type="text"
            placeholder="City"
          />
          {formErrors.city && <p style={{ color: 'red' }}>{formErrors.city}</p>}
        </div>

        <div className='friend'>
          <label>Friends:</label>
          {formData.friend.map((friend, index) => (
            <div key={index}>
              <input
                value={friend}
                onChange={(e) => handleFriendChange(e.target.value, index)}
                onBlur={(e) => handleFriendChange(e.target.value, index)}
                type="text"
                placeholder="Friend's name"
              />
              <div></div>
              <button type="button" onClick={() => handleDeleteFriend(index)}>
                Delete
              </button>
              {index === 0 && formErrors.friend && <p style={{ color: 'red' }}>{formErrors.friend}</p>}
            </div>
          ))}
          <button type="button" onClick={handleAddFriend}>
            Add Friend
          </button>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TheForm;
