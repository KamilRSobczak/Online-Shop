  var swiper = new Swiper('.shop__bannerSwiper', {
    spaceBetween: 30,
    effect: 'slide',
    centeredSlides: true,
    loop: true,
      loopFillGroupWithBlank: true,
    autoplay: {
      delay: 3800,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });