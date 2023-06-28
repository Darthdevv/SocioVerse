import './App.css'
import Navbar from 'pages/Navbar'
import Home from 'pages/Home'
import Login from 'pages/Login'
import Profile from 'pages/Profile'

function App() {


  return (
    <div className='app'>
      <Navbar/>
      <Home />
      <Profile />
      <Login/>
    </div>
  )
}

export default App
