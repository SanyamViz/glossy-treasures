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
  const [step, setStep] = useState(0);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    address: '', city: '', state: '', pincode: '',
    giftNote: '',
  });

  const [payMethod, setPayMethod] = useState('upi');
  const [discountCode, setDiscountCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountApplied, setDiscountApplied] = useState(false);

  const { user, isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (isLoaded && !isSignedIn) navigate('/cart');
  }, [isLoaded, isSignedIn, navigate]);

  const phoneRef = useRef(null);
  const freeShipping = cartTotal >= 999;
  const shipping = freeShipping ? 0 : 99;
  const grandTotal = cartTotal + shipping - discountAmount;

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

  useEffect(() => {
    if (cartItems.length === 0 && !orderPlaced.current) navigate('/cart');
  }, [cartItems]);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePincode = (val) => {
    const v = val.replace(/\D/g, '').slice(0, 6);
    setForm(f => ({ ...f, pincode: v }));
    if (v.length === 6 && PINCODE_MAP[v]) {
      setForm(f => ({ ...f, city: PINCODE_MAP[v].city, state: PINCODE_MAP[v].state }));
    }
  };

  const handlePhone = (val) => {
    const v = val.replace(/\D/g, '').slice(0, 10);
    setForm(f => ({ ...f, phone: v }));
  };

  const setField = (key, val) => {
    setForm(f => ({ ...f, [key]: val }));
    if (errors[key]) setErrors(e => ({ ...e, [key]: null }));
  };

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
    if (grandTotal <= 0) {
      alert("Invalid order amount.");
      return;
    }

    setPlacing(true);
    console.log("--- Starting Order Flow ---");

    try {
      let rzpOrderId = null;

      // ── STEP 1: CREATE RAZORPAY ORDER (IF ONLINE) ──
      if (payMethod !== 'cod') {
        console.log("1. Initializing payment...");
        const payRes = await fetch(`${api.baseUrl}/api/create-order`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: grandTotal })
        });

        if (payRes.status === 500) {
          const errData = await payRes.json();
          throw new Error(errData.details || "Server error while initializing payment.");
        }

        const payData = await payRes.json();
        if (!payData.success) {
          throw new Error(payData.error || payData.message || "Payment initialization failed");
        }

        rzpOrderId = payData.order_id;
        console.log("Razorpay Order Created:", rzpOrderId);
      }

      // ── STEP 2: CREATE ORDER IN DATABASE ──
      console.log("2. Saving order to database...");
      const orderRes = await fetch(`${api.baseUrl}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name, email: form.email, phone: form.phone,
          address: form.address, city: form.city, state: form.state, pincode: form.pincode,
          giftNote: form.giftNote, paymentMethod: payMethod, total: grandTotal,
          discountCode: discountApplied ? discountCode : null, discountAmount,
          razorpayOrderId: rzpOrderId, // CRITICAL: Link the Razorpay ID here!
          items: cartItems.map(item => {
            if (item.category === 'hamper') {
              const hamperContents = Array.isArray(item.selectedOptions?.items)
                ? item.selectedOptions.items.map(hi => `${hi.name || hi.productName}${hi.quantity > 1 ? ` ×${hi.quantity}` : ''}`).join(', ')
                : 'Custom Hamper';
              return {
                productSlug: item.slug,
                productName: `Custom Hamper: ${hamperContents}`,
                category: 'hamper',
                price: item.basePrice || item.price || 0,
                quantity: item.quantity,
                selectedSize: null,
                selectedFragrance: null,
                selectedColor: null,
                personalization: null,
              };
            }
            return {
              productSlug: item.slug,
              productName: item.name,
              category: item.category || 'candle',
              price: item.basePrice || item.price || 0,
              quantity: item.quantity,
              selectedSize: item.selectedOptions?.size || item.selectedSize || null,
              selectedFragrance: item.selectedOptions?.fragrance || item.selectedFragrance || null,
              selectedColor: item.selectedOptions?.color || item.selectedColor || null,
              personalization: item.selectedOptions?.personalization
                ? JSON.stringify(item.selectedOptions.personalization)
                : null,
              selectedOptions: item.selectedOptions || null,
            };
          })
        }),
      });

      const orderData = await orderRes.json();
      console.log("API RESPONSE (Order):", orderData);

      if (!orderRes.ok) {
        throw new Error(orderData.message || orderData.error || "Failed to save order");
      }
      console.log("Order saved in DB:", orderData.orderNumber);

      // ── STEP 3: OPEN RAZORPAY MODAL (IF ONLINE) ──
      if (payMethod !== 'cod') {
        const isLoaded = await loadRazorpay();
        if (!isLoaded) throw new Error("Razorpay SDK failed to load.");

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: Math.round(grandTotal * 100),
          currency: "INR",
          name: "Glossy Treasures",
          description: `Order #${orderData.orderNumber}`,
          image: "https://glossytreasures.shop/logo.png",
          order_id: rzpOrderId,
          handler: async (response) => {
            console.log("Payment Success callback trigger...");
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

              const verifyData = await verifyRes.json();
              console.log("Verification Response:", verifyData);

              if (verifyRes.ok) {
                orderPlaced.current = true;
                clearCart();
                navigate('/order-confirmed', {
                  state: {
                    orderNumber: orderData.orderNumber, name: form.name,
                    payMethod, total: grandTotal, email: form.email,
                  }
                });
              } else {
                alert(`Payment verification failed: ${verifyData.message || 'Unknown error'}. Please contact support.`);
              }
            } catch (err) {
              alert('Error verifying payment.');
            }
          },
          prefill: { name: form.name, email: form.email, contact: form.phone },
          theme: { color: "#B8965A" },
          modal: { ondismiss: () => setPlacing(false) }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
        return;
      }

      // COD Path
      orderPlaced.current = true;
      clearCart();
      navigate('/order-confirmed', {
        state: {
          orderNumber: orderData.orderNumber, name: form.name,
          payMethod, total: grandTotal, email: form.email,
        }
      });
    } catch (err) {
      console.error('Checkout Error:', err);
      alert(err.message || "An unexpected error occurred.");
    } finally {
      setPlacing(false);
    }
  };

  const stepContent = [
    <div key="delivery" className={styles.formSection}>
      <h2 className={styles.sectionTitle}>Contact Details</h2>
      <div className={styles.field}>
        <label className={styles.label}>Full Name</label>
        <input className={`${styles.input} ${errors.name ? styles.inputError : ''}`} type="text" value={form.name} onChange={e => setField('name', e.target.value)} />
        {errors.name && <span className={styles.error}>{errors.name}</span>}
      </div>
      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>Phone</label>
          <div className={styles.phoneWrap}>
            <span className={styles.phonePrefix}>+91</span>
            <input className={`${styles.input} ${styles.phoneInput} ${errors.phone ? styles.inputError : ''}`} type="tel" value={form.phone} onChange={e => handlePhone(e.target.value)} />
          </div>
          {errors.phone && <span className={styles.error}>{errors.phone}</span>}
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Email</label>
          <input className={`${styles.input} ${errors.email ? styles.inputError : ''}`} type="email" value={form.email} onChange={e => setField('email', e.target.value)} />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>
      </div>
      <h2 className={`${styles.sectionTitle} ${styles.mt}`}>Delivery Address</h2>
      <div className={styles.field}>
        <label className={styles.label}>Address</label>
        <input className={`${styles.input} ${errors.address ? styles.inputError : ''}`} type="text" value={form.address} onChange={e => setField('address', e.target.value)} />
        {errors.address && <span className={styles.error}>{errors.address}</span>}
      </div>
      <div className={styles.field}>
        <label className={styles.label}>Pincode</label>
        <input className={`${styles.input} ${errors.pincode ? styles.inputError : ''}`} type="text" value={form.pincode} onChange={e => handlePincode(e.target.value)} />
        {errors.pincode && <span className={styles.error}>{errors.pincode}</span>}
        {form.city && <span className={styles.autofill}>✓ {form.city}, {form.state}</span>}
      </div>
      <div className={styles.row}>
        <div className={styles.field}><label className={styles.label}>City</label><input className={styles.input} type="text" value={form.city} readOnly /></div>
        <div className={styles.field}><label className={styles.label}>State</label><input className={styles.input} type="text" value={form.state} readOnly /></div>
      </div>
    </div>,

    <div key="payment" className={styles.formSection}>
      <h2 className={styles.sectionTitle}>Payment Method</h2>
      <div className={styles.payMethods}>
        {PAYMENT_METHODS.map(m => (
          <button key={m.id} className={`${styles.payMethod} ${payMethod === m.id ? styles.payActive : ''}`} onClick={() => setPayMethod(m.id)} type="button">
            <span className={styles.payIcon}>{m.icon}</span>
            <div className={styles.payInfo}><span className={styles.payLabel}>{m.label}</span><span className={styles.payDesc}>{m.desc}</span></div>
            <div className={`${styles.payRadio} ${payMethod === m.id ? styles.payRadioActive : ''}`} />
          </button>
        ))}
      </div>
    </div>,

    <div key="review" className={styles.formSection}>
      <h2 className={styles.sectionTitle}>Review Your Order</h2>
      <div className={styles.reviewCard}>
        <p className={styles.reviewName}>{form.name}</p>
        <p className={styles.reviewDetail}>{form.address}, {form.city}, {form.state} — {form.pincode}</p>
        <p className={styles.reviewDetail}>{payMethod.toUpperCase()} · ₹{grandTotal.toLocaleString('en-IN')}</p>
      </div>
      <div className={styles.reviewItems}>
        {cartItems.map(item => (
          <div key={item.cartId} className={styles.reviewItem}>
            <div className={styles.reviewItemInfo}>
              <span className={styles.reviewItemName}>{item.name}</span>
              <div className={styles.reviewItemVariants}>
                {item.selectedSize && <span className={styles.reviewItemVariant}>{item.selectedSize}</span>}
                {item.selectedColor && <span className={styles.reviewItemVariant}>{item.selectedColor}</span>}
                {item.selectedFragrance && <span className={styles.reviewItemVariant}>{item.selectedFragrance}</span>}
                {item.selectedOptions?.stand && <span className={styles.reviewItemVariant}>Stand: {item.selectedOptions.stand}</span>}
                {item.personalization && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}>
                    {item.personalization.name && <span className={styles.reviewItemVariant}>Name: {item.personalization.name}</span>}
                    {item.personalization.date && <span className={styles.reviewItemVariant}>Date: {item.personalization.date}</span>}
                    {item.personalization.photo && (
                       <img src={item.personalization.photo} alt="Custom" style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} />
                    )}
                  </div>
                )}
              </div>
              <span className={styles.reviewItemQty}>Qty: {item.quantity}</span>
            </div>
            <span className={styles.reviewItemPrice}>₹{((item.basePrice || item.price || 0) * item.quantity).toLocaleString('en-IN')}</span>
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
                <div className={`${styles.stepDot} ${i <= step ? styles.stepDone : ''} ${i === step ? styles.stepCurrent : ''}`}>{i < step ? '✓' : i + 1}</div>
                <span className={`${styles.stepLabel} ${i <= step ? styles.stepLabelActive : ''}`}>{s}</span>
                {i < STEPS.length - 1 && <div className={`${styles.stepLine} ${i < step ? styles.stepLineDone : ''}`} />}
              </React.Fragment>
            ))}
          </div>
        </header>

        <div className={styles.layout}>
          <div className={styles.formWrap}>
            <button className={styles.summaryToggle} onClick={() => setSummaryOpen(!summaryOpen)}>
              <span>{summaryOpen ? 'Hide' : 'Show'} summary</span>
              <span>₹{grandTotal.toLocaleString('en-IN')}</span>
            </button>
            <div className={styles.stepContent}>{stepContent[step]}</div>
            <div className={styles.discountSectionMobile}>
              {!discountApplied ? (
                <div className={styles.discountRow}>
                  <input className={styles.discountInput} type="text" placeholder="Discount code" value={discountCode} onChange={e => setDiscountCode(e.target.value.toUpperCase())} />
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
        </div>
      </div>
    </div>
  );
};

export default Checkout;