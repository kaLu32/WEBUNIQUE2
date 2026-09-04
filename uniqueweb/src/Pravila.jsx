import React, { useState, useMemo } from 'react';
import './pravila.css';

const rulesData = [
  // --- KATEGORIJA: POJMOVI I OSNOVE ---
  {
    id: 1,
    category: 'opca_pravila',
    title: 'Roleplay (RP)',
    tag: 'Osnove',
    description: 'Simulacija stvarnog života u igri. Vaš lik mora reagirati i ponašati se kao što bi se stvarna osoba ponašala u stvarnom životu.',
    example: 'Razmišljajte o posljedicama svojih djela jednako kao u pravom životu.'
  },
  {
    id: 2,
    category: 'opca_pravila',
    title: 'IC (In Character) / OOC (Out Of Character)',
    tag: 'Osnove',
    description: 'IC predstavlja sve što se događa u svijetu vašeg lika. OOC predstavlja sve što se tiče vas kao igrača u stvarnom svijetu.',
    example: 'Zabranjeno je miješati IC i OOC informacije (npr. spominjanje Discorda u igri).'
  },
  {
    id: 3,
    category: 'opca_pravila',
    title: 'RDM (Random Deathmatch)',
    tag: 'Kazna: Ban',
    description: 'Ubijanje ili napadanje drugog igrača bez valjanog Roleplay razloga ili predpriče (Inicijacije).',
    example: 'Prije pucanja ili napada morate izdati jasne IC zahtjeve i dati protivniku dovoljno vremena da reagira.'
  },
  {
    id: 4,
    category: 'opca_pravila',
    title: 'VDM (Vehicle Deathmatch)',
    tag: 'Kazna: Ban',
    description: 'Korištenje vozila kao oružja za namjerno udaranje, gaženje ili ubijanje drugih igrača.',
    example: 'Zabranjeno je zalijetanje autom u grupu ljudi ili namjerno gaženje pješaka.'
  },
  {
    id: 5,
    category: 'opca_pravila',
    title: 'MetaGaming (MG) & Stream Sniping',
    tag: 'Pravilo',
    description: 'Korištenje OOC informacija (sa Discorda, streamova, radija) u IC svrhe u igri. Zabranjeno je i gledanje nečijeg strima radi iskorištavanja informacija.',
    example: 'Gledanje streama i odlazak na lokaciju gdje se nalazi streamer na temelju streama.'
  },
  {
    id: 6,
    category: 'opca_pravila',
    title: 'PowerGaming (PG) & RPS',
    tag: 'Pravilo',
    description: 'Izvođenje radnji fizički nemogućih u stvarnosti, prisiljavanje drugih na RP bez opcije odgovora, ili ponašanje poput "supermena" kome nitko ništa ne može.',
    example: 'Vožnja sportskog auta 200 km/h po planinama ili ignoriranje opasnosti po život.'
  },
  {
    id: 7,
    category: 'opca_pravila',
    title: 'FearRP',
    tag: 'Pravilo',
    description: 'Strah za vlastiti život. Morate pokazati odgovarajući strah kada vam je život direktno ugrožen.',
    example: 'Ako vam 2 naoružane osobe drže pištolj na glavi, morate slušati njihove naredbe.'
  },
  {
    id: 8,
    category: 'opca_pravila',
    title: 'FailRP',
    tag: 'Pravilo',
    description: 'Kvarenje ili nelogično vođenje Roleplay situacije, držanje karaktera suprotno ulozi (npr. policajac pljačka banku, bolničar ubija ljude).',
    example: 'Smijanje, skakanje ili neprikladno ponašanje tijekom talačke krize.'
  },

  // --- KATEGORIJA: OPĆA PRAVILA ---
  {
    id: 9,
    category: 'opca_pravila',
    title: 'Combat Logging (CL) & DTA',
    tag: 'Kazna: Teški Ban',
    description: 'Namjerno izlaženje iz igre ili prisilno ubijanje karaktera kako bi se izbjegla RP situacija, uhićenje, gubitak stvari ili smrt.',
    example: 'Ako vam pukne igra, dužni ste se javiti u "crash-log" na Discordu u roku od 5 minuta.'
  },
  {
    id: 10,
    category: 'opca_pravila',
    title: 'Bug Abuse & Admin Abuse',
    tag: 'Kazna: Perma Ban',
    description: 'Iskorištavanje grešaka u skripti/igri ili admin komandi radi vlastite koristi i štete drugima.',
    example: 'Dupliciranje novca, oružja ili prolazak kroz teksture.'
  },
  {
    id: 11,
    category: 'opca_pravila',
    title: 'Safe Zone (SZ) & NSR',
    tag: 'Pravilo',
    description: 'Lokacije na kojima je strogo zabranjena bilo kakva kriminalna aktivnost, pucanje, otmica ili ubojstvo (osim ako je RP počeo prije ulaska u zonu).',
    example: 'Safe zone: Bolnica, Policijska stanica, Pijaca, Mehaničarska radnja.'
  },
  {
    id: 12,
    category: 'opca_pravila',
    title: 'Character Kill (CK) & Player Kill (PK)',
    tag: 'Sustav',
    description: 'PK je privremeni gubitak pamćenja nakon smrti u bolnici. CK je trajno brisanje lika uz odobrenje Admina ili kroz strogo definirane IC uvjete.',
    example: 'Nakon što se probudite u bolnici (PK), ne sjećate se događaja koji su doveli do vaše smrti.'
  },
  {
    id: 13,
    category: 'opca_pravila',
    title: 'Oblačenje, Uniforme i Garderoba',
    tag: 'Pravilo',
    description: 'Zabranjeno je civilima nošenje uniformi državnih organizacija (policija, bolnica, vatrogasci) te nošenje odjeće s uvredljivim ili mrzilačkim simbolima.',
    example: 'Korištenje odjeće sa simbolima mržnje ili policijskih obilježja.'
  },
  {
    id: 14,
    category: 'opca_pravila',
    title: 'Teški Prekršaji i Vrijeđanje',
    tag: 'Kazna: Perma Ban',
    description: 'Propisano za vređanje na nacionalnoj/verskoj/rasnoj osn., govor mržnje, psovanje staff-a, psovanje porodice, čitovanje i trolovanje.',
    example: 'Bilo koji oblik korištenja exploit-a, cheat-a ili teškog govora mržnje.'
  },
  {
    id: 15,
    category: 'opca_pravila',
    title: 'Discord, Voice Kanali i Metagaming Provere',
    tag: 'Pravilo',
    description: 'Zabranjeno je biti u vanjskim voice kanalima s igračima koji su trenutno na serveru. Staff ima pravo provjeravati Discord dopisivanja.',
    example: 'Slušanje ili pričanje preko vanjskih aplikacija s igračima u igri.'
  },
  {
    id: 16,
    category: 'opca_pravila',
    title: 'NLR, Pamćenje i Amnezija',
    tag: 'Pravilo',
    description: 'Sjećate se svega do momenta dok niste ostali bez svijesti. Glumljenje amnezije ili psihičkih bolesnika (ludaka) radi izbjegavanja RP posljedica strogo je zabranjeno.',
    example: 'Zaboravljanje događaja isključivo se veže za period nesvijesti.'
  },

  // --- KATEGORIJA: DODATNA OSNOVNA PRAVILA ---
  {
    id: 17,
    category: 'opca_pravila',
    title: 'Rp2win',
    tag: 'Pravilo',
    description: 'Zabranjeno je RolePlayanje situacije isključivo u svoju korist bez pružanja prilike drugim igračima da se pokušaju izvući (putem /me i /do komandi).',
    example: 'Primjer primjene pravila Rp2win.'
  },
  {
    id: 18,
    category: 'opca_pravila',
    title: 'Non RP',
    tag: 'Pravilo',
    description: 'Općenito pravilo koje zabranjuje kršenje RP standarda, ometanje akcija i nerealno ponašanje u svijetu igre.',
    example: 'Primjer primjene pravila Non RP.'
  },
  {
    id: 19,
    category: 'opca_pravila',
    title: 'Cop Baiting (CB)',
    tag: 'Pravilo',
    description: 'Zabranjeno je namjerno provociranje, iritiranje i izazivanje policijskih službenika bez dubljeg IC razloga.',
    example: 'Primjer primjene pravila Cop Baiting.'
  },
  {
    id: 20,
    category: 'opca_pravila',
    title: 'Team Kill (TK)',
    tag: 'Pravilo',
    description: 'Zabranjeno je ubijanje članova vlastite organizacije/frakcije, osim u slučaju odobrene perme od strane lidera.',
    example: 'Primjer primjene pravila Team Kill.'
  },
  {
    id: 21,
    category: 'opca_pravila',
    title: 'Spawn Kill (SK)',
    tag: 'Pravilo',
    description: 'Zabranjeno je sačekivanje i ubijanje igrača na mjestima njihovog oživljavanja ili spawna.',
    example: 'Primjer primjene pravila Spawn Kill.'
  },
  {
    id: 22,
    category: 'opca_pravila',
    title: 'KRP & OOC Prekidi',
    tag: 'Pravilo',
    description: 'Zabranjeno je uništavati tuđi roleplay radnjama koje onemogućavaju igru drugim igračima, kao i prekidanje RP-a kroz OOC chat/govor.',
    example: 'Primjer primjene pravila KRP.'
  },
  {
    id: 23,
    category: 'opca_pravila',
    title: 'Combat Rolling / Cik-Cak (CR)',
    tag: 'Pravilo',
    description: 'Zabranjeno je nerealno kretanje (trčanje lijevo-desno cik-cak ili skakanje) u tijeku pucnjave radi izbjegavanja metaka.',
    example: 'Primjer primjene pravila Combat Rolling.'
  },
  {
    id: 24,
    category: 'opca_pravila',
    title: 'Player vs Environment (PvE)',
    tag: 'Pravilo',
    description: 'Zabranjeno je divljanje, uništavanje i nanošenje štete po tuđoj imovini bez smislenog IC razloga.',
    example: 'Primjer primjene pravila PvE.'
  },
  {
    id: 25,
    category: 'opca_pravila',
    title: 'Revenge Kill (RK)',
    tag: 'Pravilo',
    description: 'Zabranjeno je traženje osvete i ubijanje igrača odmah nakon što vas je isti taj igrač prethodno ubio.',
    example: 'Primjer primjene pravila Revenge Kill.'
  },
  {
    id: 26,
    category: 'opca_pravila',
    title: 'Admin Evasion (AE)',
    tag: 'Kazna: Ban',
    description: 'Zabranjeno je svako laganje administratora ili izbjegavanje administrativne provjere i razgovora u svoju korist.',
    example: 'Primjer primjene pravila Admin Evasion.'
  },

  // --- KATEGORIJA: ILEGALNO ---
  {
    id: 27,
    category: 'ilegalno',
    title: 'Pravila Pljački, Taoca i Otmica',
    tag: 'Ilegalno',
    description: 'Definiran je maksimalan/minimalan broj pljačkaša i policajaca. Zabranjeno je korištenje lažnih taoca ili otimanje igrača na početničkim poslovima (taxi, dostavljači).',
    example: 'Zabranjeno otimanje vozača koji pošteno radi svoj posao.'
  },
  {
    id: 28,
    category: 'ilegalno',
    title: 'Posljedice, Baze i Vozila',
    tag: 'Ilegalno',
    description: 'Nakon ilegalnih radnji zabranjeno je napuštanje servera ili povratak u bazu 30 minuta. Bežanje firminim vozilom u vodu briše vozilo iz organizacije.',
    example: 'Ostanak na serveru minimalno 30 minuta nakon velike akcije.'
  },
  {
    id: 29,
    category: 'ilegalno',
    title: 'Radio, Vrijeme i Maske',
    tag: 'Ilegalno',
    description: 'Zabranjeno korištenje kriptovanih frekvencija i ilegalnih akcija nakon 02:00h. Maske su obavezne, a kampovanje na ilegalnim lokacijama zabranjeno.',
    example: 'Skidanje maske tijekom aktivne ilegalne radnje.'
  },
  {
    id: 30,
    category: 'ilegalno',
    title: 'Pljačka Bankomata',
    tag: 'Pljačka',
    description: 'Pljačka bankomata ima cooldown od 2 sata.',
    example: 'Cooldown se odnosi na pojedinca koji je izvršio pljačku.'
  },
  {
    id: 56,
    category: 'ilegalno',
    title: 'Pljačka Kuće',
    tag: 'Pljačka',
    description: 'U pljački kuće učestvuje maksimalno 2 osobe, a cooldown iznosi 4 sata.',
    example: 'Prekoračenje dozvoljenog broja učesnika smatra se kršenjem pravila pljačke.'
  },
  {
    id: 57,
    category: 'ilegalno',
    title: 'Pljačka Prodavnice',
    tag: 'Pljačka',
    description: 'Minimum 2, maksimum 3 osobe učestvuju u pljački, uz cooldown od 8 sati po osobi.',
    example: 'Cooldown se broji individualno za svakog učesnika pljačke.'
  },
  {
    id: 58,
    category: 'ilegalno',
    title: 'Pljačka Zlatare',
    tag: 'Pljačka',
    description: 'Minimum 3, maksimum 4 osobe učestvuju u pljački, uz cooldown od 12 sati po osobi.',
    example: 'Cooldown se broji individualno za svakog učesnika pljačke.'
  },
  {
    id: 59,
    category: 'ilegalno',
    title: 'Pljačka Fleeca i Paleto Banke',
    tag: 'Pljačka',
    description: 'Minimum 3, maksimum 4 osobe učestvuju u pljački, uz cooldown od 24 sata po osobi.',
    example: 'Cooldown se broji individualno za svakog učesnika pljačke.'
  },
  {
    id: 60,
    category: 'ilegalno',
    title: 'Pljačka Glavne Banke',
    tag: 'Pljačka',
    description: 'U pljački glavne banke učestvuje minimum 5, maksimum 8 ljudi.',
    example: 'Poštovanje dozvoljenog broja učesnika je obavezno za validan RP pljačke.'
  },
  {
    id: 61,
    category: 'ilegalno',
    title: 'Open Fire: Pljačka Ammu-Nation-a',
    tag: 'Open Fire Pljačka',
    description: 'Minimum 5, maksimum 8 osoba, uz cooldown od 7 dana po organizaciji.',
    example: 'Cooldown se odnosi na celu organizaciju, ne samo na učesnike pljačke.'
  },
  {
    id: 62,
    category: 'ilegalno',
    title: 'Open Fire: Pljačka Jahte',
    tag: 'Open Fire Pljačka',
    description: 'Minimum 5, maksimum 10 osoba (dozvoljeni isključivo pištolji), uz cooldown od 7 dana po organizaciji.',
    example: 'Korišćenje oružja jačeg od pištolja na ovoj pljački je zabranjeno.'
  },
  {
    id: 63,
    category: 'ilegalno',
    title: 'Open Fire: Pljačka Blinde',
    tag: 'Open Fire Pljačka',
    description: 'Minimum 5, maksimum 8 osoba (dozvoljeni isključivo pištolji), uz cooldown od 7 dana po organizaciji.',
    example: 'Korišćenje oružja jačeg od pištolja na ovoj pljački je zabranjeno.'
  },
  {
    id: 64,
    category: 'ilegalno',
    title: 'Open Fire: Pljačka Teretnog Broda',
    tag: 'Open Fire Pljačka',
    description: 'Minimum 5, maksimum 10 osoba, uz cooldown od 14 dana po organizaciji.',
    example: 'Cooldown se odnosi na celu organizaciju, ne samo na učesnike pljačke.'
  },
  {
    id: 65,
    category: 'ilegalno',
    title: 'Open Fire: Pljačka Voza',
    tag: 'Open Fire Pljačka',
    description: 'Minimum 7, maksimum 10 osoba, uz cooldown od 14 dana po organizaciji.',
    example: 'Cooldown se odnosi na celu organizaciju, ne samo na učesnike pljačke.'
  },
  {
    id: 66,
    category: 'ilegalno',
    title: 'Ilegalne Misije i Cooldown Organizacije',
    tag: 'Cooldown',
    description: 'Ilegalne misije imaju svoj cooldown definisan skriptom.',
    example: 'Ako jedna osoba učestvuje u pljački koja ima cooldown po organizaciji, cela organizacija dobija cooldown na tu pljačku.'
  },

  // --- KATEGORIJA: PD PRAVILA ---
  {
    id: 31,
    category: 'pd',
    title: 'PD Korišćenje Oružja',
    tag: 'Korišćenje Oružja',
    description: 'PD ima pravo da koristi oružje isključivo u situacijama kada je životno ugrožen.',
    example: 'Strogo je zabranjeno pucanje na prodajama ilegalnih supstanci, bilo od strane mafije ili od strane PD-a.'
  },
  {
    id: 67,
    category: 'pd',
    title: 'Traffic Stop i Pretres',
    tag: 'Korišćenje Oružja',
    description: 'Pucanje na traffic stopovima je strogo zabranjeno, kao i pretresanje igrača osim ako nije na poternici.',
    example: 'Vređanje PD-a u ćelijama kažnjava se markerima za fear.'
  },
  {
    id: 32,
    category: 'pd',
    title: 'Tejzer Pravila',
    tag: 'Tejzer',
    description: 'Tejzer se sme koristiti isključivo na manjim hit and run pljačkama, na prodajama i prilikom privođenja u određenim situacijama.',
    example: 'Tejzer se ne sme koristiti ako je igrač u vozilu ili na motoru.'
  },
  {
    id: 68,
    category: 'pd',
    title: 'Tejzer na Presedanjima i Beg On Foot',
    tag: 'Tejzer',
    description: 'Na presedanjima se tejzer koristi isključivo kada se igrač hvata za bravu ili se približava motoru.',
    example: 'Dok igrač beži peške (on foot), PD je dužan da ga juri peške, uz mogućnost obaranja.'
  },
  {
    id: 33,
    category: 'pd',
    title: 'Pravilo Potera - Uslovi i Trajanje',
    tag: 'Potera',
    description: 'PD mora poštovati uslove na pljačkama u trajanju od 30 minuta od momenta početka potere, nakon čega uslovi prestaju da važe.',
    example: 'Nakon isteka ovog roka, PD više nije obavezan poštovati prethodno dogovorene uslove pljačke.'
  },
  {
    id: 69,
    category: 'pd',
    title: 'Bušenje Guma i Persuit Mod',
    tag: 'Potera',
    description: 'Bušenje guma je moguće isključivo spajkovima, koji ne smeju biti postavljeni pre isteka uslova. Persuit mod se mora poštovati - vozila su raspoređena po klasama sa razlogom.',
    example: 'Ako PD juri begunca u D klasi vozila i izgubi poteru, ne sme naknadno menjati klasu vozila kako bi ga pronašao.'
  },
  {
    id: 70,
    category: 'pd',
    title: 'Kvar Vozila i Prevrtanje',
    tag: 'Potera',
    description: 'Ako policajac koji juri ostane bez vozila zbog mehaničkog kvara, ne sme se vraćati u poteru drugim vozilom.',
    example: 'Prevrtanje vozila znači automatsko isključenje iz potere, bez mogućnosti nastavka i bez izuzetaka.'
  },
  {
    id: 34,
    category: 'pd',
    title: 'Pit Manevar',
    tag: 'Potera',
    description: 'Pit manevar je moguće izvršiti isključivo pri brzinama manjim od 50 km/h.',
    example: 'Izvođenje pit manevra pri većim brzinama predstavlja kršenje pravila.'
  },
  {
    id: 71,
    category: 'pd',
    title: 'Policijska Oprema - Kidnapovanje zbog Pljačke',
    tag: 'Policijska Oprema',
    description: 'Ako je policajac kidnapovan zbog pljačke objekata (talačka situacija) ili radi otkupa, od njega sme biti oduzeto sve osim opreme za forenziku.',
    example: 'Oprema za forenziku je izuzeta iz oduzimanja u ovakvim situacijama.'
  },
  {
    id: 72,
    category: 'pd',
    title: 'Policijska Oprema - Kidnapovanje radi Pljačke Policajca',
    tag: 'Policijska Oprema',
    description: 'Ako je policajac kidnapovan isključivo radi pljačke, od policijske opreme se ne sme oduzimati ništa osim municije i pancira.',
    example: 'Policijsko oružje sme biti oduzeto isključivo na open fire pljačkama i u prethodno navedenim situacijama.'
  },
  {
    id: 73,
    category: 'pd',
    title: 'Kazne i Serijski Brojevi',
    tag: 'Policijska Oprema',
    description: 'Kazne za posedovanje policijske opreme su ogromne, pa se ista uzima isključivo na sopstveni rizik. Skidanje serijskih brojeva sa PD opreme je strogo zabranjeno.',
    example: 'Nošenje ukradene policijske opreme povlači ozbiljne sankcije ukoliko se otkrije.'
  },
  {
    id: 74,
    category: 'pd',
    title: 'Automafija i PD Vozila',
    tag: 'Policijska Oprema',
    description: 'Automafija može tražiti otkup za policijska vozila.',
    example: 'Postupak otkupa PD vozila prati ista pravila kao i kod ostalih ukradenih vozila.'
  },

  // --- KATEGORIJA: ORGANIZACIJE ---
  {
    id: 35,
    category: 'organizacije',
    title: 'Broj Članova i Vođa',
    tag: 'Organizacija',
    description: 'Maksimalan broj članova organizacije je 10, a maksimalan broj vođa je 2. Ako vođe odu na doživotnu robiju ili budu permanentno banovani, organizacija se gasi.',
    example: 'Za upad na ilegalne lokacije i baze drugih organizacija potrebno je minimalno 5 članova, a korišćenje kriptovanog radija tokom ilegalnih radnji je strogo zabranjeno.'
  },
  {
    id: 36,
    category: 'organizacije',
    title: 'Kidnapovanje - Osnovni Uslovi',
    tag: 'Kidnapovanje',
    description: 'Za kidnapovanje mora postojati dobar RP razlog. Zabranjeno je kidnapovati igrača samo radi pljačke - pljačka se vrši na mestu zatecanja i igrač se odmah pušta. Vatrogasce i bolničare u uniformi nije dozvoljeno kidnapovati, a taoca koji sarađuje ne smete raniti.',
    example: 'Kidnapovanje isključivo radi pljačke, bez daljeg IC razloga, smatra se kršenjem pravila.'
  },
  {
    id: 37,
    category: 'organizacije',
    title: 'Talačka Situacija i Pregovori',
    tag: 'Kidnapovanje',
    description: 'Talačka situacija podrazumeva držanje pištolja na glavi (animacija) ili uperen pištolj sa distance manje od 1 metra. Lažiranje ili laganje o postojanju taoca je zabranjeno. Pregovori su obavezni ako se umeša policija ili oštećena organizacija.',
    example: 'Imate pravo na 3 uslova, policija na 1 uslov po taocu (mafija ima dodatni uslov za svaki dodatni talac); taoc se drži maks. 60 minuta uz pregovore, odnosno 24 sata bez njih.'
  },
  {
    id: 38,
    category: 'organizacije',
    title: 'Taoci i Otkup',
    tag: 'Kidnapovanje',
    description: 'Taoc ne sme biti pregovarač, niti se smeju koristiti lažni taoci (prijatelji, članovi organizacije, dogovorene situacije). Pregovarač ne sme biti povređen. Nerealni uslovi i kršenje pravila RP2WIN su zabranjeni.',
    example: 'Otkup od policije: 10.000 (civil), 15.000 (policajac), 20.000 (vođa jedinice), 30.000 (načelnik). Otkup od organizacije: 10.000 (član), 20.000 (šef). Ako je kidnapovanje zbog pljačke objekta, imate pravo na jedan uslov više.'
  },
  {
    id: 39,
    category: 'organizacije',
    title: 'Pljačka Igrača - Uslovi',
    tag: 'Pljačka Igrača',
    description: 'Istog igrača možete opljačkati jednom u 12 sati, a pljačka se vrši isključivo na mestu zatecanja (zabranjeno je voditi igrača sa sobom) i samo kada je na serveru noć. Može mu se oduzeti sve osim ključeva, hrane i vode.',
    example: 'Kod policajca se smeju oduzeti ilegalne stvari, novac, komunikacija, municija, spajkovi i pancir; dozvoljeno je i korišćenje ukradene kreditne kartice ukoliko saznate PIN.'
  },
  {
    id: 40,
    category: 'organizacije',
    title: 'Pljačka Igrača - Zabrane',
    tag: 'Pljačka Igrača',
    description: 'Zabranjeno je pljačkati vatrogasce i bolničare u uniformi, lažno pozivati službe radi pljačke, ili pljačkati igrača zatečenog nesvesnog na čije stanje niste uticali.',
    example: 'Lažno zvanje hitne pomoći kako biste namamili i opljačkali bolničara predstavlja kršenje pravila.'
  },
  {
    id: 47,
    category: 'organizacije',
    title: 'Ilegalne Lokacije',
    tag: 'Ilegalne Lokacije',
    description: 'Branje, prerada i lokacija "Babica" su open fire lokacije. Zabranjena je prodaja ili deljenje lokacija drugim organizacijama, kao i kampovanje na njima.',
    example: 'Izviđanje i posmatranje dozvoljeni su isključivo sa distance, uz maksimalno 2 izviđača.'
  },
  {
    id: 48,
    category: 'organizacije',
    title: 'Udruživanje Organizacija',
    tag: 'Udruživanje',
    description: 'Na pljačkama objekata mogu se udružiti maksimalno 2 organizacije. Ako dođe do pucnjave sa trećom organizacijom ili policijom, zajedno pucaju samo članovi koji su trenutno na pljački (kod open fire pljački samo učesnici iste pljačke).',
    example: 'Udruživanje protiv policije ili treće organizacije dozvoljeno je isključivo ako se tokom primopredaje između dve organizacije umeša pretnja treće strane.'
  },
  {
    id: 49,
    category: 'organizacije',
    title: 'Pomoć i Izvlačenje Ranjenih',
    tag: 'Udruživanje',
    description: 'Organizacija sme pomoći drugoj organizaciji u izvlačenju ranjenih članova, ali pritom ne sme koristiti vatreno oružje.',
    example: 'Van navedenih izuzetaka, udruživanje protiv policije ili treće organizacije je zabranjeno.'
  },
  {
    id: 51,
    category: 'organizacije',
    title: 'Pravilo Perme - Izvršenje',
    tag: 'Perma',
    description: 'Perma mora biti izvršena vatrenim oružjem bez prigušivača. Na /me i /do komande obavezna je provera pulsa - ako se ne koriste, perma se poništava i mora se pisati novi zahtev sa novim dokazima.',
    example: 'Telo se ne sme pomerati sa lokacije na kojoj je perma izvršena, niti se igraču sme oduzeti telefon.'
  },
  {
    id: 52,
    category: 'organizacije',
    title: 'Pravilo Perme - Safe Zona, Oružje i Self-Perma',
    tag: 'Perma',
    description: 'U safe zoni (osim bolnice) permu je moguće izvesti jedino snajperom, pri čemu se puls tada ne proverava. Oružje kojim je perma izvršena mora ostati u organizaciji i ne sme se bacati niti prodavati. Self-perma je najstrože zabranjena.',
    example: 'Ako pokušate da izvršite permu, a vas ubiju pre nego što je vi izvršite, vaš karakter se smatra permanim ("perma u permi"). Zahtevi se šalju na email uniqueroleplay202421@gmail.com.'
  },
  {
    id: 53,
    category: 'organizacije',
    title: 'Automafija - Lokacije i Objava',
    tag: 'Automafija',
    description: 'Pronalaskom lokacija za prepis i rastavljanje stiču se privilegije automafije. Nakon krađe vozila, od momenta objave na Twitteru da je vozilo ukradeno, vlasnik ima 30 minuta da se javi radi dogovora oko otkupa.',
    example: 'Vozilo bez prethodne objave na Twitteru ne sme se prepisati na sebe niti rastaviti u delove.'
  },
  {
    id: 54,
    category: 'organizacije',
    title: 'Automafija - Donatorska Vozila i Posledice',
    tag: 'Automafija',
    description: 'Donatorska i unikatna vozila ne mogu se prepisivati ni rastavljati - vlasnik je dužan javiti se za otkup od 20.000, u suprotnom se smatra da krši FearRP i dobija minus na računu.',
    example: 'Rastavljanjem se vozilo trajno briše iz garaže uz isplatu 10% vrednosti vlasniku; prepisom se vozilo prebacuje u garažu kradljivca uz otkupnu cenu od 15% salonske vrednosti.'
  },
  {
    id: 55,
    category: 'organizacije',
    title: 'Automafija - Radio i Policija',
    tag: 'Automafija',
    description: 'Na radiju tokom automafije sme biti isključivo pregovarač, a imena se ne smeju čitati preko radija.',
    example: 'Policija se ne sme mešati u potragu za ukradenim vozilom, osim ako vlasnik nije prijavio krađu ili je vlasnik sam policajac.'
  }
];

