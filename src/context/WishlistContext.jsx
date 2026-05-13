import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@clerk/react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { user, isSignedIn } = useUser();
  const [wishlist, setWishlist] = useState([]);
  const [wishlistPulse, setWishlistPulse] = useState(false);

  const triggerPulse = () => {
    setWishlistPulse(true);
    setTimeout(() => setWishlistPulse(false), 600);
  };

  useEffect(() => {
    if (isSignedIn && user) {
      fetch(`${import.meta.env.VITE_API_URL}/api/wishlist/${user.primaryEmailAddress?.emailAddress}`)
        .then(r => r.json())
        .then(data => setWishlist(Array.isArray(data) ? data : []))
        .catch(console.error);
    } else {
      setWishlist([]);
    }
  }, [isSignedIn, user]);

  const addToWishlist = React.useCallback(async (product) => {
    if (!isSignedIn || !user) return false;
    const email = user.primaryEmailAddress?.emailAddress;
    if (!email) return false;

    // Optimistic Update
    const newItem = {
      productSlug: product.slug,
      productName: product.name,
      productImage: product.images?.[0] || product.image,
      price: product.basePrice || product.price || 0,
      category: product.category,
      ...product
    };
    
    const previousWishlist = [...wishlist];
    setWishlist(prev => [...prev.filter(i => i.productSlug !== product.slug), newItem]);
    triggerPulse();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/wishlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail: email,
          productSlug: product.slug,
          productName: product.name,
          productImage: product.images?.[0] || product.image || '',
          price: product.basePrice || product.price || 0,
          category: product.category,
        })
      });
      
      if (!res.ok) {
        setWishlist(previousWishlist);
        return false;
      }
      return true;
    } catch (err) { 
      console.error('Add to wishlist error:', err);
      setWishlist(previousWishlist);
      return false; 
    }
  }, [isSignedIn, user, wishlist]);

  const removeFromWishlist = React.useCallback(async (slug) => {
    if (!isSignedIn || !user) return;
    const email = user.primaryEmailAddress?.emailAddress;
    if (!email) return;

    const previousWishlist = [...wishlist];
    setWishlist(prev => prev.filter(i => i.productSlug !== slug));

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/wishlist/${email}/${slug}`, { 
        method: 'DELETE' 
      });
      if (!res.ok) {
        setWishlist(previousWishlist);
      }
    } catch (err) {
      console.error('Remove from wishlist error:', err);
      setWishlist(previousWishlist);
    }
  }, [isSignedIn, user, wishlist]);

  const isInWishlist = React.useCallback((slug) => wishlist.some(i => i.productSlug === slug), [wishlist]);

  const value = React.useMemo(() => ({
    wishlist,
    wishlistPulse,
    addToWishlist,
    removeFromWishlist,
    isInWishlist
  }), [wishlist, wishlistPulse, addToWishlist, removeFromWishlist, isInWishlist]);

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
