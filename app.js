const canvas = document.getElementById("canvas");
const insights = document.getElementById("insights");
const insightsCanvas = document.getElementById("insights-canvas");
const template = document.getElementById("widget-template");
const headerFilterTemplate = document.getElementById("header-filter-template");
const targetArea = document.getElementById("target-area");
const toggleInsights = document.getElementById("toggle-insights");
const pageBody = document.querySelector(".page-body");
const contextFilterRow = document.getElementById("context-filter-row");
const addHeaderFilterButton = document.getElementById("add-header-filter");
const exportPdfBtn = document.getElementById("export-pdf");
const appShell = document.querySelector(".app-shell");
const builderToggle = document.getElementById("builder-toggle");
const detailsModal = document.getElementById("widget-details-modal");
const closeDetailsModal = document.getElementById("close-details-modal");
const cancelDetails = document.getElementById("cancel-details");
const saveDetails = document.getElementById("save-details");
const detailFields = {
  purpose: document.getElementById("detail-purpose"),
  source: document.getElementById("detail-source"),
  grain: document.getElementById("detail-grain"),
  editability: document.getElementById("detail-editability"),
  assumptions: document.getElementById("detail-assumptions"),
  openQuestions: document.getElementById("detail-open-questions"),
  notes: document.getElementById("detail-notes"),
};

let z = 5;
let counter = 1;
let activeDetailsWidget = null;
const GRID_SIZE = 14;
const CANVAS_GAP = GRID_SIZE;
const MIN_WIDGET_WIDTH = 168;
const MIN_WIDGET_HEIGHT = 70;
const MIN_COMPACT_WIDGET_HEIGHT = 42;
const EXPANDED_CANVAS_HEIGHT = 1260;
const EXPORT_WIDTH = 1600;
const EXPORT_HEIGHT = 900;

document.querySelectorAll(".controls button[data-widget]").forEach((btn) => {
  btn.addEventListener("click", () => addWidget(btn.dataset.widget));
});

document.getElementById("clear-canvas").addEventListener("click", () => {
  canvas.innerHTML = "";
  insightsCanvas.innerHTML = "";
  contextFilterRow.innerHTML = "";
  updateHeaderFilterState();
  counter = 1;
});

exportPdfBtn.addEventListener("click", exportUxToPdf);

addHeaderFilterButton.addEventListener("click", addHeaderFilter);

closeDetailsModal.addEventListener("click", closeWidgetDetailsModal);
cancelDetails.addEventListener("click", closeWidgetDetailsModal);
detailsModal.addEventListener("cancel", closeWidgetDetailsModal);
saveDetails.addEventListener("click", saveWidgetDetails);

builderToggle.addEventListener("click", () => {
  const collapsed = appShell.classList.toggle("builder-collapsed");
  builderToggle.setAttribute("aria-expanded", String(!collapsed));
  builderToggle.textContent = collapsed ? "Show Controls" : "Hide Controls";
});

