import { useState } from 'react'
import { FiEdit, FiTrash2 } from "react-icons/fi"
import { FaRocket } from "react-icons/fa6";
import UpdateModal from './UpdateModal'

const Main = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const background = props.bg ? 'bg-gradient-to-r from-gray-900 to-blue-900'  : 'bg-white-500'

    return (
        <>
            <main className={`h-[100vh] flex items-center justify-center px-4 ${background}`}>
                <section className='flex flex-col items-center justify-between w-full gap-8'>
                    <span className='flex items-center justify-between gap-2'>
                        <h2 className='font-bold bg-gradient-to-r from-cyan-500 to-violet-500 bg-clip-text text-5xl text-transparent'>
                            Current Products
                        </h2>
                        <FaRocket size={'28px'} />
                    </span>
                    <div className='flex items-center justify-between gap-2'>
                        <h3 className='text-white font-bold'>
                            No products found.
                        </h3>
                        <button onClick={() => setIsModalOpen(true)} className='text-sky-500 text-lg font-bold text-transparent'>
                            Create Product
                        </button>
                    </div>
                </section>
                {/* <div className="w-full max-w-5xl bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="w-full border-collapse">
                        <thead className="bg-gradient-to-r from-cyan-500 to-blue-800">
                            <tr>
                                <th className="px-6 py-3 text-neutral-100 text-left">Song</th>
                                <th className="px-6 py-3 text-neutral-100 text-left">Artist</th>
                                <th className="px-6 py-3 text-neutral-100 text-left">Year</th>
                                <th className="px-6 py-3 text-neutral-100 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b hover:bg-gray-50">
                                <td className="px-6 py-3">The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                                <td className="px-6 py-3">Malcolm Lockyer</td>
                                <td className="px-6 py-3">1961</td>
                                <td className="px-6 py-3 text-center flex justify-center gap-3">
                                    <FiEdit size={16} color='green' onClick={() => setIsModalOpen(true)} />
                                    <FiTrash2 size={16} color='red' />
                                </td>
                            </tr>
                            <tr className="border-b hover:bg-gray-50">
                                <td className="px-6 py-3">Witchy Woman</td>
                                <td className="px-6 py-3">The Eagles</td>
                                <td className="px-6 py-3">1972</td>
                                <td className="px-6 py-3 text-center flex justify-center gap-3">
                                    <FiEdit size={16} color='green' onClick={() => setIsModalOpen(true)} />
                                    <FiTrash2 size={16} color='red' />
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-3">Shining Star</td>
                                <td className="px-6 py-3">Earth, Wind, and Fire</td>
                                <td className="px-6 py-3">1975</td>
                                <td className="px-6 py-3 text-center flex justify-center gap-3">
                                    <FiEdit size={16} color='green' onClick={() => setIsModalOpen(true)} />
                                    <FiTrash2 size={16} color='red' />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div> */}
            </main>
            <UpdateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    )
}

export default Main
