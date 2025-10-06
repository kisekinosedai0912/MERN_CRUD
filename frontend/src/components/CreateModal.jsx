import {useProductStore} from '../store/productState.js'
import { Loader2 } from "lucide-react";
import { useCallback } from 'react'
import { useToast } from "../components/ui/use-toast";

const CreateModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const { createProduct, loading } = useProductStore();
    const { toast } = useToast()

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        
        const form = e.target;  
        const formData = new FormData(form);
        const newProduct = {
            productName: formData.get('product-name'),
            price: Number(formData.get('product-price')),
            img: formData.get('img-url')
        };

        if (!newProduct.productName.trim()) return;
        if (newProduct.price <= 0) return;

        const {success, message, data} = await createProduct(newProduct);
        
        if (success) {
            toast({
                title: "✅ Success",
                description: message,
            })
            console.log(data)
            form.reset();
            onClose();
        } else {
            toast({
                title: "❌ Error",
                description: message,
                variant: "destructive", 
            })
        }
    }, [createProduct, onClose]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-2xl bg-gradient-to-r from-cyan-500 to-blue-700 rounded-2xl shadow-2xl p-[2px]">
                <div className="bg-white rounded-2xl p-8">
                    {/* Header */}
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Add New Product
                    </h2>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Product Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Product Name
                            </label>
                        <input
                            type="text"
                            placeholder="Enter product name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                            name='product-name'
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
                                    name="product-price"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Image URL
                                </label>
                                <input
                                    type="text"
                                    placeholder="https://random-product/pinterest.com"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                                    name="img-url"
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
                                className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-700 text-white font-medium shadow hover:opacity-90 transition"
                                disabled={loading}
                            >
                                {loading ? "Saving..." : "Save Product"}
                                {loading && (<Loader2 className="w-4 h-4 animate-spin" />)}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateModal
