# Foodly Landing (foodly.solutions)

Landing page para el dominio apex `foodly.solutions`. Desplegada en Firebase Hosting como segundo site del proyecto `apps-369` (separado de `foodly-public-menu` que sirve `menu.foodly.solutions`).

## Stack

- HTML/CSS estático (sin build step)
- Firebase Hosting — site: `foodly-landing`
- DNS: Cloudflare proxy → Firebase

## Deploy — pasos

### 1. Crear el Hosting site en Firebase (una sola vez)

```bash
firebase hosting:sites:create foodly-landing --project apps-369
```

Si ya existe, este paso falla — ignorar.

### 2. Aplicar el target del repo (una sola vez)

```bash
cd "foodly_landing"
firebase target:apply hosting landing foodly-landing --project apps-369
```

### 3. Deploy

```bash
firebase deploy --only hosting:landing --project apps-369
```

Resultado: el contenido de `public/` queda servido en `https://foodly-landing.web.app` y `https://foodly-landing.firebaseapp.com`.

### 4. Conectar el dominio apex `foodly.solutions` (una sola vez)

En Firebase Console → Hosting → site `foodly-landing` → Add custom domain:

1. Ingresar `foodly.solutions`
2. Firebase te da dos registros **A** (IPs de Firebase, típicamente `199.36.158.100` y uno más) o un **TXT** de verificación
3. En Cloudflare (zona `foodly.solutions`):
   - Agregar los registros **A** que indique Firebase
   - **IMPORTANTE:** poner el proxy de Cloudflare en **DNS only** (nube gris), NO proxied, porque Firebase necesita validar SSL vía Let's Encrypt. Una vez emitido el cert podés volver a activar el proxy si querés.
4. Esperar validación (5-30 min) — Firebase emite el cert automáticamente

Opcional: agregar también `www.foodly.solutions` como alias que redirija al apex.

## Actualizar la landing

Editar `public/index.html` y correr:

```bash
firebase deploy --only hosting:landing --project apps-369
```

## Assets

- `public/logo.png` — logo horizontal Foodly verde (copia de `brand-assets/foodly-logo-full-green.png`)
- `public/favicon.png` — ISO Foodly verde (copia de `brand-assets/iso_foodly_green.png`)

Si actualizás los assets de marca, reemplazar estos dos archivos y re-deploy.

## Verificación post-deploy

- `https://foodly-landing.web.app` debe cargar la landing (mientras el dominio apex se propaga)
- `https://foodly.solutions` debe cargar la landing una vez propagado el DNS
- Google Play / Apple usan `https://foodly.solutions` como Support URL y Marketing URL — verificar que responde 200 antes de enviar a review
