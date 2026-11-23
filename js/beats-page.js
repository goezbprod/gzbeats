
document.addEventListener("DOMContentLoaded", () => {

  /* =====================================
     1. BARRA DE NAVEGACIÓN
  ====================================== */

  const header = document.getElementById("beats-header");
  const darkSection = document.getElementById("catalogo");

  function actualizarTemaBarra() {

    if (!header || !darkSection) return;

    const headerBottom = header.getBoundingClientRect().bottom;
    const section = darkSection.getBoundingClientRect();

    const isDark =
      section.top < headerBottom &&
      section.bottom > headerBottom;

    header.classList.toggle("is-dark", isDark);

  }

  window.addEventListener("scroll", actualizarTemaBarra, {
    passive: true
  });

  window.addEventListener("resize", actualizarTemaBarra);

  actualizarTemaBarra();


  /* =====================================
     2. REFERENCIAS Y DATOS
  ====================================== */

  const container = document.getElementById("beats-container");

  const countLabel = document.getElementById("beats-count");

  const filterButton = document.getElementById("btn-filter");

  const filterDropdown = document.getElementById("filter-dropdown");

  const resetButton = document.getElementById("btn-reset-filter");

  const applyButton = document.getElementById("btn-apply-filter");

  const genreCheckboxes = document.querySelectorAll(".genre-checkbox");

  const detailsDialog = document.getElementById("beat-details-dialog");

  const closeDialogButton = document.getElementById("close-beat-dialog");


  if (!container) return;


  // beats.js debe cargarse antes de este archivo.

  const datosOriginales =
    typeof misBeats !== "undefined" && Array.isArray(misBeats)
      ? misBeats
      : [];


  /* =====================================
     3. UTILIDADES
  ====================================== */

  function normalizarTexto(texto) {

    return String(texto ?? "")
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  }


  function mezclarAleatoriamente(lista) {

    const resultado = [...lista];

    for (let i = resultado.length - 1; i > 0; i--) {

      const j = Math.floor(Math.random() * (i + 1));

      [resultado[i], resultado[j]] =
        [resultado[j], resultado[i]];

    }

    return resultado;

  }


  function obtenerTipo(beat) {

    const tipo = normalizarTexto(beat.tipo || "normal");

    if (tipo === "reciente") return "reciente";

    if (
      tipo === "mejor" ||
      tipo === "destacado"
    ) {
      return "destacado";
    }

    if (
      tipo === "final" ||
      tipo === "finales"
    ) {
      return "finales";
    }

    return "normal";

  }


  function estaActivo(beat) {

    if (beat.estado === undefined || beat.estado === null) {
      return true;
    }

    if (beat.estado === false) return false;
    if (beat.estado === true) return true;

    return normalizarTexto(beat.estado) !== "no";

  }


  /* =====================================
     4. ORDEN DEL CATÁLOGO
  ====================================== */

  function prepararCatalogo() {

    const visibles = datosOriginales.filter(estaActivo);

    const recientes = visibles.filter(
      beat => obtenerTipo(beat) === "reciente"
    );

    const destacados = visibles.filter(
      beat => obtenerTipo(beat) === "destacado"
    );

    const normales = visibles.filter(
      beat => obtenerTipo(beat) === "normal"
    );

    const finales = visibles.filter(
      beat => obtenerTipo(beat) === "finales"
    );


    // 1. Recientes primero.
    // 2. Seleccionados después.
    // 3. Normales aleatorios.
    // 4. Finales aleatorios al último.

    return [

      ...recientes,

      ...destacados,

      ...mezclarAleatoriamente(normales),

      ...mezclarAleatoriamente(finales)

    ];

  }


  let beatsPreparados = prepararCatalogo();


  /* =====================================
     5. PORTADAS AUTOMÁTICAS
  ====================================== */

  const portadasGenero = {

    reggaeton: "assets/portadas/reggaeton.jpg",

    trap: "assets/portadas/trap.jpg",

    guaracha: "assets/portadas/guaracha.jpg",

    cumbia: "assets/portadas/cumbia.jpg",

    drill: "assets/portadas/drill.jpg",

    default: "assets/portadas/default.jpg"

  };


  function obtenerPortada(beat) {

    const personalizada =
      typeof beat.img === "string" ? beat.img.trim() : "";

    if (personalizada) {

      return personalizada;

    }

    const genero = normalizarTexto(beat.genre);

    return portadasGenero[genero] || portadasGenero.default;

  }


  /* =====================================
     6. REPRODUCTOR ÚNICO
  ====================================== */

  let audioActivo = null;


  function formatoTiempo(segundos) {

    if (!Number.isFinite(segundos)) return "0:00";

    const minutos = Math.floor(segundos / 60);

    const segundosRestantes = Math.floor(segundos % 60);

    return `${minutos}:${String(segundosRestantes).padStart(2, "0")}`;

  }


  function actualizarReproductor(card, audio) {

    const boton = card.querySelector(".beat-cover-play");

    const progreso = card.querySelector(".beat-progress");

    const tiempo = card.querySelector(".beat-time");

    if (!boton || !progreso || !tiempo) return;


    const reproduciendo = !audio.paused;

    boton.textContent = reproduciendo ? "Ⅱ" : "▶";

    boton.setAttribute(
      "aria-label",
      reproduciendo ? "Pausar instrumental" : "Reproducir instrumental"
    );

    progreso.value = audio.duration
      ? (audio.currentTime / audio.duration) * 1000
      : 0;

    const actual = formatoTiempo(audio.currentTime);

    const duracion = formatoTiempo(audio.duration);

    tiempo.textContent = `${actual} / ${duracion}`;

  }


  function detenerAudioAnterior() {

    if (!audioActivo) return;

    const anterior = audioActivo;

    anterior.pause();

    try {
      anterior.currentTime = 0;
    } catch (_) {
      // Puede no tener todavía metadata disponible.
    }

    const cardAnterior = anterior.closest(".beat-card");

    if (cardAnterior) {
      actualizarReproductor(cardAnterior, anterior);
    }

    audioActivo = null;

  }


  function configurarReproductor(card, beat) {

    const audio = new Audio();

    audio.preload = "none";

    if (beat.archivo) {

      audio.src = beat.archivo;

    }


    const boton = card.querySelector(".beat-cover-play");

    const progreso = card.querySelector(".beat-progress");

    boton.disabled = !beat.archivo;


    boton.addEventListener("click", async () => {

      if (!beat.archivo) return;


      // Si es otro instrumental, reiniciar el anterior.

      if (audioActivo && audioActivo !== audio) {

        detenerAudioAnterior();

      }


      // Pausa normal del mismo instrumental.

      if (!audio.paused) {

        audio.pause();

        return;

      }


      audioActivo = audio;

      try {

        await audio.play();

      } catch (error) {

        audioActivo = null;

        actualizarReproductor(card, audio);

        console.error("No se pudo reproducir el beat:", error);

      }

    });


    // Desplazamiento de la barra.

    progreso.addEventListener("input", () => {

      if (!Number.isFinite(audio.duration)) return;

      audio.currentTime =
        (Number(progreso.value) / 1000) * audio.duration;

    });


    audio.addEventListener("loadedmetadata", () => {

      actualizarReproductor(card, audio);

    });


    audio.addEventListener("timeupdate", () => {

      actualizarReproductor(card, audio);

    });


    audio.addEventListener("play", () => {

      actualizarReproductor(card, audio);

    });


    audio.addEventListener("pause", () => {

      actualizarReproductor(card, audio);

    });


    audio.addEventListener("ended", () => {

      audio.currentTime = 0;

      if (audioActivo === audio) {
        audioActivo = null;
      }

      actualizarReproductor(card, audio);

    });


    audio.addEventListener("error", () => {

      boton.disabled = true;

      boton.title = "No se pudo cargar este audio";

      console.warn("Error al cargar:", beat.archivo);

    });


    actualizarReproductor(card, audio);

  }


  /* =====================================
     7. REINICIO AL ABANDONAR LA PÁGINA
  ====================================== */

  function detenerReproduccionAlSalir() {

    detenerAudioAnterior();

  }


  document.addEventListener("visibilitychange", () => {

    if (document.hidden) {

      detenerReproduccionAlSalir();

    }

  });


  window.addEventListener("pagehide", detenerReproduccionAlSalir);

  window.addEventListener("beforeunload", detenerReproduccionAlSalir);


  /* =====================================
     8. CREAR TARJETAS
  ====================================== */

  function crearTarjeta(beat) {

    const card = document.createElement("article");

    const tipo = obtenerTipo(beat);

    card.className = "beat-card";

    if (tipo === "reciente") {
      card.classList.add("is-recent");
    }

    if (tipo === "destacado") {
      card.classList.add("is-selected");
    }

    if (beat.vendido) {
      card.classList.add("is-sold");
    }


    const portada = obtenerPortada(beat);

    // La misma imagen se utiliza como fondo desenfocado.

    const portadaCSS = portada
      .replace(/\\/g, "\\\\")
      .replace(/"/g, '\\"')
      .replace(/[\r\n]/g, "");

    card.style.setProperty(
      "--beat-cover-bg",
      `url("${portadaCSS}")`
    );


    card.innerHTML = `

      <div class="beat-card-visual">

        <img
          class="beat-card-cover"
          alt=""
          loading="lazy"
        />

        <div class="beat-icon">

          <img
            src="assets/icons/music-note.svg"
            alt=""
          />

        </div>

        <button
          class="beat-cover-play"
          type="button"
          aria-label="Reproducir instrumental"
        >▶</button>

        ${tipo === "reciente"
          ? `<span class="beat-type-badge">🔥 LO MÁS RECIENTE</span>`
          : ""
        }

        ${tipo === "destacado"
          ? `<span class="beat-type-badge">✦ SELECCIÓN</span>`
          : ""
        }

        ${beat.vendido
          ? `<span class="beat-sold-badge">VENDIDO</span>`
          : ""
        }

      </div>


      <div class="beat-card-info">

        <div class="beat-card-heading">

          <div>

            <h3 class="beat-title"></h3>

            <span class="beat-genre"></span>

            <p class="beat-bpm"></p>

          </div>

        </div>


        <div class="beat-player">

          <input
            class="beat-progress"
            type="range"
            min="0"
            max="1000"
            value="0"
            step="1"
            aria-label="Progreso del instrumental"
          />

          <span class="beat-time">0:00 / 0:00</span>

        </div>


        <div class="beat-price-row">

          <div>

            <span class="beat-price-label"></span>

            <p class="beat-price"></p>

          </div>

        </div>


        <button
          class="beat-details-btn"
          type="button"
        >
          VER DETALLES <span>→</span>
        </button>

      </div>

    `;


    // Cargar imagen de portada.

    const coverImg = card.querySelector(".beat-card-cover");

    coverImg.src = portada;

    coverImg.addEventListener("error", () => {

      if (!coverImg.dataset.fallback) {

        coverImg.dataset.fallback = "true";

        coverImg.src = portadasGenero.default;

      } else {

        coverImg.style.display = "none";

      }

    });


    // Información.

    card.querySelector(".beat-title").textContent =
      beat.titulo || "Instrumental sin título";

    card.querySelector(".beat-genre").textContent =
      beat.genre || "Sin género";

    card.querySelector(".beat-bpm").textContent =
      `BPM: ${beat.bpm ?? "—"}`;


    card.querySelector(".beat-price-label").textContent =
      beat.vendido ? "ESTADO" : "PRECIO BÁSICO";


    card.querySelector(".beat-price").textContent =
      beat.vendido
        ? "VENDIDO"
        : `DESDE ${beat.precioBasico || "Consultar"}`;


    // Reproductor.

    configurarReproductor(card, beat);


    // Detalles.

    card.querySelector(".beat-details-btn").addEventListener(
      "click",
      () => abrirDetalles(beat)
    );


    return card;

  }


  /* =====================================
     9. RENDERIZAR EL CATÁLOGO
  ====================================== */

  function renderBeats(lista) {

    detenerAudioAnterior();

    container.innerHTML = "";

    if (countLabel) {

      countLabel.textContent =
        `${lista.length} ${lista.length === 1 ? "instrumental" : "instrumentales"}`;

    }


    if (lista.length === 0) {

      const empty = document.createElement("p");

      empty.className = "beats-empty";

      empty.textContent =
        "No se encontraron instrumentales con los filtros seleccionados.";

      container.appendChild(empty);

      return;

    }


    const fragment = document.createDocumentFragment();

    lista.forEach(beat => {

      fragment.appendChild(crearTarjeta(beat));

    });

    container.appendChild(fragment);

  }


  /* =====================================
     10. FILTROS POR GÉNERO
  ====================================== */

  function obtenerGenerosSeleccionados() {

    return Array.from(genreCheckboxes)

      .filter(checkbox => checkbox.checked)

      .map(checkbox => normalizarTexto(checkbox.value));

  }


  function aplicarFiltros() {

    const seleccionados = obtenerGenerosSeleccionados();

    let resultado = beatsPreparados;


    if (seleccionados.length > 0) {

      resultado = beatsPreparados.filter(beat => {

        const genero = normalizarTexto(beat.genre);

        return seleccionados.some(generoElegido =>
          genero.includes(generoElegido)
        );

      });

    }


    filterButton?.classList.toggle(
      "is-filtered",
      seleccionados.length > 0
    );


    renderBeats(resultado);

  }


  filterButton?.addEventListener("click", () => {

    const abierto = filterDropdown.classList.toggle("active");

    filterButton.setAttribute("aria-expanded", String(abierto));

  });


  applyButton?.addEventListener("click", () => {

    aplicarFiltros();

    filterDropdown.classList.remove("active");

    filterButton.setAttribute("aria-expanded", "false");

  });


  resetButton?.addEventListener("click", () => {

    genreCheckboxes.forEach(checkbox => {

      checkbox.checked = false;

    });

    aplicarFiltros();

    filterDropdown.classList.remove("active");

    filterButton?.setAttribute("aria-expanded", "false");

  });


  // Cerrar filtros al hacer clic fuera.

  document.addEventListener("click", event => {

    const wrapper = document.querySelector(".filter-wrapper");

    if (wrapper && !wrapper.contains(event.target)) {

      filterDropdown.classList.remove("active");

      filterButton?.setAttribute("aria-expanded", "false");

    }

  });

/* =====================================
   11. MODAL DE DETALLES Y LICENCIAS
====================================== */

const MI_WHATSAPP = "527121536916";

const modalCover = document.getElementById("modal-beat-cover");

const modalTitle = document.getElementById("modal-beat-title");

const modalMeta = document.getElementById("modal-beat-meta");

const modalStatus = document.getElementById("modal-beat-status");

const modalPreviewButton = document.getElementById("modal-preview-play");

const modalPreviewProgress = document.getElementById(
  "modal-preview-progress"
);

const modalPreviewTime = document.getElementById("modal-preview-time");

const basicPrice = document.getElementById("dialog-price-basic");

const proPrice = document.getElementById("dialog-price-pro");

const discountInput = document.getElementById("discount-code");

const discountButton = document.getElementById("apply-discount");

const discountStatus = document.getElementById("discount-status");


let beatActual = null;

let modalAudio = null;


/* =====================================
   11.1. INFORMACIÓN DE LAS LICENCIAS
====================================== */

function obtenerDatosLicencia(beat, tipo) {

  if (tipo === "basic") {

    return {

      nombre: "Licencia WAV Básica",

      etiqueta: "Básica (Solo WAV)",

      precio: beat.precioBasico || "Consultar",

      incluidos: [

        "Licencia exclusiva",

        "Archivo WAV de alta calidad",

        "Audio masterizado"

      ]

    };

  }


  return {

    nombre: "Licencia Pro / Completa",

    etiqueta: "Pro (WAV + Stems + Loops)",

    precio: beat.precioPro || "Consultar",

    incluidos: [

      "Licencia exclusiva",

      "Archivo WAV de alta calidad",

      "Stems (Trackouts / pistas separadas)",

      "Loops y extras"

    ]

  };

}


/* =====================================
   11.2. CONTROL DEL PREVIEW DEL MODAL
====================================== */

function actualizarPreviewModal() {

  if (!modalAudio) return;

  modalPreviewButton.textContent =
    modalAudio.paused ? "▶" : "Ⅱ";

  modalPreviewButton.setAttribute(
    "aria-label",
    modalAudio.paused
      ? "Reproducir preview"
      : "Pausar preview"
  );

  modalPreviewProgress.value = modalAudio.duration
    ? (modalAudio.currentTime / modalAudio.duration) * 1000
    : 0;

  modalPreviewTime.textContent =
    `${formatoTiempo(modalAudio.currentTime)} / ${formatoTiempo(modalAudio.duration)}`;

}


function detenerPreviewModal() {

  if (!modalAudio) return;

  const anterior = modalAudio;

  anterior.pause();

  try {

    anterior.currentTime = 0;

  } catch (_) {}

  if (audioActivo === anterior) {

    audioActivo = null;

  }

  modalAudio = null;

  modalPreviewButton.textContent = "▶";

  modalPreviewProgress.value = 0;

  modalPreviewTime.textContent = "0:00 / 0:00";

}


function configurarPreviewModal(beat) {

  // Detener cualquier instrumental anterior.

  detenerAudioAnterior();

  detenerPreviewModal();


  const tieneAudio =
    typeof beat.archivo === "string" &&
    beat.archivo.trim() !== "";


  modalPreviewButton.disabled = !tieneAudio;

  if (!tieneAudio) {

    modalPreviewTime.textContent = "Audio no disponible";

    return;

  }


  modalAudio = new Audio(beat.archivo);

  modalAudio.preload = "metadata";


  modalAudio.addEventListener("loadedmetadata", actualizarPreviewModal);

  modalAudio.addEventListener("timeupdate", actualizarPreviewModal);

  modalAudio.addEventListener("play", actualizarPreviewModal);

  modalAudio.addEventListener("pause", actualizarPreviewModal);


  modalAudio.addEventListener("ended", () => {

    modalAudio.currentTime = 0;

    if (audioActivo === modalAudio) {

      audioActivo = null;

    }

    actualizarPreviewModal();

  });


  modalPreviewButton.onclick = async () => {

    if (!modalAudio) return;


    if (!modalAudio.paused) {

      modalAudio.pause();

      return;

    }


    // Si hay otro instrumental reproduciéndose,
    // se reinicia antes de comenzar este.

    if (audioActivo && audioActivo !== modalAudio) {

      detenerAudioAnterior();

    }


    audioActivo = modalAudio;

    try {

      await modalAudio.play();

    } catch (error) {

      audioActivo = null;

      console.error("No se pudo reproducir el preview:", error);

    }

  };


  modalPreviewProgress.oninput = () => {

    if (!modalAudio || !Number.isFinite(modalAudio.duration)) {

      return;

    }

    modalAudio.currentTime =
      (Number(modalPreviewProgress.value) / 1000) *
      modalAudio.duration;

  };


  actualizarPreviewModal();

}


/* =====================================
   11.3. GENERAR TICKET DE SOLICITUD
====================================== */

function generarTicket(beat, tipoLicencia) {

  const licencia = obtenerDatosLicencia(beat, tipoLicencia);

  const canvas = document.createElement("canvas");

  canvas.width = 1200;

  canvas.height = 760;

  const ctx = canvas.getContext("2d");

  if (!ctx) {

    return Promise.reject(
      new Error("No se pudo generar el ticket.")
    );

  }


  // Fondo.

  ctx.fillStyle = "#151515";

  ctx.fillRect(0, 0, 1200, 760);


  // Borde exterior.

  ctx.strokeStyle = "#f8004f";

  ctx.lineWidth = 12;

  ctx.strokeRect(28, 28, 1144, 704);


  // Encabezado.

  ctx.fillStyle = "#f8004f";

  ctx.font = "bold 35px Arial";

  ctx.fillText("GOEZ PRODUCER", 75, 95);


  ctx.fillStyle = "#ffffff";

  ctx.font = "bold 48px Arial";

  ctx.fillText("SOLICITUD DE INSTRUMENTAL", 75, 185);


  // Fecha.

  const fecha = new Intl.DateTimeFormat("es-MX", {

    day: "2-digit",

    month: "2-digit",

    year: "numeric"

  }).format(new Date());


  ctx.fillStyle = "#aaaaaa";

  ctx.font = "24px Arial";

  ctx.fillText(`FECHA: ${fecha}`, 75, 240);


  // Separador.

  ctx.strokeStyle = "#393939";

  ctx.lineWidth = 2;

  ctx.beginPath();

  ctx.moveTo(75, 275);

  ctx.lineTo(1125, 275);

  ctx.stroke();


  // Nombre del beat.

  ctx.fillStyle = "#ffffff";

  ctx.font = "bold 40px Arial";

  ctx.fillText(
    `BEAT: "${String(beat.titulo).slice(0, 35)}"`,
    75,
    350
  );


  // Género y BPM.

  ctx.fillStyle = "#bdbdbd";

  ctx.font = "28px Arial";

  ctx.fillText(
    `Género: ${beat.genre}  |  BPM: ${beat.bpm}`,
    75,
    405
  );


  // Licencia seleccionada.

  ctx.fillStyle = "#f8004f";

  ctx.font = "bold 31px Arial";

  ctx.fillText("LICENCIA SELECCIONADA:", 75, 485);


  ctx.fillStyle = "#ffffff";

  ctx.font = "29px Arial";

  ctx.fillText(licencia.etiqueta, 75, 540);


  // Características.

  ctx.fillStyle = "#aaaaaa";

  ctx.font = "24px Arial";

  ctx.fillText(
    `Incluye: ${licencia.incluidos.join(" • ")}`,
    75,
    600,
    1040
  );


  // Precio.

  ctx.fillStyle = "#52d98a";

  ctx.font = "bold 39px Arial";

  ctx.fillText(
    `PRECIO: ${licencia.precio}`,
    75,
    675,
    1040
  );


  // Convertir a imagen PNG.

  return new Promise((resolve, reject) => {

    canvas.toBlob(blob => {

      if (!blob) {

        reject(new Error("No se pudo crear la imagen del ticket."));

        return;

      }

      resolve(blob);

    }, "image/png");

  });

}


/* =====================================
   11.4. DESCARGAR TICKET
====================================== */

async function descargarTicket(beat, tipoLicencia) {

  try {

    const blob = await generarTicket(beat, tipoLicencia);

    const url = URL.createObjectURL(blob);

    const nombreBeat = String(beat.titulo || "instrumental")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_|_$/g, "");

    const enlace = document.createElement("a");

    enlace.href = url;

    enlace.download =
      `ticket_${nombreBeat}_${tipoLicencia}.png`;

    document.body.appendChild(enlace);

    enlace.click();

    enlace.remove();

    URL.revokeObjectURL(url);

  } catch (error) {

    console.error(error);

    alert("No fue posible generar el ticket.");

  }

}


/* =====================================
   11.5. SOLICITUD POR WHATSAPP
====================================== */

function solicitarPorWhatsApp(beat, tipoLicencia) {

  const licencia = obtenerDatosLicencia(beat, tipoLicencia);

  const mensaje =

    `Hola, me interesa solicitar el beat "${beat.titulo}" ` +

    `en la opción ${licencia.etiqueta}. ` +

    `Precio: ${licencia.precio}. ` +

    `Género: ${beat.genre} | BPM: ${beat.bpm}. ` +

    `¿Podrías compartirme los detalles para continuar con la solicitud?`;


  const url =

    `https://wa.me/${MI_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;


  window.open(url, "_blank", "noopener,noreferrer");

}


/* =====================================
   11.6. ABRIR MODAL
====================================== */

function abrirDetalles(beat) {

  if (!detailsDialog) return;


  beatActual = beat;


  // Obtener portada.

  const portada = obtenerPortada(beat);

  modalCover.src = portada;

  modalCover.alt = `Portada de ${beat.titulo}`;


  // Misma imagen utilizada como fondo.

  const portadaCSS = portada
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/[\r\n]/g, "");

  detailsDialog.style.setProperty(
    "--dialog-cover",
    `url("${portadaCSS}")`
  );


  // Información.

  modalTitle.textContent = beat.titulo || "Instrumental";

  modalMeta.textContent =
    `${beat.genre || "Sin género"} • BPM: ${beat.bpm ?? "—"}`;


  modalStatus.textContent = beat.vendido
    ? "INSTRUMENTAL VENDIDO"
    : "INSTRUMENTAL DISPONIBLE";


  // Precios.

  basicPrice.textContent = beat.precioBasico || "Consultar";

  proPrice.textContent = beat.precioPro || "Consultar";


  // Reiniciar descuento.

  discountInput.value = "";

  discountButton.disabled = true;

  discountStatus.textContent = "Próximamente disponible.";


  // Configurar preview.

  configurarPreviewModal(beat);


  // Estado de las solicitudes.

  document.querySelectorAll(".license-whatsapp, .license-download")
    .forEach(button => {

      button.classList.toggle("is-disabled", Boolean(beat.vendido));

      button.style.opacity = beat.vendido ? "0.4" : "";

      button.style.pointerEvents = beat.vendido ? "none" : "";

    });


  if (!detailsDialog.open) {

    detailsDialog.showModal();

  }

}


/* =====================================
   11.7. BOTONES DE SOLICITUD
====================================== */

document.getElementById("request-basic")
  .addEventListener("click", event => {

    event.preventDefault();

    if (!beatActual || beatActual.vendido) return;

    solicitarPorWhatsApp(beatActual, "basic");

  });


document.getElementById("request-pro")
  .addEventListener("click", event => {

    event.preventDefault();

    if (!beatActual || beatActual.vendido) return;

    solicitarPorWhatsApp(beatActual, "pro");

  });


/* =====================================
   11.8. BOTONES DE DESCARGA
====================================== */

document.getElementById("download-basic")
  .addEventListener("click", () => {

    if (!beatActual || beatActual.vendido) return;

    descargarTicket(beatActual, "basic");

  });


document.getElementById("download-pro")
  .addEventListener("click", () => {

    if (!beatActual || beatActual.vendido) return;

    descargarTicket(beatActual, "pro");

  });


/* =====================================
   11.9. CÓDIGO DE DESCUENTO
====================================== */

discountInput.addEventListener("input", () => {

  const tieneTexto = discountInput.value.trim().length > 0;

  discountButton.disabled = !tieneTexto;

  discountStatus.textContent = tieneTexto
    ? "Código listo para validación."
    : "Próximamente disponible.";

});


discountButton.addEventListener("click", () => {

  discountStatus.textContent =
    "La validación de códigos estará disponible próximamente.";

});


/* =====================================
   11.10. CERRAR MODAL
====================================== */

function cerrarDetalles() {

  detenerPreviewModal();

  beatActual = null;

  if (detailsDialog.open) {

    detailsDialog.close();

  }

}


closeDialogButton?.addEventListener("click", cerrarDetalles);


// Cerrar haciendo clic fuera de la ventana.

detailsDialog?.addEventListener("click", event => {

  if (event.target === detailsDialog) {

    cerrarDetalles();

  }

});


// También detener el audio al cerrar con Escape.

detailsDialog?.addEventListener("close", () => {

  detenerPreviewModal();

  beatActual = null;

});


  /* =====================================
     12. INICIAR CATÁLOGO
  ====================================== */

  renderBeats(beatsPreparados);


  // Si el navegador restaura la página desde memoria,
  // volver a generar el orden aleatorio.

  window.addEventListener("pageshow", event => {

    if (event.persisted) {

      detenerAudioAnterior();

      beatsPreparados = prepararCatalogo();

      aplicarFiltros();

    }

  });

});
