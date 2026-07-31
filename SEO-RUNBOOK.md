# SEO Runbook — foodly.solutions (EN / ES / PT-PT)

Pasos que **solo Hector** puede ejecutar. En orden. Los pasos 1–5 se hacen el mismo día del deploy; el resto es el plan de 30 días.

> Estado del repo: la landing ya tiene hreflang recíproco (en, es, pt-PT, x-default), sitemap con alternates, robots.txt correcto, JSON-LD (Organization + SoftwareApplication + FAQPage) y FAQ visible en los 3 idiomas. Falta únicamente lo que requiere tus credenciales.

---

## 0. Deploy (prerequisito)

```bash
cd foodly_landing
firebase deploy --only hosting:landing --project apps-369
```

Smoke test tras el deploy (todo debe dar 200, sin redirects raros):

```bash
curl -sI https://foodly.solutions/ | head -3
curl -sI https://foodly.solutions/es | head -3
curl -sI https://foodly.solutions/pt | head -3
curl -s https://foodly.solutions/sitemap.xml | head -5
curl -s https://foodly.solutions/robots.txt
```

Nota: `/es/` (con barra final) hace 301 a `/es` — es lo esperado (`trailingSlash: false`). Las URLs canónicas son **sin** barra final.

---

## 1. Google Search Console — verificar el dominio (método DNS TXT)

Usa una **propiedad de Dominio** (no "prefijo de URL"): cubre http/https y todos los subdominios (`menu.`, `api.`…) de una vez.

1. Entra en https://search.google.com/search-console → "Añadir propiedad" → tipo **Dominio** → escribe `foodly.solutions`.
2. Google te da un registro TXT tipo `google-site-verification=XXXXXXXX`.
3. En **Cloudflare** (zona `foodly.solutions`) → DNS → Add record:
   - Type: `TXT`
   - Name: `@`
   - Content: `google-site-verification=XXXXXXXX` (pégalo completo)
   - TTL: Auto
4. Vuelve a Search Console y pulsa **Verificar**. Cloudflare propaga en segundos-minutos; si falla, espera 5 min y reintenta.
5. **No borres nunca ese TXT** — Google re-verifica periódicamente.

## 2. Enviar el sitemap

En Search Console (propiedad `foodly.solutions`) → **Sitemaps** → añade:

```
https://foodly.solutions/sitemap.xml
```

Estado esperado: "Correcto", 5 URLs descubiertas (/, /es, /pt, /privacy, /terms).

## 3. Pedir indexación manual de las 3 URLs (el acelerador)

En Search Console → barra superior "Inspección de URLs" → pega cada URL → **Solicitar indexación**:

1. `https://foodly.solutions/`
2. `https://foodly.solutions/es`
3. `https://foodly.solutions/pt`

Hazlo con las tres el mismo día (hay cuota diaria, ~10 URLs/día — sobra). Suele indexar en 24–72 h para dominios nuevos con contenido original. Repite a la semana si alguna sigue "Descubierta: actualmente sin indexar".

Bonus del mismo día: valida el structured data en https://search.google.com/test/rich-results con las 3 URLs (deberías ver FAQ + SoftwareApplication sin errores).

## 4. Bing Webmaster Tools (gratis y da también DuckDuckGo/Ecosia)

1. https://www.bing.com/webmasters → Sign in.
2. Elige **"Import from Google Search Console"** → autoriza con la misma cuenta Google → importa `foodly.solutions`. Cero verificación manual, hereda el sitemap.
3. Comprueba en Sitemaps que `https://foodly.solutions/sitemap.xml` aparece; si no, añádelo.
4. Usa "URL submission" con las 3 URLs (Bing permite ~10/día).

## 5. Google Business Profile (posicionamiento local PT — hazlo YA)

Foodly como empresa de software con mercado en Portugal:

1. https://business.google.com → crear perfil **"Foodly"**.
2. Categoría principal: **"Software company"** (secundaria: "Marketing consultant" o "Business development service").
3. Si no quieres exponer dirección física: perfil de **área de servicio** (Service Area Business) con área = Portugal (o Lisboa/Porto para empezar).
4. Web: `https://foodly.solutions/pt` (¡la PT, no la EN!). Teléfono/email reales — la verificación puede pedir vídeo o postal.
5. Rellena TODO: descripción en portugués (usa el copy del hero de /pt), logo, capturas de la app, horario.
6. Publica 1 "post" semanal (novedades de la beta, capturas). Es señal de actividad barata.

