import React from 'react';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section className="relative section overflow-hidden">
      <div className="absolute inset-0 bg-mesh-radial opacity-70" />
      <div className="relative container text-center animate-fade-in">
        <p className="uppercase tracking-widest text-accent font-medium mb-4">Premium Pool Design Platform</p>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-gradient">Zwembad Offertes op Maat</h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10">Configureer, vergelijk en bestel – één gestroomlijnde ervaring voor high-end zwembaden en wellness.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/quote" className="btn-primary px-8 py-4 text-lg rounded-lg shadow-elevated">Start Offerte</Link>
          <Link to="/catalog" className="btn-outline px-8 py-4 text-lg rounded-lg">Bekijk Catalogus</Link>
        </div>
      </div>
      <div className="pointer-events-none select-none absolute -bottom-24 left-1/2 -translate-x-1/2 w-[110%] aspect-[3/1] bg-hero-glow blur-3xl opacity-40" />
    </section>
  );
}
