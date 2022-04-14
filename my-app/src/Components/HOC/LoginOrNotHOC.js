import React, { useContext } from "react";
import { isAuthenticatedContext } from "../Context/AuthContext";

import Tabs from "../Tabs/Tabs"

const WithRendering = (Component) => {
  function WithRenderingComponent({ ...props }) {
    const { user, logOutUser } = useContext(isAuthenticatedContext);
    return (
      <>
        {user ? <Component
          name={user.firstName}
          logout={logOutUser}
        {...props}
        /> : <Tabs {...props} />}
      </>
    );
  }
  return WithRenderingComponent;
};

export default WithRendering;