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

let z = 5;
let counter = 1;
const GRID_SIZE = 14;

document.querySelectorAll(".controls button[data-widget]").forEach((btn) => {
  btn.addEventListener("click", () => addWidget(btn.dataset.widget));
});

document.getElementById("clear-canvas").addEventListener("click", () => {
  canvas.innerHTML = "";
  insightsCanvas.innerHTML = "";
  contextFilterRow.innerHTML = "";
  counter = 1;
});

exportPdfBtn.addEventListener("click", () => {
  document.body.classList.add("print-mode");
  window.print();
  setTimeout(() => document.body.classList.remove("print-mode"), 250);
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
  widget.style.left = `${16 + (counter % 8) * 12}px`;
  widget.style.top = `${16 + (counter % 8) * 12}px`;
  widget.style.width = getDefaultWidth(type);
  widget.style.height = getDefaultHeight(type);
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
    title.textContent = "Grid: Monthly Forecast";
    content.innerHTML = `
      <table class="grid-table">
        <thead>
          <tr><th>BU</th><th>Jan</th><th>Feb</th><th>Mar</th></tr>
        </thead>
        <tbody>
          <tr><td contenteditable="true">Enterprise</td><td contenteditable="true">120</td><td contenteditable="true">132</td><td contenteditable="true">141</td></tr>
          <tr><td contenteditable="true">Mid Market</td><td contenteditable="true">88</td><td contenteditable="true">91</td><td contenteditable="true">96</td></tr>
          <tr><td contenteditable="true">SMB</td><td contenteditable="true">46</td><td contenteditable="true">49</td><td contenteditable="true">53</td></tr>
        </tbody>
      </table>
    `;
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
    title.textContent = "Action Button";
    content.innerHTML = `
      <div class="button-widget-wrap">
        <button class="mock-action-btn" type="button">Submit Forecast</button>
      </div>
    `;
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
    title.textContent = "Text";
    content.innerHTML = `
      <div class="text-widget" contenteditable="true">Section Header / Instructional Text</div>
    `;
  }

  widget.querySelector(".remove").addEventListener("click", () => {
    widget.remove();
    if (destination === insightsCanvas) {
      stackInsightsWidgets();
    }
  });

  destination.appendChild(widget);

  if (destination === insightsCanvas) {
    stackInsightsWidgets();
  }

  makeDraggable(widget, destination);
  makeResizable(widget, destination);
  counter += 1;
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
  if (type === "kpi") return "220px";
  if (type === "button") return "220px";
  if (type === "context-filter") return "250px";
  if (type === "text") return "280px";
  return "300px";
}

function getDefaultHeight(type) {
  if (type === "kpi") return "160px";
  if (type === "button") return "140px";
  if (type === "context-filter") return "140px";
  if (type === "text") return "120px";
  return "220px";
}

function stackInsightsWidgets() {
  const widgets = [...insightsCanvas.querySelectorAll(".widget")];
  let y = 8;
  widgets.forEach((widget) => {
    widget.style.left = "8px";
    widget.style.width = `${Math.max(170, insightsCanvas.clientWidth - 16)}px`;
    widget.style.top = `${y}px`;
    y += widget.offsetHeight + 8;
    widget.style.zIndex = ++z;
  });
}

function makeDraggable(el, container) {
  const handle = el.querySelector(".drag-handle");
  let startX = 0;
  let startY = 0;
  let baseX = 0;
  let baseY = 0;
  let dragging = false;

  handle.addEventListener("mousedown", (e) => {
    dragging = true;
    startX = e.clientX;
    startY = e.clientY;
    baseX = el.offsetLeft;
    baseY = el.offsetTop;
    el.style.zIndex = ++z;
    document.body.style.userSelect = "none";
    e.preventDefault();
  });

  window.addEventListener("mousemove", (e) => {
    if (!dragging) return;
    const x = baseX + (e.clientX - startX);
    const y = baseY + (e.clientY - startY);
    const maxX = Math.max(0, container.clientWidth - el.offsetWidth);
    const maxY = Math.max(0, container.clientHeight - el.offsetHeight);
    el.style.left = `${Math.min(maxX, Math.max(0, x))}px`;
    el.style.top = `${Math.min(maxY, Math.max(0, y))}px`;
  });

  window.addEventListener("mouseup", () => {
    if (dragging && container === insightsCanvas) {
      stackInsightsWidgets();
    }
    dragging = false;
    document.body.style.userSelect = "";
  });
}

function makeResizable(el, container) {
  const handle = el.querySelector(".resize-handle");
  let startX = 0;
  let startY = 0;
  let startW = 0;
  let startH = 0;
  let resizing = false;

  handle.addEventListener("mousedown", (e) => {
    e.stopPropagation();
    resizing = true;
    startX = e.clientX;
    startY = e.clientY;
    startW = el.offsetWidth;
    startH = el.offsetHeight;
    document.body.style.userSelect = "none";
  });

  window.addEventListener("mousemove", (e) => {
    if (!resizing) return;
    let w = Math.max(160, startW + (e.clientX - startX));
    let h = Math.max(110, startH + (e.clientY - startY));

    if (container === canvas) {
      w = snapToGrid(w, GRID_SIZE);
      h = snapToGrid(h, GRID_SIZE);
    }

    el.style.width = `${w}px`;
    el.style.height = `${h}px`;
  });

  window.addEventListener("mouseup", () => {
    if (resizing && container === insightsCanvas) {
      stackInsightsWidgets();
    }
    resizing = false;
    document.body.style.userSelect = "";
  });
}

function snapToGrid(value, size) {
  return Math.round(value / size) * size;
}
