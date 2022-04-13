import React from 'react'
import { isAuthenticatedContext } from '../Context/AuthContext'
import { Button, Form } from 'react-bootstrap';
import withLogOrNot from '../HOC/LoginOrNotHOC'

const Welcome = () => {
    const {user,OpenWelcome} = useContext(isAuthenticatedContext)
  return (
    <div>
        <h1>خوش آمدید </h1>
        <p> {user} </p>
        <Button onClick={()=>OpenWelcome(false)}>خروج</Button>
    </div>
  )
}

export default withLogOrNot(Welcome)