import { useState, useEffect } from 'react'
import './FloatingWhatsApp.css'

export default function FloatingWhatsApp({ isPopupOpen }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 4000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <a
      href="https://wa.me/918544911357"
      target="_blank"
      rel="noopener noreferrer"
      className={`whatsapp-btn ${visible ? 'whatsapp-btn--visible' : ''} ${isPopupOpen ? 'whatsapp-btn--hidden' : ''}`}
      aria-label="Chat with us on WhatsApp"
    >
      <span className="whatsapp-btn__tooltip">Chat with us</span>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" fill="#B8965A" />
        <path d="M17.006 14.093c-.275-.137-1.624-.8-1.876-.892-.25-.09-.433-.137-.615.138-.183.274-.707.892-.866 1.074-.16.183-.318.206-.593.069-.275-.138-1.16-.427-2.21-1.362-.817-.727-1.368-1.625-1.528-1.9-.16-.274-.017-.423.12-.56.122-.122.275-.32.412-.48.138-.16.184-.274.275-.457.092-.182.046-.342-.023-.48-.068-.137-.615-1.484-.843-2.032-.222-.534-.448-.46-.615-.469-.16-.007-.342-.01-.525-.01-.182 0-.48.069-.731.343-.252.275-.96.938-.96 2.286 0 1.348.983 2.651 1.12 2.833.136.183 1.934 2.953 4.687 4.14.655.283 1.166.452 1.564.578.657.21 1.255.18 1.728.11.527-.079 1.624-.664 1.853-1.305.228-.64.228-1.19.16-1.305-.069-.114-.252-.183-.527-.32z" fill="#F0EBE3" />
      </svg>
    </a>
  )
}