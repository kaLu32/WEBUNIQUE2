import React, { useState } from 'react';
import './staff.css';

// Lista članova staff tima
const staffMembers = [
  {
    id: 1,
    name: "vNM",
    role: "Vlasnik",
    roleKey: "vlasnik",
    avatar: "https://cdn.discordapp.com/avatars/260872804205985792/a_5aee818645c58f4cc4c2528f4830f712.webp?size=256&animated=true",
    discord: "vnm3214",
    description: "Osnivač i voditelj Unique RP projekta. Zadužen za viziju i vođenje servera."
  },
  {
    id: 2,
    name: "LanaGaming",
    role: "Vlasnik",
    roleKey: "vlasnik",
    avatar: "https://cdn.discordapp.com/avatars/402090062185234432/78eed4d88d64faaad6fdec61f3c1d787.png?size=256",
    discord: "_lana_gaming_",
    description: "Osnivač i glavna podrška u vođenju zajednice i ekonomije servera."
  },
  {
    id: 3,
    name: "M4ster",
    role: "Developer",
    roleKey: "developer",
    avatar: "https://cdn.discordapp.com/avatars/424210737003495424/a_a7e130a8dd82783011089805e8bb03e2.webp?size=256&animated=true",
    discord: "master12392",
    description: "Glavni programer zadužen za unikatne skripte, optimizaciju i sisteme na serveru."
  },
  {
    id: 4,
    name: "Stefann",
    role: "Developer",
    roleKey: "developer",
    avatar: "https://cdn.discordapp.com/avatars/645219049420226570/88b6dba39c198a1b2c130bd3ab860ea7.png?size=256",
    discord: "stefann_1",
    description: "Pomaže u razvoju skripti, popravljanju bugova i testiranju novih sistema na serveru."
  },
  {
    id: 5,
    name: "_Luka32!",
    role: "Probni developer",
    roleKey: "pomocni-developer",
    avatar: "https://cdn.discordapp.com/avatars/865874522062585856/e99cac7456f6b321586c200723aa56a4.png?size=256",
    discord: "_luka32_",
    description: "Razvija UI servera, testira nove funkcionalnosti."
  },
  {
    id: 6,
    name: "Deass",
    role: "Maper",
    roleKey: "maper",
    avatar: "https://cdn.discordapp.com/avatars/286893618915049472/9c5259c5fcb135427c198e81cb72f93c.png?size=256",
    discord: "deass_01",
    description: "Kreator mapa, eksterijera i enterijera. Zaslužan za vizualni izgled grada."
  },
  {
    id: 7,
    name: "Nikola_d_007",
    role: "Maper",
    roleKey: "maper",
    avatar: "https://cdn.discordapp.com/avatars/825293604796497941/a_28995cc84aba77a88eedd11e5f467138.webp?size=256&animated=true",
    discord: "nikolad_007",
    description: "Kreator mapa, eksterijera i enterijera. Zaslužan za vizualni izgled grada."
  },
  {
    id: 8,
    name: "Aydex",
    role: "Car Developer",
    roleKey: "car-developer",
    avatar: "https://cdn.discordapp.com/avatars/1529862888649396355/e61bf9ecac24629dedb4111a94bc3673.png?size=256",
    discord: "aydexmafia",
    description: "Iskusni car developer, zadužen za dodavanje novih vozila, tuning i optimizaciju postojećih modela."
  },
  {
    id: 9,
    name: "AMKOje.",
    role: "Vodja Staffa",
    roleKey: "vodja-staffa",
    avatar: "https://cdn.discordapp.com/avatars/646488591157035008/da15cd474b9b55c0aae4dc676e7f5864.png?size=256",
    discord: "kugi_admin",
    description: "Vodja staffa, odgovoran za koordinaciju i upravljanje timom."
  },
  {
    id: 10,
    name: "iMorph3us.",
    role: "Vodja Staffa",
    roleKey: "vodja-staffa",
    avatar: "https://cdn.discordapp.com/avatars/278291326599036928/82cbaf17b8d4e667d1287b37a291cb32.png?size=256",
    discord: "imorph3us",
    description: "Vodja staffa, odgovoran za koordinaciju i upravljanje timom."
  },
  {
    id: 11,
    name: "Skadi",
    role: "High Staff",
    roleKey: "high-staff",
    avatar: "https://cdn.discordapp.com/avatars/553132937638445056/a_4df9b940aa6c22c6059d32a170e98b48.webp?size=256&animated=true",
    discord: "skadi_g",
    description: "Iskusni član staff tima, zadužen za moderaciju i održavanje reda na serveru."
  },
  {
    id: 12,
    name: "spensej",
    role: "High Staff",
    roleKey: "high-staff",
    avatar: "https://cdn.discordapp.com/avatars/497893403917287436/de6e5c73677e77973fa5aa177385d8b7.png?size=256",
    discord: "dakxy",
    description: "Iskusni član staff tima, zadužen za moderaciju i održavanje reda na serveru."
  },
  {
    id: 13,
    name: "Uncle G",
    role: "High Staff",
    roleKey: "high-staff",
    avatar: "https://cdn.discordapp.com/avatars/1514387984819163194/4f70450ed82664e79d89a754053cecc6.png?size=256",
    discord: "uncleee_g",
    description: "Iskusni član staff tima, zadužen za moderaciju i održavanje reda na serveru."
  },
  {
    id: 14,
    name: "HzBa",
    role: "High Staff",
    roleKey: "high-staff",
    avatar: "https://cdn.discordapp.com/avatars/593038970204717086/c731a3408f2e8b5ab1605d8008a1865a.png?size=256",
    discord: "hzba",
    description: "Odan, vredan i uvek se trudi da sve funkcioniše besprekorno."
  },
  {
    id: 15,
    name: "Miki",
    role: "High Staff",
    roleKey: "high-staff",
    avatar: "https://cdn.discordapp.com/avatars/772112603907883050/a84ebd1c7ad12c82596ea3b41ee8a691.png?size=256",
    discord: "_miki.5",
    description: "Odan, vredan i uvek se trudi da sve funkcioniše besprekorno."
  },
  {
    id: 16,
    name: "Killers",
    role: "Administrator",
    roleKey: "administrator",
    avatar: "https://cdn.discordapp.com/avatars/928082305514340382/99ccb12c155bec76a7c4e15e35ded046.png?size=256",
    discord: "killers9999",
    description: "Odan, vredan i uvek se trudi da sve funkcioniše besprekorno."
  },
];

