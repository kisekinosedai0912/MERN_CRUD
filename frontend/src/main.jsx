import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastProvider} from "./components/ui/use-toast"
import App from './App.jsx'
import './assets/css/index.css'

createRoot(document.getElementById('root')).render(
    <StrictMode>
		<BrowserRouter>
			<ToastProvider>
				<App />
			</ToastProvider>
		</BrowserRouter>
    </StrictMode>,
)