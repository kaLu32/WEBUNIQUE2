import React, { useState } from 'react';
import './development.css';

// Podaci o proizvodima sa direktnim Tebex linkovima
const PRODUCTS = [
  {
    id: 'map-1',
    title: 'Legion Square & Downtown 2.0',
    category: 'mape',
    categoryLabel: 'Mape',
    features: ['Custom bank MLO (can be replaced with any other banks)', 'Cafe MLO with realistic elevator', 'Clothing store', 'And much more!'],
    image: 'https://dunb17ur4ymx4.cloudfront.net/packages/images/38db287b532c1d1a485a9f87dcdfe2fb1b4f18d9.png',
    link: 'https://uniquedevelopment.tebex.io/package/7542611'
  },
  {
    id: 'map-2',
    title: 'Legion Square and Main Garage',
    category: 'mape',
    categoryLabel: 'Mape',
    features: ['Flexible Installation – option to use the garage or Legion Square separately.', 'Redesigned Legion Square & Main Garage – modern and stylish look.', 'And much more!'],
    image: 'https://dunb17ur4ymx4.cloudfront.net/packages/images/dd30bdd5e7068b2388c55d7ac942c66291590de2.jpg',
    link: 'https://uniquedevelopment.tebex.io/package/6992693'
  },
  {
    id: 'map-3',
    title: 'Starz Casino',
    category: 'mape',
    categoryLabel: 'Mape',
    features: ['High Stakes section (VIP / Elite access)', ' Poker section (Texas Hold’em / custom tables support)', 'Blackjack tables', 'And much more!'],
    image: 'https://dunb17ur4ymx4.cloudfront.net/packages/images/a73dd14fbdd6c247e0585545fdd4b5c295b7c510.png',
    link: 'https://uniquedevelopment.tebex.io/package/7181160'
  },
  {
    id: 'map-4',
    title: 'Olympus Lux',
    category: 'mape',
    categoryLabel: 'Mape',
    features: ['Unique & Modern Greek-Inspired Design', 'Rooftop Garden', 'Private Garage', 'And much more!'],
    image: 'https://dunb17ur4ymx4.cloudfront.net/packages/images/b7807c8e23ff44da1c7bfb7b36c4830fabc57bb0.png',
    link: 'https://uniquedevelopment.tebex.io/package/7020135'
  },
  {
    id: 'map-5',
    title: 'Camp Gordo Park',
    category: 'mape',
    categoryLabel: 'Mape',
    features: ['Three separate houses with stunning ocean & lighthouse views', 'Fully open bar with ample seating areas', 'Beautiful park with custom vegetation', 'And much more!'],
    image: 'https://dunb17ur4ymx4.cloudfront.net/packages/images/d5b58221e8c3efea06b39e81fabbac61d5d54d44.png',
    link: 'https://uniquedevelopment.tebex.io/package/6743524'
  },
  {
    id: 'map-6',
    title: 'Mirror Park Office',
    category: 'mape',
    categoryLabel: 'Mape',
    features: ['A luxurious office building in the heart of Mirror Park', '3 floors of modern and functional space', 'High-quality design with premium materials', 'And much more!'],
    image: 'https://dunb17ur4ymx4.cloudfront.net/packages/images/d71a4229f7f9ab1bb548f898038bc80300f17996.jpg',
    link: 'https://uniquedevelopment.tebex.io/package/6769313'
  },
  {
    id: 'script-1',
    title: 'Pasta & Pizza Job',
    category: 'skripte',
    categoryLabel: 'Skripte',
    framework: 'ESX/QBOX',
    features: ['Complete Pizza & Restaurant Job – Let players become Italian cuisine masters! 🍝', '110+ items included – A variety of authentic Italian food, drinks, and ingredients! 🍕🍷☕', 'Advanced crafting system – Use ingredients from the shop to prepare different dishes! 🧑‍🍳', 'And much more!'],
    image: 'https://dunb17ur4ymx4.cloudfront.net/packages/images/ab2c27e8d759e8540c7191b48b6c157cec27e780.png',
    link: 'https://uniquedevelopment.tebex.io/package/6745586'
  },
  {
    id: 'script-2',
    title: 'Rental Car System',
    category: 'skripte',
    categoryLabel: 'Skripte',
    framework: 'ESX/QBOX',
    features: ['Full support for ESX and QBOX frameworks.', 'Choose between paying with cash, bank, or let players decide.', 'Players can return rented vehicles and receive a configurable percentage of the price back (cash or bank).', 'And much more!'],
    image: 'https://dunb17ur4ymx4.cloudfront.net/packages/images/8f884562c549f0bb56f897be9bdb0a9b14797ded.png',
    link: 'https://uniquedevelopment.tebex.io/package/7103303'
  },
  {
    id: 'script-3',
    title: 'Stash Creator',
    category: 'skripte',
    categoryLabel: 'Skripte',
    framework: 'ESX/QBOX/QBCore',
    features: ['Password-protected stashes', 'Configurable zone size & rotation', 'Unlimited stash creation options', 'Custom slots & weight per stash', 'Database persistence', 'And much more!'],
    image: 'https://dunb17ur4ymx4.cloudfront.net/packages/images/020db0630f45d41697e42a24b788c84434f56c3e.png',
    link: 'https://uniquedevelopment.tebex.io/package/7258766'
  }, 
];

