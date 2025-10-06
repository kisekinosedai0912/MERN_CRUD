import { useEffect, useState, useRef } from 'react'
import { FiEdit, FiTrash2 } from "react-icons/fi"
import { FaRocket } from "react-icons/fa6";
import UpdateModal from './UpdateModal'
import { useProductStore } from '../store/productState';
import { useToast } from "../components/ui/use-toast";

const Main = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [page, setPage] = useState(1);
    const observer = useRef(null);
    const lastProductRef = useRef(null);

    const background = props.bg
        ? 'bg-gradient-to-r from-gray-900 to-blue-900'
        : 'bg-white-500';

    const { fetchProducts, products, loading, totalPages, deleteProduct } = useProductStore();
    const { toast } = useToast();

    useEffect(() => {
        setPage(1);
        fetchProducts(1, false);
    }, []);

    useEffect(() => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !loading && page < totalPages) {
                const nextPage = page + 1;
                fetchProducts(nextPage, true);
                setPage(nextPage);
            }
        }, { threshold: 0.5 });

        if (lastProductRef.current) {
            observer.current.observe(lastProductRef.current);
        }

        return () => observer.current?.disconnect();
    }, [loading, page, totalPages, products]);

    async function handleDelete(id) {
        const { success, message } = await deleteProduct(id);
        toast({
            title: success ? "✅ Success" : "❌ Error",
            description: message,
            variant: success ? undefined : "destructive",
        });
    }

    function handleSelectingProduct(product) {
        setSelectedProduct(product);
        setIsModalOpen(true);
    }

    return (
        <>
            <main className={`min-h-screen flex flex-col items-center justify-start px-4 py-10 ${background}`}>
                <section className="flex flex-col items-center justify-between w-full gap-8 max-w-7xl">
                    <span className="flex items-center justify-center w-full gap-4">
                        <h2 className="font-bold bg-gradient-to-r from-cyan-500 to-violet-500 bg-clip-text text-4xl sm:text-5xl text-transparent">
                            Current Products
                        </h2>
                        <FaRocket size={28} className="text-white" />
                    </span>

                    <div id="grid-div" className="w-full grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {products.map((product, index) => (
                            <div
                                key={product._id}
                                ref={index === products.length - 1 ? lastProductRef : null}
                                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:scale-[1.02] transition-transform"
                            >
                                <img
                                    src={product.img}
                                    alt={product.productName}
                                    className="w-full h-40 object-cover"
                                />
                                <div className="p-3 flex flex-col flex-grow justify-between">
                                    <div>
                                        <h3 className="text-base font-semibold text-gray-800">{product.productName}</h3>
                                        <p className="text-gray-600 text-sm font-medium">${product.price}</p>
                                    </div>
                                    <div className="flex justify-start gap-2 mt-3">
                                        <button
                                            onClick={() => handleSelectingProduct(product)}
                                            className="p-2 rounded-md bg-sky-200 hover:bg-sky-300 text-sky-800"
                                        >
                                            <FiEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="p-2 rounded-md bg-rose-200 hover:bg-rose-300 text-rose-800"
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {loading && <p className="text-gray-400 text-sm mt-2">Loading more products...</p>}
                </section>
            </main>

            {selectedProduct && (
                <UpdateModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedProduct(null);
                    }}
                    productId={selectedProduct._id}
                    product={selectedProduct.productName}
                    price={selectedProduct.price}
                    image={selectedProduct.img}
                />
            )}
        </>
    );
};

export default Main;