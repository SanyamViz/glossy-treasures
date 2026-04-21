import React, { useState } from 'react'
import WelcomePopup from '../components/WelcomePopup'
import FloatingWhatsApp from '../components/FloatingWhatsApp'
import BackToTop from '../components/BackToTop'

import HeroSlider from '../components/HeroSlider'
import CategoryIcons from '../components/CategoryIcons'
import BestSellers from '../components/BestSellers'
import ForeverInResin from '../components/ForeverInResin'
import ScentQuiz from '../components/ScentQuiz'
import FeaturedProducts from '../components/FeaturedProducts'
import ShopByCategory from '../components/ShopByCategory'
import GiftBuilder from '../components/GiftBuilder'
import Testimonials from '../components/Testimonials'
import OurStory from '../components/OurStory'
import TrustBar from '../components/TrustBar'
import InstagramFeed from '../components/InstagramFeed'
import WholesaleTeaser from '../components/WholesaleTeaser'
import PreFooter from '../components/PreFooter'
import './home.css';

export default function Home() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    return (
        <>
            <WelcomePopup setIsPopupOpen={setIsPopupOpen} />
            <FloatingWhatsApp isPopupOpen={isPopupOpen} />
            <BackToTop isPopupOpen={isPopupOpen} />
            <HeroSlider />
            <CategoryIcons />
            <BestSellers />
            <ForeverInResin />
            <ScentQuiz />
            <FeaturedProducts />
            <ShopByCategory />
            <GiftBuilder />
            <Testimonials />
            <OurStory />
            <TrustBar />
            <InstagramFeed />
            <WholesaleTeaser />
            <PreFooter />
            <div className="hero-petals">
                {Array.from({ length: 12 }).map((_, i) => (
                    <span key={i} className={`petal petal--${i + 1}`} />
                ))}
            </div>

        </>
    )
}