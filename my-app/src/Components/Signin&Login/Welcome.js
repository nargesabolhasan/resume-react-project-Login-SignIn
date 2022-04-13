import React,{useContext} from 'react'
import { isAuthenticatedContext } from '../Context/AuthContext'
import { Button} from 'react-bootstrap';
import WithRendering from '../HOC/LoginOrNotHOC'

const Welcome = ({ data,...props}) => {
    const {user,OpenWelcome} = useContext(isAuthenticatedContext)
  return (
    <div>
        <h1>خوش آمدید </h1>
        <p > {data} </p>
        <Button onClick={()=>OpenWelcome(false)}>خروج</Button>
    </div>
  )
}

export default WithRendering(Welcome)