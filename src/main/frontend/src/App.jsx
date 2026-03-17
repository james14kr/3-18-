import { Route, Routes } from "react-router-dom"
import MainLayout from "./layout/MainLayout"
import Home from "./pages/home/Home"
import CarForm from "./pages/car/CarForm"
import Register from "./pages/sale/Register"
import SaleList from "./pages/sale/SaleList"

function App() {

  return (
    <>
      <Routes>

        <Route path='/' element = {<MainLayout/>}>
          <Route index element={<Home/>}/>
          <Route path='car' element = {<CarForm/>}/>
          <Route path='register' element={<Register/>}/>
          <Route path='list' element={<SaleList/>}/>
        </Route>

      </Routes>
    </>
  )
}

export default App
