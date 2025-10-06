import { BsCart4, BsPlusSquare } from "react-icons/bs"
import { MdOutlineLightMode } from "react-icons/md"
import { FaRegMoon } from "react-icons/fa6";
import { Link } from "react-router-dom"
import CreateModal from "../components/CreateModal"
import { useState } from "react"

const Navbar = (props) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<header className="w-full bg-gradient-to-r from-cyan-500 to-blue-800 shadow-md dark:bg-gray-900">
				<nav className="flex items-center justify-around max-w-7xl mx-auto px-6 h-14">
					<Link to={"/"} 
						className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-gray-200 hover:text-blue-600 transition"
					>
						<BsCart4 className="text-xl" />
						<span>Product Page</span>
					</Link>

					{/* Spacer */}
					<span></span>

					<span className="flex items-center gap-4">
						<button className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition">
							<BsPlusSquare onClick={() => setIsModalOpen(true)} className="text-xl text-neutral-100" />
						</button>
						<button onClick={() => props.onClick()} className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition">
							{ props.clicked === false ? <FaRegMoon className="text-xl text-neutral-100" /> : <MdOutlineLightMode className="text-xl text-neutral-100" /> }
						</button>
					</span>
				</nav>
			</header>
			<CreateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
		</>
	)
}

export default Navbar