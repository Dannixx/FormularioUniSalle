# Formulario de Contacto — U La Salle
### Guía de instalación, pruebas y publicación

---

## 📁 Estructura del proyecto
```
formulario-lasalle/
├── index.html          ← Página principal
├── contacto.html       ← Formulario de contacto
├── css/
│   └── style.css       ← Estilos
├── js/
│   └── main.js         ← Validaciones JS
└── php/
    ├── contacto.php    ← Backend del formulario
    └── db_test.php     ← Prueba XAMPP
```

---

## PARTE 1 — VS Code

1. Descarga VS Code: https://code.visualstudio.com
2. Instala extensiones recomendadas:
   - PHP Intelephense
   - Live Server
   - Prettier
3. Abre la carpeta del proyecto: Archivo → Abrir carpeta
4. Haz clic derecho sobre `index.html` → "Open with Live Server"
5. El sitio se abre en http://127.0.0.1:5500

---

## PARTE 2 — XAMPP (pruebas locales con PHP + MySQL)

### Instalación
1. Descarga XAMPP: https://www.apachefriends.org
2. Instala y abre XAMPP Control Panel
3. Inicia los servicios **Apache** y **MySQL**

### Copiar el proyecto
```
Copia toda la carpeta formulario-lasalle/ dentro de:
  Windows: C:\xampp\htdocs\
  Mac/Linux: /opt/lampp/htdocs/
```

### Crear BD y tabla (automático)
1. Abre tu navegador
2. Ve a: http://localhost/formulario-lasalle/php/db_test.php
3. El script automáticamente:
   - Crea la base de datos `lasalle_db`
   - Crea la tabla `contactos`
   - Inserta 3 registros de prueba
   - Muestra los datos en pantalla

### Verificar en phpMyAdmin
- Ve a: http://localhost/phpmyadmin
- Busca la BD `lasalle_db` → tabla `contactos`

### Probar el sitio completo con PHP
- Página principal: http://localhost/formulario-lasalle/index.html
- Formulario:       http://localhost/formulario-lasalle/contacto.html

---

## PARTE 3 — Publicación gratuita

### Opción A: Netlify (RECOMENDADA para HTML/CSS/JS)
1. Ve a: https://www.netlify.com
2. Regístrate con GitHub o email
3. Arrastra la carpeta del proyecto al panel de Netlify
4. En segundos obtienes un dominio público como:
   `https://formulario-lasalle.netlify.app`

### Opción B: InfinityFree (soporta PHP + MySQL)
1. Ve a: https://www.infinityfree.net
2. Crea una cuenta gratuita
3. Crea un hosting y obtén las credenciales FTP
4. Sube los archivos con FileZilla (https://filezilla-project.org)
5. Crea la base de datos desde el panel de control

### Opción C: GitHub Pages (solo estático)
```bash
# 1. Crea un repositorio en GitHub
# 2. Sube los archivos
git init
git add .
git commit -m "Formulario U La Salle"
git remote add origin https://github.com/TU_USUARIO/formulario-lasalle.git
git push -u origin main

# 3. En GitHub: Settings → Pages → Branch: main → Save
# URL: https://TU_USUARIO.github.io/formulario-lasalle/
```

---

## 📦 Entrega

Para el .zip de entrega:
- Incluye toda la carpeta `formulario-lasalle/`
- Agrega un archivo `dominio.txt` con la URL pública

---

Desarrollado para el curso de Desarrollo Web — U La Salle
