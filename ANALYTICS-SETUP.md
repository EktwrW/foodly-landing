# Analítica de la landing — setup en 10 minutos

Estado: **código listo y desplegable**; falta pegar el Measurement ID real.
Hasta que se pegue, el script no carga nada (fail-safe: no rompe la página
ni muestra el banner de cookies).

## Por qué GA4 (y no Plausible)

La app Foodly ya usa **Firebase Analytics, que ES GA4**. Con la misma
propiedad se mide el funnel COMPLETO — búsqueda en Google → landing →
instalación → negocio creado — en un solo lugar, gratis, y con enlace
nativo a Search Console. Plausible es más simple y sin cookies, pero
dejaría la web y la app en silos separados y cuesta ~9 €/mes.

El precio de GA4 es el banner de consentimiento (obligatorio en la UE). Se
resolvió con **Consent Mode v2**: sin aceptar, Google recibe pings anónimos
sin cookies (las métricas agregadas de tráfico existen igual); al aceptar,
se activan las cookies analíticas.

## Paso 1 — obtener el Measurement ID (2 min)

1. Abrí [Firebase → apps-369](https://console.firebase.google.com/u/1/project/apps-369/overview).
2. ⚙ **Configuración del proyecto** → pestaña **Integraciones** → Google
   Analytics. Si ya está vinculado (lo está, porque la app manda eventos),
   entrá a **Analytics** → se abre la propiedad GA4.
3. En GA4: **Administrar** → **Flujos de datos** → **Añadir flujo** → **Web**
   → URL `https://foodly.solutions`, nombre "Foodly Landing".
   > Importante: crear un flujo **Web nuevo**. Los flujos de Android/iOS que
   > ya existen son de la app; la web necesita el suyo.
4. Copiá el **ID de medición**: tiene la forma `G-XXXXXXXXXX`.

## Paso 2 — pegarlo en el código (1 min)

En `public/assets/analytics.js`, primera constante:

```js
var MEASUREMENT_ID = "G-XXXXXXXXXX"; // ← pegar acá
```

Desplegar: `firebase deploy --only hosting:landing`

## Paso 3 — enlazar Search Console con GA4 (3 min)

En GA4: **Administrar** → **Enlaces de productos** → **Search Console** →
enlazar la propiedad `sc-domain:foodly.solutions` → elegir el flujo web.

Esto habilita en GA4 el informe **Consultas orgánicas de Google**: qué
buscó la gente para llegar (tu pregunta #3), con qué CTR y qué hizo después
de aterrizar. Sin este enlace, GA4 muestra el tráfico pero no las búsquedas.

## Qué se mide (además del pageview)

| Evento | Cuándo | Para qué |
|---|---|---|
| `app_store_click` | clic a Play/App Store (con `store` y `location`) | conversión principal; qué sección convierte |
| `business_signup_click` | clic en "registrar mi negocio" | conversión de negocio |
| `contact_click` | mailto o WhatsApp (con `channel`) | demanda de contacto directo |
| `manifesto_play` | play del video | interés profundo |
| `language_switch` | cambio EN/ES/PT (con `to`) | qué mercado responde |
| `scroll_depth` | 25/50/75/90 % | dónde abandona la gente |

Sugerido en GA4 → Administrar → **Eventos** → marcar como conversión:
`app_store_click` y `business_signup_click`.

## Verificación

1. Abrí `https://foodly.solutions` en incógnito → debe aparecer el banner.
2. Aceptá → GA4 → **Informes** → **Tiempo real**: tu visita en <30 s.
3. Hacé clic en un badge de tienda → el evento `app_store_click` aparece en
   tiempo real.
4. Rechazá (en otra ventana incógnito) → no se setean cookies `_ga*`
   (DevTools → Application → Cookies) y la página sigue funcionando.

## Nota legal

`privacy.html` ya incluye la sección **11. Cookies and analytics on this
website** describiendo qué se recoge, la base legal (consentimiento),
retención (14 meses) y cómo revocarlo. Si se agrega cualquier otra cookie
(ads, remarketing), hay que actualizar esa sección ANTES de instalarla.
