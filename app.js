const canvas = document.getElementById("canvas");
const insights = document.getElementById("insights");
const insightsCanvas = document.getElementById("insights-canvas");
const template = document.getElementById("widget-template");
const headerFilterTemplate = document.getElementById("header-filter-template");
const targetArea = document.getElementById("target-area");
const toggleInsights = document.getElementById("toggle-insights");
const uxPage = document.querySelector(".ux-page");
const contextFilterRow = document.getElementById("context-filter-row");
const exportPdfBtn = document.getElementById("export-pdf");
const appShell = document.querySelector(".app-shell");
const builderToggle = document.getElementById("builder-toggle");

let z = 5;
let counter = 1;
const GRID_SIZE = 14;
const CANVAS_GAP = GRID_SIZE;
const MIN_WIDGET_WIDTH = 168;
const MIN_WIDGET_HEIGHT = 70;
const MIN_COMPACT_WIDGET_HEIGHT = 42;
const EXPORT_WIDTH = 1600;
const EXPORT_HEIGHT = 900;

document.querySelectorAll(".controls button[data-widget]").forEach((btn) => {
  btn.addEventListener("click", () => addWidget(btn.dataset.widget));
});

document.getElementById("clear-canvas").addEventListener("click", () => {
  canvas.innerHTML = "";
  insightsCanvas.innerHTML = "";
  contextFilterRow.innerHTML = "";
  counter = 1;
});

exportPdfBtn.addEventListener("click", exportUxToPdf);

builderToggle.addEventListener("click", () => {
  const collapsed = appShell.classList.toggle("builder-collapsed");
  builderToggle.setAttribute("aria-expanded", String(!collapsed));
  builderToggle.textContent = collapsed ? "Show Controls" : "Hide Controls";
});

toggleInsights.addEventListener("click", () => {
  const nowHidden = !insights.classList.contains("hidden");
  insights.classList.toggle("hidden", nowHidden);
  uxPage.classList.toggle("insights-hidden", nowHidden);
  toggleInsights.textContent = nowHidden ? "Insights: Off" : "Insights: On";
  toggleInsights.setAttribute("aria-pressed", String(!nowHidden));

  if (nowHidden && targetArea.value === "insights") {
    targetArea.value = "canvas";
  }
});

async function exportUxToPdf() {
  const frame = document.querySelector(".mockup-frame");
  const pdfApi = window.jspdf;

  if (!frame || typeof window.html2canvas !== "function" || !pdfApi?.jsPDF) {
    alert("PDF export is not ready. Check your connection and try again.");
    return;
  }

  exportPdfBtn.disabled = true;
  exportPdfBtn.textContent = "Generating PDF...";
  document.body.classList.add("pdf-exporting");

  try {
    const canvasImage = await window.html2canvas(frame, {
      backgroundColor: "#ffffff",
      scale: 2,
      useCORS: true,
      windowWidth: EXPORT_WIDTH,
      windowHeight: EXPORT_HEIGHT,
      width: EXPORT_WIDTH,
      height: EXPORT_HEIGHT,
    });
    const pdf = new pdfApi.jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [EXPORT_WIDTH, EXPORT_HEIGHT],
      hotfixes: ["px_scaling"],
    });

    pdf.addImage(canvasImage.toDataURL("image/png"), "PNG", 0, 0, EXPORT_WIDTH, EXPORT_HEIGHT);
    pdf.save("anaplan-mockup.pdf");
  } catch (error) {
    alert("PDF export failed. Please try again.");
    console.error(error);
  } finally {
    document.body.classList.remove("pdf-exporting");
    exportPdfBtn.disabled = false;
    exportPdfBtn.textContent = "Export UX Mockup PDF";
  }
}

function addWidget(type) {
  if (targetArea.value === "header") {
    if (type !== "context-filter") {
      alert("The 2nd header row accepts context filter widgets only.");
      return;
    }
    addHeaderFilter();
    return;
  }

  const destination = getDestination();
  if (!destination) return;

  const widget = template.content.firstElementChild.cloneNode(true);
  widget.dataset.type = type;
  const width = snapToGrid(getDefaultWidth(type));
  const height = snapToGrid(getDefaultHeight(type));
  widget.style.width = `${width}px`;
  widget.style.height = `${height}px`;
  widget.style.zIndex = ++z;

  const title = widget.querySelector(".widget-header");
  const content = widget.querySelector(".widget-content");

  if (type === "kpi") {
    title.textContent = "KPI: Net New ARR";
    content.innerHTML = `
      <div class="kpi">
        <div class="value" contenteditable="true">$1.42M</div>
        <div class="delta" contenteditable="true">▲ +8.4% vs Plan</div>
        <div contenteditable="true">Driver: Enterprise Wins</div>
      </div>
    `;
  }

  if (type === "grid") {
    title.contentEditable = "false";
    title.innerHTML = `
      <span class="grid-title" contenteditable="true">Grid: Monthly Forecast</span>
      <span class="grid-controls" aria-label="Grid controls">
        <button data-grid-action="add-row" type="button" title="Add row">+ Row</button>
        <button data-grid-action="remove-row" type="button" title="Remove row">- Row</button>
        <button data-grid-action="add-column" type="button" title="Add column">+ Col</button>
        <button data-grid-action="remove-column" type="button" title="Remove column">- Col</button>
      </span>
    `;
    content.innerHTML = `
      <table class="grid-table">
        <thead>
          <tr><th contenteditable="true">BU</th><th contenteditable="true">Jan</th><th contenteditable="true">Feb</th><th contenteditable="true">Mar</th></tr>
        </thead>
        <tbody>
          <tr><td contenteditable="true">Enterprise</td><td contenteditable="true">120</td><td contenteditable="true">132</td><td contenteditable="true">141</td></tr>
          <tr><td contenteditable="true">Mid Market</td><td contenteditable="true">88</td><td contenteditable="true">91</td><td contenteditable="true">96</td></tr>
          <tr><td contenteditable="true">SMB</td><td contenteditable="true">46</td><td contenteditable="true">49</td><td contenteditable="true">53</td></tr>
        </tbody>
      </table>
    `;
    setupGridControls(widget);
  }

  if (type === "chart") {
    title.textContent = "Chart: Revenue by Quarter";
    content.innerHTML = `
      <div class="chart">
        <div class="bar" style="height:45%"></div>
        <div class="bar" style="height:70%"></div>
        <div class="bar" style="height:60%"></div>
        <div class="bar" style="height:82%"></div>
      </div>
    `;
  }

  if (type === "button") {
    title.remove();
    content.innerHTML = `
      <button class="mock-action-btn" type="button" contenteditable="true">Submit Forecast</button>
    `;
    widget.classList.add("bare-widget", "button-widget");
  }

  if (type === "context-filter") {
    title.textContent = "Context Filter";
    content.innerHTML = `
      <div class="context-filter-widget">
        <span class="filter-label" contenteditable="true">Version</span>
        <span class="filter-value" contenteditable="true">Working Forecast</span>
      </div>
    `;
  }

  if (type === "text") {
    title.remove();
    content.innerHTML = `
      <div class="text-widget" contenteditable="true">Section Header / Instructional Text</div>
    `;
    widget.classList.add("bare-widget", "text-only-widget");
  }

  widget.querySelector(".remove").addEventListener("click", () => {
    widget.remove();
  });

  destination.appendChild(widget);

  const isInsightsDestination = destination === insightsCanvas;
  if (isInsightsDestination) {
    prepareInsightsWidget(widget);
  } else {
    const position = findOpenPosition(destination, widget, width, height);
    if (!position) {
      widget.remove();
      alert("There is not enough open space in the main canvas for that widget.");
      return;
    }
    applyRect(widget, position);
  }

  makeDraggable(widget, destination, isInsightsDestination);
  makeResizable(widget, destination, isInsightsDestination);
  counter += 1;
}

