import React from 'react';
import { Link } from 'react-router-dom';

export function Navbar({ onAuth, onCart }) {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-lg backdrop-saturate-150 bg-primary/60 border-b border-white/10">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="text-xl font-display font-bold text-white tracking-wide">DELTA12</Link>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link to="/catalog" className="hover:text-accent transition">Catalogus</Link>
          <Link to="/quote" className="hover:text-accent transition">Offerte</Link>
          <Link to="/faq" className="hover:text-accent transition">FAQ</Link>
          <Link to="/contact" className="hover:text-accent transition">Contact</Link>
          <button onClick={onCart} className="relative hover:text-accent transition">Winkelwagen</button>
          <Link to="/admin" className="px-3 py-1 rounded-md font-semibold bg-accent text-primary-900 hover:bg-white hover:text-accent border border-accent transition">Admin</Link>
          <button onClick={onAuth} className="ml-2 btn-outline text-xs px-3 py-1">Login</button>
        </nav>
      </div>
    </header>
  );
}