function Staff() {
  const [activeFilter, setActiveFilter] = useState('sve');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const handleCopyDiscord = (id, discordTag) => {
    navigator.clipboard.writeText(discordTag);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filterCategories = [
    { key: 'sve', label: 'Svi Članovi' },
    { key: 'vlasnik', label: 'Vlasnici' },
    { key: 'developer', label: 'Developeri' },
    { key: 'pomocni-developer', label: 'Probni Dev' },
    { key: 'maper', label: 'Maperi' },
    { key: 'car-developer', label: 'Car Dev' },
    { key: 'vodja-staffa', label: 'Vođe Staffa' },
    { key: 'high-staff', label: 'High Staff' },
    { key: 'administrator', label: 'Admini' }
  ];

  const filteredMembers = staffMembers.filter((m) => {
    const matchesRole = activeFilter === 'sve' || m.roleKey === activeFilter;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      m.name.toLowerCase().includes(searchLower) || 
      m.role.toLowerCase().includes(searchLower) ||
      m.description.toLowerCase().includes(searchLower) ||
      m.discord.toLowerCase().includes(searchLower);

    return matchesRole && matchesSearch;
  });

  return (
    <div className="staff-page">
      {/* Hero Naslov */}
      <div className="staff-hero">
        <span className="section-tag">— TIM IZA UNIQUE RP</span>
        <h1>STAFF <span className="purple-gradient-text">EKIPA</span></h1>
        <p>
          Upoznajte ljude koji svakodnevno rade na razvoju, održavanju i kvalitetu vašeg Roleplay iskustva na Unique RP serveru.
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
            placeholder="Pretraži člana ili discord tag..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-btn" onClick={() => setSearchQuery('')}>✕</button>
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

      {/* Staff Grid */}
      {filteredMembers.length > 0 ? (
        <div className="staff-grid">
          {filteredMembers.map((member) => (
            <div className={`staff-card role-border-${member.roleKey}`} key={member.id}>
              <div className="card-top">
                <div className="avatar-wrapper">
                  <img src={member.avatar} alt={member.name} className="staff-avatar" />
                  <span className="online-status" title="Aktivni član"></span>
                </div>
                <span className={`role-badge role-bg-${member.roleKey}`}>
                  {member.role}
                </span>
              </div>

              <div className="card-info">
                <h3 className="staff-name">{member.name}</h3>
                <p className="staff-desc">{member.description}</p>
              </div>

              <div className="card-footer">
                <button 
                  className={`btn-discord-copy ${copiedId === member.id ? 'copied' : ''}`}
                  onClick={() => handleCopyDiscord(member.id, member.discord)}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028z"/>
                  </svg>
                  <span>{copiedId === member.id ? "KOPIRANO! ✓" : `@${member.discord}`}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results">
          <h3>Nema rezultata</h3>
          <p>Nismo pronašli nijednog člana sa zadatim kriterijima.</p>
        </div>
      )}
    </div>
  );
}

export default Staff;