
jQuery(document).ready(function(){
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)

    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '#navbar .nav-link', function(e) {
    let section = select(this.hash)
    console.log(section)
    if (section) {
      e.preventDefault()

      let navbar = select('#navbar')
    console.log(navbar )

      let header = select('#header')
      let sections = select('section', true)
      let navlinks = select('#navbar .nav-link', true)

      navlinks.forEach((item) => {
        item.classList.remove('active')
      })

      this.classList.add('active')

      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      console.log(this.hash )
      if (this.hash == '#header') {
        header.classList.remove('header-top')
        sections.forEach((item) => {
          item.classList.remove('section-show')
         
          
        })
        return;
      }

      if (!header.classList.contains('header-top')) {
        header.classList.add('header-top')
        setTimeout(function() {
          sections.forEach((item) => {
            item.classList.remove('section-show')
            
          })
         
          section.classList.add('section-show')

        }, 350);
      } else {
        sections.forEach((item) => {
          
          item.classList.remove('section-show')
        })
        console.log(section)
       
        section.classList.add('section-show')
      }

      scrollto(this.hash)
    }
  }, true)

  /**
   * Activate/show sections on load with hash links
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      let initial_nav = select(window.location.hash)

      if (initial_nav) {
        let header = select('#header')
        let navlinks = select('#navbar .nav-link', true)

        header.classList.add('header-top')

        navlinks.forEach((item) => {
          if (item.getAttribute('href') == window.location.hash) {
            item.classList.add('active')
          } else {
            item.classList.remove('active')
          }
        })

        setTimeout(function() {
          initial_nav.classList.add('section-show')
        }, 350);

        scrollto(window.location.hash)
      }
    }
  });



/**
       show resume in new window
 **/
  $('a[href$=".pdf"]').prop('target', '_blank');




  /**
    // Gallery portfolio
 **/


  // filter
  $('nav a').on('click', function(event){
    event.preventDefault();
    // current class
    $('nav li.current').removeClass('current');
    $(this).parent().addClass('current');

    // set new heading
    $('h1.heading').text($(this).text());
    
    // filter link text
    var category = $(this).text().toLowerCase().replace(' ', '-');
    
    // remove hidden class if "all" is selected
    if(category == 'all-projects'){
        $('ul#gallery li:hidden').fadeIn('slow').removeClass('hidden');
    } else {
        $('ul#gallery li').each(function(){
           if(!$(this).hasClass(category)){
               $(this).hide().addClass('hidden');
           } else {
               $(this).fadeIn('slow').removeClass('hidden');
           }
        });
    }
    return false;        
});
// lightbox
$('ul#gallery a').on('click', function(event){
    event.preventDefault();
    var link = $(this).find('img').attr('src');
    $('.gallery img').attr('src', '');
    $('.gallery img').attr('src', link);
    $('.gallery').fadeIn('slow');
});
// close lightbox
$('.gallery').on('click', function(event){
    event.preventDefault();
    $('.gallery').fadeOut('slow');
});



/** 

* // Skills Bar Animation

*  **/

$('.skillbar').each(function(){
  $(this).find('.skillbar-bar').animate({
    width:$(this).attr('data-percent')
  },6000);
});

$('.Count').each(function () {
var $this = $(this);
$({ Counter: 0 }).animate({ Counter: $this.text() }, {
  duration: 6000,
  easing: 'swing',
  step: function () {
    $this.text(Math.ceil(this.Counter));
  }
});
});






})
  
