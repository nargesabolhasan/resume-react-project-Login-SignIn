import Tabs from './Components/Tabs/Tabs'
import './App.css'
import AuthContextProvider from "./Components/Context/AuthContext"
function App() {
  return (
    <>
      <div className="App">
        <AuthContextProvider>
        <Tabs />
        </AuthContextProvider>
      </div>
    </>
  );
}

export default App;