import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ScentQuiz.css';
const QUESTIONS = [
    {
        question: "How do you want your space to feel?",
        options: [
            "Calm & Relaxing",
            "Warm & Cozy",
            "Fresh & Uplifting",
            "Bold & Sensual"
        ]
    },
    {
        question: "Who are you shopping for?",
        options: [
            "Just for myself",
            "A gift for someone special",
            "My home & guests",
            "A wedding or celebration"
        ]
    },
    {
        question: "When do you usually light a candle?",
        options: [
            "Morning ritual",
            "Evening unwind",
            "Special occasions",
            "Whenever I feel like it"
        ]
    },
    {
        question: "What scents draw you in?",
        options: [
            "Florals & Botanicals",
            "Warm Woods & Spice",
            "Fresh Citrus & Herbs",
            "Sweet & Creamy"
        ]
    }
];

const results = {
    'amber-oud': {
        name: 'Amber & Oud',
        description: 'Rich, grounding and deeply comforting. Made for slow evenings and quiet moments.',
        price: '₹1,299',
        image: 'https://placehold.co/120x120/E8E0D5/7A7068',
        link: '/shop/candles'
    },
    'rose-peony': {
        name: 'Rose & Peony',
        description: 'Soft, romantic and endlessly feminine. Like a garden in full bloom.',
        price: '₹1,199',
        image: 'https://placehold.co/120x120/E8E0D5/7A7068',
        link: '/shop/candles'
    },
    'eucalyptus-mint': {
        name: 'Eucalyptus Mint',
        description: 'Crisp, clear and energising. Your morning ritual in a jar.',
        price: '₹999',
        image: 'https://placehold.co/120x120/E8E0D5/7A7068',
        link: '/shop/candles'
    },
    'bloom-gift': {
        name: 'The Bloom Gift Set',
        description: 'Curated with love. A candle and resin piece paired together.',
        price: '₹2,499',
        image: 'https://placehold.co/120x120/E8E0D5/7A7068',
        link: '/build-hamper'
    }
}
    ;

export default function ScentQuiz() {
    const [showQuiz, setShowQuiz] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showResult, setShowResult] = useState(false);

    const [quizResult, setQuizResult] = useState(null);
    const [recommendedProduct, setRecommendedProduct] = useState(null);

    const QUIZ_SCENT_MAP = {
      'floral': 'Floral',
      'woody': 'Woody',
      'fresh': 'Fresh',
      'warm': 'Warm',
      'citrus': 'Citrus',
      'gourmand': 'Gourmand',
    };

    useEffect(() => {
      if (quizResult) {
        const scentFamily = QUIZ_SCENT_MAP[quizResult.toLowerCase()];
        if (scentFamily) {
          fetch(`${import.meta.env.VITE_API_URL}/api/products?category=candle&scentFamily=${scentFamily}`)
            .then(r => r.json())
            .then(data => {
              if (Array.isArray(data) && data.length > 0) {
                setRecommendedProduct(data[0]);
              }
            })
            .catch(console.error);
        }
      }
    }, [quizResult]);

    const handleAnswer = (option) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = option;
        setAnswers(newAnswers);

        setTimeout(() => {
            if (currentQuestion < QUESTIONS.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
            } else {
                let finalResult = 'warm';
                if (newAnswers.includes("Warm & Cozy") || newAnswers.includes("Warm Woods & Spice")) {
                    finalResult = 'woody';
                } else if (newAnswers.includes("Calm & Relaxing") || newAnswers.includes("Florals & Botanicals")) {
                    finalResult = 'floral';
                } else if (newAnswers.includes("Fresh & Uplifting") || newAnswers.includes("Fresh Citrus & Herbs")) {
                    finalResult = 'fresh';
                } else if (newAnswers.includes("Sweet & Creamy")) {
                    finalResult = 'gourmand';
                }
                setQuizResult(finalResult);
                setShowResult(true);
            }
        }, 400);
    };

    const resetQuiz = () => {
        setShowQuiz(false);
        setCurrentQuestion(0);
        setAnswers([]);
        setShowResult(false);
        setQuizResult(null);
        setRecommendedProduct(null);
    };

    return (
        <section className="scent-quiz-section">
            {!showQuiz && !showResult && (
                <div className="quiz-entry-card fade-in">
                    <p className="quiz-entry-label">FIND YOUR PERFECT SCENT</p>
                    <h2 className="quiz-entry-title">What scent are you?</h2>
                    <p className="quiz-entry-desc">
                        Answer 4 quick questions and we'll match you with your perfect candle.
                    </p>
                    <button className="quiz-start-btn" onClick={() => setShowQuiz(true)}>
                        START THE QUIZ
                    </button>
                </div>
            )}

            {showQuiz && !showResult && (
                <div className="quiz-question-card fade-in">
                    <p className="quiz-progress">{currentQuestion + 1} of {QUESTIONS.length}</p>
                    <h3 className="quiz-question">{QUESTIONS[currentQuestion].question}</h3>
                    <div className="quiz-options">
                        {QUESTIONS[currentQuestion].options.map((option, index) => {
                            const isSelected = answers[currentQuestion] === option;
                            return (
                                <button
                                    key={index}
                                    className={`quiz-option-btn ${isSelected ? 'selected' : ''}`}
                                    onClick={() => handleAnswer(option)}
                                >
                                    {option}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {showResult && (
                <div className="quiz-result-card fade-in">
                    <p className="quiz-result-label">YOUR PERFECT MATCH</p>
                    {recommendedProduct ? (
                        <>
                            <img
                                src={recommendedProduct.image || recommendedProduct.images?.[0]}
                                alt={recommendedProduct.name}
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    objectFit: 'cover',
                                    border: '1.5px solid #B8965A',
                                    marginBottom: '16px'
                                }}
                            />
                            <h2 className="quiz-result-title">{recommendedProduct.name}</h2>
                            <p className="quiz-result-desc">{recommendedProduct.description}</p>
                            <p className="quiz-result-price">₹{recommendedProduct.basePrice}</p>
                            <div className="quiz-result-actions">
                                <Link to={`/shop/candles/${recommendedProduct.slug}`} className="quiz-shop-btn">
                                    SHOP NOW
                                </Link>
                                <button className="quiz-retake-btn" onClick={resetQuiz}>RETAKE QUIZ</button>
                            </div>
                        </>
                    ) : (
                        <div style={{ padding: '40px' }}>Loading your perfect match...</div>
                    )}
                </div>
            )}
        </section>
    );
}