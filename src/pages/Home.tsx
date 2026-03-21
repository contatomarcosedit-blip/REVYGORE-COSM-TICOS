import { Link } from 'react-router-dom';
import { ShoppingBag, ChevronRight, Star, ArrowRight, Quote } from 'lucide-react';
import { useStore } from '../store';
import { cn } from '../lib/utils';
import { useState, useEffect } from 'react';

const faqs = [
  { q: "Quais as formas de pagamento?", a: "Aceitamos PIX, cartões de crédito e débito. O pagamento é finalizado de forma segura via WhatsApp." },
  { q: "Como é calculado o frete?", a: "O frete é calculado com base no seu CEP. Enviamos de Caldas Novas - GO para todo o Brasil." },
  { q: "Qual o prazo de entrega?", a: "O prazo varia de acordo com a sua região e a modalidade de envio escolhida no momento do fechamento." },
  { q: "Os produtos são originais?", a: "Sim, trabalhamos apenas com produtos 100% originais e de alta qualidade." },
  { q: "Como faço para comprar?", a: "Basta adicionar os produtos ao carrinho, preencher seu CEP e finalizar. Você será direcionado ao nosso WhatsApp para concluir o pedido." },
  { q: "Posso retirar pessoalmente?", a: "Sim, se você for de Caldas Novas - GO, pode combinar a retirada diretamente conosco via WhatsApp." },
  { q: "Vocês vendem no atacado?", a: "Para compras em grande quantidade, entre em contato pelo nosso WhatsApp para condições especiais." },
  { q: "Como acompanho meu pedido?", a: "Após o envio, forneceremos o código de rastreio via WhatsApp para você acompanhar a entrega." },
  { q: "Qual a política de troca?", a: "Realizamos trocas em caso de defeito de fabricação ou avaria no transporte, desde que comunicado em até 7 dias após o recebimento." },
  { q: "Os produtos têm garantia?", a: "Sim, todos os produtos possuem garantia de fábrica contra defeitos." },
  { q: "Como escolher o produto ideal para minha pele?", a: "Você pode nos chamar no WhatsApp ou conferir nossas dicas no TikTok (@revygore.cosmtico) para recomendações personalizadas." },
  { q: "Vocês têm loja física?", a: "Atualmente nossa operação é 100% online, com base em Caldas Novas - GO." },
  { q: "O site é seguro?", a: "Sim, utilizamos tecnologias de ponta para garantir a segurança dos seus dados. O pagamento é feito fora do site, diretamente conosco." },
  { q: "Posso cancelar meu pedido?", a: "Sim, desde que o pedido ainda não tenha sido despachado. Entre em contato o mais rápido possível." },
  { q: "Como falo com a proprietária?", a: "A Jacira e nossa equipe estão sempre disponíveis no WhatsApp (64) 99219-4814 para te atender." }
];

const reviews = [
  { name: "Amanda Silva", text: "Produtos maravilhosos! O atendimento da Jacira é impecável. Chegou super rápido aqui em SP.", rating: 5 },
  { name: "Beatriz Costa", text: "Comprei o sérum e estou amando o resultado. Minha pele está muito mais iluminada.", rating: 5 },
  { name: "Carla Mendes", text: "Ótima qualidade, mas o frete demorou um dia a mais que o previsto. De resto, tudo perfeito.", rating: 4 },
  { name: "Daniela Oliveira", text: "Amei a máscara de argila! Deixa a pele super macia. Recomendo muito a loja.", rating: 5 },
  { name: "Fernanda Lima", text: "Sempre compro meus cosméticos aqui. Preço justo e produtos originais.", rating: 5 },
  { name: "Gabriela Santos", text: "O perfume é incrível, fixação maravilhosa. Comprarei novamente com certeza.", rating: 5 },
  { name: "Helena Souza", text: "Atendimento nota 10! Tive uma dúvida sobre qual produto escolher e me ajudaram muito.", rating: 5 },
  { name: "Isabela Ferreira", text: "Produtos muito bons, embalagem cuidadosa. Só achei o site um pouco lento no meu celular antigo.", rating: 4 },
  { name: "Juliana Alves", text: "O hidratante noturno salvou minha pele nesse inverno. Muito obrigada, Revygore!", rating: 5 },
  { name: "Larissa Ribeiro", text: "Tudo perfeito, desde a compra até a entrega. Ganharam uma cliente fiel.", rating: 5 }
];

