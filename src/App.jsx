import { useState, useEffect } from 'react';
import './App.css';

// --- GEZİLERİM İÇİN ÖZEL SLIDER BİLEŞENİ ---
const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // HATA DÜZELTİLDİ: /public/ yazıları kaldırıldı, direkt / ile başlatıldı
  const images = [
    "/doga1.png", 
    "/doga2.jpeg", 
    "/doga3.jpeg", 
    "/doga4.JPG",
    "/doga5.jpeg",
    "/doga6.jpeg",
    "/doga7.jpeg",
    "/doga8.jpeg",
    "/kus.jpeg",
    "/samandag.jpeg",
    "/zürih1.jpeg",
    "/zürih2.jpeg",
    "/zürih3.jpeg",
    "/zürih4.jpeg",
    "/zürih5.jpeg"
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

function App() {
  const [activeModal, setActiveModal] = useState(null);
  const [lightMode, setLightMode] = useState(0); 

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
            <p style={{ margin: '0 0 10px 0', fontSize: '0.9rem' }}>Müzik Kaydım:</p>
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
        <>
          <div className="mac-folder-grid">
            {/* HATA DÜZELTİLDİ: Sınıf isimleri mac-item yapıldı ve tıklanınca dosyayı açması için link (a) eklendi */}
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
        </>
      )
    },
    kahve: {
      title: "Kahve Molası ☕",
      content: <p>Kahve içmeyi çok seviyorum, ice latte favorim.</p>
    },
    defter: {
      title: "Çizimlerim 🎨",
      content: (
        <div className="gallery-grid">
          <div className="gallery-item"><img src="/cizim1.jpeg" alt="Çizim 1" /></div>
          <div className="gallery-item"><img src="/resim2.jpeg" alt="Çizim 2" /></div>
          <div className="gallery-item"><img src="/resim3.jpg" alt="Çizim 3" /></div>
          <div className="gallery-item"><img src="/cizim4.png" alt="Çizim 4" /></div>
        </div>
      )
    },
    cerceve: {
      title: "Derinlerde 🌊",
      content: (
        <>
          <p>Yüzmeyi ve dalış yapmayı severim.</p>
          <div className="gallery-grid">
            {/* HATA DÜZELTİLDİ: /public/ yazıları kaldırıldı */}
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
          <p style={{ marginTop: '15px' }}>Joji çok sevdiğim şarkıcılardan birisidir.</p>
        </>
      )
    },
    plaklar: {
      title: "Favori Albümlerim 🎧",
      content: (
        <>
          <MusicSlider />
        </>
      )
    },
    raket: {
      title: "Kortlarda 🎾",
      content: (
        <>
          <p>Boş zamanlarımda tenis oynuyorum.</p>
          <div className="gallery-grid">
            <div className="gallery-item"><img src="/tenis1.JPG" alt="Tenis 1" /></div>
          </div>
        </>
      )
    },
    kitaplik: {
      title: "Kütüphanem 📚",
      content: (
        <ul style={{ textAlign: 'left', display: 'inline-block', lineHeight: '1.8' }}>
          <li><b>Haşlanmış Harikalar Diyarı ve Dünyanın Sonu</b> - Haruki Murakami</li>
          <li><b>Nietzsche Ağladığında</b> - Irvin D. Yalom</li>
          <li><b>Düşüş</b> - Albert Camus</li>
          <li><b>John Verdon</b> Kitap Serisi</li>
          <li><b>Martin Eden</b> - Jack London</li>
          <li><b>Gün Olur Asra Bedel</b> - Cengiz Aytmatov</li>
        </ul>
      )
    }
  };

  return (
    <div className="App">
      <div className="room-container">
        <img src="/room_image.jpg" alt="Benim Odam" className="room-image" />
        
        <div className={`ceiling-light-overlay ${getLightClass()}`}></div>

        <div className="hotspot ukulele" onClick={() => setActiveModal('ukulele')}></div>
        <div className="hotspot kaykay" onClick={() => setActiveModal('kaykay')}></div>
        <div className="hotspot gezilerim" onClick={() => setActiveModal('gezilerim')}></div>
        <div className="hotspot bilgisayar" onClick={() => setActiveModal('bilgisayar')}></div>
        <div className="hotspot kahve" onClick={() => setActiveModal('kahve')}></div>
        <div className="hotspot defter" onClick={() => setActiveModal('defter')}></div>
        <div className="hotspot cerceve" onClick={() => setActiveModal('cerceve')}></div>
        <div className="hotspot poster" onClick={() => setActiveModal('poster')}></div>
        <div className="hotspot plaklar" onClick={() => setActiveModal('plaklar')}></div>
        <div className="hotspot raket" onClick={() => setActiveModal('raket')}></div>
        <div className="hotspot kitaplik" onClick={() => setActiveModal('kitaplik')}></div>
        
        <div className="hotspot kirmizitus" onClick={() => setLightMode((prev) => (prev + 1) % 4)}></div>
      </div>

      {activeModal && modalContents[activeModal] && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setActiveModal(null)}>×</button>
            <h2>{modalContents[activeModal].title}</h2>
            {modalContents[activeModal].content}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;