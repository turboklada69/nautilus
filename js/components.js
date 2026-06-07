(function() {
  const NAV_HTML = `
  <div id="alertBanner" class="alert-banner">
    ⚡ Nová permanentka FLEX – cvičte bez závazků, peníze zpět kdykoli!
    <a href="cenik.html">Zjistit více →</a>
    <button id="alertClose">✕</button>
  </div>
  <nav class="navbar">
    <div class="nav-inner">
      <a href="index.html" class="nav-logo"><img src="img/logo.png" alt="Fitness Nautilus" style="height:72px;width:auto;display:block;margin:0;"></a>
      <ul class="nav-links">
        <li><a href="index.html">Úvod</a></li>
        <li><a href="galerie.html">Galerie</a></li>
        <li><a href="stroje.html">Americké stroje</a></li>
        <li><a href="cenik.html">Ceník</a></li>
        <li><a href="instruktor.html">Instruktor</a></li>
        <li><a href="aktuality.html">Aktuality</a></li>
        <li><a href="video.html">Video</a></li>
        <li><a href="kontakt.html" class="btn btn-primary">Kontakt</a></li>
      </ul>
      <button class="nav-burger" id="burger" aria-label="Menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>
  <div class="nav-mobile" id="mobileNav">
    <a href="index.html">Úvod</a>
    <a href="galerie.html">Galerie</a>
    <a href="stroje.html">Americké stroje</a>
    <a href="cenik.html">Ceník</a>
    <a href="instruktor.html">Instruktor</a>
    <a href="aktuality.html">Aktuality</a>
    <a href="video.html">Video</a>
    <a href="kontakt.html">Kontakt</a>
  </div>`;

  const FOOTER_HTML = `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <img src="img/logo.png" alt="Fitness Nautilus" style="height:56px;width:auto;display:block;margin-bottom:12px;">
          <p>Moderní, útulná a skvěle vybavená posilovna ve Vrchlabí. Otevřeno od roku 2011.</p>
          <div class="footer-social mt-24">
            <a href="https://www.facebook.com/pages/Fitness-Nautilus/194213307277706" target="_blank" rel="noopener" title="Facebook">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Navigace</h4>
          <ul>
            <li><a href="index.html">Úvod</a></li>
            <li><a href="galerie.html">Galerie</a></li>
            <li><a href="stroje.html">Americké stroje</a></li>
            <li><a href="cenik.html">Ceník</a></li>
            <li><a href="instruktor.html">Instruktor</a></li>
            <li><a href="aktuality.html">Aktuality</a></li>
            <li><a href="video.html">Video</a></li>
            <li><a href="kontakt.html">Kontakt</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Otevírací doba</h4>
          <ul>
            <li style="color:var(--text);font-size:.88rem;margin-bottom:7px;">Po–Pá: 6:30 – 21:00</li>
            <li style="color:var(--text);font-size:.88rem;">So–Ne: 7:30 – 21:00</li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Kontakt</h4>
          <div class="contact-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>Na Bělidle 900<br>543 01 Vrchlabí</span>
          </div>
          <div class="contact-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.62 4.4 2 2 0 0 1 3.6 2.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.09 6.09l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <span><a href="tel:+420777822881" style="color:var(--text)">777 822 881</a></span>
          </div>
          <div class="contact-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            <span><a href="mailto:stepan.domorad@seznam.cz" style="color:var(--text)">stepan.domorad@seznam.cz</a></span>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2011–2026 Fitness Nautilus Vrchlabí · Přijímáme Multisport karty a platební karty.</p>
        <p style="font-size:.78rem;">Štěpán Domorád · Na Bělidle 900 · 543 01 Vrchlabí</p>
      </div>
    </div>
  </footer>`;

  const navTarget = document.getElementById('nav-placeholder');
  const footTarget = document.getElementById('footer-placeholder');
  if (navTarget)  navTarget.outerHTML = NAV_HTML;
  if (footTarget) footTarget.outerHTML = FOOTER_HTML;
})();
