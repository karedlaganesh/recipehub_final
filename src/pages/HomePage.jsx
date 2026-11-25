import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard.jsx';
import { useApp } from '../context/AppContext.jsx';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1920&q=80',
    badge: '🍽️ Culinary Inspiration',
    title: 'Discover Delicious Recipes',
    description: 'Find your next favorite meal on Recipe Hub.',
  },
  {
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1920&q=80',
    badge: '👨‍🍳 Chef Tested Guides',
    title: 'Cook Something Amazing',
    description: 'Simple recipes with easy step-by-step instructions.',
  },
  {
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1920&q=80',
    badge: '🥕 Smart Fridge Matcher',
    title: 'Search By Ingredients',
    description: 'Tell us what you have and discover what you can cook.',
  },
  {
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80',
    badge: '🌟 Foodie Community',
    title: 'Share Your Favorite Recipes',
    description: 'Join our cooking community and share your recipes.',
  },
];

const features = [
  ['🔍', 'Search Recipes', 'Find recipes by dish name, cuisine, preparation time, or meal category.'],
  ['🥕', 'Search by Ingredients', 'Discover dishes from ingredients you already have in your kitchen.'],
  ['🌍', 'Explore Cuisines', 'Explore Indian, Italian, Chinese, Mexican, American, and more.'],
  ['🥗', 'Dietary Preferences', 'Filter vegetarian, vegan, gluten-free, keto, and other dishes.'],
  ['❤️', 'Save Favorites', 'Keep your favorite recipes in your personal cooklist.'],
  ['⭐', 'Rate Recipes', 'Rate dishes and help other food lovers find top-rated meals.'],
  ['📚', 'Create Collections', 'Organize meals into custom collections and cookbooks.'],
  ['🔗', 'Share Recipes', 'Share recipe links with friends and family.'],
];

