const menuBtn = document.getElementById('menu-btn')
const header = document.getElementById('header')
const headerContainer = document.getElementById('header-container')
const links = document.getElementById('mobile-links')

window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    headerContainer.classList.add('scrolled')
  } else {
    headerContainer.classList.remove('scrolled')
  }
})

const linkItems = links.querySelectorAll('.link');
const path = window.location.pathname.replace(/\/$/, "") || "/";

// Marcar enlace activo según la URL
linkItems.forEach(link => {
  const href = link.getAttribute("href").replace(/\/$/, "") || "/";
  if (href === path) {
    link.classList.add("active");
  }
});

// Botón menú
function toggleMenu() {
  header.classList.toggle('active-header')
  links.classList.toggle('show')
}
menuBtn.addEventListener('click', toggleMenu)

// Presupuesto
const presupuestoBtns = document.querySelectorAll('.presupuesto-btn');
const body = document.body

presupuestoBtns.forEach((presupuestoBtn) => {
  presupuestoBtn.addEventListener('click', () => {
  const form = document.createElement('form')
  form.classList.add('presupuesto-form')
  const overlay = document.createElement('div')
  overlay.classList.add('form-overlay')

  // Estructura del formulario
  const getFormContent = () => `
    <button id="close-btn" class="close-btn">&times;</button>
    <h2>Solicita tu presupuesto</h2>
    <p>Rellena el formulario y obtén tu presupuesto gratuito.</p>
    <div class="form-group">
      <label>Nombre completo: <input placeholder="Nombre y apellido" type="text" name="nombre_completo" required></label>
      <label>Teléfono: <input placeholder="Ej. 667348718" type="tel" name="telefono" pattern="[0-9]{9}" required></label>
      <label>Email: <input placeholder="ejempo@gmail.com" type="email" name="email" required></label>
      <label>¿Qué tipo de propiedad buscas reformar? <input placeholder="Ej. Casa, Piso, Oficina" type="text" name="tipo_propiedad" required></label>
      <label>¿Cuántos metros cuadrados aprox. son? <input placeholder="Ej. 65" type="number" name="metros_cuadrados" required></label>
      <label>Tu mensaje: <input placeholder="Detalle información que considere importante." name="message" required></input></label>
    </div>
    <button type="submit">Enviar</button>
  `

  form.innerHTML = getFormContent()

  // Envío
  form.addEventListener('submit', function (e) {
    e.preventDefault()
    const formData = new FormData(form)
    const xhr = new XMLHttpRequest()
    xhr.open('POST', 'https://hooks.zapier.com/hooks/catch/22920325/278hrq8/', true)
    xhr.onload = function () {
      if (xhr.status === 200) {
        form.innerHTML = `
          <button id="close-btn" class="close-btn">&times;</button>
          <p class="delivered-status">¡Formulario enviado con éxito!</p>
        `
        form.classList.add('delivered')
      } else {
        form.innerHTML = `
          <button id="close-btn" class="close-btn">&times;</button>
          <p class="delivered-status">Error al enviar el formulario.</p>
        `
      }
      reattachCloseBtn()
    }
    xhr.send(formData)
  })

  // Mostrar
  body.appendChild(form)
  body.appendChild(overlay)

  requestAnimationFrame(() => {
    form.classList.add('show')
    overlay.classList.add('show')
    body.classList.add('no-scroll')
  })

  // Cerrar
  function reattachCloseBtn() {
    const closeBtn = form.querySelector('#close-btn')
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault()
        form.classList.remove('show')
        overlay.classList.remove('show')
        setTimeout(() => {
          body.removeChild(form)
          body.removeChild(overlay)
          body.classList.remove('no-scroll')
        }, 300)
      })
    }
  }

  reattachCloseBtn()
})
})  


const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const formData = new FormData(contactForm);
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://hooks.zapier.com/hooks/catch/22920325/27pgjo3/', true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      contactForm.classList.add('delivered');
      contactForm.innerHTML = `<p class="delivered-status">¡Formulario enviado con éxito!</p>`;
    } else {
      contactForm.classList.add('delivered');
      contactForm.innerHTML = `<p class="delivered-status">Error al enviar el formulario.</p>`;
    }
  };
  xhr.send(formData);
});
