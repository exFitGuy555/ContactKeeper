import React, { useState,useContext, useEffect } from "react";
import AuthContext from '../../Context/auth/authContext'
import AlertContext from '../../Context/alert/alertContext'



const Login = (props) => {
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);


  const {
    setAlert
  } = alertContext;
  const {
    login,
    error,
    clearErrors,
    isAuthenticated
  } = authContext; //pulling those out of the state

 //Re direct soon as user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/'); //props.history.push = redirect
    }

    if (error === 'Invalid Credentials') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]); //in the [] we placing the dependencies for our useEffect  || also it allow us to avoid error messages || also with that calling those as a dependencies will cause an endless loop so well comment eslint disable above.....



  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;


  const onChange = (e) => setUser({...user,[e.target.name]: e.target.value});

  const onSubmit = (e) => {
      e.preventDefault();
      if(email === '' || password === '' ){
        setAlert('Please Fill in all fields', 'danger')
      } else {
         login({
           email,
            password})
      }
  }
  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
          ></input>
        </div>
        <div className="form-group">
          < label htmlFor = "password" > Password < /label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          ></input>
        </div>

        <input type="submit" value="Login" className="btn btn-primary btn-block"></input>
  
      </form>
    </div>
  );
};

export default Login;
