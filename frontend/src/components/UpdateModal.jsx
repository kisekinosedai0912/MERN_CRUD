import { useState, useEffect, useCallback } from 'react'
import { useProductStore } from '../store/productState';
import { useToast } from './ui/use-toast';

const EditModal = ({ isOpen, onClose, productId, product, price, image }) => {
    const [productName, setProductName] = useState(product || "");
    const [productPrice, setProductPrice] = useState(price || "");
    const [productImage, setProductImage] = useState(image || "");
    const {updateProduct} = useProductStore();
    const {toast} = useToast();

    useEffect(() => {
        setProductName(product || "")
        setProductPrice(price || "")
        setProductImage(image || "")
    }, [product, price, image]);

    if (!isOpen) return null

    const handleUpdate = useCallback(async (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const updatedData = {
            productName: formData.get('new-name'),
            price: formData.get('new-price'),
            img: formData.get('new-img')
        }

        const {success, message, newData} = await updateProduct(productId, updatedData);

        if (success) {
            toast({
                title: "✅ Success",
                description: message,
            })
            console.log(newData)
            onClose();
        } else {
            toast({
                title: "❌ Error",
                description: message,
                variant: "destructive", 
            })
            onClose();
        }
    })

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-2xl bg-gradient-to-r from-cyan-500 to-blue-700 rounded-2xl shadow-2xl p-[2px]">
                <div className="bg-white rounded-2xl p-8">
                    {/* Header */}
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Update Product
                    </h2>

                    {/* Form */}
                    <form onSubmit={handleUpdate} className="space-y-5">
                        {/* Product Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Product Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter product name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                                value={productName}
                                name='new-name'
                                onChange={(e) => {
                                    e.preventDefault();
                                    setProductName(e.target.value)
                                }}
                            />
                        </div>

                        {/* Price & Stock */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    placeholder="₱0.00"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                                    value={productPrice}
                                    name='new-price'
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setProductPrice(e.target.value)
                                    }}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Image
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter image URL"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                                    value={productImage}
                                    name='new-img'
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setProductImage(e.target.value)
                                    }}
                                />
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-end gap-4 mt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-700 text-white font-medium shadow hover:opacity-90 transition"
                            >
                                Update Product
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditModal