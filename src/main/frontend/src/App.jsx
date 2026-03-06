import { Route, Routes } from "react-router-dom"
import MainLayout from "./layout/MainLayOut"
import CarForm from "./pages/car/CarForm"

function App() {

  return (
    <>
      <Routes>

        <Route path='/' element = {<MainLayout/>}>
          <Route path='car' element = {<CarForm/>}/>
        </Route>

      </Routes>
    </>
  )
}

export default App
