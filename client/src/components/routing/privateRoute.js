import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../Context/auth/authContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  //standart way of creating privateRoute in React
  //rest is all extra props that passed in  to the component
  const authContext = useContext(AuthContext);

  const { loading, isAuthenticated } = authContext;
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          //the if saying if the user not authenticated and done loading
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
