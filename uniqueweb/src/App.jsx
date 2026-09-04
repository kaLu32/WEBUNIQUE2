import React, { useState } from 'react';
import './index.css';
import Development from './Development.jsx';
import Pravila from './Pravila.jsx';
import Donacije from './Donacije.jsx';
import Staff from './Staff.jsx';
import Strimeri from './Strimeri.jsx';
import ScrollLine from './ScrollLine.jsx';

function App() {
  const [copied, setCopied] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');

  const serverIP = "COMING SOON -->";

  // Video objave sa servera
  const videoItems = [
    {
      id: 1,
      videoUrl: "src/images/03291.mp4",
      author: "@Laza",
      caption: "Ma moze"
    },
    {
      id: 2,
      videoUrl: "src/images/Heee_jeste_smotani.mp4",
      author: "@Fare",
      caption: "Hee jeste smotani"
    },
    {
      id: 3,
      videoUrl: "src/images/Sequence_4.mp4",
      author: "@28",
      caption: "Ne zna se koga ce nacelnik prije ubit"
    },
    {
      id: 4,
      videoUrl: "src/images/upadskraceno.mov",
      author: "@_Luka32!",
      caption: "LSPD's finest "
    },
    {
      id: 5,
      videoUrl: "src/images/viktor.mp4",
      author: "@Shakur",
      caption: "Treba odma da se oformi SWAT tim!"
    },
    {
      id: 6,
      videoUrl: "src/images/vristanje.mp4",
      author: "@Laza",
      caption: "Kad ovo da se presvlacis... Ova strelica, vidis?"
    }
  ];

  // Slike sa servera (objave)
  const galleryItems = [
    {
      id: 1,
      image: "src/images/banka.png",
      author: "@_Luka32!",
      caption: "Bank Pljačking Unit 001"
    },
    {
      id: 2,
      image: "src/images/chill.png",
      author: "@Patrisha",
      caption: "Plazmaaa✌️"
    },
    {
      id: 3,
      image: "src/images/lspd.png",
      author: "@_Luka32!",
      caption: "When cops call 911"
    },
    {
      id: 4,
      image: "src/images/offroad.png",
      author: "@Naty",
      caption: "Offroad event <3"
    },
    {
      id: 5,
      image: "src/images/racing.png",
      author: "@_Luka32!",
      caption: "Unique Racing Scene"
    },
    {
      id: 6,
      image: "src/images/vagos.png",
      author: "@Vex",
      caption: "Vagos"
    }
  ];

  const handleCopyIP = () => {
    navigator.clipboard.writeText(serverIP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="app-container">
      {/* Top Banner */}
      <div className="top-banner">
        <span> SEZONA 4 USKORO DOLAZI!</span>
      </div>

      {/* Navigacija */}
      <nav className="navbar">
        <div 
          className="nav-logo" 
          style={{ cursor: 'pointer' }} 
          onClick={() => setCurrentPage('home')}
        >
          UNIQUE<span className="purple-text">RP</span>
        </div>

        <ul className={`nav-links ${mobileMenu ? 'active' : ''}`}>
          <li>
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage('home');
                setMobileMenu(false);
              }}
            >
              Početna
            </a>
          </li>
          
          <li>
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage('development');
                setMobileMenu(false);
              }}
            >
              Development
            </a>
          </li>
          <li>
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage('pravila');
                setMobileMenu(false);
              }}
            >
              Pravila
            </a>
          </li>
          <li>
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage('donacije');
                setMobileMenu(false);
              }}
            >
              Donacije
            </a>
        </li>
        <li>
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage('staff');
              setMobileMenu(false);
            }}
          >
            Staff
          </a>
      </li>
        <li>
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage('strimeri');
              setMobileMenu(false);
            }}
          >
            Strimeri
          </a>
      </li>
        </ul>

        <div className="nav-actions">
          <a href="https://discord.gg/zP9ypE6awn" target="_blank" rel="noreferrer" className="btn-discord">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            <span>Discord</span>
          </a>
        </div>

        <button className="mobile-toggle" onClick={() => setMobileMenu(!mobileMenu)}>
          ☰
        </button>
      </nav>

      {/* --- PRIKAZ POČETNE STRANICE --- */}
      {currentPage === 'home' && (
        <>
          {/* Animirana linija koja prati scroll i ispisuje "Unique" */}
          <ScrollLine />

          {/* Hero Sekcija */}
          <header className="hero" id="home">
            <div className="hero-content">
              <span className="section-tag">— O NAMA</span>
              <h1>DOBRODOŠLI NA <br/><span className="purple-gradient-text">UNIQUE RP</span></h1>
              <p>
                Započni svoju priču na najnaprednijem FiveM Roleplay serveru u regiji. Unikatne skripte, balancirana ekonomija i zajednica spremna za akciju.
              </p>
              <div className="ip-box">
                <span className="ip-text">{serverIP}</span>
                <button className="btn-copy" onClick={handleCopyIP}>
                  {copied ? "KOPIRANO! ✓" : "KOPIRAJ IP"}
                </button>
              </div>
              <div className="hero-buttons">
                <a href={`fivem://connect/${serverIP}`} className="btn-primary">▶ IGRAJ ODMAH</a>
                <a href="https://discord.gg/zP9ypE6awn" target="_blank" rel="noreferrer" className="btn-secondary">PRIDRUŽI SE DISCORDU</a>
              </div>
            </div>
          </header>

          {/* SEKCIJA 1: NOVOSTI SA SERVERA */}
          <section className="section-layout" id="news">
            <div className="section-sidebar">
              <div>
                <span className="section-tag">— OBAVIJESTI</span>
                <h2>NOVOSTI SA SERVERA</h2>
                <p>Najnovije obavijesti i promjene direktno sa Discord servera.</p>
              </div>
            </div>

            <div className="section-content">
              <div className="news-list">
                <div className="news-item">
                  <span className="news-date">pre 2 dana</span>
                  <div className="news-body">
                    <h4 className="news-title warning">OBAVESTENJE</h4>
                    <p>Unique RP nova priča 4.9.2026. u 18h!</p>
                  </div>
                </div>

                <div className="news-item">
                  <span className="news-date">pre 2 meseca</span>
                  <div className="news-body">
                    <h4 className="news-title">Sezona 3 je zvanično završila!</h4>
                  </div>
                </div>

                <div className="news-item">
                  <span className="news-date">pre 1 godinu i 1 mesec</span>
                  <div className="news-body">
                    <h4 className="news-title">Ažuriranje Anticheat Sustava</h4>
                    <p>Promenjena su pravila u vezi bilo kakvog cheat-a. Svi sumnjivi računi se momentalno sankcioniraju automatskim banom.</p>
                  </div>
                </div>

                <div className="news-item">
                  <span className="news-date">pre 2 godine</span>
                  <div className="news-body">
                    <h4 className="news-title">DODATNE IZMENE:</h4>
                    <p>- Prodavnica: dodane nove opcije tuninga<br/>- Pijaca: preraspodijeljene opomene<br/>- Zlatara & Banke: nov unikatni minigame za pljačke</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SEKCIJA 2: KAKO ZAPOČETI */}
          <section className="section-layout section-reverse" id="how-to-join">
            <div className="section-sidebar">
              <div>
                <span className="section-tag">— KORACI</span>
                <h2>KAKO POČETI IGRATI?</h2>
                <p>Pridružite nam se u nekoliko jednostavnih koraka i započnite svoju priču na Unique RP.</p>
              </div>
            </div>

            <div className="section-content">
              <div className="steps-list">
                <div className="step-row">
                  <div className="step-number">01</div>
                  <div className="step-info">
                    <h3>Instaliraj GTA V & FiveM</h3>
                    <p>Potrebno je imati licenciranu verziju GTA V (Steam/Epic) i preuzet besplatni FiveM klijent sa službene stranice.</p>
                  </div>
                </div>

                <div className="step-row">
                  <div className="step-number">02</div>
                  <div className="step-info">
                    <h3>Uđi na naš Discord</h3>
                    <p>Discord je glavno mjesto za sve objave, prijave za poslove, organizacije i tehničku podršku igrača.</p>
                  </div>
                </div>

                <div className="step-row">
                  <div className="step-number">03</div>
                  <div className="step-info">
                    <h3>Nauči Osnovna Pravila</h3>
                    <p>Pročitajte pravila servera kako biste osigurali fer, kvalitetan i ugodan Roleplay za sebe i druge.</p>
                  </div>
                </div>

                <div className="step-row">
                  <div className="step-number">04</div>
                  <div className="step-info">
                    <h3>Konektuj se na Server</h3>
                    <p>Pritisni F8 u FiveM-u i utipkaj <code>connect connect.uniquerp.com</code> za ulazak u igru!</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SEKCIJA 3: VIDEO OBJAVE */}
          <section className="section-layout" id="videos">
            <div className="section-sidebar">
              <div>
                <span className="section-tag">— VIDEO SADRŽAJ</span>
                <h2>KLIPOVI SA SERVERA</h2>
                <p>Video momenti i highlights sa Unique Roleplay servera.</p>
              </div>
            </div>

            <div className="section-content">
              <div className="video-grid">
                {videoItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="video-card"
                    onClick={() => setSelectedVideo(item)}
                  >
                    <div className="video-img-wrapper">
                      <video 
                        src={`${item.videoUrl}#t=0.1`} 
                        preload="metadata" 
                        muted 
                        playsInline
                      />
                      <div className="play-button-overlay">
                        <div className="play-icon">▶</div>
                      </div>
                    </div>
                    <div className="video-card-info">
                      <span className="video-author">{item.author}</span>
                      <p className="video-caption">{item.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SEKCIJA 4: OBJAVE NA SERVERU (GALERIJA) */}
          <section className="section-layout section-reverse" id="gallery">
            <div className="section-content">
              <div className="gallery-grid">
                {galleryItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="gallery-card"
                    onClick={() => setSelectedImg(item)}
                  >
                    <div className="gallery-img-wrapper">
                      <img src={item.image} alt={item.caption} />
                    </div>
                    <div className="gallery-card-info">
                      <span className="gallery-author">{item.author}</span>
                      <p className="gallery-caption">{item.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="section-sidebar">
              <div>
                <span className="section-tag">— SLIKE</span>
                <h2>SLIKE SA SERVERA</h2>
                <p>Fotografije i momenti iz života na Unique RP serveru.</p>
              </div>
            </div>
          </section>
        </>
      )}

      {/* --- PRIKAZ DEVELOPMENT STRANICE --- */}
      {currentPage === 'development' && (
        <main className="development-wrapper">
          <Development />
        </main>
      )}

      {/* --- PRIKAZ PRAVILA STRANICE --- */}
      {currentPage === 'pravila' && (
        <main>
          <Pravila />
        </main>
      )}
      {/* --- PRIKAZ STRANICE DONACIJE --- */}
      {currentPage === 'donacije' && (
        <main>
          <Donacije />
        </main>
      )}
      {/* --- PRIKAZ STAFF STRANICE --- */}
      {currentPage === 'staff' && (
        <main>
          <Staff />
        </main>
      )}
      {/* --- PRIKAZ STRIMERI STRANICE --- */}
      {currentPage === 'strimeri' && (
        <main>
          <Strimeri />
        </main>
      )}

      {/* Lightbox Modal za Slike */}
      {selectedImg && (
        <div className="lightbox-overlay" onClick={() => setSelectedImg(null)}>
          <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setSelectedImg(null)}>✕</button>
            <div className="lightbox-media">
              <img src={selectedImg.image} alt={selectedImg.caption} />
            </div>
            <div className="lightbox-details">
              <span className="lightbox-author">{selectedImg.author}</span>
              <p className="lightbox-caption">{selectedImg.caption}</p>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal za Video Klipove */}
      {selectedVideo && (
        <div className="lightbox-overlay" onClick={() => setSelectedVideo(null)}>
          <div className="lightbox-container video-modal" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setSelectedVideo(null)}>✕</button>
            <div className="lightbox-media">
              <video src={selectedVideo.videoUrl} controls autoPlay className="modal-video" />
            </div>
            <div className="lightbox-details">
              <span className="lightbox-author">{selectedVideo.author}</span>
              <p className="lightbox-caption">{selectedVideo.caption}</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <div className="nav-logo">UNIQUE<span className="purple-text">RP</span></div>
            <p>&copy; 2026 Unique RP. Sva prava pridržana.</p>
          </div>
          <div className="footer-right">
            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }}>Početna</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('development'); }}>Development</a>
            <a href="https://discord.gg/zP9ypE6awn" target="_blank" rel="noreferrer">Discord</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;