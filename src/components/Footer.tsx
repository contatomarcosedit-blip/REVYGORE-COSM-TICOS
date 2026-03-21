import { Instagram, MessageCircle, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400 py-12 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-zinc-900 border border-amber-500/30 flex items-center justify-center overflow-hidden">
                <img src="https://www.dropbox.com/scl/fi/l2h37cstuabeq4f5v7n19/WhatsApp-Image-2026-03-20-at-11.25.19.jpeg?rlkey=o3sy1b7rzgdqeeg7uamnsmat8&st=bg7fau1e&raw=1" alt="Revygore Logo" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg font-semibold tracking-wide text-amber-50">REVYGORE</span>
                <span className="text-[9px] tracking-[0.2em] text-amber-500/80 uppercase">Cosméticos</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-sm">
              Sua beleza em primeiro lugar. Oferecemos os melhores cosméticos para cuidar de você com qualidade e sofisticação.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/revygorecosmeticos" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-amber-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://chat.whatsapp.com/ELwNOJqR4gg99PEbRFnejV?mode=ems_copy_c" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-amber-500 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="https://www.tiktok.com/@revygore.cosmtico" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-amber-500 transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-100 uppercase tracking-wider mb-4">Contato</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4 text-amber-500" />
                <span>(64) 99219-4814</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-amber-500 mt-0.5" />
                <span>Caldas Novas - GO</span>
              </li>
              <li>Proprietária: Jacira</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-100 uppercase tracking-wider mb-4">Links Rápidos</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#produtos" className="hover:text-amber-500 transition-colors">Produtos</a></li>
              <li><a href="#faq" className="hover:text-amber-500 transition-colors">Dúvidas Frequentes</a></li>
              <li><a href="/admin/login" className="hover:text-amber-500 transition-colors">Área Restrita</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-zinc-900 text-xs text-center">
          <p>&copy; {new Date().getFullYear()} Revygore Cosméticos. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
