
const EditModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-2xl bg-gradient-to-r from-cyan-500 to-blue-700 rounded-2xl shadow-2xl p-[2px]">
                <div className="bg-white rounded-2xl p-8">
                    {/* Header */}
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Update Product
                    </h2>

                    {/* Form */}
                    <form className="space-y-5">
                        {/* Product Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Product Name
                            </label>
                        <input
                            type="text"
                            placeholder="Enter product name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                        />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Description
                            </label>
                            <textarea
                                rows="3"
                                placeholder="Enter product description"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
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
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Stock
                                </label>
                                <input
                                    type="number"
                                    placeholder="0"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
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