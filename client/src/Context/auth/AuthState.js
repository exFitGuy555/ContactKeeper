import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import setAuthToken from "../../utils/setAuthToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types";

//setting out auth state for after recivieng signup data from the form
//localStorage here very important will use us also in load user data aftery
const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };


    //state allows us to access everything from our state, in the Reducer
    //dispatch allows us to dispatch objects to the reducer
  const [state, dispatch] = useReducer(authReducer, initialState);

   //From here we will have all our actions

  // Load User
  const loadUser = async () => {
    setAuthToken(localStorage.token);

    try {
      const res = await axios.get("/api/auth"); //check our token
      //if all ok , user data will be back as res, and we will dispatch it

      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Register User
    //also look at router.post('/') at users.js file to see what soppused to comeback as res.
    //res.data should be the token
  const signup = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/users", formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Login User
 const login = async (formData) => {
   const config = {
     headers: {
       "Content-Type": "application/json",
     },
   };

   try {
     const res = await axios.post("/api/auth", formData, config);

     dispatch({
       type: LOGIN_SUCCESS,
       payload: res.data,
     });

     loadUser();
   } catch (err) {
     dispatch({
       type: LOGIN_FAIL,
       payload: err.response.data.msg,
     });
   }
 };

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
     /* value means anything we want to be able to  acceses from other componenets including State and actions*/
    <AuthContext.Provider    
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        signup,
        loadUser,
        login,
        logout,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
