import heroImg from '../assets/hero.png'

export const Home = () => (
  <div className="page">
    <section className="hero" id="hero">
      <div className="hero-copy">
        <div className="eyebrow">Browse movies, series, cartoons & anime</div>
        <h1>Discover every screen on Earth, one country at a time.</h1>
        <p>
          ReelSphere is a real-time content discovery app powered by TMDB,
          Redis caching, and Gemini AI recommendations. Pick a country, pick a
          category, and explore what the world is watching right now.
        </p>
        <div className="hero-actions">
          <button className="button primary">Explore By Country</button>
          <button className="button ghost">Watch the Demo</button>
        </div>
        <div className="hero-tags">
          <span>Cache HIT &lt; 1ms</span>
          <span>190+ regions</span>
          <span>Live trending updates</span>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-card">
          <div className="hero-card-header">
            <span>Now Streaming</span>
            <span className="pill">LIVE</span>
          </div>
          <div className="hero-card-title">Philippines - Movies</div>
          <div className="hero-card-grid">
            <div className="poster skeleton"></div>
            <div className="poster skeleton"></div>
            <div className="poster skeleton"></div>
            <div className="poster skeleton"></div>
          </div>
          <div className="hero-card-footer">
            <p>Trending refresh in 04:59</p>
            <button className="button tiny">View List</button>
          </div>
        </div>
        <div className="hero-image">
          <img src={heroImg} alt="ReelSphere poster collage" />
        </div>
      </div>
    </section>

    <section className="stats">
      <div className="stat">
        <p className="stat-value">1.2k+</p>
        <p className="stat-label">Cached TMDB calls per hour</p>
      </div>
      <div className="stat">
        <p className="stat-value">40x</p>
        <p className="stat-label">Faster reloads with Redis</p>
      </div>
      <div className="stat">
        <p className="stat-value">15 min</p>
        <p className="stat-label">Trending refresh cadence</p>
      </div>
      <div className="stat">
        <p className="stat-value">5 picks</p>
        <p className="stat-label">AI recommendations per title</p>
      </div>
    </section>

    <section className="categories">
      <div className="section-header">
        <div>
          <h2>Choose your universe</h2>
          <p>Filter by category, release window, and country in seconds.</p>
        </div>
        <button className="button ghost">View All Categories</button>
      </div>
      <div className="category-grid">
        <article className="category-card">
          <h3>Movies</h3>
          <p>Latest releases, timeless classics, and regional hits.</p>
          <div className="chips">
            <span>Latest</span>
            <span>Oldest</span>
            <span>Trending</span>
          </div>
        </article>
        <article className="category-card">
          <h3>Series</h3>
          <p>Binge-worthy shows from every market.</p>
          <div className="chips">
            <span>Latest</span>
            <span>Oldest</span>
            <span>Trending</span>
          </div>
        </article>
        <article className="category-card">
          <h3>Cartoons</h3>
          <p>Animated films, family favorites, and cult classics.</p>
          <div className="chips">
            <span>Latest</span>
            <span>Oldest</span>
            <span>Kids</span>
          </div>
        </article>
        <article className="category-card">
          <h3>Anime</h3>
          <p>Curated anime discoveries from Japan and beyond.</p>
          <div className="chips">
            <span>Seasonal</span>
            <span>Top Rated</span>
            <span>Hidden</span>
          </div>
        </article>
      </div>
    </section>

    <section className="how" id="how">
      <div className="section-header">
        <div>
          <h2>How ReelSphere works</h2>
          <p>Every request is routed through Redis for instant results.</p>
        </div>
      </div>
      <div className="timeline">
        <div className="step">
          <span className="step-count">01</span>
          <h4>Select country</h4>
          <p>Browse a region, then pick movies, series, cartoons, or anime.</p>
        </div>
        <div className="step">
          <span className="step-count">02</span>
          <h4>Redis checks cache</h4>
          <p>Cache hits return instantly. Misses call TMDB once.</p>
        </div>
        <div className="step">
          <span className="step-count">03</span>
          <h4>Live trending pushes</h4>
          <p>Socket.io updates trending lists every 5 minutes.</p>
        </div>
        <div className="step">
          <span className="step-count">04</span>
          <h4>Gemini AI picks</h4>
          <p>Click a title to get five similar recommendations.</p>
        </div>
      </div>
    </section>

    <section className="cta">
      <div>
        <h2>Ready to explore?</h2>
        <p>Build your own watchlist across countries in minutes.</p>
      </div>
      <div className="cta-actions">
        <button className="button primary">Launch ReelSphere</button>
        <button className="button ghost">Contact the Team</button>
      </div>
    </section>
  </div>
)
