// ============================================
//  FORMULARIO DE CONTACTO — U LA SALLE
//  Validación del lado cliente
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('contactForm');
  if (!form) return; // solo ejecutar en la página de contacto

  // ----- Helpers -----
  const $ = id => document.getElementById(id);

  function showError(fieldId, msg) {
    const field = $(fieldId);
    const errEl = $('err-' + fieldId);
    if (field) field.classList.add('invalid');
    if (errEl) errEl.textContent = msg;
  }

  function clearError(fieldId) {
    const field = $(fieldId);
    const errEl = $('err-' + fieldId);
    if (field) field.classList.remove('invalid');
    if (errEl) errEl.textContent = '';
  }

  function clearAll() {
    ['nombre','apellido','email','asunto','mensaje','terminos'].forEach(clearError);
  }

  function isValidEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  }

  // ----- Validar en tiempo real -----
  ['nombre','apellido','email','asunto','mensaje'].forEach(id => {
    const el = $(id);
    if (el) el.addEventListener('input', () => clearError(id));
  });

  // ----- Submit -----
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearAll();

    const nombre   = $('nombre').value.trim();
    const apellido = $('apellido').value.trim();
    const email    = $('email').value.trim();
    const asunto   = $('asunto').value;
    const mensaje  = $('mensaje').value.trim();
    const terminos = $('terminos').checked;

    let valid = true;

    if (!nombre) { showError('nombre', 'El nombre es obligatorio.'); valid = false; }
    if (!apellido) { showError('apellido', 'El apellido es obligatorio.'); valid = false; }
    if (!email) {
      showError('email', 'El correo es obligatorio.'); valid = false;
    } else if (!isValidEmail(email)) {
      showError('email', 'Ingresa un correo electrónico válido.'); valid = false;
    }
    if (!asunto) { showError('asunto', 'Selecciona un asunto.'); valid = false; }
    if (!mensaje) { showError('mensaje', 'El mensaje es obligatorio.'); valid = false; }
    else if (mensaje.length < 10) { showError('mensaje', 'El mensaje debe tener al menos 10 caracteres.'); valid = false; }
    if (!terminos) { showError('terminos', 'Debes aceptar la política de privacidad.'); valid = false; }

    if (!valid) return;

    // ----- Simulación de envío (sin backend) -----
    const btn = $('submitBtn');
    btn.disabled = true;
    btn.querySelector('.btn-text').textContent = 'Enviando...';

    await new Promise(r => setTimeout(r, 1500)); // simular petición

    const msgDiv = $('form-message');
    msgDiv.className = 'form-message success';
    msgDiv.textContent = `¡Gracias, ${nombre}! Tu mensaje fue enviado exitosamente. Te contactaremos a ${email} pronto.`;
    msgDiv.classList.remove('hidden');

    form.reset();
    btn.disabled = false;
    btn.querySelector('.btn-text').textContent = 'Enviar mensaje';

    // Scroll al mensaje
    msgDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

});
