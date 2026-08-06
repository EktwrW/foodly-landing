# Entity Runbook — construir la marca "Foodly" como entidad propia

Auditoría del 2026-08-06. Complementa `SEO-RUNBOOK.md` (técnico on-page) y
`ASO-RUNBOOK.md` (tiendas).

**El problema que resuelve este documento**: Google resuelve las consultas de
marca por *autoridad de entidad*, y hoy compiten al menos seis "Foodly" —
esfoodly.es y foodly.com.co con la misma propuesta de valor, foodly.ca, tres
apps homónimas y Feedly absorbiendo la consulta por similitud. Ninguna
optimización on-page gana eso. Lo que lo mueve es que Google acumule señales
verificables de que *este* Foodly es una entidad real y distinta.

Ya hecho en código: `sameAs` con 6 perfiles verificados + `founder` en el
schema `Organization`, idéntico en las 3 páginas (comparten `@id`).

---

## 1. Google Business Profile — DECIDIDO: no se crea

> **Resuelto el 2026-08-06.** Hector confirmó que el onboarding de restaurantes
> es **100% remoto**: no hay visitas al local. Con eso Foodly es *online-only* y
> **no califica**. No se crea el perfil.
>
> **Reabrir solo si** el onboarding pasa a ser presencial en Portugal. Ese día
> Foodly sí sería un *service area business* legítimo y toda la configuración de
> abajo queda lista para usarse.

**Por qué no forzarlo**: la regla de Google es que el negocio interactúe con
clientes en persona durante el horario declarado. Crear el perfil igual y no
poder sostenerlo en la verificación por vídeo (el método por defecto desde 2026)
termina en suspensión — y una suspensión bloquea reintentos y ensucia la cuenta.
El coste de equivocarse es asimétrico: no tenerlo cuesta poco, tenerlo suspendido
cuesta mucho.

Todo lo que sigue en esta sección queda **archivado** hasta que cambie el modelo
de onboarding.

La regla de Google es explícita: el negocio debe **interactuar con clientes en
persona** durante el horario declarado. Un SaaS puro que opera solo online **no
califica**. Y desde 2026 la verificación por vídeo es el método por defecto: el
revisor busca cartelería, equipamiento, espacio de trabajo y una persona que
confirme la operación en la dirección declarada.

Un perfil suspendido es peor que no tener perfil: bloquea reintentos y ensucia
la cuenta.

### El criterio (para cuando se reabra)

| Escenario | ¿Califica? |
|---|---|
| Onboardeás restaurantes **presencialmente** en Portugal (vas al local, montás el menú, dejás el QR) | **Sí** — es un *service area business* legítimo |
| Todo el onboarding es remoto (la app, un link, soporte por email) | **No** — Google lo trata como online-only ← **situación actual** |

### Configuración archivada (solo si se pasa a onboarding presencial)

- **Nombre**: `Foodly` (exacto, sin keywords añadidas — "Foodly Menu Digital QR"
  es motivo de suspensión)
- **Categoría principal**: `Software company`
- **Categorías secundarias**: `Marketing agency` no; mejor dejar solo la
  principal. Añadir categorías que no describen la operación es señal de riesgo.
- **Tipo**: marcar **"Presto servicios a domicilio"** y **ocultar la dirección**.
  Es lo que corresponde a un SAB y evita publicar tu domicilio de Covilhã.
- **Zona de servicio**: Portugal (o los distritos donde realmente vas)
- **Sitio web**: `https://foodly.solutions/pt`
- **Teléfono**: un número del negocio, no tu móvil personal

**Descripción** (límite 750 caracteres — este texto entra justo):

```
A Foodly é a plataforma que digitaliza negócios de restauração em Portugal.
Restaurantes, bares, cafés, food trucks, empresas de catering e chefs privados
criam um menu digital com código QR em minutos, recebem reservas online, publicam
promoções e acompanham estatísticas em tempo real — a partir do telemóvel.

Inclui pedidos de grupo com conta dividida: cada pessoa à mesa adiciona os seus
itens e paga a sua parte via Stripe, sem complicações na hora de dividir a conta.

Sem subscrições e sem custos de ativação. Aplica-se apenas uma comissão de 3%
aos pedidos pagos através da Foodly. Dados alojados na UE e conformidade com o
RGPD.
```

