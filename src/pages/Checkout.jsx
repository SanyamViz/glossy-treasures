import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUser } from "@clerk/react";
import { api } from '../utils/api';
import styles from './Checkout.module.css';

// ── Pincode → City/State lookup ──
const PINCODE_MAP = {
  '110001': { city: 'New Delhi', state: 'Delhi' },
  '110002': { city: 'New Delhi', state: 'Delhi' },
  '110003': { city: 'New Delhi', state: 'Delhi' },
  '141001': { city: 'Ludhiana', state: 'Punjab' },
  '141002': { city: 'Ludhiana', state: 'Punjab' },
  '152116': { city: 'Abohar', state: 'Punjab' },
  '160001': { city: 'Chandigarh', state: 'Chandigarh' },
  '160002': { city: 'Chandigarh', state: 'Chandigarh' },
  '400001': { city: 'Mumbai', state: 'Maharashtra' },
  '400002': { city: 'Mumbai', state: 'Maharashtra' },
  '560001': { city: 'Bengaluru', state: 'Karnataka' },
  '600001': { city: 'Chennai', state: 'Tamil Nadu' },
  '700001': { city: 'Kolkata', state: 'West Bengal' },
  '500001': { city: 'Hyderabad', state: 'Telangana' },
  '411001': { city: 'Pune', state: 'Maharashtra' },
  '302001': { city: 'Jaipur', state: 'Rajasthan' }
};

const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI', icon: '⚡', desc: 'Pay via any UPI app' },
  { id: 'card', label: 'Card', icon: '💳', desc: 'Credit or Debit card' },
  { id: 'cod', label: 'Cash on Delivery', icon: '📦', desc: 'Pay when you receive' },
];

