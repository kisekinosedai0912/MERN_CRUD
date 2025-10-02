import './assets/css/index.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar' 
import HomePage from './views/HomePage'

function App() {
    return (
        <>
          {/* <Box minH={'100vh'}>
              <Navbar />
			  <Routes>
					<Route path="/" element={<HomePage />} />
			  </Routes>
          </Box> */}
		  <HomePage />
		</>
    )
}

export default App