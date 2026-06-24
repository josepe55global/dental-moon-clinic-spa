# Dental Moon Clinic & Spa - Landing page estática

Sitio web estático profesional para **Dental Moon Clinic & Spa**, listo para abrir en navegador, editar en Antigravity, subir a GitHub y publicar en Vercel.

## Estructura

```text
dental-moon-clinic-mobile/
├── index.html
├── preview.html
├── visual-preview.html
├── aviso-privacidad.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── assets/
│   ├── images/
│   ├── logo/
│   └── icons/
├── README.md
└── .gitignore
```

## Incluye

- Header responsive con logo oficial.
- Hero visual con fotografía autorizada.
- Sección de confianza.
- Servicios dentales marcados como visibles en material o pendientes por confirmar.
- Sección de agenda de valoración.
- Galería con imágenes proporcionadas por el usuario.
- Proceso para agendar una cita.
- Ubicación y horarios con campos pendientes por confirmar.
- Preguntas frecuentes prudentes.
- Formulario de contacto por WhatsApp.
- Módulo de diagnóstico orientativo con resumen para enviar por WhatsApp.
- Página placeholder para aviso de privacidad.
- Metadatos básicos y Open Graph.
- Diseño responsive para móvil.

## Datos pendientes antes de publicar

Reemplaza o confirma estos datos antes de usar la página como sitio oficial:

- WhatsApp oficial.
- Teléfono.
- Dirección completa.
- Horarios.
- ~~Correo~~ — **Confirmado:** dentalmoon18@gmail.com ✓
- Google Maps.
- Aviso de privacidad.
- Lista final de servicios disponibles.
- Nombres de doctores o especialistas, solo si están confirmados y autorizados.
- Promociones vigentes, solo si existen y están confirmadas.

## Configurar WhatsApp, teléfono, dirección y horarios

Abre `js/main.js` y edita este bloque:

```js
const CLINIC_CONFIG = {
  clinicName: "Dental Moon Clinic & Spa",
  whatsappNumber: "", // Ejemplo México: "521XXXXXXXXXX"
  whatsappDisplay: "Pendiente por confirmar",
  phoneNumber: "",
  phoneDisplay: "Pendiente por confirmar",
  email: "dentalmoon18@gmail.com",
  address: "Pendiente por confirmar",
  hours: "Pendiente por confirmar",
  googleMapsUrl: "",
  instagramUrl: "https://www.instagram.com/dentalmoonclinic?igsh=MWVpZGF1cjhmemU5bw=="
};
```

Ejemplo:

```js
whatsappNumber: "5219991234567",
whatsappDisplay: "+52 999 123 4567",
phoneNumber: "+529991234567",
phoneDisplay: "+52 999 123 4567",
email: "dentalmoon18@gmail.com",
address: "Dirección completa confirmada",
hours: "Lunes a viernes 9:00 a 18:00, sábado 9:00 a 14:00",
googleMapsUrl: "https://maps.google.com/..."
```

El número de WhatsApp debe ir sin espacios, paréntesis ni guiones.

## Editar servicios

Los servicios están en `index.html`, sección `#servicios`. Antes de publicar, elimina los servicios no ofrecidos o cambia los textos a la lista real confirmada por la clínica.

## Imágenes utilizadas

Las imágenes se guardaron en:

```text
assets/images/
```

Archivos principales:

- `hero-ciencia-arte.jpg`
- `odontopediatria.jpg`
- `tratamiento-luz.jpg`
- `protesis-dental.jpg`
- `especialista-consultorio.jpg`
- `fachada-equipo.jpg`
- `tratamiento-revision.jpg`
- `revision-dental.jpg`
- `og-image.jpg`

El logo oficial está en:

```text
assets/logo/logo-oficial.jpg
assets/logo/logo-oficial.webp
assets/logo/favicon.png
assets/logo/apple-touch-icon.png
```

## Diagnóstico orientativo

El módulo no da indicaciones médicas ni diagnostica enfermedades. Solo genera un resumen con:

- Nombre.
- Teléfono.
- Motivo de consulta.
- Zona dental afectada.
- Tiempo de evolución.
- Nivel de dolor.
- Síntomas.
- Comentarios adicionales.

Incluye el aviso de que no sustituye una consulta profesional.

## Abrir localmente

Puedes abrir directamente `index.html` o iniciar un servidor local:

```bash
python3 -m http.server 8080
```

Luego visita:

```text
http://localhost:8080
```

## Publicar en Vercel

1. Sube la carpeta a GitHub.
2. Entra a Vercel.
3. Importa el repositorio.
4. Framework: `Other` o `Static`.
5. Build command: vacío.
6. Output directory: raíz del proyecto.
7. Publica.

## Restricciones respetadas

- No se inventaron precios.
- No se inventaron promociones.
- No se inventaron testimonios.
- No se inventaron certificaciones.
- No se publicaron resultados clínicos.
- Los datos faltantes aparecen como `Pendiente por confirmar`.
- Las imágenes usadas fueron las adjuntas por el usuario.


## Ajuste mobile

Esta versión incluye ajustes específicos para teléfono móvil:

- Hero con texto primero y foto despues en pantallas pequeñas.
- Header más compacto.
- Top strip reducido.
- Botones principales a ancho completo.
- Galeria horizontal tipo carrusel en movil.
- Formularios optimizados para tactil.
- CTA flotante inferior más limpio.

