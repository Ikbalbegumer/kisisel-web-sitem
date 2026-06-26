import React, { useState, useEffect, useRef } from 'react'; 
import './App.css';

// --- GEZİLERİM İÇİN ÖZEL SLIDER BİLEŞENİ ---
const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const images = [
    "/doga1.png", "/doga2.jpeg", "/doga3.jpeg", "/doga4.JPG",
    "/doga5.jpeg", "/doga6.jpeg", "/doga7.jpeg", "/doga8.jpeg",
    "/kus.jpeg", "/samandag.jpeg", "/zurih1.jpeg", "/zurih2.jpeg",
    "/zurih3.jpeg", "/zurih4.jpeg", "/zurih5.jpeg",
  ];

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images.length]);

  return (
    <div className="slider-container">
      <button className="slider-btn left" onClick={prevSlide}>❮</button>
      <img src={images[currentIndex]} className="slider-image" alt={`Gezi ${currentIndex + 1}`} />
      <button className="slider-btn right" onClick={nextSlide}>❯</button>
    </div>
  );
};

// --- FAVORİ ALBÜMLER (PLAKLAR) İÇİN MÜZİK SLIDER BİLEŞENİ ---
const MusicSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const albums = [
    { img: "/gracie.jpg", name: "Gracie Abrams" },
    { img: "/KansasAnymore.jpg", name: "Role Model" },
    { img: "/pissinthewind.jpg", name: "Joji" }, 
    { img: "/radiohead.jpg", name: "Radiohead" },
    { img: "/beginhere.png", name: "The Zombies" },
    { img: "/doors.jpg", name: "The Doors" },
    { img: "/olivia.jpeg", name: "Olivia Rodrigo" }
  ];

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % albums.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + albums.length) % albums.length);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [albums.length]);

  return (
    <div className="slider-container" style={{ flexDirection: 'column', paddingTop: '20px' }}>
      <button className="slider-btn left" onClick={prevSlide}>❮</button>
      
      <img src={albums[currentIndex].img} className="slider-image" alt={albums[currentIndex].name} style={{ maxHeight: '350px' }} />
      <h3 style={{ marginTop: '25px', color: '#222', letterSpacing: '1px' }}>{albums[currentIndex].name}</h3>
      
      <button className="slider-btn right" onClick={nextSlide}>❯</button>
    </div>
  );
};
const GRID_SIZE = 5;
const NUM_TILES = GRID_SIZE * GRID_SIZE;

