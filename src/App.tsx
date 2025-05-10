import { useState } from 'react'
import { Button, Toast } from 'react-bootstrap'
import { PickleCard } from './components/PickleCard'
import { CartModal } from './components/CartModal'
import { pickles } from './data/pickles'
import type { CartItem } from './types'
import './App.css'

function App() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [showCart, setShowCart] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const addToCart = (idx: number, qty: number) => {
    const existing = cart.find(item => item.idx === idx)
    if (existing) {
      setCart(cart.map(item => 
        item.idx === idx 
          ? { ...item, qty: Math.round((item.qty + qty) * 100) / 100 }
          : item
      ))
    } else {
      setCart([...cart, { idx, qty }])
    }
    setShowToast(true)
  }

  return (
    <div className="App">
      <div className="background-decor"></div>

      {/* Fixed Cart Button */}
      <Button
        variant="light"
        className="position-fixed"
        id="cartBtn"
        onClick={() => setShowCart(true)}
      >
        <i className="bi bi-cart4"></i> Cart
        <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
          {cart.reduce((sum, item) => sum + item.qty, 0)}
        </span>
      </Button>

      {/* Hero Section */}
      <section className="hero text-center py-5">
        <div className="container">
          <div className="d-flex justify-content-center align-items-center mb-5">
            <h1 className="brand-name m-0">
              <i className="bi bi-egg-fried"></i> Tara Foods
            </h1>
          </div>
          <h2 className="display-4 fw-bold">Authentic Homemade Indian Pickles</h2>
          <p className="lead">Handcrafted with love and tradition. Taste the difference!</p>
          <a href="#nonveg-pickles" className="btn btn-light btn-lg mt-3">
            Order Now
          </a>
        </div>
      </section>

      {/* Non-Vegetarian Pickle List */}
      <section id="nonveg-pickles" className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">Non-Vegetarian Pickles</h2>
          <div className="row">
            {pickles
              .filter(p => p.type === 'nonveg')
              .map((pickle, idx) => (
                <PickleCard
                  key={idx}
                  pickle={pickle}
                  idx={pickles.indexOf(pickle)}
                  onAddToCart={addToCart}
                />
              ))}
          </div>
        </div>
      </section>

      {/* Vegetarian Pickle List */}
      <section id="veg-pickles" className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">Vegetarian Pickles</h2>
          <div className="row">
            {pickles
              .filter(p => p.type === 'veg')
              .map((pickle, idx) => (
                <PickleCard
                  key={idx}
                  pickle={pickle}
                  idx={pickles.indexOf(pickle)}
                  onAddToCart={addToCart}
                />
              ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact py-5 bg-light">
        <div className="container text-center">
          <h2>Contact Us</h2>
          <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-4 mt-4">
            <div className="contact-method">
              <Button
                variant="success"
                className="contact-btn whatsapp-btn mb-2"
                onClick={() => window.open('https://wa.me/919849002243', '_blank')}
              >
                <i className="bi bi-whatsapp"></i> WhatsApp: +91 9849002243
              </Button>
              <Button
                variant="outline-secondary"
                size="sm"
                className="ms-2 copy-contact-btn"
                onClick={() => {
                  navigator.clipboard.writeText('+91 9849002243')
                  setShowToast(true)
                }}
              >
                <i className="bi bi-clipboard"></i>
              </Button>
            </div>
            <div className="contact-method">
              <Button
                variant="primary"
                className="contact-btn mb-2"
                onClick={() => window.open('mailto:taradeviviyyapu@gmail.com')}
              >
                <i className="bi bi-envelope"></i> Email: taradeviviyyapu@gmail.com
              </Button>
              <Button
                variant="outline-secondary"
                size="sm"
                className="ms-2 copy-contact-btn"
                onClick={() => {
                  navigator.clipboard.writeText('taradeviviyyapu@gmail.com')
                  setShowToast(true)
                }}
              >
                <i className="bi bi-clipboard"></i>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about py-5 bg-light mt-5">
        <div className="container d-flex flex-column flex-md-row align-items-center">
          <img
            src="/tara-foods/public/Images/DSC_1409.JPG"
            alt="Tara Devi - Pickle Maker"
            className="rounded-circle mb-4 mb-md-0 me-md-5"
            width="200"
            height="200"
            style={{ objectFit: 'cover', border: '5px solid #dc3545' }}
          />
          <div>
            <h2>About the Maker</h2>
            <p>
              <strong>Tara Devi</strong> is passionate about bringing the flavors of India to your table.
              With recipes passed down through generations, every jar is a blend of tradition, taste, and love.
            </p>
          </div>
        </div>
      </section>

      {/* Cart Modal */}
      <CartModal
        show={showCart}
        onHide={() => setShowCart(false)}
        cart={cart}
        pickles={pickles}
        onUpdateCart={setCart}
      />

      {/* Toast */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={1200}
        autohide
        className="position-fixed top-0 end-0 m-3"
      >
        <Toast.Header closeButton>
          <i className="bi bi-cart-plus me-2"></i>
          <strong className="me-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>Added to cart!</Toast.Body>
      </Toast>
    </div>
  )
}

export default App
