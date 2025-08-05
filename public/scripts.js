document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS
  AOS.init({
    duration: 800,
    once: true,
    easing: 'ease-out',
    delay: 100,
  });

  // Preloader
  window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
      setTimeout(() => {
        loader.classList.add('hidden');
      }, 600);
    }
  });

  // Matrix Background
  const canvas = document.getElementById('matrix-bg');
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * canvas.height / fontSize;
    }

    const colors = ['#ff3333', '#cc0000', '#ff6666', '#ff9999'];

    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        const color = colors[Math.floor(Math.random() * colors.length)];

        ctx.fillStyle = color;
        ctx.font = `${fontSize}px monospace`;
        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    setInterval(draw, 40);

    window.addEventListener('resize', () => {
      canvas.height = window.innerHeight;
      canvas.width = window.innerWidth;
      drops.length = Math.floor(canvas.width / fontSize);
      for (let x = 0; x < drops.length; x++) {
        drops[x] = Math.random() * canvas.height / fontSize;
      }
    });
  }

  // Particles.js for Hero Section
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: { value: 20, density: { enable: true, value_area: 800 } },
        color: { value: '#ff3333' },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: true },
        size: { value: 2, random: true },
        line_linked: { enable: true, distance: 100, color: '#ff3333', opacity: 0.4 },
        move: { enable: true, speed: 1, direction: 'none', random: true }
      },
      interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' } },
        modes: { grab: { distance: 100, line_linked: { opacity: 0.7 } }, push: { particles_nb: 2 } }
      }
    });
  }

  // Initialize VanillaTilt for Cards
  VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
    max: 15,
    speed: 400,
    glare: true,
    'max-glare': 0.5,
  });

  // Navbar Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
      menu.classList.toggle('active');
      menuToggle.innerHTML = menu.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
      menuToggle.setAttribute('aria-expanded', menu.classList.contains('active'));
    });

    menuToggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        menu.classList.toggle('active');
        menuToggle.innerHTML = menu.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        menuToggle.setAttribute('aria-expanded', menu.classList.contains('active'));
      }
    });

    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Sticky Navbar
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      navbar.classList.toggle('sticky', window.scrollY > 0);
    }
  });

  // Video Modal
  const videoItems = document.querySelectorAll('.video-item');
  const modal = document.getElementById('video-modal');
  const modalVideo = document.getElementById('modal-video');
  const modalClose = document.querySelector('.modal-close');

  videoItems.forEach(item => {
    item.addEventListener('click', () => {
      const videoSrc = item.getAttribute('data-video');
      modalVideo.querySelector('source').src = videoSrc;
      modalVideo.load();
      modal.style.display = 'flex';
      modalVideo.focus();
    });

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const videoSrc = item.getAttribute('data-video');
        modalVideo.querySelector('source').src = videoSrc;
        modalVideo.load();
        modal.style.display = 'flex';
        modalVideo.focus();
      }
    });
  });

  modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
    modalVideo.pause();
    modalVideo.querySelector('source').src = '';
  });

  modalClose.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      modal.style.display = 'none';
      modalVideo.pause();
      modalVideo.querySelector('source').src = '';
    }
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      modalVideo.pause();
      modalVideo.querySelector('source').src = '';
    }
  });

  // Newsletter Form
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Inscrito com sucesso! Você receberá nossas atualizações.');
      newsletterForm.reset();
    });
  }

  // Back to Top Button
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.style.display = window.scrollY > 400 ? 'block' : 'none';
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Form Submission - Removido para evitar conflito com o manipulador no HTML
  // O manipulador de eventos do formulário foi movido para o HTML inline
});