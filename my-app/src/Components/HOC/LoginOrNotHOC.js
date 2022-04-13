import React, { Component } from 'react'
import { isAuthenticatedContext } from '../Context/AuthContext'

const LoginOrNotHOC = () => {
  return function withLogOrNot({ ...props }) {
    const { isSignin } = useContext(isAuthenticatedContext)

   
    return (
      <div>
        {isSignin && <Component  signComp={} WelComp={}/>}
      </div>
    )
  }
  
 
}

export default LoginOrNotHOC