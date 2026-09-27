import React from 'react';

export function ProductCard({ product, onAdd }) {
  return (
    <div className="card group">
      <div className="relative mb-5 overflow-hidden rounded-lg">
        <img src={product.image} alt={product.name} className="aspect-video object-cover w-full transition duration-500 group-hover:scale-105" />
        {product.badge && <span className="badge absolute top-3 left-3 backdrop-blur-sm">{product.badge}</span>}
      </div>
      <h3 className="font-display text-xl font-semibold mb-2 text-white">{product.name}</h3>
      <p className="text-sm text-gray-300 mb-4 leading-relaxed">{product.description}</p>
      <div className="flex items-center justify-between mt-auto">
        <span className="text-accent font-bold text-lg">{product.priceLabel}</span>
        <button onClick={() => onAdd(product)} className="btn-primary px-4 py-2 rounded-md text-sm">Toevoegen</button>
      </div>
    </div>
  );
}
