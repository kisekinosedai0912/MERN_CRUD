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
                        
                        set((state) => ({ 
                            products: [...state.products, responseData],
                            loading: false 
                        }));

                        return { 
                            success: true, 
                            message: 'Product added successfully!',
                            data: response.data.data 
                        };

                    } catch (error) {
                        set({ loading: false, error: error.message });
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