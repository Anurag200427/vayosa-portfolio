import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Sample project images (replace with your actual project images)
  const projectGalleries = {
    posters: [
      'https://images.unsplash.com/photo-1579389083078-4e7018379f0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&auto=format&fit=crop&w=1494&q=80',
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80'
    ],
    // Add more projects as needed
  };
  
  const openGallery = (projectId) => {
    setCurrentProject(projectId);
    setCurrentImageIndex(0);
    setIsGalleryOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };
  
  const closeGallery = () => {
    setIsGalleryOpen(false);
    document.body.style.overflow = 'unset'; // Re-enable scrolling
  };
  
  const nextImage = () => {
    setCurrentImageIndex(prev => 
      prev === projectGalleries[currentProject]?.length - 1 ? 0 : prev + 1
    );
  };
  
  const prevImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? projectGalleries[currentProject]?.length - 1 : prev - 1
    );
  };
  
  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeGallery();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentProject, currentImageIndex]);

  const heroTexts = [
    'DESIGN',
    'REFINED',
    'VISION MEETS RESULTS'
  ];

  // Text animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % heroTexts.length);
    }, 2500); // Change text every 2.5 seconds
    
    return () => clearInterval(interval);
  }, [heroTexts.length]);

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'works', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="app">
      {/* Navigation */}
      <nav className={`navbar ${isMenuOpen ? 'active' : ''}`}>
        <div className="navbar-container">
          <div className={`menu-icon ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            {['about', 'services', 'works', 'contact'].map((item) => (
              <li
                key={item}
                className={`nav-item ${activeSection === item ? 'active' : ''}`}
                onClick={() => scrollToSection(item)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <div className="hero-text-container">
            {heroTexts.map((text, index) => (
              <h1 
                key={index}
                className={`hero-text ${index === currentTextIndex ? 'active' : ''}`}
              >
                {text}
              </h1>
            ))}
          </div>
          <p className="hero-subtitle">Where digital art comes to life</p>
          <button 
            className="explore-button"
            onClick={() => scrollToSection('works')}
            aria-label="Explore our work"
          >
            Explore Our Work
            <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="about-header">
          <h2>About Us</h2>
          
          <p className="section-subtitle">Crafting digital experiences that inspire and engage</p>
        </div>
        
        <div className="about-container">
          <div className="about-content">
            <div className="about-images">
              <div className="image-grid">
                <div className="image-item main-image">
                  <img 
                    src="/images/design2.jpg" 
                    alt="Digital Art Creation"
                    className="grayscale"
                  />
                  <div className="image-overlay">
                    <span>Since 2024</span>
                  </div>
                </div>
                <div className="image-item">
                  <img 
                    src="/images/Posts.png" 
                    alt="Poster Design Process"
                    className="grayscale"
                  />
                </div>
                <div className="image-item">
                  <img 
                    src="https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80&grayscale" 
                    alt="VFX Designer at Work"
                    className="grayscale"
                  />
                </div>
              </div>
            </div>
            
            <div className="about-text">
              <h3>Where Creativity Meets <span className="highlight">Innovation</span></h3>
              <p className="lead">At Vayosa Studios, we're more than just a creative agency – we're storytellers, visionaries, and digital artisans. With a relentless passion for visual excellence, we transform ideas into captivating visual experiences that leave lasting impressions.</p>
              
              <div className="expertise-grid">
                <div className="expertise-item">
                  <div className="expertise-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <h4>Advertisement Mastery</h4>
                  <p>Compelling campaigns that capture attention and drive engagement across all platforms.</p>
                </div>
                <div className="expertise-item">
                  <div className="expertise-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 14H7v-2h4v2zm0-4H7v-2h4v2zm0-4H7V7h4v2zm6 8h-4v-2h4v2zm0-4h-4v-2h4v2zm0-4h-4V7h4v2z"/>
                    </svg>
                  </div>
                  <h4>Poster Design</h4>
                  <p>Striking visuals that communicate your message with impact and style.</p>
                </div>
                <div className="expertise-item">
                  <div className="expertise-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"/>
                    </svg>
                  </div>
                  <h4>Web Development</h4>
                  <p>Responsive, beautiful websites that deliver exceptional user experiences.</p>
                </div>
                <div className="expertise-item">
                  <div className="expertise-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
                    </svg>
                  </div>
                  <h4>VFX Excellence</h4>
                  <p>Breathtaking visual effects that bring your imagination to life on screen.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section">
        <div className="section-header">
          <h2>Our Services</h2>
          <p className="section-subtitle">Comprehensive solutions for your brand's digital presence</p>
        </div>
        <div className="services-grid">
          {[
            {
              title: 'Branding & Identity',
              description: 'We craft unique brand identities that tell your story and resonate with your audience, including logo design, brand guidelines, and visual language development.',
              image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80&grayscale'
            },
            {
              title: 'Web Design & Development',
              description: 'From responsive websites to complex web applications, we create digital experiences that are beautiful, functional, and optimized for performance.',
              image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80&grayscale'
            },
            {
              title: 'Social Media Management',
              description: 'We develop and execute social media strategies that increase engagement, grow your following, and drive meaningful interactions with your brand.',
              image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80&grayscale'
            },
            {
              title: 'Paid Promotion & Ads',
              description: 'Targeted advertising campaigns across digital platforms to maximize your reach, conversions, and return on investment.',
              image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80&grayscale'
            },
            {
              title: 'Graphic Design',
              description: 'Compelling visual content including posters, banners, infographics, and marketing materials that capture attention and communicate effectively.',
              image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80&grayscale'
            },
            {
              title: 'Video & Photo Content',
              description: 'Professional photography and videography services to create stunning visual content for your marketing campaigns and social media presence.',
              image: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80&grayscale'
            }
          ].map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-image">
                <img src={service.image} alt={service.title} className="grayscale" />
              </div>
              <div className="service-content">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Works Section */}
      <section id="works" className="section">
        <div className="section-header">
          <h2>Our Works</h2>
          <p className="section-subtitle">Explore our diverse range of creative projects</p>
        </div>
        
        <div className="works-grid">
          {/* Posters */}
          <div className="project-card" data-category="posters" style={{ '--i': 1 }}>
            <div className="project-image">
              <img src="https://images.unsplash.com/photo-1579389083078-4e7018379f0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Movie Poster Design" />
              <span className="project-category">Posters</span>
            </div>
            <div className="project-content">
              <h3>Cinematic Universe</h3>
              <p>Bold and captivating movie poster series that brings stories to life through striking visuals and typography.</p>
              <button 
                className="view-project-btn"
                onClick={() => openGallery('posters')}
              >
                View Project
                <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>

          {/* Collaborations */}
          <div className="project-card" data-category="collaborations" style={{ '--i': 2 }}>
            <div className="project-image">
              <img src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80" alt="Brand Collaboration" />
              <span className="project-category">Collaborations</span>
            </div>
            <div className="project-content">
              <h3>Brand Fusion</h3>
              <p>Strategic partnership with leading brands to create unique, cross-promotional marketing campaigns.</p>
              <button 
                className="view-project-btn"
                onClick={() => openGallery('posters')}
              >
                View Project
                <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>

          {/* Social Media Posts */}
          <div className="project-card" data-category="social" style={{ '--i': 3 }}>
            <div className="project-image">
              <img src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" alt="Social Media Campaign" />
              <span className="project-category">Social Media</span>
            </div>
            <div className="project-content">
              <h3>#TrendingNow</h3>
              <p>Viral social media campaign that increased engagement by 300% across all platforms.</p>
              <button 
                className="view-project-btn"
                onClick={() => openGallery('posters')}
              >
                View Project
                <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>

          {/* Advertisements */}
          <div className="project-card" data-category="advertisements" style={{ '--i': 4 }}>
            <div className="project-image">
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Advertising Campaign" />
              <span className="project-category">Advertisements</span>
            </div>
            <div className="project-content">
              <h3>Urban Pulse</h3>
              <p>Outdoor and digital advertising campaign that transformed brand perception in urban markets.</p>
              <button 
                className="view-project-btn"
                onClick={() => openGallery('posters')}
              >
                View Project
                <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>

          {/* Illustrations */}
          <div className="project-card" data-category="illustrations" style={{ '--i': 5 }}>
            <div className="project-image">
              <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1461&q=80" alt="Digital Illustrations" />
              <span className="project-category">Illustrations</span>
            </div>
            <div className="project-content">
              <h3>Digital Dreams</h3>
              <p>Collection of vibrant digital illustrations for editorial and commercial use.</p>
              <button 
                className="view-project-btn"
                onClick={() => openGallery('posters')}
              >
                View Project
                <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>

          {/* Branding */}
          <div className="project-card" data-category="branding" style={{ '--i': 6 }}>
            <div className="project-image">
              <img src="https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" alt="Brand Identity" />
              <span className="project-category">Branding</span>
            </div>
            <div className="project-content">
              <h3>Evolve Branding</h3>
              <p>Complete brand identity system including logo, typography, color palette, and brand guidelines.</p>
              <button 
                className="view-project-btn"
                onClick={() => openGallery('posters')}
              >
                View Project
                <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section">
        <h2>Get In Touch</h2>
        <div className="contact-content">
          <div className="contact-message">
            <p>Ready to start your next project? We'd love to hear from you!</p>
            <div className="contact-info">
              <div className="contact-item">
                <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <a href="mailto:mystudio.com" className="contact-link">
                  mystudio@gmail.com
                </a>
              </div>
              <div className="contact-item">
                <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                </svg>
                <a href="tel:+1234567890" className="contact-link">
                  +91 66666666666 
                </a>
              </div>
            </div>
            <div className="contact-cta">
              <p>Or connect with us on social media:</p>
              <div className="social-links">
                <a href="https://instagram.com/vayosastudios" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                  <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.14 4.77 1.69 4.92 4.91.06 1.27.07 1.64.07 4.85s-.01 3.58-.07 4.85c-.15 3.22-1.66 4.77-4.92 4.91-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.25-.14-4.77-1.69-4.92-4.91-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85c.15-3.22 1.66-4.77 4.92-4.91 1.27-.06 1.64-.07 4.85-.07zm0-2.16c-3.24 0-3.65.01-4.93.07-4.27.19-6.36 2.28-6.55 6.55-.05 1.28-.07 1.69-.07 4.93s.02 3.64.07 4.93c.19 4.27 2.28 6.36 6.55 6.55 1.29.05 1.69.07 4.93.07s3.64-.02 4.93-.07c4.27-.19 6.36-2.28 6.55-6.55.05-1.29.07-1.69.07-4.93s-.02-3.64-.07-4.93c-.19-4.27-2.28-6.36-6.55-6.55-1.29-.05-1.69-.07-4.93-.07z"/>
                    <path d="M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 7.43a2.93 2.93 0 110-5.86 2.93 2.93 0 010 5.86z"/>
                    <circle cx="16.5" cy="7.5" r="1.5"/>
                  </svg>
                  <span>Instagram</span>
                </a>
                <a href="https://linkedin.com/company/vayosastudios" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                  <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; {new Date().getFullYear()} Vayosa Studios. All rights reserved.</p>
      </footer>

      {/* Image Gallery Modal */}
      {isGalleryOpen && currentProject && (
        <div className="gallery-modal">
          <div className="gallery-overlay" onClick={closeGallery}></div>
          <div className="gallery-content">
            <button className="gallery-close" onClick={closeGallery}>
              &times;
            </button>
            
            <div className="gallery-main">
              <button className="gallery-nav prev" onClick={(e) => { e.stopPropagation(); prevImage(); }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
              
              <div className="gallery-image-container">
                <img 
                  src={projectGalleries[currentProject][currentImageIndex]} 
                  alt={`Project ${currentImageIndex + 1}`}
                  className="gallery-image"
                />
                <div className="gallery-counter">
                  {currentImageIndex + 1} / {projectGalleries[currentProject].length}
                </div>
              </div>
              
              <button className="gallery-nav next" onClick={(e) => { e.stopPropagation(); nextImage(); }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </div>
            
            <div className="gallery-thumbnails">
              {projectGalleries[currentProject].map((img, index) => (
                <div 
                  key={index}
                  className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
