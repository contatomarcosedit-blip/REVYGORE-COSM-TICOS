import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, Truck, MessageCircle, ShoppingBag } from 'lucide-react';
import { useStore } from '../store';
import { cn } from '../lib/utils';

export function Cart() {
  const cart = useStore((state) => state.cart);
  const updateQuantity = useStore((state) => state.updateCartQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const clearCart = useStore((state) => state.clearCart);

  const [cep, setCep] = useState('');
  const [shippingCost, setShippingCost] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const subtotal = cart.reduce((acc, item) => {
    const price = item.promotionalPrice || item.price;
    return acc + price * item.cartQuantity;
  }, 0);

  const total = subtotal + (shippingCost || 0);

  const handleCalculateShipping = () => {
    if (!cep || cep.length < 8) return;
    setIsCalculating(true);
    // Mock shipping calculation based on CEP
    setTimeout(() => {
      // If starts with 75 (GO), cheaper shipping
      if (cep.startsWith('75')) {
        setShippingCost(15.90);
      } else {
        setShippingCost(35.90);
      }
      setIsCalculating(false);
    }, 1000);
  };

  const handleCheckout = () => {
    const phoneNumber = '5564992194814'; // WhatsApp number
    
    let message = `*Novo Pedido - Revygore Cosméticos*\n\n`;
    message += `*Itens do Pedido:*\n`;
    
    cart.forEach(item => {
      const price = item.promotionalPrice || item.price;
      message += `- ${item.cartQuantity}x ${item.name} (R$ ${price.toFixed(2).replace('.', ',')})\n`;
    });
    
    message += `\n*Subtotal:* R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    
    if (shippingCost !== null) {
      message += `\n*Frete (CEP: ${cep}):* R$ ${shippingCost.toFixed(2).replace('.', ',')}`;
    }
    
    message += `\n*Total a Pagar:* R$ ${total.toFixed(2).replace('.', ',')}\n\n`;
    message += `Olá Jacira! Gostaria de finalizar este pedido.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    clearCart();
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center mb-6 border border-zinc-800">
          <ShoppingBag className="w-10 h-10 text-zinc-500" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-white mb-4">Seu carrinho está vazio</h2>
        <p className="text-zinc-400 mb-8 text-center max-w-md">
          Parece que você ainda não adicionou nenhum produto ao seu carrinho.
          Descubra nossa linha de cosméticos e realce sua beleza.
        </p>
        <Link 
          to="/"
          className="inline-flex items-center px-6 py-3 bg-amber-500 text-zinc-950 font-medium rounded-full hover:bg-amber-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Continuar Comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-serif font-bold text-white mb-8">Meu Carrinho</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => {
            const price = item.promotionalPrice || item.price;
            
            return (
              <div key={item.id} className="flex flex-col sm:flex-row items-center bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-4 gap-6">
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-zinc-800 shrink-0">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-grow flex flex-col justify-between h-full w-full">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-medium text-zinc-100 line-clamp-2 pr-4">{item.name}</h3>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-zinc-500 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center space-x-3 bg-zinc-950 rounded-full p-1 border border-zinc-800">
                      <button 
                        onClick={() => updateQuantity(item.id, Math.max(1, item.cartQuantity - 1))}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-amber-500 hover:bg-zinc-900 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-sm font-medium w-4 text-center">{item.cartQuantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, Math.min(item.quantity, item.cartQuantity + 1))}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-amber-500 hover:bg-zinc-900 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <span className="text-lg font-bold text-amber-500">
                        R$ {(price * item.cartQuantity).toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sticky top-24">
            <h2 className="text-xl font-serif font-bold text-white mb-6">Resumo do Pedido</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span className="text-zinc-100">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
              </div>
              
              {/* Shipping Calculator */}
              <div className="pt-4 border-t border-zinc-800">
                <label className="block text-sm font-medium text-zinc-300 mb-2 flex items-center">
                  <Truck className="w-4 h-4 mr-2 text-amber-500" />
                  Calcular Frete
                </label>
                <div className="flex space-x-2">
                  <input 
                    type="text" 
                    placeholder="00000-000"
                    value={cep}
                    onChange={(e) => setCep(e.target.value.replace(/\D/g, '').slice(0, 8))}
                    className="flex-grow bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-sm text-zinc-100 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                  <button 
                    onClick={handleCalculateShipping}
                    disabled={isCalculating || cep.length < 8}
                    className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-lg text-sm font-medium hover:bg-zinc-700 transition-colors disabled:opacity-50"
                  >
                    {isCalculating ? '...' : 'OK'}
                  </button>
                </div>
                {shippingCost !== null && (
                  <div className="flex justify-between text-sm mt-3 text-amber-500">
                    <span>Valor do Frete:</span>
                    <span className="font-medium">R$ {shippingCost.toFixed(2).replace('.', ',')}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-zinc-100">Total</span>
                <span className="text-2xl font-bold text-amber-500">
                  R$ {total.toFixed(2).replace('.', ',')}
                </span>
              </div>
              <p className="text-xs text-zinc-500 mt-1 text-right">Em até 3x sem juros</p>
            </div>

            <button 
              onClick={handleCheckout}
              className="w-full flex items-center justify-center px-6 py-4 bg-amber-500 text-zinc-950 font-bold rounded-xl hover:bg-amber-400 transition-all duration-300 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Finalizar no WhatsApp
            </button>
            <p className="text-xs text-zinc-500 text-center mt-4">
              Você será redirecionado para o WhatsApp da Jacira para concluir o pagamento de forma segura.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
