import React, { useState } from 'react';
import './donacije.css';

const jobsData = [
  // --- LEGALNI POSLOVI I BIZNISI ---
  {
    id: 1,
    title: "Mehaničarska (2 lokacije)",
    category: "legalno",
    badge: "Biznis",
    status: "Slobodno",
    icon: "🔧",
    description: "Vlasništvo nad 2 mehaničarske radionice. Popravka, tuning i personalizacija vozila za sve igrače na serveru."
  },
  {
    id: 2,
    title: "Centar Cafe",
    category: "legalno",
    badge: "Kafić",
    status: "Slobodno",
    icon: "☕",
    description: "Popularno okupljalište u samom centru grada. Idealno za organizaciju RP događaja, druženja i laganu zaradu."
  },
  {
    id: 3,
    title: "Olimpus Lux",
    category: "legalno",
    badge: "Ekskluzivno",
    status: "Slobodno",
    icon: "🏛️",
    description: "Luksuzni kompleks i noćni klub za VIP klijentelu. Savršeno za organizacije koje žele visoki društveni status."
  },
  {
    id: 4,
    title: "Otpad (2 lokacije)",
    category: "legalno",
    badge: "Industrija",
    status: "Slobodno",
    icon: "🏗️",
    description: "Reciklaža, sakupljanje materijala i rastavljanje starih vozila na 2 strateške lokacije u gradu."
  },
  {
    id: 5,
    title: "Casino + Restoran",
    category: "legalno",
    badge: "Zabava & Hrana",
    status: "Slobodno",
    icon: "🎰",
    description: "Upravljanje kazinom i luksuznim restoranom. Mjesto visoke zarade, igara na sreću i organiziranja zabava."
  },
  {
    id: 6,
    title: "Vinarija",
    category: "legalno",
    badge: "Proizvodnja",
    status: "Slobodno",
    icon: "🍇",
    description: "Uzgoj, prerada i prodaja vrhunskih vina. Mogućnost opskrbljivanja svih kafića i restorana u gradu."
  },
  {
    id: 7,
    title: "Auto Plac",
    category: "legalno",
    badge: "Prodaja",
    status: "Slobodno",
    icon: "🚗",
    description: "Prodaja polovnih i unikatnih vozila. Komisiona prodaja za igrače i uvoz ekskluzivnih modela."
  },
  {
    id: 8,
    title: "Moto Club",
    category: "legalno",
    badge: "Klub / Biker",
    status: "Slobodno",
    icon: "🏍️",
    description: "Klupske prostorije i bar prilagođene za bikerske organizacije, vožnje u koloni i okupljanja."
  },

  // --- ILEGALNI POSLOVI I ORGANIZACIJE ---
  {
    id: 9,
    title: "Pranje Novca",
    category: "ilegalno",
    badge: "Podzemlje",
    status: "Slobodno",
    icon: "💸",
    description: "Ekskluzivno pravo na pranje prljavog novca stečenog iz kriminalnih aktivnosti (pljačke, droga)."
  },
  {
    id: 10,
    title: "Veliki Kalibar",
    category: "ilegalno",
    badge: "Kriminal",
    status: "Slobodno",
    icon: "🔫",
    description: "Dobava i distribucija teškog naoružanja, municije i vojne opreme za kriminalne kartele i bande."
  },
  {
    id: 11,
    title: "Automafija",
    category: "ilegalno",
    badge: "Kriminal",
    status: "Slobodno",
    icon: "🚘",
    description: "Otmica ekskluzivnih vozila, rastavljanje u dijelove, preprodaja na crnom tržištu i ilegalne nabavke."
  },
  {
    id: 12,
    title: "Ilegalni Doktor",
    category: "ilegalno",
    badge: "Usluga",
    status: "Slobodno",
    icon: "💉",
    description: "Pružanje medicinske pomoći ranjenim kriminalcima bez obavještavanja policije i bolnice."
  },
  {
    id: 13,
    title: "Ilegalne Trke",
    category: "ilegalno",
    badge: "Ulične Trke",
    status: "Slobodno",
    icon: "🏁",
    description: "Organizacija noćnih uličnih trka, opklada i ilegalnih turnira u brzini širom Los Santosa."
  }
];

function Donacije() {
  const [activeTab, setActiveTab] = useState('sve');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = jobsData.filter((job) => {
    const matchesTab = activeTab === 'sve' || job.category === activeTab;
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.badge.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="donacije-page">
      {/* Hero sekcija */}
      <div className="donacije-hero">
        <span className="section-tag">— DONACIJE & POGODNOSTI</span>
        <h1>POSLOVI ZA <span className="purple-gradient-text">ORGANIZACIJE</span></h1>
        <p>
          Želite unaprijediti svoju organizaciju ili voditi unikatni biznis na Unique RP? 
          Pregledajte dostupne poslove i objekte koje vaša ekipa može preuzeti!
        </p>
      </div>

      {/* Kontrole: Pretraga i Filteri */}
      <div className="donacije-controls">
        <div className="donacije-search">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          <input 
            type="text" 
            placeholder="Pretraži poslove (npr. Mehaničarska, Casino, Trke)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-btn" onClick={() => setSearchTerm('')}>✕</button>
          )}
        </div>

        <div className="donacije-tabs">
          <button 
            className={`tab-btn ${activeTab === 'sve' ? 'active' : ''}`}
            onClick={() => setActiveTab('sve')}
          >
            Svi Poslovi ({jobsData.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'legalno' ? 'active' : ''}`}
            onClick={() => setActiveTab('legalno')}
          >
            🏢 Legalni Biznisi
          </button>
          <button 
            className={`tab-btn ${activeTab === 'ilegalno' ? 'active' : ''}`}
            onClick={() => setActiveTab('ilegalno')}
          >
            💀 Ilegalne Radnje
          </button>
        </div>
      </div>

      {/* Grid sa poslovima */}
      <div className="donacije-grid">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div className={`job-card ${job.category}`} key={job.id}>
              <div className="job-header">
                <div className="job-icon">{job.icon}</div>
                <div className="job-badges">
                  <span className={`badge-type ${job.category}`}>{job.badge}</span>
                  <span className="badge-status">{job.status}</span>
                </div>
              </div>

              <h3 className="job-title">{job.title}</h3>
              <p className="job-description">{job.description}</p>

              <div className="job-footer">
                <a 
                  href="https://discord.gg/zP9ypE6awn" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn-request"
                >
                  Zatraži na Discordu
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="no-jobs">
            <h3>Nema pronađenih poslova!</h3>
            <p>Pokušajte s drugim poimom pretrage.</p>
          </div>
        )}
      </div>

      {/* Info Banner pri dnu */}
      <div className="donacije-info-banner">
        <div className="info-content">
          <h2>Želite otvoriti unikatni posao za vašu ekipu?</h2>
          <p>Sve donacije direktno pomažu održavanju, razvoju i zakupu servera. Otvorite ticket na Discordu i rezervirajte željeni posao za vašu organizaciju!</p>
        </div>
        <a 
          href="https://discord.gg/zP9ypE6awn" 
          target="_blank" 
          rel="noreferrer" 
          className="btn-discord-action"
        >
          OTVORI TICKET
        </a>
      </div>
    </div>
  );
}

export default Donacije;