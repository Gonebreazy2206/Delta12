
import React, { useState, useEffect } from 'react';

function App() {
  const [authOpen, setAuthOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    // fetch site content created by admin panel
    fetch('/assets/site-content.json', {cache: 'no-store'})
      .then(r => { if(!r.ok) throw new Error('Failed to load site content'); return r.json(); })
      .then(json => {
        setProducts(json.products || []);
      })
      .catch(err => {
        console.warn('Could not load products from site-content.json', err);
        // fallback sample products to keep the catalog populated during dev
        setProducts([
          {id:'p1', title:'Inbouwzwembad', description:'Luxe maatwerk inbouwzwembad met strakke lijnen.', image:'zwembad/placeholder1.jpg', alt: 'Inbouwzwembad met houten vlonder', type: 'inbouw'},
          {id:'p2', title:'Bovenbouwzwembad', description:'Comfortabel bovenbouwmodel met snelle installatie.', image:'zwembad/placeholder2.jpg', alt: 'Bovenbouw zwembad in tuin', type: 'bovenbouw'},
          {id:'p3', title:'Infinity Horizon', description:'Elegante infinity pool met panoramisch randontwerp.', image:'zwembad/placeholder3.jpg', alt: 'Infinity pool met ver uitzicht', type: 'wellness'},
          {id:'p4', title:'Lagoon Relax', description:'Wellness-georiënteerde pool met vaste zitjes.', image:'zwembad/placeholder4.jpg', alt: 'Wellness zwembad met zitbanken', type: 'wellness'},
          {id:'p5', title:'Urban Compact', description:'Klein, stijlvol zwembad voor stadstuinen.', image:'zwembad/placeholder5.jpg', alt: 'Compact zwembad in moderne stadstuin', type: 'inbouw'},
          {id:'p6', title:'Family Play', description:'Speels familiezwembad met extra diepte.', image:'zwembad/placeholder6.jpg', alt: 'Gezinnen spelen in een zwembad', type: 'bovenbouw'}
        ]);
      });
  }, []);

  return (
    <div className="bg-blue-50 min-h-screen text-gray-900 pt-20">
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 text-white p-4 flex justify-between items-center shadow-lg backdrop-blur-lg backdrop-saturate-150 bg-[#0a2540]/60 border-b border-white/10">
        <span className="font-bold text-2xl tracking-wide">DELTA12</span>
        <ul className="flex gap-6 items-center">
          <li><a href="#home" className="hover:text-[#00b4d8] transition">Home</a></li>
          <li><a href="#catalog" className="hover:text-[#00b4d8] transition">Catalogus</a></li>
          <li><a href="#quote" className="hover:text-[#00b4d8] transition">Offerte</a></li>
          <li><button onClick={() => setCartOpen(true)} className="hover:text-[#00b4d8] transition">Winkelwagen</button></li>
          <li><a href="#faq" className="hover:text-[#00b4d8] transition">FAQ</a></li>
          <li><a href="#contact" className="hover:text-[#00b4d8] transition">Contact</a></li>
          <li><a href="/admin_panel.html" aria-label="Admin dashboard" className="bg-[#00b4d8] text-[#0a2540] px-3 py-1 rounded font-semibold hover:bg-[#0a2540] hover:text-[#00b4d8] border border-[#00b4d8] transition">Admin</a></li>
          <li>
            <button onClick={() => setAuthOpen(true)} className="ml-4 bg-white text-[#0a2540] px-4 py-1 rounded shadow hover:bg-[#00b4d8] hover:text-white font-semibold transition">Login / Registreer</button>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section id="home" className="py-20 px-4 text-center bg-gradient-to-r from-[#0a2540] to-[#00b4d8] text-white relative">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-lg">Zwembad Offertes op Maat</h1>
          <p className="text-2xl mb-10">Ontwerp, vergelijk en bestel uw droomzwembad eenvoudig online</p>
          <a href="#quote" className="bg-[#00b4d8] text-[#0a2540] px-8 py-4 rounded shadow-lg hover:bg-white hover:text-[#00b4d8] font-bold text-xl transition">Start Offerte</a>
        </div>
        <div className="absolute right-0 bottom-0 hidden md:block opacity-30 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" alt="Zwembad" className="w-96 rounded-tl-3xl shadow-xl" />
        </div>
      </section>

      {/* Product Catalog Section */}
      <section id="catalog" className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-10 text-center">Zwembad Catalogus</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {/* Render products from assets/site-content.json so admin edits are reflected */}
          {products && products.length > 0 ? (
            products.map((p, idx) => {
              const name = p.title || p.name || `Product ${idx+1}`;
              const description = p.description || p.desc || '';
              const priceLabel = p.price || p.priceLabel || '';
              const img = p.image || p.img || 'assets/pool-fallback.jpg';
              return (
                <div key={name + idx} className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center min-h-[340px] text-center">
                  <img src={img} alt={p.alt || name} className="w-44 h-36 object-cover rounded mb-5" />
                  <h3 className="font-bold text-2xl mb-2 leading-tight break-words">{name}</h3>
                  <p className="mb-4 text-gray-600">{description}</p>
                  <span className="text-xl font-bold text-[#00b4d8] mb-2">{priceLabel}</span>
                  <button className="bg-[#00b4d8] text-[#0a2540] px-6 py-2 rounded font-semibold hover:bg-[#0a2540] hover:text-[#00b4d8] transition">Toevoegen aan offerte</button>
                </div>
              );
            })
          ) : (
            <div className="md:col-span-3 text-center text-gray-500">Geen producten gevonden. Voeg producten toe via het admin paneel.</div>
          )}
        </div>
      </section>

      <script>
        // placeholder
      </script>

      {/* Quote Builder Section */}
      <section id="quote" className="py-16 px-4 bg-blue-50">
        <h2 className="text-4xl font-bold mb-10 text-center">Stel uw Offerte Samen</h2>
        <form className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-10 space-y-8">
          <div>
            <label className="block mb-2 font-semibold" htmlFor="naam">Naam</label>
            <input className="w-full border border-gray-300 rounded px-4 py-2" type="text" id="naam" name="naam" required />
          </div>
          <div>
            <label className="block mb-2 font-semibold" htmlFor="email">E-mail</label>
            <input className="w-full border border-gray-300 rounded px-4 py-2" type="email" id="email" name="email" required />
          </div>
          <div>
            <label className="block mb-2 font-semibold" htmlFor="type">Type zwembad</label>
            <select className="w-full border border-gray-300 rounded px-4 py-2" id="type" name="type">
              <option>Inbouw</option>
              <option>Bovenbouw</option>
              <option>Wellness</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 font-semibold" htmlFor="addons">Extra opties</label>
            <div className="flex flex-wrap gap-4">
              {['Verlichting', 'Jetstream', 'Zoutwaterinstallatie', 'Afdekking'].map(opt => (
                <label key={opt} className="flex items-center gap-2">
                  <input type="checkbox" name="addons" value={opt} /> {opt}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block mb-2 font-semibold" htmlFor="bericht">Bericht / wensen</label>
            <textarea className="w-full border border-gray-300 rounded px-4 py-2" id="bericht" name="bericht" rows="4"></textarea>
          </div>
          <button type="submit" className="w-full bg-[#00b4d8] text-[#0a2540] py-4 rounded font-bold hover:bg-[#0a2540] hover:text-[#00b4d8] text-xl transition">Offerte aanvragen</button>
        </form>
      </section>

      {/* Cart Modal */}
      {cartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-10 w-full max-w-lg relative">
            <button onClick={() => setCartOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-[#0a2540] text-2xl">&times;</button>
            <h2 className="text-3xl font-bold mb-8 text-center">Winkelwagen</h2>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <p className="text-gray-600 mb-4">Uw geselecteerde zwembaden en opties verschijnen hier.</p>
              <ul className="divide-y divide-gray-200 mb-6">
                <li className="py-4 flex justify-between items-center">
                  <span className="font-semibold">Inbouwzwembad + Verlichting</span>
                  <span className="text-[#00b4d8] font-bold">€16.000</span>
                </li>
                <li className="py-4 flex justify-between items-center">
                  <span className="font-semibold">Wellness + Jetstream</span>
                  <span className="text-[#00b4d8] font-bold">€5.500</span>
                </li>
              </ul>
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-xl">Totaal</span>
                <span className="text-2xl font-bold text-[#0a2540]">€21.500</span>
              </div>
              <a href="#checkout" className="w-full block bg-[#00b4d8] text-[#0a2540] py-4 rounded font-bold hover:bg-[#0a2540] hover:text-[#00b4d8] text-xl text-center transition">Afrekenen</a>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Section */}
      <section id="checkout" className="py-16 px-4 max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">Afrekenen</h2>
        <form className="bg-white rounded-xl shadow-lg p-10 space-y-8">
          <div>
            <label className="block mb-2 font-semibold" htmlFor="checkout-naam">Naam</label>
            <input className="w-full border border-gray-300 rounded px-4 py-2" type="text" id="checkout-naam" name="checkout-naam" required />
          </div>
          <div>
            <label className="block mb-2 font-semibold" htmlFor="checkout-email">E-mail</label>
            <input className="w-full border border-gray-300 rounded px-4 py-2" type="email" id="checkout-email" name="checkout-email" required />
          </div>
          <div>
            <label className="block mb-2 font-semibold" htmlFor="checkout-adres">Adres</label>
            <input className="w-full border border-gray-300 rounded px-4 py-2" type="text" id="checkout-adres" name="checkout-adres" required />
          </div>
          <div>
            <label className="block mb-2 font-semibold" htmlFor="checkout-betaling">Betaalmethode</label>
            <select className="w-full border border-gray-300 rounded px-4 py-2" id="checkout-betaling" name="checkout-betaling">
              <option>iDEAL</option>
              <option>Creditcard</option>
              <option>PayPal</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-[#00b4d8] text-[#0a2540] py-4 rounded font-bold hover:bg-[#0a2540] hover:text-[#00b4d8] text-xl transition">Bestelling plaatsen</button>
        </form>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 px-4 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">Veelgestelde Vragen</h2>
        <div className="space-y-6">
          <div className="bg-white rounded shadow p-6">
            <h3 className="font-bold text-lg mb-2">Hoe lang duurt de installatie van een zwembad?</h3>
            <p>Gemiddeld 2-6 weken, afhankelijk van het type en de opties.</p>
          </div>
          <div className="bg-white rounded shadow p-6">
            <h3 className="font-bold text-lg mb-2">Kan ik mijn offerte later aanpassen?</h3>
            <p>Ja, u kunt uw offerte op elk moment wijzigen voordat u bestelt.</p>
          </div>
          <div className="bg-white rounded shadow p-6">
            <h3 className="font-bold text-lg mb-2">Welke betaalmethoden zijn er?</h3>
            <p>iDEAL, Creditcard en PayPal worden ondersteund.</p>
          </div>
        </div>
      </section>

      {/* Testimonials removed as requested */}

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 max-w-xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">Contact</h2>
        <form className="bg-white rounded-xl shadow-lg p-10 space-y-8">
          <div>
            <label className="block mb-2 font-semibold" htmlFor="contact-naam">Naam</label>
            <input className="w-full border border-gray-300 rounded px-4 py-2" type="text" id="contact-naam" name="contact-naam" required />
          </div>
          <div>
            <label className="block mb-2 font-semibold" htmlFor="contact-email">E-mail</label>
            <input className="w-full border border-gray-300 rounded px-4 py-2" type="email" id="contact-email" name="contact-email" required />
          </div>
          <div>
            <label className="block mb-2 font-semibold" htmlFor="contact-bericht">Bericht</label>
            <textarea className="w-full border border-gray-300 rounded px-4 py-2" id="contact-bericht" name="contact-bericht" rows="4"></textarea>
          </div>
          <button type="submit" className="w-full bg-[#00b4d8] text-[#0a2540] py-4 rounded font-bold hover:bg-[#0a2540] hover:text-[#00b4d8] text-xl transition">Verstuur Bericht</button>
        </form>
          <div className="mt-8 text-center">
            <p className="font-semibold">DELTA12</p>
            <p>Postbus 225</p>
            <p>1270 AE Huizen</p>
            <p>T: <a href="tel:+31358200418" className="text-[#00b4d8]">+31 35 82 00 418</a></p>
            <p>E: <a href="mailto:deltablaricum@gmail.com" className="text-[#00b4d8]">deltablaricum@gmail.com</a></p>
            <p className="text-sm mt-2">KvK 68425554 | BTW NL001761628B71 | IBAN NL87 INGB 0007 5581 49 | BIC INGBNL2A</p>
          </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a2540] text-white text-center py-8 mt-16 shadow-inner">
        <p className="mb-2">&copy; 2025 DELTA12 Zwembad Specialist. Alle rechten voorbehouden.</p>
        <div className="flex justify-center gap-6 text-[#00b4d8]">
          <a href="#" className="hover:underline">Privacybeleid</a>
          <a href="#" className="hover:underline">Algemene voorwaarden</a>
          <a href="/admin_panel.html" className="hover:underline">Admin dashboard</a>
        </div>
      </footer>

      {/* Auth Modal */}
      {authOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-10 w-full max-w-md relative">
            <button onClick={() => setAuthOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-[#0a2540] text-2xl">&times;</button>
            <h2 className="text-2xl font-bold mb-6 text-center">Login / Registreer</h2>
            <form className="space-y-6">
              <div>
                <label className="block mb-2 font-semibold" htmlFor="auth-email">E-mail</label>
                <input className="w-full border border-gray-300 rounded px-4 py-2" type="email" id="auth-email" name="auth-email" required />
              </div>
              <div>
                <label className="block mb-2 font-semibold" htmlFor="auth-password">Wachtwoord</label>
                <input className="w-full border border-gray-300 rounded px-4 py-2" type="password" id="auth-password" name="auth-password" required />
              </div>
              <button type="submit" className="w-full bg-[#00b4d8] text-[#0a2540] py-3 rounded font-bold hover:bg-[#0a2540] hover:text-[#00b4d8] text-xl transition">Login</button>
            </form>
            <div className="mt-6 text-center text-gray-500">
              <span>Nog geen account? <a href="#" className="text-[#00b4d8] font-semibold hover:underline">Registreer</a></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
