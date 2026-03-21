import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore, Product } from '../store';
import { Plus, Edit2, Trash2, LogOut, Image as ImageIcon, Package, DollarSign } from 'lucide-react';
import { cn } from '../lib/utils';

export function AdminDashboard() {
  const navigate = useNavigate();
  const { products, isAdminAuthenticated, logoutAdmin, deleteProduct, addProduct, updateProduct } = useStore();
  
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    description: '',
    price: 0,
    promotionalPrice: undefined,
    quantity: 0,
    imageUrl: '',
    category: ''
  });

  useEffect(() => {
    if (!isAdminAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAdminAuthenticated, navigate]);

  if (!isAdminAuthenticated) return null;

  const handleLogout = () => {
    logoutAdmin();
    navigate('/');
  };

  const openForm = (product?: Product) => {
    if (product) {
      setIsEditing(product.id);
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        promotionalPrice: product.promotionalPrice,
        quantity: product.quantity,
        imageUrl: product.imageUrl,
        category: product.category || ''
      });
    } else {
      setIsEditing(null);
      setFormData({
        name: '',
        description: '',
        price: 0,
        promotionalPrice: undefined,
        quantity: 0,
        imageUrl: '',
        category: ''
      });
    }
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      updateProduct(isEditing, formData);
    } else {
      addProduct(formData);
    }
    setIsFormOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white mb-2">Painel de Controle</h1>
          <p className="text-zinc-400">Gerencie seus produtos e estoque.</p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => openForm()}
            className="flex items-center px-4 py-2 bg-amber-500 text-zinc-950 font-bold rounded-xl hover:bg-amber-400 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Novo Produto
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 bg-zinc-800 text-zinc-300 font-medium rounded-xl hover:bg-zinc-700 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Sair
          </button>
        </div>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-2xl p-8 my-8 relative">
            <h2 className="text-2xl font-serif font-bold text-white mb-6">
              {isEditing ? 'Editar Produto' : 'Novo Produto'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Nome do Produto</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Categoria</label>
                    <input
                      type="text"
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Ex: Skincare, Maquiagem, Cabelos..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">URL da Imagem</label>
                    <div className="relative">
                      <ImageIcon className="absolute left-3 top-3.5 w-5 h-5 text-zinc-500" />
                      <input
                        type="url"
                        required
                        value={formData.imageUrl}
                        onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-zinc-100 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">Preço (R$)</label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3.5 w-5 h-5 text-zinc-500" />
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          required
                          value={formData.price}
                          onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-zinc-100 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">Promocional (R$)</label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3.5 w-5 h-5 text-zinc-500" />
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={formData.promotionalPrice || ''}
                          onChange={(e) => setFormData({...formData, promotionalPrice: e.target.value ? parseFloat(e.target.value) : undefined})}
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-zinc-100 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="Opcional"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Quantidade em Estoque</label>
                    <div className="relative">
                      <Package className="absolute left-3 top-3.5 w-5 h-5 text-zinc-500" />
                      <input
                        type="number"
                        min="0"
                        required
                        value={formData.quantity}
                        onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value)})}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-zinc-100 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Descrição</label>
                  <textarea
                    required
                    maxLength={1000}
                    rows={12}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                    placeholder="Descreva o produto (máx. 1000 caracteres)..."
                  />
                  <div className="text-right text-xs text-zinc-500 mt-2">
                    {formData.description.length} / 1000
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-6 py-3 bg-zinc-800 text-zinc-300 font-medium rounded-xl hover:bg-zinc-700 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-amber-500 text-zinc-950 font-bold rounded-xl hover:bg-amber-400 transition-colors"
                >
                  Salvar Produto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product List */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-900 border-b border-zinc-800">
                <th className="px-6 py-4 text-sm font-semibold text-zinc-300 uppercase tracking-wider">Produto</th>
                <th className="px-6 py-4 text-sm font-semibold text-zinc-300 uppercase tracking-wider">Preço</th>
                <th className="px-6 py-4 text-sm font-semibold text-zinc-300 uppercase tracking-wider">Estoque</th>
                <th className="px-6 py-4 text-sm font-semibold text-zinc-300 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-zinc-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-zinc-800 shrink-0">
                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-medium text-zinc-100">{product.name}</div>
                        <div className="text-sm text-zinc-500 truncate max-w-xs">{product.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      {product.promotionalPrice ? (
                        <>
                          <span className="text-xs text-zinc-500 line-through">R$ {product.price.toFixed(2).replace('.', ',')}</span>
                          <span className="text-amber-500 font-bold">R$ {product.promotionalPrice.toFixed(2).replace('.', ',')}</span>
                        </>
                      ) : (
                        <span className="text-zinc-100 font-medium">R$ {product.price.toFixed(2).replace('.', ',')}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                      product.quantity > 10 ? "bg-emerald-500/10 text-emerald-400" : 
                      product.quantity > 0 ? "bg-amber-500/10 text-amber-400" : "bg-red-500/10 text-red-400"
                    )}>
                      {product.quantity} unid.
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-3">
                      <button 
                        onClick={() => openForm(product)}
                        className="p-2 text-zinc-400 hover:text-amber-500 transition-colors"
                        title="Editar"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => deleteProduct(product.id)}
                        className="p-2 text-zinc-400 hover:text-red-500 transition-colors"
                        title="Excluir"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-zinc-500">
                    Nenhum produto cadastrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
