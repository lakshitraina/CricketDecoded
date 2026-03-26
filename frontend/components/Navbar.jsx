import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={isMenuOpen ? 'nav-active' : ''}>
      <Link href="/" className="nav-logo">
        Cricket<span>Decoded.</span>
      </Link>
      
      <div className={`nav-links-wrapper ${isMenuOpen ? 'active' : ''}`}>
        <ul className="nav-links">
          <li><Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
          <li><Link href="/predictions" onClick={() => setIsMenuOpen(false)}>Predictions</Link></li>
          <li><Link href="/blog" onClick={() => setIsMenuOpen(false)}>News & Blogs</Link></li>
          <li><Link href="/fixtures" onClick={() => setIsMenuOpen(false)}>Fixtures</Link></li>
          <li><Link href="/about" onClick={() => setIsMenuOpen(false)}>About Us</Link></li>
        </ul>
        
        <Link href="/predictions" className="nav-cta-mobile" onClick={() => setIsMenuOpen(false)}>
          GET STARTED
        </Link>
      </div>

      <div className="nav-actions">
        <Link href="/predictions" className="nav-cta">
          GET STARTED
        </Link>

        <button className="nav-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
             <span></span><span></span><span></span>
          </div>
        </button>
      </div>
    </nav>
  );
}