---

## Plan 30 días — quick wins para marca nueva en Portugal

### Semana 1 — Fundaciones (además de los pasos 1–5)

- **Perfiles sociales consistentes**: asegura Instagram/LinkedIn/Facebook/TikTok con handle `foodly` o `foodly.solutions`, bio en PT, link a `https://foodly.solutions/pt`. Cuando existan, avísame para añadirlos al `sameAs` del JSON-LD (deliberadamente no inventé ninguno).
- **App stores → landing**: en las fichas de App Store / Google Play, pon `https://foodly.solutions/pt` como Marketing URL. Los enlaces desde las stores son de los primeros backlinks que Google ve.
- **Firma de email**: `hello@foodly.solutions` con link a la landing. Trivial, suma.

### Semana 2 — Directorios y backlinks alcanzables (PT primero)

Alta gratuita con NAP consistente (mismo nombre/URL en todos):

| Directorio | URL | Nota |
|---|---|---|
| Startup Portugal | startupportugal.com | Directorio nacional de startups |
| Portugal Startups (news) | portugalstartups.com | Aceptan pitches de startups nuevas |
| F6S | f6s.com | Perfil de compañía + deal flow |
| Crunchbase | crunchbase.com | Perfil de empresa (link dofollow a la web) |
| Product Hunt | producthunt.com | Prepara un launch (mejor martes-jueves); página de producto = backlink + tráfico beta |
| SAPO Empresas / PAI.pt | pai.pt | Páginas amarelas PT — señal local clásica |
| Europages | europages.pt | B2B, gratis |
| BetaList | betalist.com | Encaja con "beta comercial" |

Sector restauração (más lento pero más valioso):
- **AHRESP** (Associação da Hotelaria, Restauração e Similares de Portugal) — hazte asociado/partner tecnológico; su web y newsletters enlazan a proveedores.
- **APHORT** (Porto/norte) — ídem.
- Ferias/eventos: **BTL Lisboa**, **Alimentaria & Horexpo** — las páginas de expositores/partners enlazan.

### Semana 3 — Prensa local

Pitch en portugués, ángulo: "app portuguesa-first que acaba con el drama de dividir a conta" (el split payment es el gancho noticiable, no "otro menú QR").

- Tech PT: **SAPO Tek**, **Shifter**, **ECO**, **Dinheiro Vivo**, **Exame Informática**.
- Startup: **Portugal Startups**, newsletter de Startup Portugal.
- Trade restauração: **Publituris**, **Grande Consumo**, **Hipersuper**, **INTER magazine**.
- Formato: email corto + press kit (logo, 3 capturas, el vídeo manifiesto de YouTube, datos del pricing 3% sin suscripción). Ofrece exclusiva a UNO primero.

### Semana 4 — Contenido y medición

- **Primeros artículos** (crear `/pt/blog/` o similar — pídemelo y lo monto): apunta a long-tails con intención comercial y competencia baja en PT:
  1. "Como criar uma ementa digital com código QR (grátis)"
  2. "Como dividir a conta no restaurante sem discussões — apps em 2026"
  3. "Reservas online para restaurantes em Portugal: guia para começar"
  4. "Quanto custa digitalizar um restaurante? (menos do que pensa)"
- **Cada restaurante beta = 1 backlink**: pídeles que enlacen su menú público (`menu.foodly.solutions/...`) y "Powered by Foodly" → landing. Los QR impresos en mesa también generan tráfico directo de marca.
- **Medición**: en GSC revisa Cobertura (3 URLs indexadas) y Rendimiento (queries "foodly", "menu digital qr", "dividir a conta"). KPI a 30 días: 3/3 indexadas, aparición para la query de marca "foodly", primeras impresiones en non-brand PT.

### Higiene continua

- No toques `public/.well-known/assetlinks.json` ni el meta noindex de `join.html`.
- Si añades una página nueva: añádela al sitemap (con alternates si es localizada) y mantén hreflang recíproco en las 3 versiones.
- El pricing público es **3% + €0,25/transacción del comensal, sin suscripción** — cualquier copy nuevo debe decir exactamente eso.
