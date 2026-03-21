import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '../store';
import { cn } from '../lib/utils';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cart = useStore((state) => state.cart);
  const isAdminAuthenticated = useStore((state) => state.isAdminAuthenticated);

  const cartItemCount = cart.reduce((acc, item) => acc + item.cartQuantity, 0);

  return (
    <nav className="bg-zinc-950 text-zinc-50 sticky top-0 z-50 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-zinc-900 border border-amber-500/30 flex items-center justify-center overflow-hidden">
              <img src="https://www.dropbox.com/scl/fi/l2h37cstuabeq4f5v7n19/WhatsApp-Image-2026-03-20-at-11.25.19.jpeg?rlkey=o3sy1b7rzgdqeeg7uamnsmat8&st=bg7fau1e&raw=1" alt="Revygore Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-semibold tracking-wide text-amber-50">REVYGORE</span>
              <span className="text-[10px] tracking-[0.2em] text-amber-500/80 uppercase">Cosméticos</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium text-zinc-300 hover:text-amber-400 transition-colors">Início</Link>
            <a href="#produtos" className="text-sm font-medium text-zinc-300 hover:text-amber-400 transition-colors">Produtos</a>
            <a href="#faq" className="text-sm font-medium text-zinc-300 hover:text-amber-400 transition-colors">Dúvidas</a>
            
            <div className="flex items-center space-x-6 pl-6 border-l border-zinc-800">
              <Link to="/cart" className="relative group p-2">
                <ShoppingBag className="w-6 h-6 text-zinc-300 group-hover:text-amber-400 transition-colors" />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-zinc-950 transform translate-x-1/4 -translate-y-1/4 bg-amber-500 rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </Link>
              
              <Link to="/admin/dashboard" className="p-2 text-zinc-300 hover:text-amber-400 transition-colors">
                <User className="w-6 h-6" />
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative p-2">
              <ShoppingBag className="w-6 h-6 text-zinc-300" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-zinc-950 transform translate-x-1/4 -translate-y-1/4 bg-amber-500 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-zinc-300 hover:text-amber-400 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={cn("md:hidden", isMenuOpen ? "block" : "hidden")}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-zinc-900 border-b border-zinc-800">
          <Link 
            to="/" 
            className="block px-3 py-2 rounded-md text-base font-medium text-zinc-300 hover:text-amber-400 hover:bg-zinc-800"
            onClick={() => setIsMenuOpen(false)}
          >
            Início
          </Link>
          <a 
            href="#produtos" 
            className="block px-3 py-2 rounded-md text-base font-medium text-zinc-300 hover:text-amber-400 hover:bg-zinc-800"
            onClick={() => setIsMenuOpen(false)}
          >
            Produtos
          </a>
          <a 
            href="#faq" 
            className="block px-3 py-2 rounded-md text-base font-medium text-zinc-300 hover:text-amber-400 hover:bg-zinc-800"
            onClick={() => setIsMenuOpen(false)}
          >
            Dúvidas Frequentes
          </a>
          <Link 
            to="/admin/dashboard" 
            className="block px-3 py-2 rounded-md text-base font-medium text-amber-500 hover:bg-zinc-800"
            onClick={() => setIsMenuOpen(false)}
          >
            {isAdminAuthenticated ? 'Painel Admin' : 'Login Admin'}
          </Link>
        </div>
      </div>
    </nav>
  );
}
