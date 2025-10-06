import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa"

const Footer = () => {
    return (
        <footer className="relative bottom-0 w-full bg-gradient-to-r from-cyan-500 to-blue-800 dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-6 h-[60px] flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                
                {/* Left: Brand */}
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">MERN Products</span>
                    <span>© {new Date().getFullYear()} All rights reserved</span>
                </div>

                {/* Middle: Links */}
                <div className="hidden md:flex items-center gap-6">
                    <a href="/about" className="hover:text-blue-600 transition">About</a>
                    <a href="/contact" className="hover:text-blue-600 transition">Contact</a>
                    <a href="/privacy" className="hover:text-blue-600 transition">Privacy Policy</a>
                </div>

                {/* Right: Social Media */}
                <div className="flex items-center gap-4">
                    <a href="#" className="hover:text-blue-600 transition"><FaFacebookF /></a>
                    <a href="#" className="hover:text-blue-400 transition"><FaTwitter /></a>
                    <a href="#" className="hover:text-blue-700 transition"><FaLinkedinIn /></a>
                    <a href="#" className="hover:text-gray-800 dark:hover:text-gray-200 transition"><FaGithub /></a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