toggleInsights.addEventListener("click", () => {
  const nowHidden = !insights.classList.contains("hidden");
  insights.classList.toggle("hidden", nowHidden);
  pageBody.classList.toggle("insights-hidden", nowHidden);
  toggleInsights.setAttribute("aria-pressed", String(!nowHidden));
  toggleInsights.setAttribute("aria-label", nowHidden ? "Expand Additional Insights" : "Collapse Additional Insights");
  toggleInsights.setAttribute("title", nowHidden ? "Expand Additional Insights" : "Collapse Additional Insights");

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
  const destination = getDestination();
  if (!destination) return;

  const widget = template.content.firstElementChild.cloneNode(true);
  widget.dataset.type = type;
  widget.dataset.widgetId = `widget-${counter}`;
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
    setupGridCheckboxConversion(widget);
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

  if (type === "text") {
    title.remove();
    content.innerHTML = `
      <div class="text-widget" contenteditable="true">Section Header / Instructional Text</div>
    `;
    widget.classList.add("bare-widget", "text-only-widget");
  }

  if (type === "checkbox") {
    title.remove();
    content.innerHTML = `
      <label class="checkbox-widget-content">
        <span class="mock-checkbox" contenteditable="false"></span>
        <span class="checkbox-label" contenteditable="true">Show Active Projects</span>
      </label>
    `;
    widget.classList.add("bare-widget", "checkbox-widget");
  }

  if (type === "field") {
    title.remove();
    content.innerHTML = `
      <div class="field-widget-content">
        <div class="field-title" contenteditable="true">Current Forecast</div>
        <div class="field-box" contenteditable="true">Working Forecast</div>
      </div>
    `;
    widget.classList.add("field-widget");
  }

  if (type === "textbox") {
    title.remove();
    content.innerHTML = `
      <div class="textbox-widget-content" contenteditable="true">Add workshop note or descriptive text...</div>
    `;
    widget.classList.add("textbox-widget");
  }

  setupWidgetMetadata(widget);
  setupWidgetChrome(widget);

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

function setupWidgetMetadata(widget) {
  widget._buildMetadata = {
    purpose: "",
    source: "",
    grain: "",
    editability: "",
    assumptions: "",
    openQuestions: "",
    notes: "",
    filters: [],
  };
}

function setupWidgetChrome(widget) {
  widget.querySelector(".remove").addEventListener("click", () => {
    widget.remove();
  });

  widget.querySelector(".details").addEventListener("click", (event) => {
    event.stopPropagation();
    openWidgetDetailsModal(widget);
  });

  widget.querySelector(".add-widget-filter").addEventListener("click", (event) => {
    event.stopPropagation();
    addWidgetFilter(widget);
  });
}

function openWidgetDetailsModal(widget) {
  activeDetailsWidget = widget;
  const metadata = getWidgetMetadata(widget);

  Object.entries(detailFields).forEach(([key, field]) => {
    field.value = metadata[key] || "";
  });

  if (typeof detailsModal.showModal === "function") {
    detailsModal.showModal();
  } else {
    detailsModal.setAttribute("open", "");
  }
}

function closeWidgetDetailsModal() {
  activeDetailsWidget = null;
  if (detailsModal.open) {
    detailsModal.close();
  } else {
    detailsModal.removeAttribute("open");
  }
}

function saveWidgetDetails(event) {
  event.preventDefault();
  if (!activeDetailsWidget) return;

  const metadata = getWidgetMetadata(activeDetailsWidget);
  Object.entries(detailFields).forEach(([key, field]) => {
    metadata[key] = field.value.trim();
  });

  updateWidgetMetadataState(activeDetailsWidget);
  closeWidgetDetailsModal();
}

function getWidgetMetadata(widget) {
  if (!widget._buildMetadata) setupWidgetMetadata(widget);
  return widget._buildMetadata;
}

function updateWidgetMetadataState(widget) {
  const metadata = getWidgetMetadata(widget);
  const hasDetails = ["purpose", "source", "grain", "editability", "assumptions", "openQuestions", "notes"].some(
    (key) => metadata[key]
  );
  widget.classList.toggle("has-widget-details", hasDetails);
}

function addWidgetFilter(widget, name = "Filter") {
  const list = widget.querySelector(".widget-filter-list");
  const chip = document.createElement("span");
  chip.className = "widget-filter-chip";
  chip.innerHTML = `
    <span class="widget-filter-name" contenteditable="true">${name}</span>
    <button class="remove-widget-filter" type="button" aria-label="Remove widget filter">×</button>
  `;

  chip.querySelector(".remove-widget-filter").addEventListener("click", () => {
    chip.remove();
    syncWidgetFilters(widget);
  });

  chip.querySelector(".widget-filter-name").addEventListener("input", () => {
    syncWidgetFilters(widget);
  });

  list.appendChild(chip);
  syncWidgetFilters(widget);
}

function syncWidgetFilters(widget) {
  const metadata = getWidgetMetadata(widget);
  metadata.filters = Array.from(widget.querySelectorAll(".widget-filter-name"))
    .map((filter) => filter.textContent.trim())
    .filter(Boolean);
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
  chip.querySelector(".remove-filter").addEventListener("click", () => {
    chip.remove();
    updateHeaderFilterState();
  });
  contextFilterRow.appendChild(chip);
  updateHeaderFilterState();
}

function updateHeaderFilterState() {
  contextFilterRow.classList.toggle("has-header-filters", contextFilterRow.children.length > 0);
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
  if (type === "checkbox") return 350;
  if (type === "field") return 300;
  if (type === "text") return 364;
  if (type === "textbox") return 360;
  return 308;
}

function getDefaultHeight(type) {
  if (type === "kpi") return 168;
  if (type === "button") return 42;
  if (type === "checkbox") return 56;
  if (type === "field") return 104;
  if (type === "text") return 42;
  if (type === "textbox") return 154;
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

function setupGridCheckboxConversion(widget) {
  const table = widget.querySelector(".grid-table");
  if (!table) return;

  table.addEventListener("input", (event) => {
    const cell = event.target.closest("td");
    if (!cell || cell.querySelector(".grid-cell-checkbox")) return;

    if (cell.textContent.trim().toLowerCase() === "x") {
      cell.textContent = "";
      cell.contentEditable = "false";
      cell.classList.add("checkbox-cell");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = true;
      checkbox.className = "grid-cell-checkbox";
      cell.appendChild(checkbox);
    }
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
  const maxY = getPlacementHeight(container) - height - CANVAS_GAP;

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
  if (rect.y + rect.height > getPlacementHeight(container) - CANVAS_GAP) return false;

  return Array.from(container.querySelectorAll(".widget")).every((widget) => {
    if (widget === currentWidget) return true;
    return !rectsOverlapWithGap(rect, getElementRect(widget), CANVAS_GAP);
  });
}

function getPlacementHeight(container) {
  if (container === canvas) return Math.max(container.scrollHeight, container.clientHeight, EXPANDED_CANVAS_HEIGHT);
  return container.clientHeight;
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
