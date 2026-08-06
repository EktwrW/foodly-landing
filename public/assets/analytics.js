/* Foodly landing — analítica GA4 con Consent Mode v2 (GDPR/EU).
 *
 * Por qué GA4 y no Plausible: la app Foodly ya usa Firebase Analytics, que
 * ES GA4. Con la misma propiedad medimos el funnel COMPLETO — búsqueda de
 * Google → landing → instalación → negocio creado — en un solo lugar y sin
 * costo. El precio a pagar es el banner de consentimiento; lo resolvemos
 * con Consent Mode v2: sin consentimiento Google recibe pings anónimos
 * (sin cookies, sin identificadores), así que las métricas agregadas de
 * tráfico existen igual y las personalizadas se activan al aceptar.
 */
(function () {
  "use strict";

  var MEASUREMENT_ID = "G-HK9C5PPPFK";
  var STORAGE_KEY = "foodly_consent_v1";
  var isConfigured = MEASUREMENT_ID.indexOf("XXXX") === -1;

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  /* Consent Mode v2 — denegado por defecto (obligatorio en la UE). */
  var stored = null;
  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    /* modo privado */
  }

  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: stored === "granted" ? "granted" : "denied",
    functionality_storage: "granted",
    security_storage: "granted",
    wait_for_update: 500,
  });

  if (isConfigured) {
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + MEASUREMENT_ID;
    document.head.appendChild(s);

    gtag("js", new Date());
    gtag("config", MEASUREMENT_ID, {
      anonymize_ip: true,
      /* La landing es multiidioma en rutas distintas: el idioma es una
         dimensión útil para saber qué mercado responde. */
      page_language: document.documentElement.lang || "en",
    });
  }

  /* ─── Banner de consentimiento (discreto, no bloquea la vista) ─── */
  function buildBanner() {
    if (stored) {
      return;
    } // ya decidió

    var lang = (document.documentElement.lang || "en").slice(0, 2);
    var copy =
      {
        en: {
          text: "We use analytics cookies to understand how the site is used.",
          accept: "Accept",
          reject: "Reject",
          more: "Privacy",
        },
        es: {
          text: "Usamos cookies analíticas para entender cómo se usa el sitio.",
          accept: "Aceptar",
          reject: "Rechazar",
          more: "Privacidad",
        },
        pt: {
          text: "Usamos cookies analíticos para perceber como o site é utilizado.",
          accept: "Aceitar",
          reject: "Rejeitar",
          more: "Privacidade",
        },
      }[lang] || null;
    var t = copy || {
      text: "We use analytics cookies to understand how the site is used.",
      accept: "Accept",
      reject: "Reject",
      more: "Privacy",
    };

    var bar = document.createElement("div");
    bar.setAttribute("role", "dialog");
    bar.setAttribute("aria-label", t.text);
    bar.style.cssText = [
      "position:fixed",
      "left:12px",
      "right:12px",
      "bottom:12px",
      "z-index:9999",
      "max-width:640px",
      "margin:0 auto",
      "background:#fff",
      "border:1px solid rgba(121,0,93,.18)",
      "border-radius:16px",
      "box-shadow:0 10px 30px rgba(27,16,21,.16)",
      "padding:14px 16px",
      "display:flex",
      "flex-wrap:wrap",
      "align-items:center",
      "gap:10px",
      "font:400 13px/1.45 system-ui,-apple-system,'Segoe UI',sans-serif",
      "color:#333",
    ].join(";");

    var msg = document.createElement("span");
    msg.style.cssText = "flex:1 1 220px";
    msg.textContent = t.text + " ";

    var link = document.createElement("a");
    link.href = "/privacy";
    link.textContent = t.more;
    link.style.cssText =
      "color:#79005D;font-weight:600;text-decoration:underline";
    msg.appendChild(link);

    function button(label, primary) {
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = label;
      b.style.cssText = [
        "border-radius:10px",
        "padding:9px 16px",
        "font:600 13px system-ui",
        "cursor:pointer",
        "border:1px solid " + (primary ? "#79005D" : "rgba(121,0,93,.3)"),
        "background:" + (primary ? "#79005D" : "#fff"),
        "color:" + (primary ? "#fff" : "#79005D"),
      ].join(";");
      return b;
    }

    var reject = button(t.reject, false);
    var accept = button(t.accept, true);

    function decide(value) {
      try {
        localStorage.setItem(STORAGE_KEY, value);
      } catch (e) {
        /* noop */
      }
      gtag("consent", "update", { analytics_storage: value });
      bar.remove();
    }

    reject.addEventListener("click", function () {
      decide("denied");
    });
    accept.addEventListener("click", function () {
      decide("granted");
    });

    bar.appendChild(msg);
    bar.appendChild(reject);
    bar.appendChild(accept);
    document.body.appendChild(bar);
  }

  /* ─── Eventos de interacción que importan en esta landing ─── */
  function track(name, params) {
    if (!isConfigured) {
      return;
    }
    gtag("event", name, params || {});
  }

  function wireEvents() {
    /* Descargas de la app — la conversión principal.
       OJO (verificado en prod 2026-08-05): los badges NO apuntan a las
       tiendas, sino a los redirectores propios api.foodly.solutions/dl/*.
       El selector viejo (play.google.com / apps.apple.com) no matcheaba
       NADA y el evento nunca se disparaba. Se cubren ambas formas. */
    document
      .querySelectorAll(
        'a[href*="/dl/android"], a[href*="/dl/ios"], ' +
          'a[href*="play.google.com"], a[href*="apps.apple.com"]',
      )
      .forEach(function (a) {
        a.addEventListener("click", function () {
          var android = /\/dl\/android|play\.google/.test(a.href);
          track("app_store_click", {
            store: android ? "google_play" : "app_store",
            location: a.closest("section")
              ? a.closest("section").id || "unknown"
              : "nav",
          });
        });
      });

    /* Intención de negocio — en esta landing el alta ocurre DENTRO de la
       app, así que la señal medible es el clic a los CTA de negocio
       (#businesses, "Start free today"). Renombrado a *_cta_click porque
       "signup" prometía un alta que la web no puede observar. */
    document
      .querySelectorAll(
        'a[href*="#businesses"], a[href*="#download"], ' +
          'a[href*="sign-up-business"], [data-cta="business"]',
      )
      .forEach(function (a) {
        a.addEventListener("click", function () {
          track("business_cta_click", {
            target: a.getAttribute("href") || "unknown",
            label: (a.textContent || "").trim().slice(0, 40),
          });
        });
      });

    /* Contacto (mailto / WhatsApp). */
    document
      .querySelectorAll('a[href^="mailto:"], a[href*="wa.me"]')
      .forEach(function (a) {
        a.addEventListener("click", function () {
          track("contact_click", {
            channel: a.href.indexOf("wa.me") > -1 ? "whatsapp" : "email",
          });
        });
      });

    /* Video manifiesto — señal de interés profundo. */
    var yt = document.getElementById("ytManifesto");
    if (yt) {
      yt.addEventListener(
        "click",
        function () {
          track("manifesto_play");
        },
        { once: true },
      );
    }

    /* Cambio de idioma — qué mercado responde. */
    document
      .querySelectorAll(
        'a[hreflang], a[href="/es"], a[href="/pt"], a[href="/"]',
      )
      .forEach(function (a) {
        a.addEventListener("click", function () {
          var to = a.getAttribute("hreflang") || a.getAttribute("href");
          if (to) {
            track("language_switch", { to: to });
          }
        });
      });

    /* Profundidad de scroll: 25/50/75/90 — dónde abandona la gente. */
    var marks = [25, 50, 75, 90];
    var seen = {};
    window.addEventListener(
      "scroll",
      function () {
        var h = document.documentElement;
        var pct = Math.round(
          ((h.scrollTop || document.body.scrollTop) /
            ((h.scrollHeight || document.body.scrollHeight) - h.clientHeight)) *
            100,
        );
        marks.forEach(function (m) {
          if (pct >= m && !seen[m]) {
            seen[m] = true;
            track("scroll_depth", { percent: m });
          }
        });
      },
      { passive: true },
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      buildBanner();
      wireEvents();
    });
  } else {
    buildBanner();
    wireEvents();
  }
})();
