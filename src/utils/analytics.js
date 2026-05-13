export const trackEvent = (eventName, params = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
};

// Usage events to track:
export const trackAddToCart = (product) => trackEvent('add_to_cart', {
  currency: 'INR',
  value: product.basePrice || product.price,
  items: [{ item_id: product.slug, item_name: product.name, price: product.basePrice || product.price }]
});

export const trackPurchase = (order) => trackEvent('purchase', {
  transaction_id: order.orderNumber,
  value: order.total,
  currency: 'INR',
});

export const trackViewItem = (product) => trackEvent('view_item', {
  currency: 'INR',
  value: product.basePrice || product.price,
  items: [{ item_id: product.slug, item_name: product.name }]
});