// Prikazni nazivi za kategorije - dodaj ovdje kad dodaš novu kategoriju u rulesData
const CATEGORY_LABELS = {
  sve: 'Sva Pravila',
  opca_pravila: 'Opća Pravila',
  ilegalno: 'Ilegalne Radnje',
  pd: 'PD Pravila',
  organizacije: 'Organizacije'
};

function Pravila() {
  const [activeCategory, setActiveCategory] = useState('sve');
  const [searchTerm, setSearchTerm] = useState('');

  // Kategorije se generiraju dinamički iz rulesData, tako da svaki novi 'category'
  // dodan u podatke automatski dobije svoj tab (ako mu nema labela, koristi se sam key)
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(rulesData.map((rule) => rule.category))];
    return ['sve', ...uniqueCategories];
  }, []);

  // Filtriranje pravila po kategoriji i pretraživanju
  const filteredRules = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return rulesData.filter((rule) => {
      const matchesCategory = activeCategory === 'sve' || rule.category === activeCategory;

      if (!term) return matchesCategory;

      const matchesSearch =
        rule.title.toLowerCase().includes(term) ||
        rule.description.toLowerCase().includes(term) ||
        rule.tag.toLowerCase().includes(term) ||
        (rule.example && rule.example.toLowerCase().includes(term));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  return (
    <div className="pravila-page">
      {/* Hero Banner Pravila */}
      <div className="pravila-hero">
        <span className="section-tag">— PROČITAJTE PAŽLJIVO</span>
        <h1>PRAVILA <span className="purple-gradient-text">UNIQUE RP</span></h1>
        <p>
          Kako bismo osigurali ugodan i kvalitetan Roleplay za sve igrače, obavezni ste poštivati navedena pravila.
          Nepoznavanje pravila ne oslobađa vas kazne!
        </p>
      </div>

      {/* Kontrole: Pretraga i Filteri */}
      <div className="pravila-controls">
        <div className="search-box">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          <input
            type="text"
            placeholder="Pretraži pravila (npr. RDM, FearRP, Pljačka)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => setSearchTerm('')}>✕</button>
          )}
        </div>

        <div className="pravila-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`tab-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {CATEGORY_LABELS[cat] || cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid sa Pravilima */}
      <div className="pravila-grid">
        {filteredRules.length > 0 ? (
          filteredRules.map((rule) => (
            <div className="rule-card" key={rule.id}>
              <div className="rule-card-header">
                <h3>{rule.title}</h3>
                <span className={`rule-tag ${rule.tag.includes('Ban') ? 'tag-danger' : ''}`}>
                  {rule.tag}
                </span>
              </div>
              <p className="rule-description">{rule.description}</p>
              {rule.example && (
                <div className="rule-example">
                  <strong>💡 Primjer / Napomena:</strong> {rule.example}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="no-rules-found">
            <h3>Nije pronađeno niti jedno pravilo!</h3>
            <p>Pokušajte s drugim pojmom u pretrazi.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Pravila;