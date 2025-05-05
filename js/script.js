document.addEventListener("DOMContentLoaded", function () {
  // تأثير التمرير لشريط التنقل
  const header = document.querySelector(".header");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // القائمة المتحركة للهواتف
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");
  const dropdowns = document.querySelectorAll(".dropdown");

  mobileMenuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("active");
    const icon = this.querySelector("i");
    icon.classList.toggle("fa-times");
    icon.classList.toggle("fa-bars");
  });

  // إدارة القوائم المنسدلة على الهواتف
  dropdowns.forEach((dropdown) => {
    const link = dropdown.querySelector("a");

    link.addEventListener("click", function (e) {
      if (window.innerWidth <= 992) {
        e.preventDefault();
        dropdown.classList.toggle("active");

        // إغلاق القوائم الأخرى
        dropdowns.forEach((otherDropdown) => {
          if (
            otherDropdown !== dropdown &&
            otherDropdown.classList.contains("active")
          ) {
            otherDropdown.classList.remove("active");
          }
        });
      }
    });
  });

  // إغلاق شريط التنبيهات
  const closeAlert = document.querySelector(".close-alert");
  const alertBar = document.querySelector(".alert-bar");

  if (closeAlert && alertBar) {
    closeAlert.addEventListener("click", function () {
      alertBar.style.opacity = "0";
      setTimeout(() => {
        alertBar.style.display = "none";
      }, 300);
    });
  }

  // شريط التمرير للباني
  let currentSlide = 0;
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".slider-dot");

  function showSlide(n) {
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  // التبديل بالنقر على النقاط
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => showSlide(index));
  });

  // التبديل التلقائي
  let slideInterval = setInterval(nextSlide, 5000);

  // إيقاف التبديل التلقائي عند التمرير
  const heroSection = document.querySelector(".hero");
  if (heroSection) {
    heroSection.addEventListener("mouseenter", () =>
      clearInterval(slideInterval)
    );
    heroSection.addEventListener(
      "mouseleave",
      () => (slideInterval = setInterval(nextSlide, 5000))
    );
  }

  // العدادات المتحركة
  const counters = document.querySelectorAll(".counter");
  const speed = 200;

  function animateCounters() {
    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;
      const increment = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(animateCounters, 1);
      } else {
        counter.innerText = target;
      }
    });
  }

  // تنشيط العدادات عند التمرير إليها
  function checkCounters() {
    const statsSection = document.querySelector(".stats");
    if (isElementInViewport(statsSection)) {
      animateCounters();
      window.removeEventListener("scroll", checkCounters);
    }
  }

  window.addEventListener("scroll", checkCounters);
  checkCounters(); // تحقق فورًا في حالة أن القسم ظاهر بدون تمرير

  // الأسئلة الشائعة (Accordion)
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      const wasActive = item.classList.contains("active");

      // إغلاق جميع العناصر أولاً
      faqItems.forEach((otherItem) => {
        otherItem.classList.remove("active");
      });

      // فتح العنصر الحالي إذا لم يكن مفتوحًا بالفعل
      if (!wasActive) {
        item.classList.add("active");
      }
    });
  });

  // زر العودة للأعلى
  const scrollToTopBtn = document.querySelector(".scroll-to-top");

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add("active");
    } else {
      scrollToTopBtn.classList.remove("active");
    }
  });

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // تأثيرات الظهور عند التمرير
  const fadeElements = document.querySelectorAll(".animate-on-scroll");

  function checkScroll() {
    fadeElements.forEach((element) => {
      if (isElementInViewport(element)) {
        element.classList.add("animated");
      }
    });
  }

  window.addEventListener("scroll", checkScroll);
  window.addEventListener("load", checkScroll);

  // دالة مساعدة للتحقق من ظهور العنصر في viewport
  function isElementInViewport(el) {
    if (!el) return false;

    const rect = el.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }

  // تأثيرات عند التحميل
  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 100);

  // إضافة تأثيرات للروابط
  const navLinksAll = document.querySelectorAll('a[href^="#"]');
  navLinksAll.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (href !== "#") {
        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: "smooth",
          });

          // إغلاق القائمة على الهواتف
          if (window.innerWidth <= 992) {
            navLinks.classList.remove("active");
            mobileMenuBtn.querySelector("i").classList.remove("fa-times");
            mobileMenuBtn.querySelector("i").classList.add("fa-bars");
          }
        }
      }
    });
  });

  // تفعيل خيارات مبلغ التبرع
  const amountOptions = document.querySelectorAll(".amount-option");
  amountOptions.forEach((option) => {
    option.addEventListener("click", function (e) {
      e.preventDefault();
      amountOptions.forEach((opt) => opt.classList.remove("active"));
      this.classList.add("active");
      document.getElementById("amount").value = this.textContent;
    });
  });
});
