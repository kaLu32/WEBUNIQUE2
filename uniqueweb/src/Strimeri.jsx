import React, { useState } from 'react';
import './strimeri.css';

// SVG Ikone za društvene mreže
const KickIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 3h18v18H3V3zm13.5 12.75l-3.375-3.375L16.5 9h-3l-2.25 2.625V9H9v6h2.25v-2.25l.75-.875 2.25 2.875h2.25z"/>
  </svg>
);

const TwitchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.571 4.714h1.715v5.143h-1.715zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const TiktokIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02.77-.04 1.54-.04 2.31-.01 1.05-.02 2.1-.01 3.15-.98-.24-2.07-.06-2.93.47-.88.53-1.47 1.48-1.57 2.5-.13 1.08.28 2.18 1.08 2.91.87.82 2.11 1.15 3.27.87 1.02-.23 1.89-.95 2.32-1.89.26-.57.36-1.2.35-1.83V.02z"/>
  </svg>
);

// Podaci o strimerima
const streamerMembers = [
  {
    id: 1,
    name: "Unique Development",
    role: "DEVELOPMENT",
    roleKey: "developer",
    avatar: "./public/images/logo_test.png",
    isLive: false,
    description: "Nove mape, skripte i alati od našeg developmenta.",
    socials: {
      youtube: "https://www.youtube.com/@UniqueDevelopmentRS",
      tiktok: "https://www.tiktok.com/@unique_development",
    }
  },
  {
    id: 2,
    name: "LanaGaming",
    role: "VLASNICA",
    roleKey: "vlasnik",
    avatar: "https://cdn.discordapp.com/avatars/402090062185234432/78eed4d88d64faaad6fdec61f3c1d787.png?size=256",
    isLive: true,
    description: "Svakodnevni streamovi, lud Roleplay i dobra zabava sa zajednicom!",
    socials: {
      kick: "https://kick.com/lanagaming",
      youtube: "https://www.youtube.com/@lana_gaming_",
      tiktok: "https://www.tiktok.com/@amodiligere"
    }
  },
  {
    id: 3,
    name: "Unique Roleplay",
    role: "Server profili",
    roleKey: "developer",
    avatar: "./public/images/logo_test.png",
    isLive: true,
    description: "Klipovi, traileri i zanimljivi momenti sa Unique RP servera.",
    socials: {
      tiktok: "https://www.tiktok.com/@uniqueroleplaaay",
      youtube: "https://www.youtube.com/@UniqueRoleplay2024"
    }
  },
  {
    id: 4,
    name: "Nikola_d_007",
    role: "Streamer",
    roleKey: "vodja-staffa",
    avatar: "https://cdn.discordapp.com/avatars/825293604796497941/a_28995cc84aba77a88eedd11e5f467138.webp?size=1024&animated=true",
    isLive: true,
    description: "Rijetko kad strima, ali i kad strima ne valja.",
    socials: {
      kick: "https://kick.com/nikola-d-007"
    }
  },
  {
    id: 5,
    name: "Krofna",
    role: "Streamer",
    roleKey: "vodja-staffa",
    avatar: "https://cdn.discordapp.com/avatars/306056489183739905/640697b940ddbbd2fef59f57b0347a54.png?size=256",
    isLive: true,
    description: "Krofna.",
    socials: {
      youtube: "https://www.youtube.com/@krofnaaa"
    }
  },
  {
    id: 6,
    name: "SinanMaslic",
    role: "Streamer",
    roleKey: "vodja-staffa",
    avatar: "https://cdn.discordapp.com/avatars/1063231250476830730/4d5b7f90884a3a7efb67819293f6ba59.png?size=1024",
    isLive: true,
    description: "Redovni strimovi, zanimljiv roleplay i dnevna doza smeha!",
    socials: {
      youtube: "https://www.youtube.com/@maslicgaming96"
    }
  },
  {
    id: 7,
    name: "N1ksa",
    role: "Streamer",
    roleKey: "vodja-staffa",
    avatar: "https://cdn.discordapp.com/avatars/1185933557189849231/e547fea02dbd0c3ab92f3f4d4a2f7b8d.png?size=1024",
    isLive: true,
    description: "Redovni strimovi sa servera, akcije i zanimljiv roleplay sa zajednicom.",
    socials: {
      youtube: "https://www.youtube.com/@N1ksa_101"
    }
  },
  {
    id: 8,
    name: "Plavke",
    role: "Streamer",
    roleKey: "vodja-staffa",
    avatar: "https://cdn.discordapp.com/avatars/1163208851626139680/3373d38febe34af238183e3032f625d3.png?size=256",
    isLive: true,
    description: "Redovni strimovi sa servera, akcije i zanimljiv roleplay sa zajednicom.",
    socials: {
      youtube: "https://www.youtube.com/@Plavkee"
    }
  },
  {
    id: 9,
    name: "Paki",
    role: "Streamer",
    roleKey: "vodja-staffa",
    avatar: "https://cdn.discordapp.com/avatars/777295405036732447/4e213c8469368ad0e579202693a6542d.png?size=1024",
    isLive: true,
    description: "Redovni strimovi sa servera, akcije i zanimljiv roleplay sa zajednicom.",
    socials: {
      youtube: "https://www.youtube.com/@pakisha221/videos"
    }
  },
  {
    id: 10,
    name: "Naty",
    role: "Streamer",
    roleKey: "vodja-staffa",
    avatar: "https://cdn.discordapp.com/avatars/733458638680883200/9fb01707ba78392a47ab4463be9f52dc.png?size=256",
    isLive: true,
    description: "Redovni strimovi sa servera, akcije i zanimljiv roleplay sa zajednicom.",
    socials: {
      youtube: "https://www.youtube.com/@naty14666",
      kick: "https://kick.com/naty14666",
      tiktok: "https://www.tiktok.com/@naty146666"
    }
  },
  {
    id: 11,
    name: "BakiX_",
    role: "Streamer",
    roleKey: "vodja-staffa",
    avatar: "https://cdn.discordapp.com/avatars/1538985169594224763/13f228c7255dbaaf03e2a16538552f11.png?size=256",
    isLive: true,
    description: "Redovni strimovi sa servera, akcije i zanimljiv roleplay sa zajednicom.",
    socials: {
      youtube: "https://www.youtube.com/@2011dragan",
      kick: "https://kick.com/bakixx",
      tiktok: "https://www.tiktok.com/@mihailovicbalsa"
    }
  },
  {
    id: 12,
    name: "Deni",
    role: "Streamer",
    roleKey: "vodja-staffa",
    avatar: "https://cdn.discordapp.com/avatars/1527379682134065326/0951858c122eecd6dc575f45cc2e523f.png?size=1024",
    isLive: true,
    description: "Redovni strimovi sa servera, akcije i zanimljiv roleplay sa zajednicom.",
    socials: {
      youtube: "https://www.youtube.com/@Caymaaan",
    }
  },
  {
    id: 13,
    name: "Frxonii",
    role: "Streamer",
    roleKey: "vodja-staffa",
    avatar: "https://cdn.discordapp.com/avatars/343690459698167808/9c1804560ca5f9f3c5bb6068ec03cdcd.png?size=1024",
    isLive: true,
    description: "Redovni strimovi sa servera, akcije i zanimljiv roleplay sa zajednicom.",
    socials: {
      tiktok: "https://www.tiktok.com/@frxonigaming/live?enter_from_merge=share&enter_method=share_copy_link",
    }
  },
    {
    id: 14,
    name: "Stanceviiiic",
    role: "Streamer",
    roleKey: "vodja-staffa",
    avatar: "https://cdn.discordapp.com/avatars/288918350254571522/c268bd6d05fd48f584b99fdb699ad28a.png?size=1024",
    isLive: true,
    description: "Redovni strimovi sa servera, akcije i zanimljiv roleplay sa zajednicom.",
    socials: {
      kick: "https://kick.com/stanceviiic",
    }
  },
];

function Strimeri() {
  const [activeFilter, setActiveFilter] = useState('sve');
  const [searchTerm, setSearchTerm] = useState('');

  const filterCategories = [
    { key: 'sve', label: 'Sve Platforme' },
    { key: 'kick', label: 'Kick' },
    { key: 'youtube', label: 'YouTube' },
    { key: 'tiktok', label: 'TikTok' },
    { key: 'twitch', label: 'Twitch' }
  ];

  const filteredStreamers = streamerMembers.filter((streamer) => {
    const matchesPlatform = activeFilter === 'sve' || Boolean(streamer.socials[activeFilter]);
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      streamer.name.toLowerCase().includes(searchLower) ||
      streamer.role.toLowerCase().includes(searchLower) ||
      streamer.description.toLowerCase().includes(searchLower);

    return matchesPlatform && matchesSearch;
  });

  return (
    <div className="staff-page">
      {/* Hero Naslov */}
      <div className="staff-hero">
        <span className="section-tag">— UŽIVO SA UNIQUE RP</span>
        <h1>NAŠI <span className="purple-gradient-text">STRIMERI</span></h1>
        <p>
          Upoznajte kreatore sadržaja koji svakodnevno prenose svoje avanture, akcije i priče sa Unique RP servera.
        </p>
      </div>

      {/* Pretraga i Filteri */}
      <div className="donacije-controls">
        <div className="donacije-search">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          <input 
            type="text" 
            placeholder="Pretraži strimera..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-btn" onClick={() => setSearchTerm('')}>✕</button>
          )}
        </div>

        <div className="staff-filters">
          {filterCategories.map((cat) => (
            <button 
              key={cat.key}
              className={`filter-btn ${activeFilter === cat.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid sa strimerima */}
      {filteredStreamers.length > 0 ? (
        <div className="staff-grid">
          {filteredStreamers.map((streamer) => (
            <div className={`staff-card role-border-${streamer.roleKey}`} key={streamer.id}>
              <div className="card-top">
                <div className="avatar-wrapper">
                  <img src={streamer.avatar} alt={streamer.name} className="staff-avatar" />
                  <span className="online-status" title="Aktivni kreator"></span>
                </div>
                <span className={`role-badge role-bg-${streamer.roleKey}`}>
                  {streamer.role}
                </span>
              </div>

              <div className="card-info">
                <h3 className="staff-name">{streamer.name}</h3>
                <p className="staff-desc">{streamer.description}</p>
              </div>

              <div className="card-footer streamer-footer">
                <div className="streamer-social-grid">
                  {streamer.socials.kick && (
                    <a href={streamer.socials.kick} target="_blank" rel="noreferrer" className="social-btn kick">
                      <KickIcon /> Kick
                    </a>
                  )}
                  {streamer.socials.twitch && (
                    <a href={streamer.socials.twitch} target="_blank" rel="noreferrer" className="social-btn twitch">
                      <TwitchIcon /> Twitch
                    </a>
                  )}
                  {streamer.socials.youtube && (
                    <a href={streamer.socials.youtube} target="_blank" rel="noreferrer" className="social-btn youtube">
                      <YoutubeIcon /> YouTube
                    </a>
                  )}
                  {streamer.socials.tiktok && (
                    <a href={streamer.socials.tiktok} target="_blank" rel="noreferrer" className="social-btn tiktok">
                      <TiktokIcon /> TikTok
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results">
          <h3>Nema pronađenih strimera</h3>
          <p>Nismo pronašli nijednog strimera koji odgovara zadanom filteru ili pretrazi.</p>
        </div>
      )}
    </div>
  );
}

export default Strimeri;