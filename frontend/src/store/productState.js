import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import api from '../api/axios.js'

export const useProductStore = create(
    devtools(
        persist(
            (set, get) => ({
                products: [],
                error: null,
                loading: false,
                setProducts: (products) => set({ products }),
                createProduct: async (newProduct) => {
                    if (get().loading) {
                        return { success: false, message: "Please wait, request in progress..." };
                    }

                    if (!newProduct?.productName || !newProduct?.price || !newProduct?.img) {
                        return { success: false, message: "Please fill all required fields" };
                    }

                    try {
                        set({ loading: true });
                        const response = await api.post('/products', newProduct);
                        const responseData = response.data;
                        
                        // Calling the setter state function of zustand to re-render the UI 
                        // with the newly added products recorded in the backend
                        set(prevState => ({ 
                            products: [...prevState.products, responseData],
                            loading: false 
                        }));

                        return { 
                            success: true, 
                            message: 'Product added successfully!',
                            data: responseData
                        };

                    } catch (error) {
                        set({ loading: false, error: error.message });
                        return { success: false, message: error.message };
                    }
                },
                fetchProducts: async (page = 1, append = false) => {
                    try {
                        set({ loading: true });
                        const response = await api.get(`/products?page=${page}&limit=8`);
                        const { data, totalPages } = response.data;
                    
                        set(prevState => ({
                            products: append ? [...prevState.products, ...data] : data,
                            loading: false,
                            totalPages,
                        }));

                    } catch (error) {
                        set({ loading: false, error: error.message });
                    }
                },
                updateProduct: async (id, updatedData) => {
                    if (get().loading) {
                        return { success: false, message: "Updating product in progress, please wait..." };
                    }
                
                    try {
                        set({ loading: true });
                        const response = await api.put(`/products/${id}`, updatedData);
                        const responseData = response.data.data;
                
                        set(prevState => ({
                            products: prevState.products.map(product =>
                                product._id === id ? responseData : product
                            ),
                            loading: false
                        }));
                
                        return { success: true, message: "Product updated successfully!", newData: responseData };
                
                    } catch (error) {
                        set({ loading: false, error: error.message });
                        return { success: false, message: error.message };
                    }
                },
                deleteProduct: async (id) => {
                    try {
                        const response = await api.delete(`/products/${id}`);
                        const { success, message } = response.data;
                
                        if (!success) return { success: false, message };
                        
                        // Calling the setter state function of zustand to re-render the UI after successful deletion from the backend side
                        set(prevState => ({
                            products: prevState.products.filter(product => product._id !== id)
                        }));
                
                        return { success: true, message: "Product deleted successfully!" };

                    } catch (error) {
                        set({ error: error.message });
                        return { success: false, message: error.message };
                    }
                }
            }),
            {
                name: 'products-storage',
                version: 1,
            }
        )
    )
)