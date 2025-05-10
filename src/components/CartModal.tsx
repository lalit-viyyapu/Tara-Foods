import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import type { CartModalProps } from '../types';

export const CartModal: React.FC<CartModalProps> = ({ show, onHide, cart, pickles, onUpdateCart }) => {
  const [orderNotes, setOrderNotes] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const getOrderMessage = () => {
    if (cart.length === 0) return '';
    let msg = 'Hi, I would like to order the following pickles:\n';
    let total = 0;
    cart.forEach(item => {
      const pickle = pickles[item.idx];
      const itemTotal = pickle.price * item.qty;
      total += itemTotal;
      msg += `- ${pickle.name} (${item.qty} kg) = ₹${itemTotal}\n`;
    });
    msg += `\nTotal: ₹${total}`;
    if (orderNotes.trim()) {
      msg += `\n\nNote: ${orderNotes.trim()}`;
    }
    return msg;
  };

  const handleCopyOrder = () => {
    const textarea = document.createElement('textarea');
    textarea.value = getOrderMessage();
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  };

  const handleWhatsApp = () => {
    const msg = getOrderMessage().replace(/\n/g, '%0A');
    window.open(`https://wa.me/919849002243?text=${msg}`, '_blank');
  };

  const changeQty = (index: number, delta: number) => {
    const newCart = [...cart];
    newCart[index].qty = Math.max(0.25, Math.round((newCart[index].qty + delta) * 100) / 100);
    onUpdateCart(newCart);
  };

  const removeItem = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    onUpdateCart(newCart);
  };

  const total = cart.reduce((sum, item) => sum + pickles[item.idx].price * item.qty, 0);

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Your Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cart.length === 0 ? (
          <p className="text-center text-muted">Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item, i) => {
                const pickle = pickles[item.idx];
                const itemTotal = pickle.price * item.qty;
                return (
                  <div key={i} className="cart-item-row">
                    <div>
                      <strong>{pickle.name}</strong>
                      <span className={`badge ${pickle.type === 'veg' ? 'bg-success' : 'bg-danger'} ms-2`}>
                        {pickle.type === 'veg' ? 'Veg' : 'Non-Veg'}
                      </span>
                      <br />
                      <small>₹{pickle.price}/kg</small>
                    </div>
                    <div>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => changeQty(i, -0.25)}
                      >
                        -
                      </Button>
                      <input
                        type="number"
                        min="0.25"
                        step="0.25"
                        className="cart-item-qty"
                        value={item.qty}
                        onChange={(e) => {
                          const newCart = [...cart];
                          newCart[i].qty = Math.max(0.25, parseFloat(e.target.value) || 0.25);
                          onUpdateCart(newCart);
                        }}
                      />
                      <span className="cart-qty-unit">kg</span>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => changeQty(i, 0.25)}
                      >
                        +
                      </Button>
                      <span className="ms-3">₹{itemTotal}</span>
                      <span className="remove-cart-item" onClick={() => removeItem(i)}>
                        &times;
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mb-3 mt-4">
              <label htmlFor="orderNotes" className="form-label">
                Add a note for personalization or modifications (optional):
              </label>
              <textarea
                id="orderNotes"
                className="form-control"
                rows={2}
                placeholder="E.g. More spicy, less oil, etc."
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
              />
            </div>
            <div className="d-flex justify-content-between align-items-center mt-2 flex-wrap gap-2">
              <h5>
                Total: <span>₹{total}</span>
              </h5>
              <div className="d-flex gap-2">
                <Button variant="secondary" onClick={() => setShowPreview(!showPreview)}>
                  Preview Message
                </Button>
                <Button variant="success" onClick={handleWhatsApp}>
                  Send on WhatsApp
                </Button>
              </div>
            </div>
            {showPreview && (
              <div className="mt-3">
                <label htmlFor="orderPreviewText" className="form-label">
                  Order Message (copy and send on WhatsApp):
                </label>
                <div className="input-group">
                  <textarea
                    id="orderPreviewText"
                    className="form-control"
                    rows={4}
                    value={getOrderMessage()}
                    readOnly
                  />
                  <Button variant="outline-primary" onClick={handleCopyOrder}>
                    Copy
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}; 