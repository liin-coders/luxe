document.addEventListener('DOMContentLoaded', () => {

      // ==========================================
      // 0. CUSTOM CURSOR ENGINE (Desktop only)
      // ==========================================
      const cursorDot = document.getElementById('cursorDot');
      const cursorOutline = document.getElementById('cursorOutline');
      
      let mouseX = 0, mouseY = 0;
      let outlineX = 0, outlineY = 0;

      if (window.innerWidth >= 1024) {
        window.addEventListener('mousemove', (e) => {
          mouseX = e.clientX;
          mouseY = e.clientY;
          if (cursorDot) {
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
          }
        });

        function animateCursor() {
          outlineX += (mouseX - outlineX) * 0.15;
          outlineY += (mouseY - outlineY) * 0.15;
          if (cursorOutline) {
            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;
          }
          requestAnimationFrame(animateCursor);
        }
        animateCursor();

        const interactiveTargets = document.querySelectorAll('a, button, input, select, textarea, .gallery-item, .insta-item, .service-card-stack');
        interactiveTargets.forEach(el => {
          el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
          el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });
      }

      // ==========================================
      // 00. INTRO OVERLAY (DESKTOP ONLY: >= 1024px)
      // ==========================================
      const preloaderOverlay = document.getElementById('preloaderOverlay');
      const preloaderProgress = document.getElementById('preloaderProgress');
      const preloaderPercent = document.getElementById('preloaderPercent');
      const preloaderWelcome = document.getElementById('preloaderWelcome');
      const skipPreloaderBtn = document.getElementById('skipPreloaderBtn');

      if (window.innerWidth < 1024) {
        // Mobile / Tablet: Instant access without preloader
        if (preloaderOverlay) {
          preloaderOverlay.style.display = 'none';
        }
      } else {
        // Desktop: Run smooth 8s loading animation
        let progress = 0;
        const totalDuration = 8000;
        const intervalTime = 40;
        const step = (100 / (totalDuration / intervalTime));

        function finishIntro() {
          if (!preloaderOverlay) return;
          if (preloaderProgress) preloaderProgress.style.width = '100%';
          if (preloaderPercent) preloaderPercent.textContent = '100%';
          if (preloaderWelcome) {
            preloaderWelcome.style.opacity = '1';
            preloaderWelcome.style.transform = 'translateY(0)';
          }

          setTimeout(() => {
            preloaderOverlay.style.transform = 'translateY(-100%)';
            setTimeout(() => {
              preloaderOverlay.style.display = 'none';
            }, 1000);
          }, 800);
        }

        const introInterval = setInterval(() => {
          progress += step;
          if (progress >= 100) {
            clearInterval(introInterval);
            finishIntro();
          } else {
            if (preloaderProgress) preloaderProgress.style.width = `${Math.floor(progress)}%`;
            if (preloaderPercent) preloaderPercent.textContent = `${Math.floor(progress)}%`;
          }
        }, intervalTime);

        if (skipPreloaderBtn) {
          skipPreloaderBtn.addEventListener('click', () => {
            clearInterval(introInterval);
            finishIntro();
          });
        }
      }

      // ==========================================
      // 01. THEME MODE TOGGLE
      // ==========================================
      const themeToggleBtn = document.getElementById('themeToggleBtn');
      const htmlElement = document.documentElement;

      const savedTheme = localStorage.getItem('luxe-theme');
      if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlElement.classList.add('dark');
      } else {
        htmlElement.classList.remove('dark');
      }

      if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
          htmlElement.classList.toggle('dark');
          const isDark = htmlElement.classList.contains('dark');
          localStorage.setItem('luxe-theme', isDark ? 'dark' : 'light');
        });
      }

      // ==========================================
      // 01. GLASSMORPHIC SCROLL HEADER
      // ==========================================
      const mainHeader = document.getElementById('mainHeader');
      const headerInner = document.getElementById('headerInner');
      const searchContainer = document.getElementById('searchContainer');
      const scrolledSearchToggle = document.getElementById('scrolledSearchToggle');

      window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
          mainHeader.classList.add('glass-header');
          headerInner.classList.remove('h-20');
          headerInner.classList.add('h-16');
          
          if (window.innerWidth >= 1024 && searchContainer) {
            searchContainer.classList.add('opacity-0', 'pointer-events-none', 'w-0');
            searchContainer.classList.remove('w-64', 'lg:w-88');
            if (scrolledSearchToggle) scrolledSearchToggle.classList.remove('hidden');
          }
        } else {
          mainHeader.classList.remove('glass-header');
          headerInner.classList.add('h-20');
          headerInner.classList.remove('h-16');

          if (window.innerWidth >= 1024 && searchContainer) {
            searchContainer.classList.remove('opacity-0', 'pointer-events-none', 'w-0');
            searchContainer.classList.add('w-64', 'lg:w-88');
            if (scrolledSearchToggle) scrolledSearchToggle.classList.add('hidden');
          }
        }
      });

      if (scrolledSearchToggle && searchContainer) {
        scrolledSearchToggle.addEventListener('click', () => {
          searchContainer.classList.toggle('opacity-0');
          searchContainer.classList.toggle('pointer-events-none');
          searchContainer.classList.toggle('w-0');
          searchContainer.classList.toggle('w-64');
          const input = document.getElementById('serviceSearchInput');
          if (input) input.focus();
        });
      }

      // ==========================================
      // 01. LIVE SERVICE SEARCH ENGINE
      // ==========================================
      const catalog = [
        { name: 'Haute Couture Hair Styling & Balayage', price: '₹ 2,499+', cat: 'Hair Artistry' },
        { name: '24K Royal Gold Radiance Facial', price: '₹ 3,999+', cat: 'Skin Alchemy' },
        { name: 'Diamond Bridal & Glamour Couture', price: '₹ 14,999+', cat: 'Bridal Grandeur' },
        { name: 'Botanical Scalp & Keratin Infusion', price: '₹ 4,499+', cat: 'Scalp Spa' },
        { name: 'Velvet Gel Sculpting & Spa Pedicure', price: '₹ 1,899+', cat: 'Nail Lounge' },
        { name: 'Aroma Holistic Body Ritual & Polishing', price: '₹ 3,499+', cat: 'Body Wellness' },
        { name: 'HD Airbrush Bridal Makeup', price: '₹ 9,999+', cat: 'Bridal' },
        { name: 'Ammonia-Free Root Touchup & Glaze', price: '₹ 1,599+', cat: 'Hair Artistry' }
      ];

      function setupSearchEngine(inputId, dropId, clearId = null) {
        const input = document.getElementById(inputId);
        const drop = document.getElementById(dropId);
        const clearBtn = clearId ? document.getElementById(clearId) : null;
        if (!input || !drop) return;

        input.addEventListener('input', (e) => {
          const q = e.target.value.trim().toLowerCase();
          if (clearBtn) clearBtn.classList.toggle('hidden', q.length === 0);

          if (q.length < 2) {
            drop.classList.add('hidden');
            drop.innerHTML = '';
            return;
          }

          const hits = catalog.filter(s => s.name.toLowerCase().includes(q) || s.cat.toLowerCase().includes(q));
          if (hits.length === 0) {
            drop.innerHTML = `<div class="p-3 text-center text-xs text-charcoal/60 dark:text-alabaster/60">No treatments found for "${q}"</div>`;
          } else {
            drop.innerHTML = hits.map(item => `
              <a href="#booking-section" class="flex justify-between items-center p-2 rounded-xl hover:bg-cream dark:hover:bg-darkSurface transition-all group">
                <div>
                  <div class="text-xs font-semibold text-espresso dark:text-alabaster group-hover:text-dusty">${item.name}</div>
                  <div class="text-[9px] text-charcoal/50 dark:text-alabaster/50">${item.cat}</div>
                </div>
                <span class="text-xs font-bold text-dusty">${item.price}</span>
              </a>
            `).join('');
          }
          drop.classList.remove('hidden');
        });

        if (clearBtn) {
          clearBtn.addEventListener('click', () => {
            input.value = '';
            clearBtn.classList.add('hidden');
            drop.classList.add('hidden');
          });
        }

        document.addEventListener('click', (e) => {
          if (!input.contains(e.target) && !drop.contains(e.target)) {
            drop.classList.add('hidden');
          }
        });
      }

      setupSearchEngine('serviceSearchInput', 'searchResultsDropdown', 'clearSearchBtn');
      setupSearchEngine('mobileSearchInput', 'mobileSearchResults');

      // ==========================================
      // 01. MOBILE DRAWER NAVIGATION
      // ==========================================
      const mobileMenuBtn = document.getElementById('mobileMenuBtn');
      const mobileDrawer = document.getElementById('mobileDrawer');
      const drawerPanel = document.getElementById('drawerPanel');
      const closeDrawerBtn = document.getElementById('closeDrawerBtn');
      const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

      function openMobileMenu() {
        if (!mobileDrawer || !drawerPanel) return;
        mobileDrawer.classList.remove('pointer-events-none');
        mobileDrawer.classList.add('opacity-100');
        drawerPanel.classList.remove('translate-x-full');
      }

      function closeMobileMenu() {
        if (!mobileDrawer || !drawerPanel) return;
        drawerPanel.classList.add('translate-x-full');
        mobileDrawer.classList.remove('opacity-100');
        setTimeout(() => {
          mobileDrawer.classList.add('pointer-events-none');
        }, 300);
      }

      if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
      if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeMobileMenu);
      if (mobileDrawer) {
        mobileDrawer.addEventListener('click', (e) => {
          if (e.target === mobileDrawer) closeMobileMenu();
        });
      }
      mobileNavLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

      // ==========================================
      // 01. CONTACT US MODAL ENGINE
      // ==========================================
      const contactModal = document.getElementById('contactModal');
      const openContactModalBtn = document.getElementById('openContactModalBtn');
      const mobileContactModalTrigger = document.getElementById('mobileContactModalTrigger');
      const closeContactModalBtn = document.getElementById('closeContactModalBtn');
      const modalBookingRedirect = document.getElementById('modalBookingRedirect');
      const modalSendWhatsAppBtn = document.getElementById('modalSendWhatsAppBtn');
      const modalSendEmailBtn = document.getElementById('modalSendEmailBtn');
      const modalFormStatus = document.getElementById('modalFormStatus');

      function openContactModal() {
        if (!contactModal) return;
        contactModal.classList.remove('pointer-events-none');
        contactModal.classList.add('opacity-100');
      }

      function closeContactModal() {
        if (!contactModal) return;
        contactModal.classList.remove('opacity-100');
        setTimeout(() => {
          contactModal.classList.add('pointer-events-none');
        }, 300);
      }

      if (openContactModalBtn) openContactModalBtn.addEventListener('click', openContactModal);
      if (mobileContactModalTrigger) {
        mobileContactModalTrigger.addEventListener('click', () => {
          closeMobileMenu();
          setTimeout(openContactModal, 200);
        });
      }
      document.querySelectorAll('.open-inquiry-trigger').forEach(btn => {
        btn.addEventListener('click', openContactModal);
      });
      if (closeContactModalBtn) closeContactModalBtn.addEventListener('click', closeContactModal);
      if (contactModal) {
        contactModal.addEventListener('click', (e) => {
          if (e.target === contactModal) closeContactModal();
        });
      }

      // Smooth scroll to direct booking from inside the modal
      if (modalBookingRedirect) {
        modalBookingRedirect.addEventListener('click', () => {
          closeContactModal();
        });
      }

      function getContactModalData() {
        const name = document.getElementById('modalContactName').value.trim();
        const phone = document.getElementById('modalContactPhone').value.trim();
        const email = document.getElementById('modalContactEmail').value.trim();
        const message = document.getElementById('modalContactMessage').value.trim();

        if (!name || !phone || !email || !message) {
          if (modalFormStatus) {
            modalFormStatus.textContent = 'Please complete all required fields.';
            modalFormStatus.classList.remove('hidden');
          }
          return null;
        }
        if (modalFormStatus) modalFormStatus.classList.add('hidden');
        return { name, phone, email, message };
      }

      if (modalSendWhatsAppBtn) {
        modalSendWhatsAppBtn.addEventListener('click', () => {
          const d = getContactModalData();
          if (!d) return;
          const msg = `*LUXE SALON GENERAL INQUIRY*\n\n` +
            `*Name:* ${d.name}\n` +
            `*Phone:* ${d.phone}\n` +
            `*Email:* ${d.email}\n` +
            `*Message:* ${d.message}\n\n` +
            `_Sent via Luxe Salon Concierge Portal_`;
          window.open(`https://wa.me/918956234512?text=${encodeURIComponent(msg)}`, '_blank');
          closeContactModal();
        });
      }

      if (modalSendEmailBtn) {
        modalSendEmailBtn.addEventListener('click', () => {
          const d = getContactModalData();
          if (!d) return;
          const sub = `Luxe Salon Inquiry from ${d.name}`;
          const body = `Dear Concierge,\n\n${d.message}\n\nContact Details:\nName: ${d.name}\nPhone: ${d.phone}\nEmail: ${d.email}`;
          window.location.href = `mailto:@luxesalon.com?subject=${encodeURIComponent(sub)}&body=${encodeURIComponent(body)}`;
          closeContactModal();
        });
      }

      // ==========================================
      // 02. BANNER SLIDER HERO (Mouse wheel + Dots)
      // ==========================================
      const heroSlides = document.querySelectorAll('.hero-slide');
      const heroDots = document.querySelectorAll('.hero-dot');
      let currentHeroIndex = 0;
      let heroTimer = null;

      function activateHeroSlide(idx) {
        if (idx < 0) idx = heroSlides.length - 1;
        if (idx >= heroSlides.length) idx = 0;

        heroSlides.forEach((s, i) => {
          if (i === idx) {
            s.classList.remove('opacity-0', 'pointer-events-none');
            s.classList.add('opacity-100');
          } else {
            s.classList.remove('opacity-100');
            s.classList.add('opacity-0', 'pointer-events-none');
          }
        });

        heroDots.forEach((d, i) => {
          if (i === idx) {
            d.classList.add('bg-dusty', 'ring-4', 'ring-dusty/30');
            d.classList.remove('bg-white/40');
          } else {
            d.classList.remove('bg-dusty', 'ring-4', 'ring-dusty/30');
            d.classList.add('bg-white/40');
          }
        });
        currentHeroIndex = idx;
      }

      function startHeroAutoplay() {
        heroTimer = setInterval(() => {
          activateHeroSlide(currentHeroIndex + 1);
        }, 6500);
      }
      startHeroAutoplay();

      heroDots.forEach(dot => {
        dot.addEventListener('click', () => {
          clearInterval(heroTimer);
          activateHeroSlide(parseInt(dot.getAttribute('data-slide'), 10));
          startHeroAutoplay();
        });
      });

      const heroSection = document.getElementById('home');
      let wheelDebounce = false;
      if (heroSection) {
        heroSection.addEventListener('wheel', (e) => {
          if (window.scrollY === 0) {
            if (!wheelDebounce) {
              wheelDebounce = true;
              clearInterval(heroTimer);
              if (e.deltaY > 20) {
                if (currentHeroIndex < heroSlides.length - 1) {
                  activateHeroSlide(currentHeroIndex + 1);
                  e.preventDefault();
                }
              } else if (e.deltaY < -20) {
                if (currentHeroIndex > 0) {
                  activateHeroSlide(currentHeroIndex - 1);
                  e.preventDefault();
                }
              }
              startHeroAutoplay();
              setTimeout(() => { wheelDebounce = false; }, 600);
            }
          }
        }, { passive: false });
      }

      // ==========================================
      // 05. GALLERY LIGHTBOX MODAL
      // ==========================================
      const galleryItems = document.querySelectorAll('.gallery-item');
      const galleryLightbox = document.getElementById('galleryLightbox');
      const lightboxImg = document.getElementById('lightboxImg');
      const lightboxTitle = document.getElementById('lightboxTitle');
      const lightboxSubtitle = document.getElementById('lightboxSubtitle');
      const closeLightboxBtn = document.getElementById('closeLightboxBtn');
      const lightboxBookBtn = document.getElementById('lightboxBookBtn');

      galleryItems.forEach(item => {
        const open = () => {
          const img = item.querySelector('img');
          if (!galleryLightbox || !lightboxImg || !img) return;
          lightboxImg.src = img.src;
          if (lightboxTitle) lightboxTitle.textContent = item.getAttribute('data-title') || 'Luxe Salon Artistry';
          if (lightboxSubtitle) lightboxSubtitle.textContent = item.getAttribute('data-desc') || 'Bespoke Atelier Treatment';
          galleryLightbox.classList.remove('pointer-events-none');
          galleryLightbox.classList.add('opacity-100');
        };

        const btn = item.querySelector('.gallery-open-btn');
        if (btn) btn.addEventListener('click', (e) => { e.stopPropagation(); open(); });
        item.addEventListener('click', open);
      });

      function closeGalleryLightbox() {
        if (!galleryLightbox) return;
        galleryLightbox.classList.remove('opacity-100');
        setTimeout(() => {
          galleryLightbox.classList.add('pointer-events-none');
          if (lightboxImg) lightboxImg.src = '';
        }, 300);
      }

      if (closeLightboxBtn) closeLightboxBtn.addEventListener('click', closeGalleryLightbox);
      if (lightboxBookBtn) lightboxBookBtn.addEventListener('click', closeGalleryLightbox);
      if (galleryLightbox) {
        galleryLightbox.addEventListener('click', (e) => {
          if (e.target === galleryLightbox) closeGalleryLightbox();
        });
      }

      // ==========================================
      // 06. CTA SECTION CROSSFADE
      // ==========================================
      const ctaSlides = document.querySelectorAll('.cta-slide');
      let ctaIndex = 0;
      if (ctaSlides.length > 0) {
        setInterval(() => {
          ctaSlides.forEach((s, i) => {
            s.style.opacity = (i === ctaIndex) ? '1' : '0';
          });
          ctaIndex = (ctaIndex + 1) % ctaSlides.length;
        }, 4000);
      }

      // ==========================================
      // 07. INSTAGRAM LIGHTBOX MODAL
      // ==========================================
      const instaItems = document.querySelectorAll('.insta-item');
      const instaModal = document.getElementById('instaModal');
      const instaModalImg = document.getElementById('instaModalImg');
      const instaModalLikes = document.getElementById('instaModalLikes');
      const instaModalCaption = document.getElementById('instaModalCaption');
      const closeInstaModalBtn = document.getElementById('closeInstaModalBtn');

      instaItems.forEach(card => {
        card.addEventListener('click', () => {
          const img = card.querySelector('img');
          if (!instaModal || !instaModalImg || !img) return;
          instaModalImg.src = img.src;
          if (instaModalLikes) instaModalLikes.textContent = `${card.getAttribute('data-likes') || '1.5k'} likes`;
          if (instaModalCaption) instaModalCaption.textContent = card.getAttribute('data-caption') || 'Curated editorial moments at Luxe Salon Samba.';
          
          instaModal.classList.remove('pointer-events-none');
          instaModal.classList.add('opacity-100');
        });
      });

      function closeInstaModal() {
        if (!instaModal) return;
        instaModal.classList.remove('opacity-100');
        setTimeout(() => {
          instaModal.classList.add('pointer-events-none');
          if (instaModalImg) instaModalImg.src = '';
        }, 300);
      }

      if (closeInstaModalBtn) closeInstaModalBtn.addEventListener('click', closeInstaModal);
      if (instaModal) {
        instaModal.addEventListener('click', (e) => {
          if (e.target === instaModal) closeInstaModal();
        });
      }

      // Global escape key to close modals
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          closeContactModal();
          closeGalleryLightbox();
          closeInstaModal();
        }
      });

      // ==========================================
      // 08. TESTIMONIALS CAROUSEL (2 Desktop / 1 Mobile)
      // ==========================================
      const testimonialTrack = document.getElementById('testimonialTrack');
      const testimonialCards = document.querySelectorAll('.testimonial-item');
      const testimonialDots = document.getElementById('testimonialDots');
      const carouselWrapper = document.getElementById('testimonialCarouselWrapper');

      let currentTestimonialPage = 0;
      let itemsPerPage = window.innerWidth >= 768 ? 2 : 1;
      let totalPages = Math.ceil(testimonialCards.length / itemsPerPage);
      let autoSwipeInterval = null;

      function renderDots() {
        if (!testimonialDots) return;
        testimonialDots.innerHTML = '';
        totalPages = Math.ceil(testimonialCards.length / itemsPerPage);
        for (let i = 0; i < totalPages; i++) {
          const dot = document.createElement('button');
          dot.className = `w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === currentTestimonialPage ? 'bg-dusty w-6' : 'bg-charcoal/30'}`;
          dot.setAttribute('aria-label', `Page ${i + 1}`);
          dot.addEventListener('click', () => {
            currentTestimonialPage = i;
            updateTestimonialView();
          });
          testimonialDots.appendChild(dot);
        }
      }

      function updateTestimonialView() {
        itemsPerPage = window.innerWidth >= 768 ? 2 : 1;
        totalPages = Math.ceil(testimonialCards.length / itemsPerPage);
        if (currentTestimonialPage >= totalPages) currentTestimonialPage = 0;

        if (testimonialTrack) {
          testimonialTrack.style.transform = `translateX(-${currentTestimonialPage * 100}%)`;
        }
        if (testimonialDots) {
          const dots = testimonialDots.querySelectorAll('button');
          dots.forEach((d, idx) => {
            d.className = idx === currentTestimonialPage ? 'w-6 h-2.5 rounded-full bg-dusty transition-all duration-300' : 'w-2.5 h-2.5 rounded-full bg-charcoal/30 transition-all duration-300';
          });
        }
      }

      renderDots();

      function startAutoSwipe() {
        autoSwipeInterval = setInterval(() => {
          currentTestimonialPage = (currentTestimonialPage + 1) % totalPages;
          updateTestimonialView();
        }, 5000);
      }
      startAutoSwipe();

      if (carouselWrapper) {
        carouselWrapper.addEventListener('mouseenter', () => clearInterval(autoSwipeInterval));
        carouselWrapper.addEventListener('mouseleave', () => startAutoSwipe());

        let startX = 0, isDragging = false;
        const handleStart = (x) => {
          startX = x;
          isDragging = true;
          clearInterval(autoSwipeInterval);
        };
        const handleEnd = (x) => {
          if (!isDragging) return;
          isDragging = false;
          const diff = startX - x;
          if (diff > 50) {
            currentTestimonialPage = (currentTestimonialPage + 1) % totalPages;
          } else if (diff < -50) {
            currentTestimonialPage = (currentTestimonialPage - 1 + totalPages) % totalPages;
          }
          updateTestimonialView();
          startAutoSwipe();
        };

        carouselWrapper.addEventListener('mousedown', (e) => handleStart(e.clientX));
        carouselWrapper.addEventListener('mouseup', (e) => handleEnd(e.clientX));
        carouselWrapper.addEventListener('touchstart', (e) => handleStart(e.touches[0].clientX), { passive: true });
        carouselWrapper.addEventListener('touchend', (e) => handleEnd(e.changedTouches[0].clientX));
      }

      window.addEventListener('resize', () => {
        itemsPerPage = window.innerWidth >= 768 ? 2 : 1;
        renderDots();
        updateTestimonialView();
      });

      // ==========================================
      // 10. FAQ: DESKTOP SPLIT VIEW & MOBILE ACCORDION
      // ==========================================
      const faqData = [
        {
          cat: 'Bridal Protocol',
          q: '01. How far in advance should I reserve bridal trousseau dates?',
          a: 'Due to our individualized attention and private suite commitments, we strongly recommend reserving your bridal couture dates 2 to 4 months prior. This ensures your dedicated lead stylist is exclusively allocated to you, alongside a preliminary hair texture diagnostic and custom skin brightening regime.',
          tip: 'Complimentary pre-bridal tea tastings and skin patch evaluations included during consultation.'
        },
        {
          cat: 'Hair Philosophy',
          q: '02. Are all chemical hair treatments formaldehyde-free?',
          a: 'Without exception. Every keratin smoothing formulation, nanoplastia mask, and dimensional gloss is imported from certified organic European labs. We reject aldehydes, harsh phthalates, and aggressive fumes so your breathing and scalp wellness remain entirely pristine.',
          tip: 'Ask our stylists for our post-treatment organic argan home care kit to extend smoothness.'
        },
        {
          cat: 'Skin Alchemy',
          q: '03. What differentiates the 24K Royal Gold Facial from standard treatments?',
          a: 'Our 24K treatment employs genuine culinary-grade 99.9% pure gold leaf combined with cold galvanic ion infusion. The electrical micro-impulses encourage cell turnover, drain fluid stagnation, and restore light-refracting plumpness that is visible immediately for royal galas.',
          tip: 'Ideal 48 hours prior to royal galas or high-definition camera photo sessions.'
        },
        {
          cat: 'Sanctuary Privacy',
          q: '04. Can I request a private soundproof suite for complete seclusion?',
          a: 'Yes. Our salon features dedicated soundproof VIP chambers equipped with individual air purification, adjustable mood lighting, warm linen robes, and private mirrors for clients desiring complete personal privacy or religious modest comfort.',
          tip: 'Specify "Private Suite Seclusion" in your booking form notes at no extra charge.'
        },
        {
          cat: 'Concierge Policy',
          q: '05. What is your cancellation and appointment rescheduling policy?',
          a: 'We appreciate notification at least 24 hours prior to regular appointments and 7 days prior for bridal trousseau bookings. This allows our artisans to accommodate guests on our priority standby registry without disruption.',
          tip: 'Rescheduling can be handled directly via our WhatsApp concierge with a single tap.'
        }
      ];

      // Desktop Split Logic
      const desktopFaqBtns = document.querySelectorAll('.faq-question-btn');
      const faqDisplayCategory = document.getElementById('faqDisplayCategory');
      const faqDisplayHeading = document.getElementById('faqDisplayHeading');
      const faqDisplayText = document.getElementById('faqDisplayText');
      const faqDisplayTip = document.getElementById('faqDisplayTip');

      desktopFaqBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.getAttribute('data-faq-index'), 10);
          const item = faqData[idx];
          if (!item) return;

          desktopFaqBtns.forEach(b => {
            b.classList.remove('bg-white', 'dark:bg-darkCard', 'border-dusty', 'shadow-sm');
            b.classList.add('bg-white/60', 'dark:bg-darkCard/60', 'border-transparent');
          });
          btn.classList.add('bg-white', 'dark:bg-darkCard', 'border-dusty', 'shadow-sm');
          btn.classList.remove('bg-white/60', 'dark:bg-darkCard/60', 'border-transparent');

          if (faqDisplayCategory) faqDisplayCategory.textContent = item.cat;
          if (faqDisplayHeading) faqDisplayHeading.textContent = item.q;
          if (faqDisplayText) faqDisplayText.textContent = item.a;
          if (faqDisplayTip) {
            faqDisplayTip.innerHTML = `<i class="fa-solid fa-sparkles text-dusty mr-1.5"></i> <strong>Artisan Tip:</strong> ${item.tip}`;
          }
        });
      });

      // Mobile Accordion Logic
      const mobileFaqHeaders = document.querySelectorAll('.mobile-faq-header');
      mobileFaqHeaders.forEach(header => {
        header.addEventListener('click', () => {
          const item = header.closest('.mobile-faq-item');
          const body = item.querySelector('.mobile-faq-body');
          const chevron = header.querySelector('i');
          const isHidden = body.classList.contains('hidden');

          // Close other open accordion items
          document.querySelectorAll('.mobile-faq-body').forEach(b => b.classList.add('hidden'));
          document.querySelectorAll('.mobile-faq-header i').forEach(ch => ch.classList.remove('rotate-180'));

          if (isHidden) {
            body.classList.remove('hidden');
            chevron.classList.add('rotate-180');
          }
        });
      });

      // ==========================================
      // 09. DIRECT APPOINTMENT BOOKING DISPATCH
      // ==========================================
      const sendWhatsAppBtn = document.getElementById('sendWhatsAppBtn');
      const sendEmailBtn = document.getElementById('sendEmailBtn');
      const bookingFormStatus = document.getElementById('bookingFormStatus');

      function validateBookingForm() {
        const name = document.getElementById('clientName').value.trim();
        const phone = document.getElementById('clientPhone').value.trim();
        const email = document.getElementById('clientEmail').value.trim();
        const service = document.getElementById('clientService').value;
        const date = document.getElementById('clientDate').value;
        const time = document.getElementById('clientTime').value;
        const stylist = document.getElementById('clientStylist').value;
        const notes = document.getElementById('clientNotes').value.trim();

        if (!name || !phone || !email || !service || !date || !time) {
          if (bookingFormStatus) {
            bookingFormStatus.textContent = 'Please fill out all mandatory fields marked with (*).';
            bookingFormStatus.classList.remove('hidden');
          }
          return null;
        }
        if (bookingFormStatus) bookingFormStatus.classList.add('hidden');
        return { name, phone, email, service, date, time, stylist, notes };
      }

      if (sendWhatsAppBtn) {
        sendWhatsAppBtn.addEventListener('click', () => {
          const d = validateBookingForm();
          if (!d) return;

          const msg = `*LUXE SALON PRIORITY BOOKING*\n\n` +
            `*Client Name:* ${d.name}\n` +
            `*Phone:* ${d.phone}\n` +
            `*Email:* ${d.email}\n` +
            `*Selected Ritual:* ${d.service}\n` +
            `*Preferred Date:* ${d.date}\n` +
            `*Preferred Slot:* ${d.time}\n` +
            `*Stylist Level:* ${d.stylist}\n` +
            `*Bespoke Notes:* ${d.notes || 'None specified'}\n\n` +
            `_Sent via Luxe Salon Priority Web Portal_`;

          window.open(`https://wa.me/918956234512?text=${encodeURIComponent(msg)}`, '_blank');
        });
      }

      if (sendEmailBtn) {
        sendEmailBtn.addEventListener('click', () => {
          const d = validateBookingForm();
          if (!d) return;

          const sub = `Priority Appointment Request - ${d.name} [${d.service}]`;
          const body = `Dear Luxe Salon Concierge,\n\n` +
            `I would like to reserve an appointment:\n\n` +
            `Client: ${d.name}\n` +
            `Phone: ${d.phone}\n` +
            `Email: ${d.email}\n` +
            `Service: ${d.service}\n` +
            `Date: ${d.date}\n` +
            `Time: ${d.time}\n` +
            `Stylist Preference: ${d.stylist}\n` +
            `Sensitivities / Notes: ${d.notes || 'None'}\n\n` +
            `Please confirm my reservation.\nWarm regards,\n${d.name}`;

          window.location.href = `mailto:@luxesalon.com?subject=${encodeURIComponent(sub)}&body=${encodeURIComponent(body)}`;
        });
      }

      // ==========================================
      // 11. ASCEND TO TOP
      // ==========================================
      const backToTopBtn = document.getElementById('backToTopBtn');
      if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      }

    });