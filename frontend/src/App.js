import React, { useState, lazy, Suspense } from 'react';
import './App.css';
import Header from './Components/Header/header';
import Bidding from './Components/Bidding/Bidding';
import Layout from './Components/Layout/layout';
import LimitedTimeDeals, { SellCloser } from './Components/LimitedTimeDeals/limitedtimedeals';
import RecommendedProductsSection from './Components/MostPopularItem/exploreRecommendation';

// Lazy-load the chatbot — it's only mounted when the user clicks the icon
const Chatbot = lazy(() => import('./Components/Chatbot/Chatbot'));

function App() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatWindow = () => {
    setIsChatbotOpen((prev) => !prev);
  };

  return (
    <div className="App">
      <Layout>
        <Header />
        <LimitedTimeDeals />
        <RecommendedProductsSection />
        <Bidding />
        <SellCloser />

        <div className="robot-icon-wrapper">
          {!isChatbotOpen && (
            <button type="button" className="stylist-launcher" onClick={toggleChatWindow} aria-label="Chat with our stylist">
              <span className="stylist-launcher-mark" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 6.5A3.5 3.5 0 0 1 8.5 3h7A3.5 3.5 0 0 1 19 6.5v6A3.5 3.5 0 0 1 15.5 16H12l-3.2 2.4A.8.8 0 0 1 7.5 17.8V16H8.5A3.5 3.5 0 0 1 5 12.5v-6Z" fill="currentColor"/>
                  <path d="M17.2 2.2l.55 1.35 1.35.55-1.35.55-.55 1.35-.55-1.35-1.35-.55 1.35-.55.55-1.35Z" fill="#F6D7A8"/>
                </svg>
              </span>
              <span className="stylist-launcher-label">Ask a stylist</span>
            </button>
          )}

          {isChatbotOpen && (
            <div className="chatbot-window">
              <Suspense fallback={<div style={{ padding: 16 }}>Loading chat…</div>}>
                <Chatbot toggleChatWindow={toggleChatWindow} />
              </Suspense>
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
}

export default App;