function prepareInsightsWidget(widget) {
  widget.classList.add("insights-widget");
  widget.style.left = "0px";
  widget.style.top = "0px";
  widget.style.width = "100%";

  const handle = widget.querySelector(".resize-handle");
  handle.style.display = "none";

  const header = widget.querySelector(".widget-header");
  if (header) header.style.marginBottom = "6px";
}

function addHeaderFilter() {
  const chip = headerFilterTemplate.content.firstElementChild.cloneNode(true);
  chip.querySelector(".remove-filter").addEventListener("click", () => chip.remove());
  contextFilterRow.appendChild(chip);
}

function getDestination() {
  if (targetArea.value === "insights") {
    if (insights.classList.contains("hidden")) {
      alert("Additional Insights is hidden. Turn it on to place widgets there.");
      return null;
    }
    return insightsCanvas;
  }
  return canvas;
}

function getDefaultWidth(type) {
  if (type === "kpi") return 224;
  if (type === "button") return 182;
  if (type === "context-filter") return 252;
  if (type === "text") return 364;
  return 308;
}

function getDefaultHeight(type) {
  if (type === "kpi") return 168;
  if (type === "button") return 42;
  if (type === "context-filter") return 140;
  if (type === "text") return 42;
  return 224;
}

function getMinWidgetHeight(el) {
  return el.classList.contains("bare-widget") ? MIN_COMPACT_WIDGET_HEIGHT : MIN_WIDGET_HEIGHT;
}

function makeDraggable(el, container, isInsightsDestination) {
  const handle = el.querySelector(".drag-handle");
  let startX = 0;
  let startY = 0;
  let baseX = 0;
  let baseY = 0;
  let lastValidRect = null;
  let dragging = false;

  handle.addEventListener("mousedown", (e) => {
    if (isInsightsDestination) {
      return;
    }

    dragging = true;
    startX = e.clientX;
    startY = e.clientY;
    baseX = el.offsetLeft;
    baseY = el.offsetTop;
    lastValidRect = getElementRect(el);
    el.style.zIndex = ++z;
    document.body.style.userSelect = "none";
    e.preventDefault();
  });

  window.addEventListener("mousemove", (e) => {
    if (!dragging) return;

    if (isInsightsDestination) {
      return;
    }

    const nextRect = {
      x: snapToGrid(baseX + (e.clientX - startX)),
      y: snapToGrid(baseY + (e.clientY - startY)),
      width: el.offsetWidth,
      height: el.offsetHeight,
    };

    if (isRectValid(container, nextRect, el)) {
      lastValidRect = nextRect;
      applyRect(el, nextRect);
    } else if (lastValidRect) {
      applyRect(el, lastValidRect);
    }
  });

  window.addEventListener("mouseup", () => {
    dragging = false;
    document.body.style.userSelect = "";
  });
}

function makeResizable(el, container, isInsightsDestination) {
  const handle = el.querySelector(".resize-handle");
  if (isInsightsDestination) {
    return;
  }

  let startX = 0;
  let startY = 0;
  let startW = 0;
  let startH = 0;
  let lastValidRect = null;
  let resizing = false;

  handle.addEventListener("mousedown", (e) => {
    e.stopPropagation();
    resizing = true;
    startX = e.clientX;
    startY = e.clientY;
    startW = el.offsetWidth;
    startH = el.offsetHeight;
    lastValidRect = getElementRect(el);
    document.body.style.userSelect = "none";
  });

  window.addEventListener("mousemove", (e) => {
    if (!resizing) return;

    const nextRect = {
      x: el.offsetLeft,
      y: el.offsetTop,
      width: Math.max(MIN_WIDGET_WIDTH, snapToGrid(startW + (e.clientX - startX))),
      height: Math.max(getMinWidgetHeight(el), snapToGrid(startH + (e.clientY - startY))),
    };

    if (isRectValid(container, nextRect, el)) {
      lastValidRect = nextRect;
      applyRect(el, nextRect);
    } else if (lastValidRect) {
      applyRect(el, lastValidRect);
    }
  });

  window.addEventListener("mouseup", () => {
    resizing = false;
    document.body.style.userSelect = "";
  });
}

