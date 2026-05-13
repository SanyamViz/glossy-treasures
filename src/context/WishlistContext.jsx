import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@clerk/react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { user, isSignedIn } = useUser();
  const [wishlist, setWishlist] = useState([]);

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

  const addToWishlist = async (product) => {
    if (!isSignedIn || !user) return false;
    const email = user.primaryEmailAddress?.emailAddress;
    if (!email) return false;

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
      if (res.ok) {
        const newItem = {
          productSlug: product.slug,
          productName: product.name,
          productImage: product.images?.[0] || product.image,
          price: product.basePrice || product.price,
          category: product.category,
          ...product
        };
        setWishlist(prev => [...prev.filter(i => i.productSlug !== product.slug), newItem]);
        return true;
      }
      return false;
    } catch (err) { 
      console.error('Add to wishlist error:', err);
      return false; 
    }
  };

  const removeFromWishlist = async (slug) => {
    if (!isSignedIn || !user) return;
    const email = user.primaryEmailAddress?.emailAddress;
    await fetch(`${import.meta.env.VITE_API_URL}/api/wishlist/${email}/${slug}`, { method: 'DELETE' });
    setWishlist(prev => prev.filter(i => i.productSlug !== slug));
  };

  const isInWishlist = (slug) => wishlist.some(i => i.productSlug === slug);

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
