// MOBILE NAVIGATION
const btnForNavigation = document.querySelector('.btn-movile-nav');
const header = document.querySelector('.header');

btnForNavigation.addEventListener('click', () => {
  header.classList.toggle('open');
});

const allLinks = document.querySelectorAll('a:link');

allLinks.forEach( link => {
  link.addEventListener('click', e => {

    e.preventDefault();

    const href = link.getAttribute('href');

    if ( href === '#' ) window.scrollTo({
      top:0,
      behavior: 'smooth'
    })

    if ( href !== '#' && href.startsWith('#') ) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({behavior: 'smooth'});
    }

    if ( link.classList.contains('menu-list__link') ) {
      header.classList.toggle('open');
    }

  })
});

// HACER QUE SE PEGUE LA NAVEGACIÓN
const obs = new IntersectionObserver( entries => {
  const ent = entries[0];
  
  if ( !ent.isIntersecting )
    document.querySelector('body').classList.add('sticky');
  else  
    document.querySelector('body').classList.remove('sticky');

}, {
  root: null,
  threshold: 0,
  rootMargin: '-80px'
})

obs.observe( header );

// #######################################
// Arreglando el gap en algunas versiones de Safari
// #######################################
function checkFlexGap() {
  let flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  let isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();