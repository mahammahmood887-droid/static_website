(function(){

  /* ---------------- Data ---------------- */
  const products = [
    {name:"Eucalyptus Clarifying Mist", concern:"clarify", concernLabel:"For clarifying + oil control", price:"$28", bg:"var(--eucalyptus)",
      icon:'<circle cx="26" cy="26" r="24" fill="#A9B387"/>'},
    {name:"Peach Nectar Glow Serum", concern:"glow", concernLabel:"For dullness + uneven tone", price:"$42", bg:"var(--peach)",
      icon:'<path d="M6 30 Q26 2 46 30 Q26 50 6 30Z" fill="#DCA278"/>'},
    {name:"Ivory Oat Cream", concern:"nourish", concernLabel:"For dryness + barrier repair", price:"$34", bg:"var(--ivory)",
      icon:'<rect x="8" y="8" width="36" height="36" rx="14" fill="#E8ECCC"/>'},
    {name:"Pistachio Renewal Mask", concern:"nourish", concernLabel:"For dullness + dehydration", price:"$36", bg:"var(--pistachio)",
      icon:'<polygon points="26,4 46,26 26,48 6,26" fill="#A9B387"/>'},
    {name:"Clay Detox Bar", concern:"clarify", concernLabel:"For congestion + breakouts", price:"$22", bg:"var(--clay)",
      icon:'<rect x="6" y="14" width="40" height="24" rx="8" fill="#8b5a34"/>'},
    {name:"Sage Calm Balm", concern:"calm", concernLabel:"For sensitivity + redness", price:"$30", bg:"var(--pistachio)",
      icon:'<ellipse cx="26" cy="26" rx="22" ry="16" fill="#CDD4B1"/>'},
  ];

  const grid = document.getElementById('productGrid');
  function renderProducts(){
    grid.innerHTML = products.map(p => `
      <div class="product-card" data-concern="${p.concern}" style="--card-bg:${p.bg}">
        <svg class="icon" viewBox="0 0 52 52">${p.icon}</svg>
        <h3>${p.name}</h3>
        <p class="concern">${p.concernLabel}</p>
        <div class="price-row">
          <span class="price">${p.price}</span>
          <button class="add-btn" aria-label="Add ${p.name} to bag">+</button>
        </div>
      </div>
    `).join('');
  }
  renderProducts();

  grid.addEventListener('click', e => {
    if(e.target.classList.contains('add-btn')){
      const btn = e.target;
      btn.textContent = '✓';
      btn.classList.add('added');
      setTimeout(() => { btn.textContent = '+'; btn.classList.remove('added'); }, 1400);
    }
  });

  /* ---------------- Filters ---------------- */
  const filterBar = document.getElementById('filterBar');
  filterBar.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if(!btn) return;
    filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const val = btn.dataset.filter;
    document.querySelectorAll('.product-card').forEach(card => {
      card.classList.toggle('hide', val !== 'all' && card.dataset.concern !== val);
    });
  });

  /* ---------------- Ritual quiz ---------------- */
  const quizData = [
    { q: "How does your skin usually feel by midday?",
      opts: [
        {label:"Shiny or prone to breakouts", tag:"clarify"},
        {label:"Tight, dry, or flaky", tag:"nourish"},
        {label:"Fine, but a little dull", tag:"glow"},
        {label:"Easily irritated or blotchy", tag:"calm"},
      ]},
    { q: "What's the one thing you wish your routine did better?",
      opts: [
        {label:"Keep oil in check without stripping", tag:"clarify"},
        {label:"Actually hold onto moisture", tag:"nourish"},
        {label:"Bring back some brightness", tag:"glow"},
        {label:"Stop reacting to everything", tag:"calm"},
      ]},
    { q: "Pick a texture you'd reach for on a bad skin day.",
      opts: [
        {label:"Something light and mattifying", tag:"clarify"},
        {label:"A thick, cushiony cream", tag:"nourish"},
        {label:"A silky, fast-absorbing serum", tag:"glow"},
        {label:"A soft, fragrance-free balm", tag:"calm"},
      ]},
  ];
  const results = {
    clarify: { product:"Eucalyptus Clarifying Mist", note:"A cooling, oil-balancing mist that clears congestion without over-drying — spritz after cleansing, before anything else." },
    nourish: { product:"Ivory Oat Cream", note:"A colloidal-oat cream built to rebuild your barrier. Layer it over serum at night and let it sit until morning." },
    glow: { product:"Peach Nectar Glow Serum", note:"A vitamin-C forward serum that evens tone over about three weeks of nightly use. Patch test first." },
    calm: { product:"Sage Calm Balm", note:"A five-ingredient balm made for reactive skin — no essential oils, no fragrance, just what your barrier needs." },
  };

  let step = 0;
  const answers = [];
  const quizCard = document.getElementById('quizCard');
  const stepTrack = document.getElementById('stepTrack');

  function updateTrack(){
    stepTrack.querySelectorAll('i').forEach((el, i) => {
      el.style.width = i < step ? '100%' : (i === step ? '50%' : '0%');
    });
  }

  function renderQuiz(){
    if(step >= quizData.length){
      const counts = {};
      answers.forEach(a => counts[a] = (counts[a]||0)+1);
      const winner = Object.keys(counts).sort((a,b) => counts[b]-counts[a])[0];
      const r = results[winner];
      quizCard.innerHTML = `
        <div class="quiz-result">
          <span class="result-tag">Your ritual match</span>
          <h3>${r.product}</h3>
          <p>${r.note}</p>
          <button class="restart-btn" id="restartQuiz">Start over</button>
        </div>
      `;
      document.getElementById('restartQuiz').onclick = () => { step = 0; answers.length = 0; updateTrack(); renderQuiz(); };
      stepTrack.querySelectorAll('i').forEach(el => el.style.width = '100%');
      return;
    }
    const current = quizData[step];
    quizCard.innerHTML = `
      <p class="quiz-question">${current.q}</p>
      <div class="quiz-options">
        ${current.opts.map((o,i) => `<button class="quiz-option" data-tag="${o.tag}">${o.label}</button>`).join('')}
      </div>
      <div class="quiz-nav">
        <button class="quiz-back" id="quizBack" ${step===0?'disabled':''}>← Back</button>
        <span style="color:var(--ink-soft);font-size:0.85rem;">Step ${step+1} of ${quizData.length}</span>
      </div>
    `;
    quizCard.querySelectorAll('.quiz-option').forEach(btn => {
      btn.onclick = () => { answers[step] = btn.dataset.tag; step++; updateTrack(); renderQuiz(); };
    });
    const backBtn = document.getElementById('quizBack');
    backBtn.onclick = () => { if(step>0){ step--; updateTrack(); renderQuiz(); } };
    updateTrack();
  }
  renderQuiz();

  /* ---------------- Testimonial carousel ---------------- */
  const slidesWrap = document.getElementById('tSlides');
  const slides = slidesWrap.children;
  const dotsWrap = document.getElementById('tDots');
  let tIndex = 0;
  let tTimer;

  for(let i=0;i<slides.length;i++){
    const d = document.createElement('button');
    if(i===0) d.classList.add('active');
    d.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(d);
  }

  function goTo(i){
    tIndex = (i + slides.length) % slides.length;
    slidesWrap.style.transform = `translateX(-${tIndex*100}%)`;
    [...dotsWrap.children].forEach((d,idx) => d.classList.toggle('active', idx===tIndex));
  }
  function autoAdvance(){ tTimer = setInterval(() => goTo(tIndex+1), 6000); }
  autoAdvance();

  document.getElementById('tPrev').addEventListener('click', () => { goTo(tIndex-1); clearInterval(tTimer); autoAdvance(); });
  document.getElementById('tNext').addEventListener('click', () => { goTo(tIndex+1); clearInterval(tTimer); autoAdvance(); });
  document.querySelector('.testimonial-wrap').addEventListener('mouseenter', () => clearInterval(tTimer));
  document.querySelector('.testimonial-wrap').addEventListener('mouseleave', autoAdvance);

  /* swipe support */
  let startX = null;
  slidesWrap.addEventListener('touchstart', e => startX = e.touches[0].clientX);
  slidesWrap.addEventListener('touchend', e => {
    if(startX===null) return;
    const diff = e.changedTouches[0].clientX - startX;
    if(diff > 40) goTo(tIndex-1);
    if(diff < -40) goTo(tIndex+1);
    startX = null;
  });

  /* ---------------- FAQ accordion ---------------- */
  const faqData = [
    {q:"Are your products actually preservative-free?", a:"No — and we're wary of anyone who claims theirs are. We use a low percentage of a broad-spectrum preservative in anything water-based, listed plainly on the label, so your jar doesn't grow something unwanted in the shower."},
    {q:"How long does a batch stay fresh once opened?", a:"About four months for water-based formulas like the mist and serum, up to a year for the balm and bar. Each label is stamped with the pour date, not just an expiry guess."},
    {q:"Can I return something that didn't work for my skin?", a:"Yes, within 30 days, used or not. Email us a line about what happened — it helps us adjust the next batch, and we'll refund or swap the product either way."},
    {q:"Where do the ingredients actually come from?", a:"Eucalyptus and oat from a farm in Sandy, Oregon; clay from a family quarry in Bend; everything else from our own half-acre garden behind the studio."},
  ];
  const faqList = document.getElementById('faqList');
  faqList.innerHTML = faqData.map((f,i) => `
    <div class="faq-item">
      <button class="faq-q" data-i="${i}">${f.q}<span class="plus"></span></button>
      <div class="faq-a"><p>${f.a}</p></div>
    </div>
  `).join('');

  faqList.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const ans = item.querySelector('.faq-a');
      const isOpen = item.classList.contains('open');
      faqList.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-a').style.maxHeight = null;
      });
      if(!isOpen){
        item.classList.add('open');
        ans.style.maxHeight = ans.scrollHeight + 'px';
      }
    });
  });

  /* ---------------- Newsletter validation ---------------- */
  const form = document.getElementById('newsletterForm');
  const emailInput = document.getElementById('newsletterEmail');
  const formMsg = document.getElementById('formMsg');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const val = emailInput.value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    if(!valid){
      formMsg.textContent = "That email doesn't look quite right.";
      formMsg.style.color = '#7a2e17';
      emailInput.focus();
      return;
    }
    formMsg.textContent = "You're on the list — first report goes out Monday.";
    formMsg.style.color = '#3a2a1a';
    form.querySelector('button').textContent = 'Added ✓';
    emailInput.value = '';
    setTimeout(() => { form.querySelector('button').textContent = 'Notify me'; formMsg.textContent=''; }, 4000);
  });

  /* ---------------- Mobile menu ---------------- */
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburgerBtn.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    hamburgerBtn.setAttribute('aria-expanded', open);
  });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

  /* ---------------- Scroll spy + back to top ---------------- */
  const navLinks = document.querySelectorAll('[data-nav]');
  const sections = ['products','ritual','stories','faq'].map(id => document.getElementById(id));
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const y = window.scrollY + 140;
    let current = null;
    sections.forEach(s => { if(s && y >= s.offsetTop) current = s.id; });
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#'+current));
    backToTop.classList.toggle('show', window.scrollY > 700);
  });
  backToTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

})();
