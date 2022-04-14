import './App.css'
import { Button } from 'react-bootstrap';
import WithRendering from "./Components/HOC/LoginOrNotHOC"

function App({ name, logout, data }) {
  return (
    <div className="App">
      <h1 className="welcome">خوش آمدید</h1>
      <h2 className="welcome-h2"> عزیز {name} سلام</h2>

      <div className="user-info text-center">
        <h3 className="welcome-h3">:اطلاعات شما </h3>
        <div className="info-holder">
        <div>
            {Object.keys(data).map((info) => <h3 key={info.id}> {info} :</h3>)}
          </div>
          <div>
            {Object.values(data).map((info) => <h3 key={info.id}>{info}</h3>)}
          </div>
        </div>
      </div>
      <Button className="buttons" onClick={logout}>خروج</Button>
    </div>
  );
}

export default WithRendering(App);