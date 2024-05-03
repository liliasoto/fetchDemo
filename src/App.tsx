import Axios from './components/Axios'
import './App.css'
import EstadoConFetch from './components/EstadoConFetch'
import SWR from './components/SWR'
import UseFetch from './components/UseFetch'

function App() {

  return (
    <>
      <EstadoConFetch></EstadoConFetch>
      <SWR></SWR>
      <Axios></Axios>
      <UseFetch></UseFetch>
    </>
  )
}

export default App
