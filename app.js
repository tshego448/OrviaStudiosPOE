(() => {
  'use strict';

  const html = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Homepage loading screen.
  const pageLoader = document.querySelector('#page-loader');
  if (pageLoader) {
    const finishLoader = () => {
      window.setTimeout(() => {
        pageLoader.classList.add('is-hidden');
        pageLoader.setAttribute('aria-hidden', 'true');
        window.setTimeout(() => pageLoader.remove(), reduceMotion ? 0 : 350);
      }, reduceMotion ? 0 : 500);
    };
    if (document.readyState === 'complete') finishLoader();
    else window.addEventListener('load', finishLoader, { once: true });
  }

  // Theme preference persists between pages.
  const themeToggle = document.querySelector('#theme-toggle');
  let storedTheme = null;
  try { storedTheme = localStorage.getItem('theme'); } catch (error) { /* Storage can be disabled. */ }
  const initialTheme = storedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  html.dataset.theme = initialTheme;
  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(initialTheme === 'dark'));
    themeToggle.addEventListener('click', () => {
      const nextTheme = html.dataset.theme === 'dark' ? 'light' : 'dark';
      html.dataset.theme = nextTheme;
      try { localStorage.setItem('theme', nextTheme); } catch (error) { /* Keep the toggle usable without storage. */ }
      themeToggle.setAttribute('aria-pressed', String(nextTheme === 'dark'));
    });
  }

  // Mobile navigation: close on selection, Escape, or outside click.
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const closeMenu = () => {
    if (!navToggle || !navLinks) return;
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  };
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = !navLinks.classList.contains('open');
      navToggle.classList.toggle('open', open);
      navLinks.classList.toggle('open', open);
      navToggle.setAttribute('aria-expanded', String(open));
    });
    document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
    document.addEventListener('click', event => {
      if (!navToggle.contains(event.target) && !navLinks.contains(event.target)) closeMenu();
    });
  }

  // Scroll reveal animation with a no-JS/reduced-motion fallback.
  const reveals = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(element => element.classList.add('visible'));
  } else {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(element => observer.observe(element));
  }

  // Accessible exclusive FAQ accordion.
  document.querySelectorAll('.faq-list details').forEach(detail => {
    detail.addEventListener('toggle', () => {
      if (!detail.open) return;
      document.querySelectorAll('.faq-list details[open]').forEach(other => {
        if (other !== detail) other.removeAttribute('open');
      });
    });
  });

  // Lightweight tabs (progressively enhanced from semantic buttons/panels).
  document.querySelectorAll('[data-tabs]').forEach(tabGroup => {
    const tabs = [...tabGroup.querySelectorAll('[role="tab"]')];
    const panels = [...tabGroup.querySelectorAll('[role="tabpanel"]')];
    const activate = id => {
      tabs.forEach(tab => {
        const active = tab.dataset.tab === id;
        tab.classList.toggle('is-active', active);
        tab.setAttribute('aria-selected', String(active));
        tab.tabIndex = active ? 0 : -1;
      });
      panels.forEach(panel => panel.hidden = panel.dataset.panel !== id);
    };
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activate(tab.dataset.tab));
      tab.addEventListener('keydown', event => {
        if (!['ArrowRight', 'ArrowLeft'].includes(event.key)) return;
        event.preventDefault();
        const next = event.key === 'ArrowRight' ? (index + 1) % tabs.length : (index - 1 + tabs.length) % tabs.length;
        tabs[next].focus();
        activate(tabs[next].dataset.tab);
      });
    });
    activate(tabs[0]?.dataset.tab);
  });

  // Service cards open a keyboard-friendly details modal.
  const modal = document.querySelector('#service-modal');
  const modalTitle = modal?.querySelector('[data-modal-title]');
  const modalBody = modal?.querySelector('[data-modal-body]');
  const serviceDetails = {
    design: ['Web design', 'We turn your message into a calm, responsive interface with clear hierarchy, purposeful motion, and a confident path to enquiry.'],
    development: ['Web development', 'We build lean, accessible pages with semantic HTML, maintainable CSS, progressive JavaScript, and performance-minded delivery.'],
    strategy: ['Branding and strategy', 'We clarify your audience, offer, voice, and visual direction so the website has a sharper reason to exist.']
  };
  const closeModal = () => {
    if (!modal) return;
    modal.close ? modal.close() : modal.removeAttribute('open');
  };
  const openService = card => {
    const detail = serviceDetails[card.dataset.service];
    if (!detail || !modal) return;
    modalTitle.textContent = detail[0];
    modalBody.textContent = detail[1];
    modal.showModal ? modal.showModal() : modal.setAttribute('open', '');
  };
  document.querySelectorAll('[data-service]').forEach(card => {
    card.addEventListener('click', () => openService(card));
    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openService(card);
      }
    });
  });
  modal?.querySelectorAll('[data-modal-close]').forEach(button => button.addEventListener('click', closeModal));
  modal?.addEventListener('click', event => { if (event.target === modal) closeModal(); });

  // Image gallery lightbox.
  const lightbox = document.querySelector('#lightbox');
  const lightboxImage = lightbox?.querySelector('img');
  const lightboxCaption = lightbox?.querySelector('[data-lightbox-caption]');
  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.close ? lightbox.close() : lightbox.removeAttribute('open');
  };
  document.querySelectorAll('[data-lightbox]').forEach(button => button.addEventListener('click', () => {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = button.dataset.lightbox;
    lightboxImage.alt = button.dataset.caption || '';
    if (lightboxCaption) lightboxCaption.textContent = button.dataset.caption || '';
    lightbox.showModal ? lightbox.showModal() : lightbox.setAttribute('open', '');
  }));
  lightbox?.querySelectorAll('[data-lightbox-close]').forEach(button => button.addEventListener('click', closeLightbox));
  lightbox?.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });

  // Dynamic content: local data keeps this feature fast, private, and credit-free.
  const contentGrid = document.querySelector('#content-grid');
  const contentSearch = document.querySelector('#content-search');
  const contentTopic = document.querySelector('#content-topic');
  const contentSort = document.querySelector('#content-sort');
  const contentEmpty = document.querySelector('#content-empty');
  const notes = [
    { title: 'Why clear website structure improves enquiries', type: 'Strategy', date: '2026-09-18', text: 'A simple hierarchy helps visitors understand the offer and choose the next action with less friction.' },
    { title: 'A practical mobile-first launch checklist', type: 'Development', date: '2026-08-22', text: 'Check tap targets, readable type, image weight, forms, navigation, and page speed before launch.' },
    { title: 'SEO basics worth doing before publishing', type: 'SEO', date: '2026-07-11', text: 'Give every page a useful title, description, heading structure, canonical URL, internal links, and descriptive image alt text.' },
    { title: 'When a brand refresh needs more than a new logo', type: 'Branding', date: '2026-06-04', text: 'The strongest refresh aligns the message, visual system, user experience, and business goal.' }
  ];
  const renderNotes = () => {
    if (!contentGrid) return;
    const query = (contentSearch?.value || '').trim().toLowerCase();
    const topic = contentTopic?.value || 'all';
    const sort = contentSort?.value || 'newest';
    const filtered = notes.filter(note => (topic === 'all' || note.type === topic) && `${note.title} ${note.type} ${note.text}`.toLowerCase().includes(query));
    filtered.sort((a, b) => sort === 'title' ? a.title.localeCompare(b.title) : sort === 'oldest' ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date));
    contentGrid.innerHTML = filtered.map(note => `<article class="content-card"><div class="content-card-meta"><span>${note.type}</span><time datetime="${note.date}">${new Date(`${note.date}T00:00:00`).toLocaleDateString('en-ZA', { day: '2-digit', month: 'short', year: 'numeric' })}</time></div><h3>${note.title}</h3><p>${note.text}</p></article>`).join('');
    if (contentEmpty) contentEmpty.hidden = filtered.length > 0;
  };
  contentSearch?.addEventListener('input', renderNotes);
  contentTopic?.addEventListener('change', renderNotes);
  contentSort?.addEventListener('change', renderNotes);
  renderNotes();

  // Both required forms share client-side validation and asynchronous submission.
  // A configured data-endpoint can receive AJAX; the default no-backend path compiles a mailto draft.
  document.querySelectorAll('[data-async-form]').forEach(form => {
    const formStatus = form.querySelector('[data-form-status]');
    const responsePanel = form.querySelector('[data-form-response]');
    form.querySelectorAll('input, select, textarea').forEach(field => field.addEventListener('input', () => {
      field.setAttribute('aria-invalid', String(!field.checkValidity()));
    }));
    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        form.reportValidity();
        if (formStatus) formStatus.textContent = 'Please check the highlighted fields and try again.';
        return;
      }
      const data = new FormData(form);
      const payload = Object.fromEntries(data.entries());
      const isEnquiry = form.id === 'enquiry-form';
      if (formStatus) formStatus.textContent = form.dataset.endpoint ? 'Sending your message…' : 'Preparing your email draft…';
      try {
        if (form.dataset.endpoint) {
          const response = await fetch(form.dataset.endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
          if (!response.ok) throw new Error('Submission endpoint unavailable');
          if (responsePanel) {
            responsePanel.hidden = false;
            responsePanel.textContent = isEnquiry ? 'Thanks — your enquiry has been sent. We will review it and reply with the relevant cost, availability, or next step.' : 'Thanks — your message has been sent. We will review it and reply as soon as we can.';
          }
          if (formStatus) formStatus.textContent = 'Your message was sent successfully.';
          form.reset();
          form.classList.remove('was-validated');
          form.querySelectorAll('[aria-invalid]').forEach(field => field.removeAttribute('aria-invalid'));
          return;
        } else {
          // Keep the no-backend version asynchronous without consuming a paid service.
          await new Promise(resolve => window.setTimeout(resolve, 350));
        }
        const subject = encodeURIComponent(`${isEnquiry ? 'Service enquiry' : 'General message'} from ${payload.name}`);
        const body = encodeURIComponent(Object.entries(payload).map(([key, value]) => `${key}: ${value}`).join('\n'));
        if (responsePanel) {
          responsePanel.hidden = false;
          responsePanel.textContent = isEnquiry ? (payload.enquiry_type === 'service' ? 'Your service enquiry is ready in an email draft. Review it in your email app and press Send so we can prepare a tailored cost and availability response.' : 'Your enquiry is ready in an email draft. Review it in your email app and press Send so we can reply with the relevant cost, availability, or next step.') : 'Your message is ready in an email draft. Review it in your email app and press Send to complete delivery.';
        }
        if (formStatus) formStatus.textContent = 'Email draft prepared. If no email app opens, email orviacreatives@gmail.com directly.';
        window.location.href = `mailto:orviacreatives@gmail.com?subject=${subject}&body=${body}`;
      } catch (error) {
        if (formStatus) formStatus.textContent = 'We could not submit automatically. Please email orviacreatives@gmail.com directly.';
      }
    });
  });

  // Local map reference markers: no tile service, geolocation, or third-party request.
  const mapStatus = document.querySelector('[data-map-status]');
  const mapLocations = {
    'cape-town': 'Cape Town is shown as a reference city within the country-wide remote service area; it is not an Orvia office.',
    johannesburg: 'Johannesburg is shown as a reference city within the country-wide remote service area; it is not an Orvia office.',
    durban: 'Durban is shown as a reference city within the country-wide remote service area; it is not an Orvia office.'
  };
  document.querySelectorAll('[data-map-location]').forEach(marker => {
    marker.addEventListener('click', () => {
      const selectedLocation = marker.dataset.mapLocation;
      document.querySelectorAll('[data-map-location]').forEach(other => {
        const selected = other === marker;
        other.classList.toggle('is-selected', selected);
        other.setAttribute('aria-pressed', String(selected));
      });
      if (mapStatus && mapLocations[selectedLocation]) mapStatus.textContent = mapLocations[selectedLocation];
    });
  });

  // Maps and other external assets are not requested automatically; visitors choose external links explicitly.

})();
