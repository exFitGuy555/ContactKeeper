  
import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../Context/alert/alertContext'
import AuthContext from '../../Context/auth/authContext'

const Register = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const {
    signup,
    error,
    clearErrors,
    isAuthenticated
  } = authContext; //pulling those out of the state

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/'); //props.history.push = redirect
    }

    if (error === 'User already exists') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]); //in the [] we placing the dependencies for our useEffect  || also it allow us to avoid error messages || also with that calling those as a dependencies will cause an endless loop so well comment eslint disable above.....

   const [user, setUser] = useState({
     name: '',
     email: '',
     password: '',
     password2: ''
   });


  const { name, email, password, password2 } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlert('Please enter all fields', 'danger');
    } else if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else if(password.length  < 6) {
      setAlert('Password must be at least 6 characters', 'danger');
    } else {
      signup({  //this is the formData from authState
        name,
        email,
        password
      });
    }
  };

  return (
      <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Register</span>
      </h1>
      <form onSubmit = {
        onSubmit
      }
      >
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            id='name'
            type='text'
            name='name'
            value={name}
            onChange={onChange}
            
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            id='email'
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password</label>
          <input
            id='password2'
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
            
          />
        </div>
        <input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Register;
