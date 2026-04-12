// ============================================
//  FORMULARIO DE CONTACTO — U LA SALLE
//  Validación del lado cliente (MEJORADO)
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('contactForm');
  if (!form) return; // solo ejecutar en la página de contacto

  // ----- Helpers -----
  const $ = id => document.getElementById(id);

  function showError(fieldId, msg) {
    const field = $(fieldId);
    const errEl = $('err-' + fieldId);

    if (field) {
      field.classList.add('invalid');

      // ✅ Mejora UX: enfocar el primer campo con error
      if (!document.querySelector('.invalid:focus')) {
        field.focus();
      }
    }

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

  // ✅ Mejora: función reutilizable para validación
  function validateField(id, condition, message) {
    if (!condition) {
      showError(id, message);
      return false;
    }
    return true;
  }

  // ----- Validar en tiempo real -----
  ['nombre','apellido','email','asunto','mensaje'].forEach(id => {
    const el = $(id);
    if (el) {
      el.addEventListener('input', () => clearError(id));
    }
  });

  const terminosEl = $('terminos');
  if (terminosEl) {
    terminosEl.addEventListener('change', () => clearError('terminos'));
  }

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

    // ✅ Validaciones usando función reutilizable
    valid &= validateField('nombre', nombre !== '', 'El nombre es obligatorio.');
    valid &= validateField('apellido', apellido !== '', 'El apellido es obligatorio.');
    valid &= validateField('email', email !== '', 'El correo es obligatorio.');
    valid &= validateField('email', isValidEmail(email), 'Ingresa un correo electrónico válido.');
    valid &= validateField('asunto', asunto !== '', 'Selecciona un asunto.');
    valid &= validateField('mensaje', mensaje !== '', 'El mensaje es obligatorio.');
    valid &= validateField('mensaje', mensaje.length >= 10, 'El mensaje debe tener al menos 10 caracteres.');
    valid &= validateField('terminos', terminos, 'Debes aceptar la política de privacidad.');

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