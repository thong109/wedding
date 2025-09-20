(() => {
  const modalQr = () => {
    const modal = $('.modal');
    const overlay = $('.modal-overlay');
    const openBtn = $('#openModal');
    const closeBtn = $('.close-btn');

    const openModal = () => {
      overlay.fadeIn(300).addClass('show');
      modal.addClass('show');
    };

    const closeModal = () => {
      modal.removeClass('show');
      overlay.fadeOut(300).removeClass('show');
    };
    openBtn.on('click', openModal);
    closeBtn.on('click', closeModal);
    overlay.on('click', closeModal);

    $(document).on('keydown', (e) => {
      if (e.key === 'Escape') {
closeModal();
}
    });
  };

  const gsapAnimation = () => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.fade-left').forEach((item) => {
      gsap.from(item, {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    gsap.utils.toArray('.fade-right').forEach((item) => {
      gsap.from(item, {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    gsap.utils.toArray('.fade-up').forEach((item) => {
      gsap.from(item, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    });
  };

  const tabs = () => {
    const tabs = document.querySelectorAll('.btn-common');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        if (tab.classList.contains('is-active')) {
return;
}

        // ẩn content hiện tại
        const current = document.querySelector('.tab-content.is-active');
        if (current) {
          gsap.to(current, {
            opacity: 0,
            duration: 0.4,
            onComplete: () => {
              current.classList.remove('is-active');

              tabs.forEach((t) => t.classList.remove('is-active'));
              tab.classList.add('is-active');

              const targetId = 'tab-' + tab.id;
              const next = document.getElementById(targetId);
              next.classList.add('is-active');

              gsap.fromTo(next, { opacity: 0 }, { opacity: 1, duration: 0.6 });
            }
          });
        }
      });
    });
  };

  const buttonMain = () => {
    const button = document.querySelector('#button-main');
    const mainCommon = document.querySelector('.main-common');
    const audio = document.getElementById('wc-bg-music');
    const btn = document.getElementById('wc-music-cover');
    const off = document.querySelector('.is-off');
    const on = document.querySelector('.is-on');

    const updateIcon = () => {
      if (!audio.paused && !audio.muted) {
        off.classList.remove('is-active');
        off.classList.add('hidden');
        on.classList.add('is-active');
      } else {
        off.classList.add('is-active');
        off.classList.remove('hidden');
        on.classList.remove('is-active');
      }
    };

    const tryPlay = (unmuted = true) => {
      audio.muted = !unmuted;
      audio.volume = unmuted ? 1 : 0;
      return audio.play();
    };

    btn.addEventListener('click', () => {
      if (audio.paused) {
        tryPlay(true)
          .catch(() => tryPlay(false))
          .finally(updateIcon);
      } else {
        audio.pause();
        updateIcon();
      }
    });

    button.addEventListener('click', () => {
      mainCommon.classList.remove('is-animation');

      const before = window.getComputedStyle(mainCommon, '::before').transform;
      const after = window.getComputedStyle(mainCommon, '::after').transform;

      mainCommon.style.setProperty('--before-transform', before);
      mainCommon.style.setProperty('--after-transform', after);

      void mainCommon.offsetWidth;

      mainCommon.classList.add('is-active');

      tryPlay(true)
        .catch(() => tryPlay(false))
        .finally(updateIcon);
    });
  };

  window.WebFontConfig = {
    custom: {
      families: [ 'Roboto:n4,n5,n6,n7' ],
      urls: [
        'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=swap'
      ]
    }
  };

  (() => {
    const wf = document.createElement('script');
    wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    const s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();

  $(() => {
    modalQr();
    gsapAnimation();
    tabs();
    buttonMain();
  });
})();
