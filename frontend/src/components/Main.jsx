import { useEffect, useState } from 'react'
import { FiEdit, FiTrash2 } from "react-icons/fi"
import { FaRocket } from "react-icons/fa6";
import UpdateModal from './UpdateModal'
import { useProductStore } from '../store/productState';
import { useToast } from "../components/ui/use-toast";

const Main = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const background = props.bg ? 'bg-gradient-to-r from-gray-900 to-blue-900'  : 'bg-white-500';
    const { fetchProducts, products, deleteProduct} = useProductStore();
    const {toast} = useToast();

    useEffect(() => {
        fetchProducts();
    }, [])

    async function handleDelete(id) {
        const {success, message} = await deleteProduct(id);
        if (success) {
            toast({
                title: "✅ Success",
                description: message,
            })
        } else {
            toast({
                title: "❌ Error",
                description: message,
                variant: "destructive", 
            })
        }
    }

    function handleSelectingProduct(product) {
        setSelectedProduct(product);
        setIsModalOpen(true)
    }

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
                    {products.length <= 0 && 
                        <div className='flex items-center justify-between gap-2'>
                            <h3 className='text-white font-bold'>
                                No products found.
                            </h3>
                            <button onClick={() => setIsModalOpen(true)} className='text-sky-500 text-lg font-bold text-transparent'>
                                Create Product
                            </button>
                        </div>
                    }

                    <div id='grid-div' className="w-full max-w-6xl grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {products.map((product, index) => (
                            <div
                                key={index}
                                id='products'
                                className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transition-transform hover:scale-[1.02]"
                            >
                                <img
                                    src={product.img}
                                    alt={product.productName}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4 flex flex-col flex-grow justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            {product.productName}
                                        </h3>
                                        <p className="text-gray-600 font-medium">${product.price}</p>
                                    </div>
                                    <div className="flex justify-start gap-3 mt-4">
                                        <button className="p-2 rounded-md bg-sky-200 hover:bg-sky-300 text-sky-800">
                                            <FiEdit onClick={() => handleSelectingProduct(product)} />
                                        </button>
                                        <button onClick={() => handleDelete(product._id)} 
                                                className="p-2 rounded-md bg-rose-200 hover:bg-rose-300 text-rose-800"
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            {selectedProduct && (
                <UpdateModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false)
                        setSelectedProduct(null)
                    }}
                    productId={selectedProduct._id}
                    product={selectedProduct.productName}
                    price={selectedProduct.price}
                    image={selectedProduct.img}
                />
            )}
        </>
    )
}

export default Main
