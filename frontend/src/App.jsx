import { useContext } from "react"
import { ThemeContext } from "./context/ThemeContext"
import { useEffect } from "react"
import Navbar from "./components/Navbar"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ItemDetails from "./pages/ItemDetails"
import ProtectedRoute from "./components/ProtectedRoute"
import Dashboard from "./pages/Dashboard"
import SellItem from "./pages/SellItem"

function App() {
  const {darkMode} = useContext(ThemeContext)

  useEffect(()=>{
    if (darkMode) document.documentElement.classList.add('theme-dark');
    else document.documentElement.classList.remove('theme-dark')
  }, [darkMode])

  return (
    <div className={darkMode ? "bg-gray-900 text-white min-h-screen" : "bg-white text-black min-h-screen"}>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/items/:id" element={<ItemDetails />} />
          <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute> }  />
          <Route path="/sell" element={<ProtectedRoute> <SellItem /> </ProtectedRoute>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
