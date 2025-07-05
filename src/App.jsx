import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Project images
  const projectGalleries = {
    posters: [
      '/images/poster 1.png',
      '/images/poster 2.png',
      '/images/poster 3.png'
    ],
    advertisements: [
      '/images/adv 1.png',
      '/images/adv 2.png',
      '/images/adv 3.png',
      '/images/adv 4.png'
    ],
    collaborations: [
      '/images/collaboratives 1.png',
      '/images/collaboratives 2.png'
    ],
    branding: [
      '/images/branding 1.png',
      '/images/branding 2.png',
      '/images/branding 3.png',
      '/images/branding 4.png',
      '/images/branding 5.png',
      '/images/branding 6.png'
    ],
    social: [
      '/images/Posts.png',
      '/images/post 2.png',
      '/images/post 3.png',
      '/images/post 4.png'
    ],
    illustrations: [
      '/images/Illustrations.png',
      '/images/illustration 1.png',
      '/images/illustration 3.png',
      '/images/creatives 1.png',
      '/images/creatives 2.png',
      '/images/creatives 3.png',
      '/images/creatives 4.png',
      '/images/creatives 5.png'
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
                    src="/images/adv 2.png" 
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
              <img src="/images/poster 1.png" alt="Movie Poster Design" />
              <span className="project-category">Posters</span>
            </div>
            <div className="project-content">
              
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
              <img src="/images/collaboratives 1.png" alt="Brand Collaboration" />
              <span className="project-category">Collaborations</span>
            </div>
            <div className="project-content">
              <p>Strategic partnership with leading brands to create unique, cross-promotional marketing campaigns.</p>
              <button 
                className="view-project-btn"
                onClick={() => openGallery('collaborations')}
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
              <img src="/images/Posts.png" alt="Social Media Campaign" />
              <span className="project-category">Social Media</span>
            </div>
            <div className="project-content">
              <p>Viral social media campaign that increased engagement by 300% across all platforms.</p>
              <button 
                className="view-project-btn"
                onClick={() => openGallery('social')}
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
              <img src="/images/adv 1.png" alt="Advertising Campaign" />
              <span className="project-category">Advertisements</span>
            </div>
            <div className="project-content">
              <p>Outdoor and digital advertising campaign that transformed brand perception in urban markets.</p>
              <button 
                className="view-project-btn"
                onClick={() => openGallery('advertisements')}
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
              <img src="/images/Illustrations.png" alt="Digital Illustrations" />
              <span className="project-category">Illustrations</span>
            </div>
            <div className="project-content">
              <p>Collection of vibrant digital illustrations for editorial and commercial use.</p>
              <button 
                className="view-project-btn"
                onClick={() => openGallery('illustrations')}
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
              <img src="/images/branding 1.png" alt="Brand Identity" />
              <span className="project-category">Branding</span>
            </div>
            <div className="project-content">
              <p>Complete brand identity system including logo, typography, color palette, and brand guidelines.</p>
              <button 
                className="view-project-btn"
                onClick={() => openGallery('branding')}
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
                <a href="adityaofficial2008@gmail.com" className="contact-link">
                 adityaofficial2008@gmail.com
                </a>
              </div>
              <div className="contact-item">
                <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                </svg>
                <a href="tel:+91 629139344" className="contact-link">
                  +91 629139344
                </a>
              </div>
            </div>
            <div className="contact-cta">
              <p>Or message us on WhatsApp:</p>
              <div className="social-links">
                <a href="https://wa.me/919147412594" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="WhatsApp">
                  <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.5 14.4c-.2 0-1.2-.5-1.4-.5-.3-.1-.6-.1-.9.1-.3.3-.7.9-1 1.2-.1.2-.3.2-.5.1-.7-.3-1.4-.6-2-1.1-1.1-.9-1.8-2-2.3-3.3 0-.2 0-.4.1-.5.1-.1.2-.2.4-.2h.5c.2 0 .4 0 .6.2.2.2.6.6.7.7.1.1.2.2.3.1.1 0 .2-.1.3-.1.3-.3.7-.7 1-1 .3-.2.5-.4.8-.5.1 0 .2 0 .3.1l1.6.7c.1 0 .2.1.3.1.1 0 .2-.1.3-.1.2-.1.3-.3.4-.5.3-.7.5-1.4.5-2.1 0-.2-.1-.3-.2-.4-.1-.1-.3-.2-.5-.2h-1.8c-.2 0-.4 0-.5.1-.2.1-.3.3-.3.5-.1.5-.3 1.1-.5 1.6-.1.2-.3.3-.5.3-.1 0-.3 0-.4-.1-.2-.1-.4-.2-.6-.4-.2-.2-.5-.4-.7-.5-.6-.3-1.3-.4-2-.3-.3 0-.7.1-1 .2-.2.1-.5.3-.6.5-.1.2-.3.4-.4.6-.5 1.1-.5 2.4 0 3.5.5 1.1 1.2 2.1 2.2 2.9.9.7 2 1.3 3.2 1.6.5.1 1 .2 1.5.2 1.2 0 2.3-.3 3.3-.8.4-.2.8-.5 1.1-.9.1-.1.2-.3.2-.4v-1.5c0-.2-.1-.3-.3-.4z"/>
                    <path d="M12 2C6.5 2 2 6.5 2 12c0 2.1.7 4.1 1.9 5.8l-1.3 3.9 4.1-1.3c1.6 1 3.5 1.6 5.4 1.6 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18c-1.7 0-3.3-.5-4.7-1.3l-.3-.2-3.2.8.9-3.1-.2-.3C3.7 14.8 3 13.4 3 12c0-5 4-9 9-9s9 4 9 9-4 9-9 9z"/>
                  </svg>
                  <span>+91 9147412594</span>
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
