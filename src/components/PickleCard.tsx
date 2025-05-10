import { useState } from 'react';
import type { PickleCardProps } from '../types';

export const PickleCard: React.FC<PickleCardProps> = ({ pickle, idx, onAddToCart }) => {
  const [qty, setQty] = useState(0.25);

  const handleAddToCart = () => {
    onAddToCart(idx, qty);
  };

  return (
    <div className="col-md-4 mb-4">
      <div className={`card h-100 ${pickle.type === 'veg' ? 'veg-card' : 'nonveg-card'}`}>
        {pickle.img && <img src={pickle.img} className="card-img-top" alt={pickle.name} />}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{pickle.name}</h5>
          <p className="card-text">{pickle.desc}</p>
          <p className="fw-bold">₹{pickle.price}/kg</p>
          <div className="input-group mb-2">
            <input
              type="number"
              min="0.25"
              step="0.25"
              value={qty}
              onChange={(e) => setQty(Math.max(0.25, parseFloat(e.target.value) || 0.25))}
              className="form-control add-cart-qty"
              style={{ maxWidth: '90px' }}
            />
            <span className="input-group-text">kg</span>
            <button
              className="btn btn-success add-cart-btn"
              onClick={handleAddToCart}
              disabled={!pickle.available}
            >
              {pickle.available ? (
                <>
                  <i className="bi bi-cart-plus"></i> Add to Cart
                </>
              ) : (
                'Out of Stock'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 