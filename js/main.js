document.addEventListener('DOMContentLoaded', () => {

  // Navbar scroll
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();
  }

  // Burger
  const burger = document.getElementById('burger');
  const mobileNav = document.getElementById('mobileNav');
  if (burger && mobileNav) {
    burger.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open);
      const spans = burger.querySelectorAll('span');
      spans[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)' : '';
      spans[1].style.opacity  = open ? '0' : '1';
      spans[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
    });
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));
  }

  // Active link
  const cur = location.pathname.split('/').filter(Boolean).pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
    const href = (a.getAttribute('href') || '').split('/').filter(Boolean).pop() || 'index.html';
    if (href === cur) a.classList.add('active');
  });

  // Scroll reveal
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); }});
    }, {threshold:.1});
    document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
  }

  // Alert close (remember dismissal)
  const alertClose = document.getElementById('alertClose');
  const alertBanner = document.getElementById('alertBanner');
  const ALERT_KEY = 'alertBannerDismissed';
  if (alertBanner) {
    if (localStorage.getItem(ALERT_KEY) === '1') {
      alertBanner.style.display = 'none';
    } else if (alertClose) {
      alertClose.addEventListener('click', () => {
        alertBanner.style.display = 'none';
        localStorage.setItem(ALERT_KEY, '1');
      });
    }
  }

  // Contact form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = contactForm.querySelector('[type="submit"]');
      let valid = true;
      contactForm.querySelectorAll('[required]').forEach(f => {
        f.style.borderColor = f.value.trim() ? '' : 'var(--yellow)';
        if (!f.value.trim()) valid = false;
      });
      if (!valid) return;
      const orig = btn.textContent;
      btn.textContent = 'Odesílám…'; btn.disabled = true;
      setTimeout(() => {
        showToast('Zpráva odeslána! Ozveme se co nejdříve.', 'success');
        contactForm.reset(); btn.textContent = orig; btn.disabled = false;
      }, 1400);
    });
  }

  // Toast
  window.showToast = (msg, type='info') => {
    const t = document.createElement('div');
    t.style.cssText = `position:fixed;bottom:22px;right:22px;z-index:9999;padding:13px 22px;
      border-radius:8px;font-family:'Barlow Condensed',sans-serif;font-size:.95rem;font-weight:700;
      letter-spacing:.05em;background:${type==='success'?'#16a34a':'var(--yellow)'};
      color:${type==='success'?'#fff':'var(--black)'};box-shadow:0 8px 32px rgba(0,0,0,.5);
      transform:translateY(80px);opacity:0;transition:all .35s cubic-bezier(.4,0,.2,1);`;
    t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(() => { t.style.transform='translateY(0)'; t.style.opacity='1'; });
    setTimeout(() => { t.style.transform='translateY(80px)'; t.style.opacity='0'; setTimeout(()=>t.remove(),400); }, 3400);
  };

  // Counter
  document.querySelectorAll('[data-count]').forEach(el => {
    if (!('IntersectionObserver' in window)) return;
    const cio = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const end = parseInt(el.dataset.count,10), dur=1600, step=end/(dur/16); let cur=0;
        const timer=setInterval(()=>{cur=Math.min(cur+step,end);el.textContent=Math.round(cur)+(el.dataset.suffix||'');if(cur>=end)clearInterval(timer);},16);
        cio.unobserve(el);
      });
    },{threshold:.5});
    cio.observe(el);
  });

  // Pricing tabs
  document.querySelectorAll('.price-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.price-tab').forEach(t=>t.classList.remove('active'));
      document.querySelectorAll('.price-panel').forEach(p=>p.classList.remove('show'));
      tab.classList.add('active');
      const el = document.getElementById(tab.dataset.tab);
      if (el) el.classList.add('show');
    });
  });

  // Goal modal
  const goalModal = document.getElementById('goalModal');
  const goalModalTitle = document.getElementById('goalModalTitle');
  const goalModalBody  = document.getElementById('goalModalBody');
  if (goalModal) {
    document.querySelectorAll('[data-goal]').forEach(card => {
      card.addEventListener('click', () => {
        const key = card.dataset.goal;
        const data = GOALS[key];
        if (!data) return;
        goalModalTitle.textContent = data.title;
        goalModalBody.innerHTML = data.html;
        goalModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    goalModal.addEventListener('click', e => { if (e.target === goalModal) closeGoalModal(); });
    document.getElementById('goalModalClose')?.addEventListener('click', closeGoalModal);
  }
  function closeGoalModal() {
    goalModal?.classList.remove('open');
    document.body.style.overflow = '';
  }
  document.addEventListener('keydown', e => { if (e.key==='Escape') { closeGoalModal(); closeLightbox(); }});

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  let galleryImages = [], lbIndex = 0;

  if (lightbox) {
    galleryImages = Array.from(document.querySelectorAll('.gallery-item img'));
    document.querySelectorAll('.gallery-item').forEach((item, i) => {
      item.addEventListener('click', () => openLightbox(i));
    });
    document.getElementById('lbClose')?.addEventListener('click', closeLightbox);
    document.getElementById('lbPrev')?.addEventListener('click', () => navLightbox(-1));
    document.getElementById('lbNext')?.addEventListener('click', () => navLightbox(1));
    lightbox.addEventListener('click', e => { if (e.target===lightbox) closeLightbox(); });

    // Swipe support for touch devices
    let touchStartX = 0, touchStartY = 0;
    lightbox.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].clientX;
      touchStartY = e.changedTouches[0].clientY;
    }, {passive:true});
    lightbox.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
        navLightbox(dx < 0 ? 1 : -1);
      }
    }, {passive:true});
  }
  function openLightbox(i) {
    lbIndex = i;
    lightboxImg.src = galleryImages[i].src;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox?.classList.remove('open');
    document.body.style.overflow = '';
  }
  function navLightbox(dir) {
    lbIndex = (lbIndex + dir + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[lbIndex].src;
  }

});

