import "./App.css";
import { Button } from "react-bootstrap";
import WithRendering from "./Components/HOC/LoginOrNotHOC";

function App({ name, logout, data }) {
  return (
    <div className="App">
      <h1 className="welcome">خوش آمدید</h1>
      <h2 className="welcome-h2"> عزیز {name} سلام</h2>
      <Button className="buttons" onClick={logout}>
        خروج
      </Button>
    </div>
  );
}

export default WithRendering(App);