function setupGridControls(widget) {
  widget.querySelectorAll("[data-grid-action]").forEach((button) => {
    button.addEventListener("mousedown", (event) => event.stopPropagation());
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      updateGrid(widget, button.dataset.gridAction);
    });
  });
}

function updateGrid(widget, action) {
  const table = widget.querySelector(".grid-table");
  const headerRow = table?.querySelector("thead tr");
  const body = table?.querySelector("tbody");
  if (!table || !headerRow || !body) return;

  const rows = Array.from(body.rows);
  const columnCount = headerRow.cells.length;

  if (action === "add-row") {
    const row = body.insertRow();
    for (let i = 0; i < columnCount; i += 1) {
      const cell = row.insertCell();
      cell.contentEditable = "true";
      cell.textContent = i === 0 ? "New Item" : "0";
    }
  }

  if (action === "remove-row" && rows.length > 1) {
    rows[rows.length - 1].remove();
  }

  if (action === "add-column") {
    const header = document.createElement("th");
    header.contentEditable = "true";
    header.textContent = `Col ${columnCount + 1}`;
    headerRow.appendChild(header);

    rows.forEach((row) => {
      const cell = row.insertCell();
      cell.contentEditable = "true";
      cell.textContent = "0";
    });
  }

  if (action === "remove-column" && columnCount > 1) {
    headerRow.deleteCell(columnCount - 1);
    rows.forEach((row) => row.deleteCell(columnCount - 1));
  }
}

function findOpenPosition(container, widget, width, height) {
  const maxX = container.clientWidth - width - CANVAS_GAP;
  const maxY = container.clientHeight - height - CANVAS_GAP;

  for (let y = CANVAS_GAP; y <= maxY; y += GRID_SIZE) {
    for (let x = CANVAS_GAP; x <= maxX; x += GRID_SIZE) {
      const rect = { x, y, width, height };
      if (isRectValid(container, rect, widget)) {
        return rect;
      }
    }
  }

  return null;
}

function isRectValid(container, rect, currentWidget) {
  if (rect.x < CANVAS_GAP || rect.y < CANVAS_GAP) return false;
  if (rect.x + rect.width > container.clientWidth - CANVAS_GAP) return false;
  if (rect.y + rect.height > container.clientHeight - CANVAS_GAP) return false;

  return Array.from(container.querySelectorAll(".widget")).every((widget) => {
    if (widget === currentWidget) return true;
    return !rectsOverlapWithGap(rect, getElementRect(widget), CANVAS_GAP);
  });
}

function rectsOverlapWithGap(a, b, gap) {
  return !(
    a.x + a.width + gap <= b.x ||
    b.x + b.width + gap <= a.x ||
    a.y + a.height + gap <= b.y ||
    b.y + b.height + gap <= a.y
  );
}

function getElementRect(el) {
  return {
    x: snapToGrid(el.offsetLeft),
    y: snapToGrid(el.offsetTop),
    width: snapToGrid(el.offsetWidth),
    height: snapToGrid(el.offsetHeight),
  };
}

function applyRect(el, rect) {
  el.style.left = `${rect.x}px`;
  el.style.top = `${rect.y}px`;
  el.style.width = `${rect.width}px`;
  el.style.height = `${rect.height}px`;
}

function snapToGrid(value, size = GRID_SIZE) {
  return Math.max(size, Math.round(value / size) * size);
}
