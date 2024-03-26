import './App.css'
import axios from "axios"
import { UserContextProvider } from './UserContext'
import Routes from './Routes'


function App() {

  // axios.defaults.baseURL = "http://localhost:3001";
  axios.defaults.baseURL = "https://chat-app-backend-7xse.onrender.com";
  axios.defaults.withCredentials = true
  console.log( axios.defaults.baseURL)
  return (
    <>
      <UserContextProvider>
       <Routes/>
      </UserContextProvider>
      {/* <div className='bg-green-500'>test</div> */}
    </>
  )
}

export default App
