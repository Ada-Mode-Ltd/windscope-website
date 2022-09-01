import * as focusTrap from 'focus-trap'

const header = document.querySelector('[data-page-nav]')
const menuButtonText = header.querySelector('[data-menu-button-text]')
const menuIconOpen = header.querySelector('[data-menu-icon-open]')
const menuIconClose = header.querySelector('[data-menu-icon-close]')
const menuBtn = header.querySelector('[data-btn="menu"]')
const menuContainer = header.querySelector('[data-menu-container]')
const menuWrapper = header.querySelector('[data-menu-wrapper]')
const homeLink = header.querySelector('[data-home-link]')

const open = () => {
  menuWrapper.hidden = false
  menuBtn.setAttribute('aria-expanded', true)
  menuIconClose.hidden = false
  menuIconOpen.hidden = true

  setTimeout(() => {
    menuIconOpen.style.display = 'none'
    menuIconClose.style.display = 'inline-block'
    menuWrapper.classList.add('is-visible')
    menuIconClose.classList.add('is-visible')
    document.body.classList.add('is-menu-open')
  }, 50)
}

const close = () => {
  menuWrapper.classList.remove('is-visible')
  document.body.classList.remove('is-menu-open')
  
  
  setTimeout(() => {
    menuIconClose.style.display = 'none'
    menuIconOpen.style.display = 'inline-block'
    menuWrapper.hidden = true
    menuIconClose.hidden = true
    menuIconOpen.hidden = false
    menuBtn.setAttribute('aria-expanded', false)
    // menuButtonText.innerText = 'Menu'
  }, 250)
}

const trap = focusTrap.createFocusTrap(menuContainer, {
  escapeDeactivates: true,
  onActivate: open,
  onDeactivate: close,
})

const toggleMenu = (e) => {
  if (menuWrapper.hidden) return trap.activate()
  return trap.deactivate()
}

const menu = () => {
  menuBtn.hidden = false
  menuWrapper.hidden = true
  menuIconClose.hidden = true
  menuIconOpen.hidden = false
  homeLink.hidden = false
  menuIconClose.style.display = 'none'
  menuWrapper.classList.add('js-menu')
  menuBtn.addEventListener('click', toggleMenu)
}

export default menu