import Tabs from './Components/Tabs/Tabs'
import './App.css'
import AuthContextProvider from "./Components/Context/AuthContext"
import LoginOrNotHOC from "./Components/HOC/LoginOrNotHOC"
import Welcome from './Components/Signin&Login/Welcome';
function App() {
  return (
    <>
      <div className="App">
        <AuthContextProvider>
        <Tabs/> 
        {/* <Welcome/> */}
        </AuthContextProvider>
      </div>
    </>
  );
}

export default App;