// Goal data
const GOALS = {
  tuk: {
    title: 'Shodit přebytečný tuk',
    html: `<p>Chcete shodit přebytečná kila a cítit se ve svém těle lépe? V Nautilus máme vše, co k tomu potřebujete.</p>
    <h4 style="margin:20px 0 10px;color:var(--yellow);font-size:1rem;">Jak na to?</h4>
    <ul style="list-style:none;display:flex;flex-direction:column;gap:8px;margin-bottom:18px;">
      <li style="display:flex;gap:10px;font-size:.93rem;">✦ Kombinace kardio tréninku a posilování spaluje tuk nejefektivněji</li>
      <li style="display:flex;gap:10px;font-size:.93rem;">✦ Špičková kardio zóna – běžecké pásy, kola, steppery Star Trac, Matrix</li>
      <li style="display:flex;gap:10px;font-size:.93rem;">✦ Silový trénink zvyšuje bazální metabolismus a spaluje kalorie i po tréninku</li>
      <li style="display:flex;gap:10px;font-size:.93rem;">✦ Instruktor zdarma sestaví plán na míru</li>
    </ul>
    <a href="kontakt.html" onclick="document.getElementById('goalModal').classList.remove('open');document.body.style.overflow='';" class="btn btn-primary" style="width:100%;justify-content:center;">Objednat se k instruktorovi</a>`
  },
  svaly: {
    title: 'Nabrat svalovou hmotu',
    html: `<p>Profesionální stroje Hammer Strength jsou určeny pro maximální svalový rozvoj – stejné, jaké používají profi sportovci po celém světě.</p>
    <h4 style="margin:20px 0 10px;color:var(--yellow);font-size:1rem;">Co nabízíme?</h4>
    <ul style="list-style:none;display:flex;flex-direction:column;gap:8px;margin-bottom:18px;">
      <li style="display:flex;gap:10px;font-size:.93rem;">✦ Hammer Strength – americké stroje pro free-motion cvičení</li>
      <li style="display:flex;gap:10px;font-size:.93rem;">✦ Volné váhy – činkové sady, jednoručky, olympijské osy</li>
      <li style="display:flex;gap:10px;font-size:.93rem;">✦ Sestavení tréninkového plánu osobním trenérem</li>
      <li style="display:flex;gap:10px;font-size:.93rem;">✦ Doplňky výživy – proteiny a aminokyseliny přímo na baru</li>
    </ul>
    <a href="instruktor.html" onclick="document.getElementById('goalModal').classList.remove('open');document.body.style.overflow='';" class="btn btn-primary" style="width:100%;justify-content:center;">Zjistit více o trenérovi</a>`
  },
  kondice: {
    title: 'Udržet se v kondici',
    html: `<p>Chcete se cítit fit, mít energii a neztloustnout? Pravidelný trénink pod odborným vedením je nejlepší prevence.</p>
    <h4 style="margin:20px 0 10px;color:var(--yellow);font-size:1rem;">Plán pro udržení kondice</h4>
    <ul style="list-style:none;display:flex;flex-direction:column;gap:8px;margin-bottom:18px;">
      <li style="display:flex;gap:10px;font-size:.93rem;">✦ Doporučujeme 2–3 tréninky týdně s kombinací kardio a silového tréninku</li>
      <li style="display:flex;gap:10px;font-size:.93rem;">✦ Otevřeno každý den – pohodlně se zaparkuje přímo u fitness</li>
      <li style="display:flex;gap:10px;font-size:.93rem;">✦ Multisport karta přijímána – cvičte kde chcete, kdy chcete</li>
      <li style="display:flex;gap:10px;font-size:.93rem;">✦ Instruktor zdarma – poradí s technikou a motivuje</li>
    </ul>
    <a href="cenik.html" onclick="document.getElementById('goalModal').classList.remove('open');document.body.style.overflow='';" class="btn btn-primary" style="width:100%;justify-content:center;">Prohlédnout ceník</a>`
  },
  zada: {
    title: 'Zbavit se bolesti zad',
    html: `<p>Bolesti zad trápí většinu lidí se sedavým zaměstnáním. Správně vedený silový trénink je jednou z nejúčinnějších metod prevence i léčby.</p>
    <h4 style="margin:20px 0 10px;color:var(--yellow);font-size:1rem;">Jak posilovna pomáhá?</h4>
    <ul style="list-style:none;display:flex;flex-direction:column;gap:8px;margin-bottom:18px;">
      <li style="display:flex;gap:10px;font-size:.93rem;">✦ Posilování zádových a core svalů stabilizuje páteř</li>
      <li style="display:flex;gap:10px;font-size:.93rem;">✦ Instruktor Štěpán Domorád sestaví cílený rehabilitační program</li>
      <li style="display:flex;gap:10px;font-size:.93rem;">✦ Správná technika cviků – pod dohledem, bezpečně</li>
      <li style="display:flex;gap:10px;font-size:.93rem;">✦ Stroje Life Fitness a Nautilus vhodné i pro začátečníky a seniory</li>
    </ul>
    <a href="kontakt.html" onclick="document.getElementById('goalModal').classList.remove('open');document.body.style.overflow='';" class="btn btn-primary" style="width:100%;justify-content:center;">Domluvit konzultaci</a>`
  },
  doplnky: {
    title: 'Doplňky výživy',
    html: `<p>Přímo v Nautilus baru najdete rozsáhlý sortiment doplňkové výživy pro všechny vaše cíle – hubnutí, nabírání svalů i regeneraci.</p>
    <h4 style="margin:20px 0 10px;color:var(--yellow);font-size:1rem;">Co u nás seženete?</h4>
    <ul style="list-style:none;display:flex;flex-direction:column;gap:8px;margin-bottom:18px;">
      <li style="display:flex;gap:10px;font-size:.93rem;">✦ Proteiny a gainers pro nabírání svalové hmoty</li>
      <li style="display:flex;gap:10px;font-size:.93rem;">✦ Spalovače tuku a carnitine pro hubnutí</li>
      <li style="display:flex;gap:10px;font-size:.93rem;">✦ Aminokyseliny BCAA a kreatin pro regeneraci</li>
      <li style="display:flex;gap:10px;font-size:.93rem;">✦ Vitamíny a minerály pro celkové zdraví</li>
    </ul>
    <a href="kontakt.html" onclick="document.getElementById('goalModal').classList.remove('open');document.body.style.overflow='';" class="btn btn-primary" style="width:100%;justify-content:center;">Přijďte se podívat</a>`
  }
};