export function Home() {
  const products = useStore((state) => state.products);
  const addToCart = useStore((state) => state.addToCart);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const categories = Array.from(new Set(products.map(p => p.category).filter(Boolean)));
  const featuredProducts = products.slice(0, 3);

  const filteredProducts = selectedCategory 
    ? products.filter(p => p.category === selectedCategory)
    : products;

  useEffect(() => {
    if (featuredProducts.length === 0) return;
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % featuredProducts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredProducts.length]);

  useEffect(() => {
    if (reviews.length === 0) return;
    const interval = setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1615397323758-1e427076f8c2?auto=format&fit=crop&q=80&w=2000" 
            alt="Cosméticos de luxo" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-amber-500 font-semibold tracking-[0.2em] uppercase text-sm mb-4 block">
            Beleza & Sofisticação
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 tracking-tight">
            Realce sua <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600">
              essência natural
            </span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto mb-10 font-light">
            Descubra nossa linha exclusiva de cosméticos selecionados pela Jacira para cuidar de você com a qualidade que você merece.
          </p>
          <a 
            href="#produtos"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-zinc-950 bg-amber-500 hover:bg-amber-400 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]"
          >
            Ver Coleção
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Featured Banner Carousel */}
      {featuredProducts.length > 0 && (
        <section className="py-12 bg-zinc-950 border-b border-zinc-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-3xl overflow-hidden bg-zinc-900 aspect-[21/9] md:aspect-[3/1] flex items-center">
              {featuredProducts.map((product, index) => (
                <div 
                  key={product.id}
                  className={cn(
                    "absolute inset-0 flex items-center transition-opacity duration-1000",
                    index === currentBannerIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                  )}
                >
                  <img src={product.imageUrl} alt={product.name} className="absolute inset-0 w-full h-full object-cover opacity-30" />
                  <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent" />
                  <div className="relative z-20 p-8 md:p-16 max-w-2xl">
                    <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-500 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                      Destaque
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">{product.name}</h2>
                    <p className="text-zinc-300 mb-8 line-clamp-2 md:line-clamp-3">{product.description}</p>
                    <button 
                      onClick={() => addToCart(product, 1)}
                      className="inline-flex items-center px-6 py-3 bg-white text-zinc-950 font-medium rounded-full hover:bg-zinc-200 transition-colors"
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Comprar Agora
                    </button>
                  </div>
                </div>
              ))}
              
              {/* Carousel Indicators */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
                {featuredProducts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentBannerIndex(index)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-300",
                      index === currentBannerIndex ? "bg-amber-500 w-6" : "bg-zinc-600 hover:bg-zinc-400"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Products Section */}
      <section id="produtos" className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">Nossos Produtos</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full mb-8" />
            
            {/* Categories */}
            {categories.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={cn(
                    "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                    selectedCategory === null 
                      ? "bg-amber-500 text-zinc-950 shadow-[0_0_15px_rgba(245,158,11,0.3)]" 
                      : "bg-zinc-900 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 border border-zinc-800"
                  )}
                >
                  Todos
                </button>
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                      selectedCategory === category 
                        ? "bg-amber-500 text-zinc-950 shadow-[0_0_15px_rgba(245,158,11,0.3)]" 
                        : "bg-zinc-900 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 border border-zinc-800"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group flex flex-col bg-zinc-900/50 rounded-2xl overflow-hidden border border-zinc-800/50 hover:border-amber-500/30 transition-all duration-300">
                <div className="relative aspect-square overflow-hidden bg-zinc-800">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {product.promotionalPrice && (
                    <div className="absolute top-4 left-4 bg-amber-500 text-zinc-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Oferta
                    </div>
                  )}
                  {product.category && (
                    <div className="absolute top-4 right-4 bg-zinc-950/80 backdrop-blur-sm text-zinc-300 text-xs px-3 py-1 rounded-full border border-zinc-800">
                      {product.category}
                    </div>
                  )}
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-medium text-zinc-100 mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  
                  <div className="mt-auto pt-4 flex items-end justify-between">
                    <div>
                      {product.promotionalPrice ? (
                        <div className="flex flex-col">
                          <span className="text-sm text-zinc-500 line-through">
                            R$ {product.price.toFixed(2).replace('.', ',')}
                          </span>
                          <span className="text-xl font-bold text-amber-500">
                            R$ {product.promotionalPrice.toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xl font-bold text-zinc-100">
                          R$ {product.price.toFixed(2).replace('.', ',')}
                        </span>
                      )}
                    </div>
                    
                    <button
                      onClick={() => addToCart(product, 1)}
                      disabled={product.quantity === 0}
                      className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-300 hover:bg-amber-500 hover:text-zinc-950 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Adicionar ao carrinho"
                    >
                      <ShoppingBag className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {filteredProducts.length === 0 && (
              <div className="col-span-full text-center py-12 text-zinc-500">
                Nenhum produto encontrado nesta categoria.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 bg-zinc-900/50 border-t border-zinc-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">O que dizem nossos clientes</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full mb-6" />
            <p className="text-zinc-400 text-sm flex items-center justify-center">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500 mr-2" />
              Avaliações reais de clientes no Google Maps
            </p>
          </div>

          <div className="max-w-4xl mx-auto relative">
            <div className="relative min-h-[350px] flex items-center justify-center">
              {reviews.map((review, index) => (
                <div 
                  key={index}
                  className={cn(
                    "absolute inset-0 transition-all duration-1000 flex flex-col items-center text-center",
                    index === currentReviewIndex 
                      ? "opacity-100 translate-y-0 z-10" 
                      : "opacity-0 translate-y-8 z-0 pointer-events-none"
                  )}
                >
                  <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-8 md:p-12 w-full shadow-xl">
                    <div className="flex items-center justify-center space-x-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={cn(
                            "w-6 h-6",
                            i < review.rating 
                              ? "fill-amber-500 text-amber-500" 
                              : "fill-zinc-800 text-zinc-800"
                          )} 
                        />
                      ))}
                    </div>
                    <Quote className="w-10 h-10 text-zinc-800 mx-auto mb-6" />
                    <p className="text-zinc-300 md:text-lg mb-8 italic leading-relaxed">"{review.text}"</p>
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-amber-500 font-bold text-xl mb-3">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-base font-bold text-zinc-100">{review.name}</p>
                        <p className="text-sm text-zinc-500">Cliente Verificado</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Review Indicators */}
            <div className="flex justify-center space-x-2 mt-8">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReviewIndex(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    index === currentReviewIndex ? "bg-amber-500 w-6" : "bg-zinc-600 hover:bg-zinc-400"
                  )}
                  aria-label={`Ver avaliação ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">Dúvidas Frequentes</h2>
            <p className="text-zinc-400">Tudo o que você precisa saber sobre a Revygore Cosméticos.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="font-medium text-zinc-200">{faq.q}</span>
                  <ChevronRight className={cn(
                    "w-5 h-5 text-amber-500 transition-transform duration-300",
                    openFaq === index ? "rotate-90" : ""
                  )} />
                </button>
                <div 
                  className={cn(
                    "px-6 overflow-hidden transition-all duration-300 ease-in-out",
                    openFaq === index ? "max-h-40 pb-4 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <p className="text-zinc-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