export default function HomePage() {
  const { recipes, session, notify } = useApp();
  const [slide, setSlide] = useState(0);
  const [contactSent, setContactSent] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => setSlide((current) => (current + 1) % slides.length), 4500);
    return () => window.clearInterval(timer);
  }, []);

  const featured = [...recipes].sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0)).slice(0, 3);

  return (
    <>
      <section className="hero-slider-section" id="hero-slider-section" aria-label="Featured Food Banner">
        <div className="slider-wrapper">
          {slides.map((item, index) => (
            <div key={item.title} className={`hero-slide${slide === index ? ' active' : ''}`} style={{ backgroundImage: `url('${item.image}')` }}>
              <div className="slide-overlay" />
              <div className="container slide-content-container">
                <div className="slide-content">
                  <span className="slide-badge">{item.badge}</span>
                  <h1 className="slide-title">{item.title}</h1>
                  <p className="slide-desc">{item.description}</p>
                  <div className="slide-btn-group">
                    <Link to="/recipes" className="btn btn-primary-orange btn-lg">Explore Recipes</Link>
                    <Link to={session?.role === 'user' ? '/user/dashboard' : '/login'} className="btn btn-outline-white btn-lg">Get Started</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button type="button" className="slider-arrow slider-arrow-prev" aria-label="Previous Slide" onClick={() => setSlide((slide + slides.length - 1) % slides.length)}>‹</button>
        <button type="button" className="slider-arrow slider-arrow-next" aria-label="Next Slide" onClick={() => setSlide((slide + 1) % slides.length)}>›</button>
        <div className="slider-dots" role="tablist" aria-label="Banner slides">
          {slides.map((item, index) => <button key={item.title} className={`slider-dot${index === slide ? ' active' : ''}`} aria-label={`Go to slide ${index + 1}`} onClick={() => setSlide(index)} />)}
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="container about-container">
          <div className="about-image-col">
            <div className="about-img-frame">
              <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80" alt="Cooking wholesome food in a modern kitchen" className="about-img" loading="lazy" />
              <div className="about-badge-card"><span className="chef-hat-badge">👨‍🍳</span><div><strong>Curated by Passionate Chefs</strong><span className="text-muted">Tested for culinary perfection</span></div></div>
            </div>
          </div>
          <div className="about-text-col">
            <span className="section-tag">About Recipe Hub</span>
            <h2 className="section-title">Welcome to Recipe Hub</h2>
            <p className="about-paragraph highlight-lead">Recipe Hub is your digital kitchen companion. Discover delicious recipes, search for meals using ingredients you already have, explore different cuisines, save favorite dishes, and share your cooking ideas.</p>
            <p className="about-paragraph">Whether you are an aspiring cook, a passionate home chef, or exploring authentic world-class dishes, Recipe Hub provides step-by-step guidance and a welcoming cooking community.</p>
            <div className="about-highlights-grid">
              {['Smart Ingredient Search', 'Curated Cuisines & Diets', 'Step-by-Step Cooking', 'Personalized Collections'].map((highlight) => <div className="highlight-item" key={highlight}><div className="highlight-check">✓</div><strong>{highlight}</strong></div>)}
            </div>
            <Link to="/recipes" className="btn btn-primary-orange">Browse Recipe Catalog →</Link>
          </div>
        </div>
      </section>

      <section className="features-section" id="features">
        <div className="container">
          <div className="section-header text-center"><span className="section-tag">Platform Features</span><h2 className="section-title">Everything You Need to Cook Like a Pro</h2><p className="section-subtitle">A suite of useful kitchen tools built for everyone.</p></div>
          <div className="features-grid">
            {features.map(([icon, title, description], index) => <article className="feature-card" key={title}><div className={`feature-icon-circle ${index % 2 ? 'bg-green-light' : 'bg-orange-light'}`}>{icon}</div><h3 className="feature-title">{index + 1}. {title}</h3><p className="feature-text">{description}</p></article>)}
          </div>
        </div>
      </section>

      <section className="modules-section" id="modules-section">
        <div className="container">
          <div className="section-header text-center"><span className="section-tag">Access Portals</span><h2 className="section-title">Explore Recipe Hub</h2><p className="section-subtitle">Choose your access mode to explore recipes or manage the platform catalog.</p></div>
          <div className="modules-grid">
            <article className="module-card user-module-card">
              <div className="module-card-icon-wrap user-theme">👨‍🍳</div><span className="module-badge">For Food Lovers &amp; Home Cooks</span><h3 className="module-title">USER</h3>
              <p className="module-desc">Explore recipes, search by ingredients, save favorites, rate dishes, and create personalized collections.</p>
              <ul className="module-features-list"><li>✓ Discover 12+ preloaded world recipes</li><li>✓ Search by ingredients you have</li><li>✓ Save, rate, and submit recipes</li></ul>
              <div className="module-card-buttons"><Link to={session?.role === 'user' ? '/user/dashboard' : '/login'} className="btn btn-primary-orange btn-lg">User Login</Link><Link to="/register" className="btn btn-outline-orange btn-lg">User Registration</Link></div>
            </article>
            <article className="module-card admin-module-card">
              <div className="module-card-icon-wrap admin-theme">🛡️</div><span className="module-badge admin-badge">For Platform &amp; Catalog Managers</span><h3 className="module-title">ADMIN</h3>
              <p className="module-desc">Manage recipes, upload new dishes, view ratings, and review community submissions.</p>
              <ul className="module-features-list"><li>✓ Live catalog and submission statistics</li><li>✓ Add, edit, and delete recipes</li><li>✓ Review submissions and ratings</li></ul>
              <div className="module-card-buttons">
                <Link to={session?.role === 'admin' ? '/admin' : '/admin/login'} className="btn btn-primary-green btn-lg">Admin Login</Link>
                <Link to="/register?role=admin" className="btn btn-outline-green btn-lg">Admin Registration</Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="home-featured-section">
        <div className="container">
          <div className="section-header-flex"><div><span className="section-tag">Chef Highlights</span><h2 className="section-title">Popular Recipes on Recipe Hub</h2></div><Link to="/recipes" className="btn btn-outline-orange">View All Recipes →</Link></div>
          <div className="recipe-grid">{featured.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}</div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="container">
          <div className="contact-card">
            <div className="contact-text"><span className="section-tag">Contact Us</span><h2 className="section-title">Get in Touch with Recipe Hub</h2><p className="contact-desc">Have a recipe recommendation, feedback, or culinary question? Reach out to our team.</p><div className="contact-info-list"><p>📍 KL University, Vaddeswaram, Andhra Pradesh, India</p><p>✉️ support@recipehub.com</p><p>🏫 Empowering college students and food lovers to cook smart.</p></div></div>
            <form className="contact-form" onSubmit={(event) => { event.preventDefault(); setContactSent(true); notify('Thanks for reaching out!'); }}><h3 className="contact-form-title">Send Us a Message</h3><div className="form-group"><label htmlFor="contact-name">Your Full Name</label><input id="contact-name" className="form-control" required /></div><div className="form-group"><label htmlFor="contact-email">Email Address</label><input id="contact-email" type="email" className="form-control" required /></div><div className="form-group"><label htmlFor="contact-message">Your Message or Recipe Suggestion</label><textarea id="contact-message" className="form-control" rows="3" required /></div><button className="btn btn-primary-orange btn-block" type="submit">{contactSent ? 'Message Sent' : 'Send Message'}</button></form>
          </div>
        </div>
      </section>
    </>
  );
}
