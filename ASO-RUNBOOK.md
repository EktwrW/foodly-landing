# ASO Runbook — fichas de Play Store y App Store

Auditoría del 2026-08-06. Complementa `SEO-RUNBOOK.md`: **el bloque de apps de
Google no se gana con SEO web**, se gana en el índice de las tiendas. Son dos
disciplinas distintas y la landing no influye en la primera.

Fichas auditadas:

- Play: `com.foodlysolutions.app` — "Foodly: Gastronomia Digital" (PT) / "Foodly: Food Business Platform" (EN)
- App Store: `id6761689908` — "Foodly: Gastronomia Digital", subtítulo "Digitaliza o teu negócio"

---

## 0. Lo primero, porque no es SEO: la ficha se contradice con la web

Esto no cuesta ranking, cuesta **credibilidad**. Un restaurante que compare la
landing con la tienda ve dos precios distintos y un producto que dice no existir.

| Campo | Dice la tienda | Dice la landing | Realidad |
|---|---|---|---|
| Comisión | "comissão **opcional de 1%**... quando os pagamentos na app **forem lançados**" | "**3%** só quando recebe pela Foodly" | 3%, ya activo |
| Pedidos de grupo | "**EM BREVE** — Pedidos no local e pagamentos em grupo" | "**BETA** — já disponível na beta comercial" | Live en beta |
| Mercados | "Portugal, Espanha, Argentina e Venezuela" | "beta comercial em Portugal" | Elegir uno y sostenerlo |
| Clasificación por edad | PEGI 3 (Play) | — | iOS dice **13+**. Incoherente entre tiendas |
| Política de privacidad | `privacy.foodly.solutions/privacy-policy` | `foodly.solutions/privacy` | Unificar (ver §3) |

Última actualización de ficha: **23/06/2026**. Seis semanas de deriva sobre el
feature que más ha avanzado.

**Acción**: reescribir las secciones GRATUITA y EM BREVE de las 6 fichas
(PT/ES/EN × 2 tiendas) con el texto de §2 antes de tocar nada de keywords.

---

## 1. El techo real: instalaciones y reseñas

| Señal | Foodly | Efecto |
|---|---|---|
| Descargas Play | **10+** | Dominante en el ranking de tiendas |
| Reseñas Play | 0 visibles | Sin estrellas, la ficha pierde CTR |
| Valoraciones App Store | "não recebeu classificações suficientes" | Idem |

Ninguna optimización de texto compensa esto. Con 10 instalaciones no se gana la
consulta "foodly" contra tres apps homónimas más establecidas. Lo que sí mueve
la aguja, en orden:

1. Pedir reseña a cada negocio onboardeado (in-app, tras el primer pedido cobrado).
2. Pedir reseña a los comensales tras un pago de grupo exitoso — es el momento de
   máxima satisfacción del flujo.
3. Cada QR impreso en mesa es un instalador. Es el canal más barato que tenés.

Objetivo mínimo para dejar de ser invisible: **50 instalaciones y 10 reseñas**.

---

## 2. Textos propuestos (copiar/pegar)

### El título es el campo #1 de ranking

"Gastronomia Digital" no lo busca nadie: es una abstracción. La gente escribe el
problema — *menu digital*, *ementa QR*, *reservas*. El título tiene 30 caracteres
y hoy se gastan en una frase sin volumen de búsqueda.

| Tienda / idioma | Actual | Propuesto | Chars |
|---|---|---|---|
| Play PT | Foodly: Gastronomia Digital | `Foodly: Menu Digital QR` | 23 |
| Play ES | — | `Foodly: Carta Digital QR` | 24 |
| Play EN | Foodly: Food Business Platform | `Foodly: QR Menu & Bookings` | 26 |
| App Store PT (nombre) | Foodly: Gastronomia Digital | `Foodly: Menu Digital QR` | 23 |
| App Store PT (subtítulo) | Digitaliza o teu negócio | `Ementa QR, reservas e conta` | 27 |

> En PT-PT conviven *menu* y *ementa*. *Menu* tiene más volumen por ser el
> término internacional; *ementa* se recupera en la descripción corta y en el
> campo de keywords, así cubrís las dos.

### Descripción corta (80 chars — 2º campo de ranking)

- **PT**: `Menu digital QR, ementa online, reservas e conta dividida. Grátis.`
- **ES**: `Carta digital QR, menú online, reservas y cuenta dividida. Gratis.`
- **EN**: `QR digital menu, table bookings and split-bill orders. Free to use.`

### Campo de keywords de App Store (100 chars, invisible, solo Apple)

```
ementa,cardapio,carta,qr,restaurante,bar,reserva,mesa,conta dividida,catering,chef,pedidos
```

No repitas ahí el nombre de la app ni palabras del título: Apple ya las indexa y
duplicarlas desperdicia el campo.

### Bloques a reescribir en la descripción larga (PT)

Reemplazar la sección **GRATUITA**:

```
GRATUITA
A Foodly é gratuita para negócios e clientes. Sem subscrições, sem mensalidades,
sem custos de ativação. Aplica-se apenas uma comissão de 3% aos pedidos que os
seus clientes pagam através da Foodly — e cobre o processamento do pagamento.
Pedidos pagos ao balcão ou em dinheiro não pagam nada.
```

Reemplazar la sección **EM BREVE** por una que refleje lo que ya existe:

```
JÁ DISPONÍVEL — PEDIDOS DE GRUPO E CONTA DIVIDIDA
Uma mesa, um pedido, cada um paga a sua parte a partir do telemóvel. Divisão em
partes iguais ou item a item, com gorjeta opcional e pagamento seguro via Stripe.
Disponível na beta comercial em Portugal.
```

---

## 3. Señales de entidad de marca

Google resuelve las consultas de marca por autoridad de entidad. Hoy hay al menos
seis "Foodly" con más antigüedad, dos vendiendo lo mismo (esfoodly.es,
foodly.com.co). Estas señales le dicen a Google que este Foodly es una entidad
propia y verificable:

| Señal | Estado | Acción |
|---|---|---|
| `sameAs` en schema Organization | **ausente en las 3 páginas** | El arreglo más barato y de mayor impacto. Requiere las URLs reales de los perfiles |
| Nombre de desarrollador en Play | **"Apps 369"** | Cambiar a "Foodly" — aparece bajo el título en cada ficha y es señal de entidad |
| Nombre de desarrollador en App Store | **"Hector Waldman"** | Requiere cuenta de organización + D-U-N-S. Más trabajo, mismo beneficio |
| `downloadUrl` en schema SoftwareApplication | ausente | Enlazar la web con las fichas cierra el triángulo de entidad |
| Google Business Profile | no existe | Crear |
| URL de privacidad | dos distintas | Unificar en `foodly.solutions/privacy` |

> **Sobre `privacy.foodly.solutions`**: es la 2ª de solo 2 URLs indexadas del
> dominio. Un subdominio compite como sitio aparte y diluye la señal en vez de
> sumarla. Consolidar la política en `foodly.solutions/privacy` y redirigir.

---

## 4. Dato personal expuesto (revisar, no es SEO)

Ambas tiendas publican datos personales por el requisito de comerciante de la UE:

- **Play**: dirección particular en Covilhã
- **App Store**: dirección en Buenos Aires, **teléfono personal** y **Gmail personal**

El requisito legal es real y no se puede omitir, pero **sí se puede cumplir con
datos de empresa**: dirección fiscal de Apps 369, un número de contacto del
negocio y `hello@foodly.solutions` en lugar del Gmail. Decisión tuya; lo dejo
señalado porque hoy cualquiera lo ve.

---

## 5. Orden de ejecución sugerido

1. Corregir 1% → 3% y "EM BREVE" → "JÁ DISPONÍVEL" en las 6 fichas *(§0, §2)*
2. Cambiar el nombre de desarrollador de Play a "Foodly" *(§3)*
3. Cambiar títulos y descripciones cortas *(§2)*
4. Añadir `sameAs` + `downloadUrl` al schema *(§3 — necesito tus URLs de perfiles)*
5. Google Business Profile *(§3)*
6. Motor de reseñas in-app *(§1 — es lo que más pesa y lo que más tarda)*

Los pasos 1-3 se hacen en las consolas y tardan una tarde. El 6 es el que decide
si esto funciona.
