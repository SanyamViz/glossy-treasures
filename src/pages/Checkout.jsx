import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styles from './Checkout.module.css';

// ── Pincode → City/State lookup (expand as needed) ──
const PINCODE_MAP = {
  '141001': { city: 'Ludhiana', state: 'Punjab' },
  '141002': { city: 'Ludhiana', state: 'Punjab' },
  '110001': { city: 'New Delhi', state: 'Delhi' },
  '400001': { city: 'Mumbai', state: 'Maharashtra' },
  '560001': { city: 'Bengaluru', state: 'Karnataka' },
  '600001': { city: 'Chennai', state: 'Tamil Nadu' },
  '700001': { city: 'Kolkata', state: 'West Bengal' },
  '500001': { city: 'Hyderabad', state: 'Telangana' },
  '411001': { city: 'Pune', state: 'Maharashtra' },
  '302001': { city: 'Jaipur', state: 'Rajasthan' },
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

  // ── Delivery form ──
  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    address: '', city: '', state: '', pincode: '',
    giftNote: '',
  });

  // ── Payment ──
  const [payMethod, setPayMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [card, setCard] = useState({ number: '', expiry: '', cvv: '', name: '' });
  const [cardFocus, setCardFocus] = useState(null);

  const phoneRef = useRef(null);
  const freeShipping = cartTotal >= 999;
  const shipping = freeShipping ? 0 : 99;
  const grandTotal = cartTotal + shipping;

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  // ── KEY FIX: flag set before clearCart so redirect guard doesn't fire ──
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

  // ── Card number formatting ──
  const handleCardNumber = (val) => {
    const v = val.replace(/\D/g, '').slice(0, 16);
    const formatted = v.match(/.{1,4}/g)?.join(' ') || v;
    setCard(c => ({ ...c, number: formatted }));
  };

  // ── Card expiry formatting ──
  const handleExpiry = (val) => {
    const v = val.replace(/\D/g, '').slice(0, 4);
    const formatted = v.length > 2 ? `${v.slice(0, 2)}/${v.slice(2)}` : v;
    setCard(c => ({ ...c, expiry: formatted }));
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

  // ── Validate payment ──
  const validatePayment = () => {
    const e = {};
    if (payMethod === 'upi') {
      if (!upiId.includes('@')) e.upi = 'Enter a valid UPI ID (e.g. name@upi)';
    }
    if (payMethod === 'card') {
      if (card.number.replace(/\s/g, '').length < 16) e.cardNumber = 'Enter a valid 16-digit card number';
      if (card.expiry.length < 5) e.expiry = 'Enter expiry as MM/YY';
      if (card.cvv.length < 3) e.cvv = 'Enter a valid CVV';
      if (!card.name.trim()) e.cardName = 'Enter name on card';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 0 && !validateDelivery()) return;
    if (step === 1 && !validatePayment()) return;
    setStep(s => s + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setStep(s => s - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlaceOrder = async () => {
    setPlacing(true);
    // Simulate order placement (replace with real API in Phase 2)
    await new Promise(r => setTimeout(r, 1800));
    orderPlaced.current = true;  // must be set BEFORE clearCart
    clearCart();
    navigate('/order-confirmed', {
      state: {
        orderNumber: 'GT' + Date.now().toString().slice(-6),
        name: form.name,
        payMethod,
        total: grandTotal,
        email: form.email,
      }
    });
  };

  const stepContent = [
    // ── STEP 0: DELIVERY ─────────────────────────────
    <div key="delivery" className={styles.formSection}>
      <h2 className={styles.sectionTitle}>Contact Details</h2>

      <div className={styles.field}>
        <label className={styles.label}>Full Name</label>
        <input
          className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
          type="text" placeholder="Angel Sharma"
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
              type="tel" placeholder="98765 43210"
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
          type="text" placeholder="141001"
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
            type="text" placeholder="Ludhiana"
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
            type="text" placeholder="Punjab"
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
          placeholder="Add a personal message to be included in the package..."
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

      {/* UPI form */}
      {payMethod === 'upi' && (
        <div className={`${styles.payForm} ${styles.payFormIn}`}>
          <div className={styles.upiApps}>
            {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map(app => (
              <span key={app} className={styles.upiApp}>{app}</span>
            ))}
          </div>
          <div className={styles.field}>
            <label className={styles.label}>UPI ID</label>
            <input
              className={`${styles.input} ${errors.upi ? styles.inputError : ''}`}
              type="text" placeholder="yourname@upi"
              value={upiId}
              onChange={e => { setUpiId(e.target.value); setErrors({}); }}
              autoCapitalize="none"
            />
            {errors.upi && <span className={styles.error}>{errors.upi}</span>}
          </div>
          <p className={styles.payNote}>
            We'll send a payment request to your UPI app. Complete it to confirm your order.
          </p>
        </div>
      )}

      {/* Card form */}
      {payMethod === 'card' && (
        <div className={`${styles.payForm} ${styles.payFormIn}`}>
          {/* Card preview */}
          <div className={`${styles.cardPreview} ${cardFocus === 'cvv' ? styles.cardFlipped : ''}`}>
            <div className={styles.cardFront}>
              <div className={styles.cardChip} />
              <div className={styles.cardNumber}>
                {card.number || '•••• •••• •••• ••••'}
              </div>
              <div className={styles.cardBottom}>
                <div>
                  <div className={styles.cardFieldLabel}>Card Holder</div>
                  <div className={styles.cardFieldValue}>{card.name || 'YOUR NAME'}</div>
                </div>
                <div>
                  <div className={styles.cardFieldLabel}>Expires</div>
                  <div className={styles.cardFieldValue}>{card.expiry || 'MM/YY'}</div>
                </div>
              </div>
            </div>
            <div className={styles.cardBack}>
              <div className={styles.cardStripe} />
              <div className={styles.cardCvvRow}>
                <span className={styles.cardCvvLabel}>CVV</span>
                <span className={styles.cardCvvValue}>{card.cvv ? '•'.repeat(card.cvv.length) : '•••'}</span>
              </div>
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Card Number</label>
            <input
              className={`${styles.input} ${errors.cardNumber ? styles.inputError : ''}`}
              type="text" placeholder="1234 5678 9012 3456"
              value={card.number}
              onChange={e => handleCardNumber(e.target.value)}
              onFocus={() => setCardFocus('number')}
              onBlur={() => setCardFocus(null)}
              inputMode="numeric"
            />
            {errors.cardNumber && <span className={styles.error}>{errors.cardNumber}</span>}
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Expiry</label>
              <input
                className={`${styles.input} ${errors.expiry ? styles.inputError : ''}`}
                type="text" placeholder="MM/YY"
                value={card.expiry}
                onChange={e => handleExpiry(e.target.value)}
                onFocus={() => setCardFocus('expiry')}
                onBlur={() => setCardFocus(null)}
                inputMode="numeric"
              />
              {errors.expiry && <span className={styles.error}>{errors.expiry}</span>}
            </div>
            <div className={styles.field}>
              <label className={styles.label}>CVV</label>
              <input
                className={`${styles.input} ${errors.cvv ? styles.inputError : ''}`}
                type="password" placeholder="•••"
                value={card.cvv}
                onChange={e => setCard(c => ({ ...c, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                onFocus={() => setCardFocus('cvv')}
                onBlur={() => setCardFocus(null)}
                inputMode="numeric"
              />
              {errors.cvv && <span className={styles.error}>{errors.cvv}</span>}
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Name on Card</label>
            <input
              className={`${styles.input} ${errors.cardName ? styles.inputError : ''}`}
              type="text" placeholder="Angel Sharma"
              value={card.name}
              onChange={e => setCard(c => ({ ...c, name: e.target.value }))}
              onFocus={() => setCardFocus('name')}
              onBlur={() => setCardFocus(null)}
              autoComplete="cc-name"
            />
            {errors.cardName && <span className={styles.error}>{errors.cardName}</span>}
          </div>

          <p className={styles.payNote}>
            🔒 Your card details are encrypted and never stored.
          </p>
        </div>
      )}

      {/* COD info */}
      {payMethod === 'cod' && (
        <div className={`${styles.payForm} ${styles.payFormIn} ${styles.codInfo}`}>
          <span className={styles.codIcon}>📦</span>
          <p>Pay in cash when your order arrives. Our delivery partner will collect the exact amount.</p>
          <div className={styles.codNote}>
            COD available across India · No extra charges
          </div>
        </div>
      )}
    </div>,

    // ── STEP 2: REVIEW ────────────────────────────────
    <div key="review" className={styles.formSection}>
      <h2 className={styles.sectionTitle}>Review Your Order</h2>

      {/* Delivery summary */}
      <div className={styles.reviewCard}>
        <div className={styles.reviewCardHeader}>
          <span>Delivering to</span>
          <button className={styles.editBtn} onClick={() => setStep(0)}>Edit</button>
        </div>
        <p className={styles.reviewName}>{form.name}</p>
        <p className={styles.reviewDetail}>{form.address}, {form.city}, {form.state} — {form.pincode}</p>
        <p className={styles.reviewDetail}>{form.phone} · {form.email}</p>
        {form.giftNote && (
          <p className={styles.reviewGift}>🎁 "{form.giftNote}"</p>
        )}
      </div>

      {/* Payment summary */}
      <div className={styles.reviewCard}>
        <div className={styles.reviewCardHeader}>
          <span>Payment</span>
          <button className={styles.editBtn} onClick={() => setStep(1)}>Edit</button>
        </div>
        <p className={styles.reviewName}>
          {payMethod === 'upi' && `UPI — ${upiId}`}
          {payMethod === 'card' && `Card ending ••••${card.number.slice(-4)}`}
          {payMethod === 'cod' && 'Cash on Delivery'}
        </p>
      </div>

      {/* Items */}
      <div className={styles.reviewItems}>
        {cartItems.map(item => (
          <div key={item.slug} className={styles.reviewItem}>
            <img
              src={item.image || item.images?.[0]}
              alt={item.name}
              className={styles.reviewItemImg}
            />
            <div className={styles.reviewItemInfo}>
              <span className={styles.reviewItemName}>{item.name}</span>
              {item.selectedFragrance && <span className={styles.reviewItemVariant}>{item.selectedFragrance}</span>}
              {item.selectedSize && <span className={styles.reviewItemVariant}>{item.selectedSize}</span>}
              <span className={styles.reviewItemQty}>Qty: {item.quantity}</span>
            </div>
            <span className={styles.reviewItemPrice}>
              ₹{((item.basePrice || item.price) * item.quantity).toLocaleString('en-IN')}
            </span>
          </div>
        ))}
      </div>
    </div>
  ];

  return (
    <div className={`${styles.page} ${mounted ? styles.visible : ''}`}>
      <div className={styles.container}>

        {/* ── HEADER ── */}
        <header className={`${styles.header} ${mounted ? styles.headerIn : ''}`}>
          <h1 className={styles.headerTitle}>Checkout</h1>
          {/* Step indicator */}
          <div className={styles.steps}>
            {STEPS.map((s, i) => (
              <React.Fragment key={s}>
                <div className={`${styles.stepDot} ${i <= step ? styles.stepDone : ''} ${i === step ? styles.stepCurrent : ''}`}>
                  {i < step ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <span>{i + 1}</span>
                  )}
                </div>
                <span className={`${styles.stepLabel} ${i <= step ? styles.stepLabelActive : ''}`}>{s}</span>
                {i < STEPS.length - 1 && (
                  <div className={`${styles.stepLine} ${i < step ? styles.stepLineDone : ''}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </header>

        <div className={styles.layout}>

          {/* ── LEFT: FORM ── */}
          <div className={styles.formWrap}>
            {/* Mobile order summary toggle */}
            <button
              className={styles.summaryToggle}
              onClick={() => setSummaryOpen(o => !o)}
              type="button"
            >
              <span>{summaryOpen ? 'Hide' : 'Show'} order summary</span>
              <span className={styles.summaryToggleTotal}>₹{grandTotal.toLocaleString('en-IN')}</span>
              <svg
                className={`${styles.chevron} ${summaryOpen ? styles.chevronUp : ''}`}
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {/* Mobile summary */}
            <div className={`${styles.mobileSummary} ${summaryOpen ? styles.mobileSummaryOpen : ''}`}>
              {cartItems.map(item => (
                <div key={item.slug} className={styles.miniItem}>
                  <div className={styles.miniImgWrap}>
                    <img src={item.image || item.images?.[0]} alt={item.name} className={styles.miniImg} />
                    <span className={styles.miniQty}>{item.quantity}</span>
                  </div>
                  <span className={styles.miniName}>{item.name}</span>
                  <span className={styles.miniPrice}>₹{((item.basePrice || item.price) * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
              <div className={styles.miniTotal}>
                <span>Total</span>
                <span>₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Step content */}
            <div className={styles.stepContent}>
              {stepContent[step]}
            </div>

            {/* Navigation buttons */}
            <div className={styles.navBtns}>
              {step > 0 && (
                <button className={styles.backBtn} onClick={handleBack} type="button">
                  ← Back
                </button>
              )}
              {step < 2 && (
                <button className={styles.nextBtn} onClick={handleNext} type="button">
                  Continue <span>→</span>
                </button>
              )}
              {step === 2 && (
                <button
                  className={`${styles.placeBtn} ${placing ? styles.placeBtnLoading : ''}`}
                  onClick={handlePlaceOrder}
                  disabled={placing}
                  type="button"
                >
                  {placing ? (
                    <span className={styles.spinner} />
                  ) : (
                    <>
                      <span>PLACE ORDER · ₹{grandTotal.toLocaleString('en-IN')}</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* ── RIGHT: ORDER SUMMARY (desktop) ── */}
          <aside className={`${styles.sidebar} ${mounted ? styles.sidebarIn : ''}`}>
            <div className={styles.sidebarInner}>
              <h3 className={styles.sidebarTitle}>Order Summary</h3>

              <div className={styles.sidebarItems}>
                {cartItems.map(item => (
                  <div key={item.slug} className={styles.sidebarItem}>
                    <div className={styles.sidebarImgWrap}>
                      <img src={item.image || item.images?.[0]} alt={item.name} className={styles.sidebarImg} />
                      <span className={styles.sidebarQty}>{item.quantity}</span>
                    </div>
                    <div className={styles.sidebarItemInfo}>
                      <span className={styles.sidebarItemName}>{item.name}</span>
                      {item.selectedFragrance && <span className={styles.sidebarItemVariant}>{item.selectedFragrance}</span>}
                    </div>
                    <span className={styles.sidebarItemPrice}>
                      ₹{((item.basePrice || item.price) * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              <div className={styles.sidebarDivider} />

              <div className={styles.sidebarRow}>
                <span>Subtotal</span>
                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className={styles.sidebarRow}>
                <span>Shipping</span>
                <span className={freeShipping ? styles.free : ''}>
                  {freeShipping ? 'FREE' : '₹99'}
                </span>
              </div>

              <div className={styles.sidebarDivider} />

              <div className={styles.sidebarTotal}>
                <span>Total</span>
                <span>₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>

              <div className={styles.sidebarTrust}>
                <span>🔒 Secure Checkout</span>
                <span>·</span>
                <span>Easy Returns</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Checkout;