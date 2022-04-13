import React, { useContext } from "react";
import { isAuthenticatedContext } from "../Context/AuthContext";
import Tabs from "../Tabs/Tabs";

const WithRendering = (Component) => {
  function WithRenderingComponent({ ...props }) {
    const { isSignin,user } = useContext(isAuthenticatedContext);
    return (
      <>
        
        {isSignin ?  <Component data={user} { ...props }/>:  <Tabs {...props} />}
      
      </>
    );
  }
  return WithRenderingComponent;
};

export default WithRendering;