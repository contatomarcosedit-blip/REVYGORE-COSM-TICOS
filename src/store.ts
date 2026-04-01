import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  promotionalPrice?: number;
  quantity: number;
  imageUrl: string;
  category: string;
}

export interface Promotion {
  id: string;
  name: string;
  description: string;
  originalPrice: number;
  promotionalPrice: number;
  imageUrl: string;
}

export interface CartItem extends Product {
  cartQuantity: number;
}

interface StoreState {
  products: Product[];
  promotions: Promotion[];
  cart: CartItem[];
  isAdminAuthenticated: boolean;
  loginAdmin: (user: string, pass: string) => boolean;
  logoutAdmin: () => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addPromotion: (promotion: Omit<Promotion, 'id'>) => void;
  updatePromotion: (id: string, promotion: Partial<Promotion>) => void;
  deletePromotion: (id: string) => void;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

// Initial mock products for demonstration
const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Sérum Revitalizante Ouro 24k',
    description: 'Sérum facial luxuoso com partículas de ouro 24k, ácido hialurônico e vitamina C. Promove hidratação profunda, luminosidade e redução de linhas finas. Ideal para todos os tipos de pele.',
    price: 189.90,
    promotionalPrice: 149.90,
    quantity: 50,
    imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
    category: 'Skincare',
  },
  {
    id: '2',
    name: 'Creme Hidratante Noturno Revygore',
    description: 'Creme de tratamento noturno intensivo. Repara a barreira cutânea enquanto você dorme, com extratos botânicos e peptídeos que estimulam a produção de colágeno.',
    price: 129.90,
    quantity: 30,
    imageUrl: 'https://images.unsplash.com/photo-1611078489935-0cb964de46d6?auto=format&fit=crop&q=80&w=800',
    category: 'Skincare',
  },
  {
    id: '3',
    name: 'Óleo Capilar Nutritivo Argan & Macadâmia',
    description: 'Blend de óleos nobres para cabelos ressecados e com frizz. Proporciona brilho intenso, maciez e proteção térmica sem pesar os fios.',
    price: 89.90,
    promotionalPrice: 69.90,
    quantity: 100,
    imageUrl: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=800',
    category: 'Cabelos',
  },
  {
    id: '4',
    name: 'Máscara de Argila Rosa Purificante',
    description: 'Máscara facial de argila rosa, rica em minerais. Limpa profundamente os poros, controla a oleosidade e acalma a pele sensível, deixando-a com um toque aveludado.',
    price: 59.90,
    quantity: 20,
    imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bf85033e5a?auto=format&fit=crop&q=80&w=800',
    category: 'Skincare',
  },
  {
    id: '5',
    name: 'Batom Matte Aveludado Vermelho Intenso',
    description: 'Batom líquido com acabamento matte aveludado. Alta pigmentação, longa duração e não transfere. Enriquecido com vitamina E.',
    price: 45.90,
    quantity: 40,
    imageUrl: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=800',
    category: 'Maquiagem',
  },
  {
    id: '6',
    name: 'Perfume Floral Elegance 50ml',
    description: 'Fragrância floral sofisticada com notas de jasmim, rosa e baunilha. Perfeito para ocasiões especiais.',
    price: 259.90,
    promotionalPrice: 219.90,
    quantity: 15,
    imageUrl: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800',
    category: 'Perfumaria',
  }
];

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      products: initialProducts,
      promotions: [],
      cart: [],
      isAdminAuthenticated: false,

      loginAdmin: (user, pass) => {
        if (user === 'contatorevigorecosméticos.com.br' && pass === '052025@Qluh') {
          set({ isAdminAuthenticated: true });
          return true;
        }
        return false;
      },

      logoutAdmin: () => set({ isAdminAuthenticated: false }),

      addProduct: (product) => set((state) => ({
        products: [...state.products, { ...product, id: crypto.randomUUID() }]
      })),

      updateProduct: (id, updatedFields) => set((state) => ({
        products: state.products.map(p => p.id === id ? { ...p, ...updatedFields } : p)
      })),

      deleteProduct: (id) => set((state) => ({
        products: state.products.filter(p => p.id !== id)
      })),

      addPromotion: (promotion) => set((state) => ({
        promotions: [...state.promotions, { ...promotion, id: crypto.randomUUID() }]
      })),

      updatePromotion: (id, updatedFields) => set((state) => ({
        promotions: state.promotions.map(p => p.id === id ? { ...p, ...updatedFields } : p)
      })),

      deletePromotion: (id) => set((state) => ({
        promotions: state.promotions.filter(p => p.id !== id)
      })),

      addToCart: (product, quantity) => set((state) => {
        const existingItem = state.cart.find(item => item.id === product.id);
        if (existingItem) {
          return {
            cart: state.cart.map(item =>
              item.id === product.id
                ? { ...item, cartQuantity: item.cartQuantity + quantity }
                : item
            )
          };
        }
        return { cart: [...state.cart, { ...product, cartQuantity: quantity }] };
      }),

      removeFromCart: (id) => set((state) => ({
        cart: state.cart.filter(item => item.id !== id)
      })),

      updateCartQuantity: (id, quantity) => set((state) => ({
        cart: state.cart.map(item =>
          item.id === id ? { ...item, cartQuantity: quantity } : item
        )
      })),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'revygore-storage',
    }
  )
);