export default function Development() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filtriranje po kategoriji i pretraživanju
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesTab = activeTab === 'all' || product.category === activeTab;
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.framework.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <section className="dev-section">
      <div className="dev-container">
        {/* Zaglavlje sekcije */}
        <div className="dev-header">
          <span className="dev-badge">UNIQUE DEVELOPMENT</span>
          <h1 className="dev-title">
            Naša ponuda <span className="purple-gradient-text">mapa i skripti</span>
          </h1>
          <p className="dev-subtitle">
            Istražite visoko optimizirane skripte i unikatne mape razvijene za vrhunsko FiveM roleplay iskustvo.
          </p>

          {/* Brze veze na Tebex kategorije */}
          <div className="dev-store-links">
            <a
              href="https://uniquedevelopment.tebex.io/category/2927901"
              target="_blank"
              rel="noopener noreferrer"
              className="dev-store-btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
              Sve Mape na Tebexu
            </a>
            <a
              href="https://uniquedevelopment.tebex.io/category/scripts"
              target="_blank"
              rel="noopener noreferrer"
              className="dev-store-btn secondary"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
              Skripte
            </a>
          </div>
        </div>

        {/* Kontrola: Tabovi i Pretraživanje */}
        <div className="dev-controls">
          <div className="dev-tabs">
            <button
              className={`dev-tab ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              Svi Proizvodi ({PRODUCTS.length})
            </button>
            <button
              className={`dev-tab ${activeTab === 'skripte' ? 'active' : ''}`}
              onClick={() => setActiveTab('skripte')}
            >
              Skripte
            </button>
            <button
              className={`dev-tab ${activeTab === 'mape' ? 'active' : ''}`}
              onClick={() => setActiveTab('mape')}
            >
              Mape
            </button>
          </div>
        </div>

        {/* Mreža proizvoda */}
        {filteredProducts.length > 0 ? (
          <div className="dev-grid">
            {filteredProducts.map((product) => (
              <a
                key={product.id}
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="dev-card"
              >
                {/* Slika s preklapanjem i cijenom */}
                <div className="dev-card-image-wrapper">
                  <img src={product.image} alt={product.title} />
                  <div className="dev-card-badges">
                    <span className={product.framework ? "dev-badge-framework" : ""}>
                      {product.framework}
                    </span>
                  </div>
                  <div className="dev-card-overlay">
                    <span className="buy-now-btn">
                      Kupi na Tebexu
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Sadržaj kartice */}
                <div className="dev-card-body">
                  <div className="dev-card-category">{product.categoryLabel}</div>
                  <h3 className="dev-card-title">{product.title}</h3>
                  <p className="dev-card-description">{product.description}</p>

                  {/* Značajke */}
                  <ul className="dev-card-features">
                    {product.features.map((feature, idx) => (
                      <li key={idx}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--primary-purple)" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Podnožje kartice */}
                  <div className="dev-card-footer">
                    <span className="dev-action-text">Pogledaj detalje</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="dev-no-results">
            <h3>Nema pronađenih proizvoda</h3>
            <p>Pokušajte promijeniti pojam pretraživanja ili odaberite drugu kategoriju.</p>
          </div>
        )}
      </div>
    </section>
  );
}