const STEPS = ['Delivery', 'Payment', 'Review'];

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(0);          // 0=delivery 1=payment 2=review
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [errors, setErrors] = useState({});

  // ── Helper: Load Razorpay script ──────────────────────────────────────────
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // ── Delivery form ──
  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    address: '', city: '', state: '', pincode: '',
    giftNote: '',
  });

  // ── Payment ──
  const [payMethod, setPayMethod] = useState('upi');

  // ── Discounts ──
  const [discountCode, setDiscountCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountApplied, setDiscountApplied] = useState(false);

  const { user, isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate('/cart');
    }
  }, [isLoaded, isSignedIn, navigate]);

  const phoneRef = useRef(null);
  const freeShipping = cartTotal >= 999;
  const shipping = freeShipping ? 0 : 99;
  const grandTotal = cartTotal + shipping - discountAmount;

  // ── Auto-fill from Clerk ──
  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      setForm(f => ({
        ...f,
        name: f.name || user.fullName || '',
        email: f.email || user.primaryEmailAddress?.emailAddress || ''
      }));
    }
  }, [isLoaded, isSignedIn, user]);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const orderPlaced = useRef(false);

  // Redirect if cart empty — but NOT if we just placed an order
  useEffect(() => {
    if (cartItems.length === 0 && !orderPlaced.current) {
      navigate('/cart');
    }
  }, [cartItems]);

  // ── Pincode autofill ──
  const handlePincode = (val) => {
    const v = val.replace(/\D/g, '').slice(0, 6);
    setForm(f => ({ ...f, pincode: v }));
    if (v.length === 6 && PINCODE_MAP[v]) {
      setForm(f => ({ ...f, pincode: v, city: PINCODE_MAP[v].city, state: PINCODE_MAP[v].state }));
    }
  };

  // ── Phone auto-advance ──
  const handlePhone = (val) => {
    const v = val.replace(/\D/g, '').slice(0, 10);
    setForm(f => ({ ...f, phone: v }));
  };

  // ── Field change ──
  const setField = (key, val) => {
    setForm(f => ({ ...f, [key]: val }));
    if (errors[key]) setErrors(e => ({ ...e, [key]: null }));
  };

  // ── Validate delivery ──
  const validateDelivery = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Please enter your name';
    if (form.phone.length < 10) e.phone = 'Enter a valid 10-digit number';
    if (!form.email.includes('@')) e.email = 'Enter a valid email address';
    if (!form.address.trim()) e.address = 'Please enter your address';
    if (form.pincode.length < 6) e.pincode = 'Enter a valid 6-digit pincode';
    if (!form.city.trim()) e.city = 'Please enter your city';
    if (!form.state.trim()) e.state = 'Please enter your state';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 0 && !validateDelivery()) return;
    setStep(s => s + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setStep(s => s - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/discounts/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: discountCode, orderTotal: cartTotal + shipping })
      });
      const data = await res.json();
      if (data.valid) {
        setDiscountAmount(data.discount);
        setDiscountApplied(true);
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert('Error applying discount');
    }
  };

  const removeDiscount = () => {
    setDiscountApplied(false);
    setDiscountAmount(0);
    setDiscountCode('');
  };

  const handlePlaceOrder = async () => {
    setPlacing(true);
    try {
      const response = await fetch(`${api.baseUrl}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: form.address,
          city: form.city,
          state: form.state,
          pincode: form.pincode,
          giftNote: form.giftNote,
          paymentMethod: payMethod,
          total: grandTotal,
          discountCode: discountApplied ? discountCode : null,
          discountAmount: discountAmount,
          items: cartItems.map(item => ({
            productSlug: item.slug,
            productName: item.name,
            category: item.category || 'hamper',
            price: item.basePrice || item.price || 0,
            quantity: item.quantity,
            selectedSize: item.selectedOptions?.size || item.selectedSize || null,
            selectedFragrance: item.selectedOptions?.fragrance || item.selectedFragrance || null,
            personalization: item.selectedOptions?.personalization || null,
            selectedOptions: item.selectedOptions || {}
          }))
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const err = new Error(errorData.error || errorData.message || 'Order failed');
        err.details = errorData.details;
        throw err;
      }

      const data = await response.json();

      // If Razorpay order created, open Checkout
      if (data.razorpayOrderId) {
        const res = await loadRazorpay();
        if (!res) {
          alert('Razorpay SDK failed to load.');
          setPlacing(false);
          return;
        }

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: Math.round(grandTotal * 100),
          currency: "INR",
          name: "Glossy Treasures",
          description: `Order #${data.orderNumber}`,
          image: "https://glossytreasures.shop/logo.png",
          order_id: data.razorpayOrderId,
          handler: async (response) => {
            try {
              const verifyRes = await fetch(`${api.baseUrl}/api/orders/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              });

              if (verifyRes.ok) {
                orderPlaced.current = true;
                clearCart();
                navigate('/order-confirmed', {
                  state: {
                    orderNumber: data.orderNumber,
                    name: form.name,
                    payMethod,
                    total: grandTotal,
                    email: form.email,
                  }
                });
              } else {
                alert('Payment verification failed.');
              }
            } catch (err) {
              alert('Error verifying payment.');
            }
          },
          prefill: {
            name: form.name,
            email: form.email,
            contact: form.phone,
          },
          theme: {
            color: "#B8965A",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
        setPlacing(false);
        return;
      }

      orderPlaced.current = true;
      clearCart();
      navigate('/order-confirmed', {
        state: {
          orderNumber: data.orderNumber,
          name: form.name,
          payMethod,
          total: grandTotal,
          email: form.email,
        }
      });
    } catch (err) {
      console.error('Order error:', err);
      const msg = err.details ? `${err.message}: ${err.details}` : err.message;
      alert(msg || "Something went wrong.");
    } finally {
      setPlacing(false);
    }
  };

  const stepContent = [
    // ── STEP 0: DELIVERY ─────────────────────────────
    <div key="delivery" className={styles.formSection}>
      <h2 className={styles.sectionTitle}>Contact Details</h2>

      <div className={styles.field}>
        <label className={styles.label}>Full Name</label>
        <input
          className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
          type="text" placeholder="Your Name"
          value={form.name}
          onChange={e => setField('name', e.target.value)}
          autoComplete="name"
        />
        {errors.name && <span className={styles.error}>{errors.name}</span>}
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>Phone</label>
          <div className={styles.phoneWrap}>
            <span className={styles.phonePrefix}>+91</span>
            <input
              ref={phoneRef}
              className={`${styles.input} ${styles.phoneInput} ${errors.phone ? styles.inputError : ''}`}
              type="tel" placeholder="Phone number"
              value={form.phone}
              onChange={e => handlePhone(e.target.value)}
              inputMode="numeric"
              autoComplete="tel"
            />
          </div>
          {errors.phone && <span className={styles.error}>{errors.phone}</span>}
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Email</label>
          <input
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            type="email" placeholder="you@email.com"
            value={form.email}
            onChange={e => setField('email', e.target.value)}
            autoComplete="email"
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>
      </div>

      <h2 className={`${styles.sectionTitle} ${styles.mt}`}>Delivery Address</h2>

      <div className={styles.field}>
        <label className={styles.label}>Address</label>
        <input
          className={`${styles.input} ${errors.address ? styles.inputError : ''}`}
          type="text" placeholder="House No., Street, Area"
          value={form.address}
          onChange={e => setField('address', e.target.value)}
          autoComplete="street-address"
        />
        {errors.address && <span className={styles.error}>{errors.address}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Pincode</label>
        <input
          className={`${styles.input} ${errors.pincode ? styles.inputError : ''}`}
          type="text" placeholder="Your Pincode"
          value={form.pincode}
          onChange={e => handlePincode(e.target.value)}
          inputMode="numeric"
          autoComplete="postal-code"
        />
        {errors.pincode && <span className={styles.error}>{errors.pincode}</span>}
        {form.city && <span className={styles.autofill}>✓ {form.city}, {form.state}</span>}
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>City</label>
          <input
            className={`${styles.input} ${errors.city ? styles.inputError : ''}`}
            type="text" placeholder="Your City"
            value={form.city}
            onChange={e => setField('city', e.target.value)}
            autoComplete="address-level2"
          />
          {errors.city && <span className={styles.error}>{errors.city}</span>}
        </div>
        <div className={styles.field}>
          <label className={styles.label}>State</label>
          <input
            className={`${styles.input} ${errors.state ? styles.inputError : ''}`}
            type="text" placeholder="State"
            value={form.state}
            onChange={e => setField('state', e.target.value)}
            autoComplete="address-level1"
          />
          {errors.state && <span className={styles.error}>{errors.state}</span>}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>
          Gift Note <span className={styles.optional}>(optional)</span>
        </label>
        <textarea
          className={styles.textarea}
          placeholder="Add a personal message..."
          value={form.giftNote}
          onChange={e => setField('giftNote', e.target.value)}
          rows={3}
          maxLength={200}
        />
        <span className={styles.charCount}>{form.giftNote.length}/200</span>
      </div>
    </div>,

    // ── STEP 1: PAYMENT ───────────────────────────────
    <div key="payment" className={styles.formSection}>
      <h2 className={styles.sectionTitle}>Payment Method</h2>

      <div className={styles.payMethods}>
        {PAYMENT_METHODS.map(m => (
          <button
            key={m.id}
            className={`${styles.payMethod} ${payMethod === m.id ? styles.payActive : ''}`}
            onClick={() => { setPayMethod(m.id); setErrors({}); }}
            type="button"
          >
            <span className={styles.payIcon}>{m.icon}</span>
            <div className={styles.payInfo}>
              <span className={styles.payLabel}>{m.label}</span>
              <span className={styles.payDesc}>{m.desc}</span>
            </div>
            <div className={`${styles.payRadio} ${payMethod === m.id ? styles.payRadioActive : ''}`} />
          </button>
        ))}
      </div>

      <div className={styles.payNoteContainer}>
        {payMethod !== 'cod' ? (
          <>
            <p className={styles.payNote}>
              🔒 Secure payment via Razorpay. All major UPI apps & cards supported.
            </p>
            <div className={styles.trustBadges}>
              <span className={styles.trustBadge}>✓ Secure</span>
              <span className={styles.trustBadge}>✓ Razorpay</span>
            </div>
          </>
        ) : (
          <p className={styles.payNote}>
            📦 Pay ₹{grandTotal.toLocaleString('en-IN')} in cash on delivery.
          </p>
        )}
      </div>
    </div>,

    // ── STEP 2: REVIEW ────────────────────────────────
    <div key="review" className={styles.formSection}>
      <h2 className={styles.sectionTitle}>Review Your Order</h2>

      <div className={styles.reviewCard}>
        <div className={styles.reviewCardHeader}>
          <span>Delivering to</span>
          <button className={styles.editBtn} onClick={() => setStep(0)}>Edit</button>
        </div>
        <p className={styles.reviewName}>{form.name}</p>
        <p className={styles.reviewDetail}>{form.address}, {form.city}, {form.state} — {form.pincode}</p>
        <p className={styles.reviewDetail}>{form.phone} · {form.email}</p>
      </div>

      <div className={styles.reviewCard}>
        <div className={styles.reviewCardHeader}>
          <span>Payment</span>
          <button className={styles.editBtn} onClick={() => setStep(1)}>Edit</button>
        </div>
        <p className={styles.reviewName}>
          {payMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment (Razorpay)'}
        </p>
      </div>

      <div className={styles.reviewItems}>
        {cartItems.map(item => (
          <div key={item.cartId} className={styles.reviewItem}>
            <img src={item.image || item.images?.[0]} alt={item.name} className={styles.reviewItemImg} />
            <div className={styles.reviewItemInfo}>
              <span className={styles.reviewItemName}>{item.name}</span>
              <span className={styles.reviewItemQty}>Qty: {item.quantity}</span>
            </div>
            <span className={styles.reviewItemPrice}>
              ₹{((item.basePrice || item.price || 0) * item.quantity).toLocaleString('en-IN')}
            </span>
          </div>
        ))}
      </div>
    </div>
  ];

  return (
    <div className={`${styles.page} ${mounted ? styles.visible : ''}`}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.headerTitle}>Checkout</h1>
          <div className={styles.steps}>
            {STEPS.map((s, i) => (
              <React.Fragment key={s}>
                <div className={`${styles.stepDot} ${i <= step ? styles.stepDone : ''} ${i === step ? styles.stepCurrent : ''}`}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span className={`${styles.stepLabel} ${i <= step ? styles.stepLabelActive : ''}`}>{s}</span>
                {i < STEPS.length - 1 && <div className={`${styles.stepLine} ${i < step ? styles.stepLineDone : ''}`} />}
              </React.Fragment>
            ))}
          </div>
        </header>

        <div className={styles.layout}>
          <div className={styles.formWrap}>
            {/* Mobile summary toggle */}
            <button className={styles.summaryToggle} onClick={() => setSummaryOpen(!summaryOpen)}>
              <span>{summaryOpen ? 'Hide' : 'Show'} order summary</span>
              <span>₹{grandTotal.toLocaleString('en-IN')}</span>
            </button>

            <div className={styles.stepContent}>{stepContent[step]}</div>

            {/* Discount Section (Restored) */}
            <div className={styles.discountSectionMobile}>
              {!discountApplied ? (
                <div className={styles.discountRow}>
                  <input
                    className={styles.discountInput}
                    type="text"
                    placeholder="Discount code"
                    value={discountCode}
                    onChange={e => setDiscountCode(e.target.value.toUpperCase())}
                  />
                  <button className={styles.applyBtn} onClick={handleApplyDiscount}>Apply</button>
                </div>
              ) : (
                <div className={styles.discountApplied}>
                  <span>✓ {discountCode} — saving ₹{discountAmount}</span>
                  <button className={styles.removeDiscountBtn} onClick={removeDiscount}>×</button>
                </div>
              )}
            </div>

            <div className={styles.navBtns}>
              {step > 0 && <button className={styles.backBtn} onClick={handleBack}>← Back</button>}
              {step < 2 ? (
                <button className={styles.nextBtn} onClick={handleNext}>Continue →</button>
              ) : (
                <button className={styles.placeBtn} onClick={handlePlaceOrder} disabled={placing}>
                  {placing ? 'Processing...' : `Pay ₹${grandTotal.toLocaleString('en-IN')}`}
                </button>
              )}
            </div>
          </div>

          {/* Desktop Summary Sidebar (Implicitly handled by CSS if layout is correct) */}
        </div>
      </div>
    </div>
  );
};

export default Checkout;