const PuzzleGame = ({ onClose }) => {
  const [tiles, setTiles] = useState([]);
  const [isWon, setIsWon] = useState(false);

  // Puzzle'ı başlat ve karıştır
  useEffect(() => {
    initPuzzle();
  }, []);

  const initPuzzle = () => {
    let newTiles = Array.from({ length: NUM_TILES }, (_, i) => i + 1);
    newTiles[NUM_TILES - 1] = null; // Boş kare

    // Basit karıştırma (Gerçek oyunda daha kompleks bir karıştırma yapılabilir)
    for (let i = newTiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newTiles[i], newTiles[j]] = [newTiles[j], newTiles[i]];
    }
    
    setTiles(newTiles);
    setIsWon(false);
  };

  const handleTileClick = (index) => {
    if (isWon) return;

    const emptyIndex = tiles.indexOf(null);
    const isAdjacent = 
      (index === emptyIndex - 1 && index % GRID_SIZE !== GRID_SIZE - 1) || // Sol
      (index === emptyIndex + 1 && index % GRID_SIZE !== 0) ||             // Sağ
      index === emptyIndex - GRID_SIZE ||                                  // Üst
      index === emptyIndex + GRID_SIZE;                                    // Alt

    if (isAdjacent) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
      setTiles(newTiles);
      checkWin(newTiles);
    }
  };

  const checkWin = (currentTiles) => {
    for (let i = 0; i < NUM_TILES - 1; i++) {
      if (currentTiles[i] !== i + 1) return;
    }
    setIsWon(true);
  };

  return (
    <div className="puzzle-modal-overlay">
      <div className="puzzle-modal-content">
        <button className="puzzle-close-btn" onClick={onClose}>×</button>
        <h2 className="puzzle-title">Gizli Odaya Hoş Geldin! 🧩</h2>
        <p className="puzzle-desc">Taşları sırala (1-24). Boşluk sağ altta olmalı.</p>
        
        <div className="puzzle-board">
          {tiles.map((tile, index) => (
            <div 
              key={index} 
              className={`puzzle-tile ${tile === null ? 'empty' : ''} ${tile === index + 1 ? 'correct' : ''}`}
              onClick={() => handleTileClick(index)}
            >
              {tile}
            </div>
          ))}
        </div>

        {isWon && (
          <div className="puzzle-win-message">
            <h3>Tebrikler Begüm! 🎉</h3>
            <p>Bulmacayı çözdün!</p>
            <button className="puzzle-restart-btn" onClick={initPuzzle}>Tekrar Oyna</button>
          </div>
        )}
      </div>
    </div>
  );
};
function App() {
  const [activeModal, setActiveModal] = useState(null);
  const [lightMode, setLightMode] = useState(0); 
  const [isRainy, setIsRainy] = useState(false);
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  
  // Parallax ve Keşif state'leri
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [visitedHotspots, setVisitedHotspots] = useState([]);
  const [showCompletion, setShowCompletion] = useState(false);
  
  // --- YENİ: PUZZLE STATE'İ ---
  const [showPuzzle, setShowPuzzle] = useState(false);

  const totalHotspotsCount = 14; 

  const playlist = [
    { title: "Blowing Smoke", artist: "Gracie Abrams", cover: "/gracie.jpg", src: "/blowingsmoke.mp3" },
    { title: "Glimpse of Us", artist: "Joji", cover: "/joji.jpg", src: "/GlimpseofUs.mp3" },
    { title: "Weird Fishes / Arpeggi", artist: "The Cardigans", cover: "/radiohead.jpg", src: "/RadioheadWeirdFishesArpeggi.mp3" }
  ];

  const rainAudioRef = useRef(null);
  const musicAudioRef = useRef(null);

  // Parallax Efekti
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Puzzle açıkken hareket etmesin
      if (showPuzzle) return; 
      
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) - 0.5;
      const y = (e.clientY / innerHeight) - 0.5;
      setTilt({ x: x * 1.5, y: -y * 1.5 });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [showPuzzle]);

  // --- YENİ: "BEGUM" ŞİFRESİNİ DİNLEME ---
  useEffect(() => {
    let keySequence = '';
    const secretCode = 'begum';

    const handleKeyDown = (e) => {
      // Sadece harfleri al ve küçült
      if (/^[a-zA-Z]$/.test(e.key)) {
        keySequence += e.key.toLowerCase();
        
        // Sadece son 5 karakteri tut (şifre uzunluğu kadar)
        if (keySequence.length > secretCode.length) {
          keySequence = keySequence.slice(-secretCode.length);
        }

        if (keySequence === secretCode) {
          setShowPuzzle(true);
          keySequence = ''; // Bulunduktan sonra sıfırla
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleHotspotClick = (id) => {
    if (!visitedHotspots.includes(id)) {
      const updated = [...visitedHotspots, id];
      setVisitedHotspots(updated);
      if (updated.length === totalHotspotsCount) {
        setTimeout(() => setShowCompletion(true), 500);
      }
    }
  };

  const toggleRainMode = () => {
    setIsRainy(!isRainy);
    if (!isRainy && rainAudioRef.current) {
      rainAudioRef.current.volume = 0.4;
      rainAudioRef.current.play();
    } else if (rainAudioRef.current) {
      rainAudioRef.current.pause();
    }
  };

  const handleRecordPlayerClick = () => {
    setShowMusicPlayer(true);
  };

  const togglePlay = () => {
    if (isPlaying) {
      musicAudioRef.current.pause();
    } else {
      musicAudioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
  };

  const prevSong = () => {
    setCurrentSongIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (musicAudioRef.current && showMusicPlayer) {
      musicAudioRef.current.src = playlist[currentSongIndex].src;
      if (isPlaying) {
        musicAudioRef.current.play();
      }
    }
  }, [currentSongIndex, isPlaying, showMusicPlayer]);

  const getLightClass = () => {
    if (lightMode === 1) return 'light-blue active';
    if (lightMode === 2) return 'light-pink active';
    if (lightMode === 3) return 'light-yellow active';
    return '';
  };

  const modalContents = {
     ukulele: {
      title: "Ukulele Zamanı 🎵",
      content: (
        <>
          <div style={{ background: '#f0f0f0', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
            <p style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#333' }}>Müzik Kaydım:</p>
            <audio controls style={{ width: '100%' }}>
             <source src="/ses.mp3" type="audio/mpeg" />
            </audio>
          </div>
          <div className="gallery-grid">
            <div className="gallery-item"><img src="/ukulele1.jpg" alt="Ukulele 1" /></div>
          </div>
        </>
      )
    },
    kaykay: {
      title: "Kaykay 🛹",
      content: <p>Kaykay kaymak hobilerim arasındadır.</p>
    },
    gezilerim: {
      title: "Gezilerim 🌍",
      content: (
        <>
          <ImageSlider />
          <p style={{ fontStyle: 'italic', marginTop: '20px' }}>
            Doğa resimleri çekmeyi ve yeni yerler keşfetmeyi seviyorum.
          </p>
        </>
      )
    },
    bilgisayar: {
      title: "BEGUM-MacBook-Air",
      content: (
        <div className="mac-folder-grid">
          <a href="/cv.pdf" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="mac-item">📄 CV.pdf</div>
          </a>
          <a href="/robotkol.jpg" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="mac-item">📁 Robot Kol Projesi</div>
          </a>
          <a href="/tarımcık.jpeg" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="mac-item">📁 Tarım Aracı</div>
          </a>
          <a href="/LAB_SUNUM(1).pdf" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="mac-item">📁 Laboratuvar Katılım Sayacı</div>
          </a>
          <a href="/muzikcalar.png" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="mac-item">📁 Python SQLite3 Müzik Çalar</div>
          </a>
        </div>
      )
    },
    kahve: {
      title: "Kahve Molası ☕",
      content: <p>Kahve içmeyi çok seviyorum, ice latte favorim.</p>
    },
    defter: {
      title: "Çizimlerim 🎨",
      content: (
        <>
          <p>Çizim yapmaktan hoşlanırım.</p>
        <div className="gallery-grid">
          <div className="gallery-item"><img src="/cizim1.jpg" alt="Çizim 1" /></div>
          <div className="gallery-item"><img src="/resim2.jpg" alt="Çizim 2" /></div>
          <div className="gallery-item"><img src="/resim3.jpg" alt="Çizim 3" /></div>
          <div className="gallery-item"><img src="/cizim4.jpg" alt="Çizim 4" /></div>
          <div className="gallery-item"><img src="/cizim10.jpg" alt="Çizim 5" /></div>
          <div className="gallery-item"><img src="/cizim11.jpg" alt="Çizim 6" /></div>
          <div className="gallery-item"><img src="/cizim12.jpg" alt="Çizim 7" /></div>
        </div>
         </>
      )
    },
    cerceve: {
      title: "Derinlerde 🌊",
      content: (
        <>
          <p>Yüzmeyi ve dalış yapmayı severim.</p>
          <div className="gallery-grid">
            <div className="gallery-item"><img src="/deniz1.jpeg" alt="Dalış 1" /></div>
            <div className="gallery-item"><img src="/deniz2.jpeg" alt="Dalış 2" /></div>
            <div className="gallery-item"><img src="/deniz3.jpeg" alt="Dalış 3" /></div>
            <div className="gallery-item"><img src="/deniz4.JPG" alt="Dalış 4" /></div>
          </div>
        </>
      )
    },
    poster: {
      title: "Müzik 🎤",
      content: (
        <>
          <div className="poster-container">
            <img src="/joji.jpg" alt="Joji" />
          </div>
          <p style={{ marginTop: '15px' }}>Duvardaki bu poster Joji'nin albüm kapağının resmi. Kendisi sevdiğim şarkıcılardan birisidir.</p>
        </>
      )
    },
    plaklar: {
      title: "Favori Albümlerim 🎧",
      content: <MusicSlider />
    },
    raket: {
      title: "Kortlarda 🎾",
      content: (
        <>
          <p>Arkadaşlarımla tenis oynamayı seviyorum.</p>
          <div className="gallery-grid">
            <div className="gallery-item"><img src="/tenis1.JPG" alt="Tenis 1" /></div>
          </div>
        </>
      )
    },
    kitaplik: {
      title: "Kütüphanemdeki Sevdiğim Bazı Kitaplar 📚",
      content: (
        <ul style={{ textAlign: 'left', display: 'inline-block', lineHeight: '1.8' }}>
          <li><b>Haşlanmış Harikalar Diyarı ve Dünyanın Sonu</b> - Haruki Murakami</li>
          <li><b>İmkansızın Şarkısı</b> - Haruki Murakami</li>
          <li><b>Nietzsche Ağladığında</b> - Irvin D. Yalom</li>
          <li><b>Düşüş</b> - Albert Camus</li>
          <li><b>Stoner</b> - John Williams</li>
          <li><b>Kurt Gölü</b> - John Verdon</li>
          <li><b>Martin Eden</b> - Jack London</li>
          <li><b>Gün Olur Asra Bedel</b> - Cengiz Aytmatov</li>
          <li><b>Monte Kristo Kontu</b> - Alexandre Dumas</li>
          <li><b>Usta ve Margarita</b> - Mikhail Bulgakov</li>
          <li><b>1984</b> - George Orwell </li>
          <li><b>Fahrenheit 451</b> - Ray Bradbury</li>
        </ul>
      )
    }
  };

  return (
    <div className={`App ${isRainy ? 'dark-rainy-mode' : ''}`}>
      
      <audio ref={rainAudioRef} loop>
        <source src="/rain.mp3" type="audio/mpeg" />
      </audio>

      <audio ref={musicAudioRef} onEnded={nextSong} />

      <div 
        className="room-container"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(1.02)`,
          transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }}
      >
        <div className="room-title">
      
          <p>Keşfedilenler({visitedHotspots.length}/{totalHotspotsCount})</p>
        </div>
        
        <img src="/room_image.jpg" alt="Benim Odam" className="room-image" />
        
        {isRainy && <div className="rain-overlay"></div>}
        
        <div className={`ceiling-light-overlay ${getLightClass()}`}></div>

        {/* --- HOTSPOTLAR --- */}
        <div className="hotspot ukulele" onClick={() => { handleHotspotClick('ukulele'); setActiveModal('ukulele'); }}></div>
        <div className="hotspot kaykay" onClick={() => { handleHotspotClick('kaykay'); setActiveModal('kaykay'); }}></div>
        <div className="hotspot gezilerim" onClick={() => { handleHotspotClick('gezilerim'); setActiveModal('gezilerim'); }}></div>
        <div className="hotspot bilgisayar" onClick={() => { handleHotspotClick('bilgisayar'); setActiveModal('bilgisayar'); }}></div>
        <div className="hotspot kahve" onClick={() => { handleHotspotClick('kahve'); setActiveModal('kahve'); }}></div>
        <div className="hotspot defter" onClick={() => { handleHotspotClick('defter'); setActiveModal('defter'); }}></div>
        <div className="hotspot cerceve" onClick={() => { handleHotspotClick('cerceve'); setActiveModal('cerceve'); }}></div>
        <div className="hotspot poster" onClick={() => { handleHotspotClick('poster'); setActiveModal('poster'); }}></div>
        <div className="hotspot plaklar" onClick={() => { handleHotspotClick('plaklar'); setActiveModal('plaklar'); }}></div>
        <div className="hotspot plakcalar" onClick={() => { handleHotspotClick('plakcalar'); handleRecordPlayerClick(); }} title="Müzik Dinle"></div>
        <div className="hotspot raket" onClick={() => { handleHotspotClick('raket'); setActiveModal('raket'); }}></div>
        <div className="hotspot kitaplik" onClick={() => { handleHotspotClick('kitaplik'); setActiveModal('kitaplik'); }}></div>
        <div className="hotspot kirmizitus" onClick={() => { handleHotspotClick('kirmizitus'); setLightMode((prev) => (prev + 1) % 4); }}></div>
        <div className="hotspot pencere" onClick={() => { handleHotspotClick('pencere'); toggleRainMode(); }} title="Yağmur Modu"></div>
      </div>

      {/* --- MÜZİK ÇALAR WIDGET --- */}
      {showMusicPlayer && (
        <div className="music-player-widget">
          <button className="close-player" onClick={() => {setShowMusicPlayer(false); setIsPlaying(false); musicAudioRef.current.pause();}}>×</button>
          <div className={`record-disk ${isPlaying ? 'spinning' : ''}`}>
            <img src={playlist[currentSongIndex].cover} alt="album cover" />
            <div className="record-hole"></div>
          </div>
          <div className="song-info">
            <h4>{playlist[currentSongIndex].title}</h4>
            <p>{playlist[currentSongIndex].artist}</p>
          </div>
          <div className="player-controls">
            <button onClick={prevSong}>⏮</button>
            <button className="play-pause-btn" onClick={togglePlay}>{isPlaying ? '⏸' : '▶'}</button>
            <button onClick={nextSong}>⏭</button>
          </div>
        </div>
      )}

      {/* --- STANDART MODAL --- */}
      {activeModal && modalContents[activeModal] && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setActiveModal(null)}>×</button>
            <h2>{modalContents[activeModal].title}</h2>
            <div className="modal-body">{modalContents[activeModal].content}</div>
          </div>
        </div>
      )}

      {/* --- YENİ: PUZZLE MODALI --- */}
      {showPuzzle && <PuzzleGame onClose={() => setShowPuzzle(false)} />}

      {/* --- BAŞARI TEBRİK PENCERESİ --- */}
      {showCompletion && (
        <div className="completion-overlay">
          <div className="completion-content">
            <div className="trophy-icon">🏆</div>
            <h2>Bütün odayı keşfettiniz!</h2>
            <div className="percentage-badge">%100 tamamlandı.</div>
            <p>Harika! Gizli nesnelerin, müziklerin ve odanın tüm detaylarını başarıyla açtınız.</p>
            <button className="completion-btn" onClick={() => setShowCompletion(false)}>Odaya Geri Dön</button>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;