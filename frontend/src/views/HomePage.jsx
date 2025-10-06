import Navbar from "../components/Navbar"
import Footer from '../components/Footer'
import Main from '../components/Main'
import { useState } from "react"

const HomePage = () => {
    const [isClicked, setIsClicked] = useState(false);
    const toggleThemeMode = () => {
        setIsClicked(prevState => !prevState);

    }

    return (
        <>
            <Navbar clicked={isClicked} onClick={toggleThemeMode} />
            <Main bg={isClicked} />
            <Footer />
        </>
    )
}

export default HomePage