**Antes de pedir la verificación por vídeo**, tené preparado: material con marca
Foodly (QRs impresos, tarjetas), el espacio de trabajo, la app abierta con una
cuenta de negocio real y, si podés, grabar durante un onboarding en un local.
Eso es exactamente lo que el revisor quiere ver en un SAB.

---

## 2. Lo que rinde más que GBP para un SaaS B2B (y no tiene riesgo)

Un restaurante que busca solución no escribe "foodly": escribe *menu digital QR*,
*software para restaurantes*, *sistema de reservas*. Y en esas consultas la
primera página está ocupada por **directorios de software**, no por webs de
producto. Estar listado ahí te pone delante del cliente y además le da a Google
una referencia externa verificable de la entidad.

Por orden de impacto:

| Dónde | Por qué | Coste |
|---|---|---|
| **Capterra / GetApp / Software Advice** (red Gartner) | Rankean en página 1 para "restaurant management software", "digital menu software". Una alta cubre las tres | Gratis |
| **G2** | Referencia estándar en SaaS B2B; las reseñas se muestran en el knowledge panel | Gratis |
| **LinkedIn — página de EMPRESA** | Hoy solo existe tu perfil personal. Una página de empresa sí entra en `sameAs` y pesa | Gratis, 5 min |
| **Crunchbase** | Google la usa como fuente de entidad para empresas | Gratis |
| **Wikidata** | Google la lee directo al Knowledge Graph. Requiere alguna fuente secundaria (prensa, directorio) para sostener notabilidad | Gratis |

### LinkedIn — página de empresa (el más rápido)

- **Nombre**: `Foodly`
- **URL**: `linkedin.com/company/foodly-solutions` (comprobar disponibilidad)
- **Sector**: Software Development
- **Tamaño**: 1-10
- **Sede**: Covilhã, Portugal
- **Sitio web**: `https://foodly.solutions`
- **Eslogan** (120 chars): `Digital menus, reservations and split-bill group orders for food businesses. Free — 3% only on orders paid through Foodly.`

**Acerca de**:

```
Foodly is the all-in-one platform that helps local food businesses go digital —
and helps diners discover great places to eat nearby.

Restaurants, bars, cafés, food trucks, catering companies and private chefs
create a full digital menu with a QR code in minutes, take online reservations,
publish AI-assisted promotions and track real-time analytics, all from their
phone. Diners discover places around them, browse menus, book tables and start
group orders where everyone at the table pays their own share through Stripe.

No subscriptions, no setup fees. A transparent 3% commission applies only to
orders paid through Foodly. EU-hosted infrastructure, GDPR compliant.

Now in commercial beta in Portugal.
```

**Especialidades**: `digital menus`, `QR menus`, `restaurant technology`,
`online reservations`, `group ordering`, `split payments`, `restaurant analytics`,
`food discovery`, `hospitality software`

---

## 3. Al terminar: actualizar `sameAs`

Cada perfil nuevo entra en el array `sameAs` del schema `Organization` en las
**tres** páginas (`public/index.html`, `es/`, `pt/`). Deben quedar idénticas:
comparten `@id`, y si divergen Google recibe dos descripciones en conflicto de
la misma entidad. Hay un verificador de esto en el historial del repo.

Orden sugerido: LinkedIn empresa → Capterra → Crunchbase → G2 → (GBP solo si
§1 confirma que calificás) → Wikidata al final, cuando ya existan fuentes que
la sostengan.

---

## 4. Lo que NO hay que hacer

- Meter keywords en el nombre del perfil de GBP. Es la causa #1 de suspensión.
- Crear GBP con la dirección de casa visible.
- Usar un apartado de correo o una oficina virtual como dirección: inelegible.
- Añadir a `sameAs` perfiles vacíos o ajenos. `@appfoodly` en Instagram **no es
  tuyo** (es un delivery brasileño). Las cuentas propias con 0 posts y sin bio
  tampoco corroboran nada hasta que tengan contenido y enlace al sitio.
