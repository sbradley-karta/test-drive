const canvas = document.getElementById("canvas");
const notes = document.getElementById("notes");
const template = document.getElementById("widget-template");

let z = 5;
let counter = 1;

document.querySelectorAll(".palette button[data-widget]").forEach((btn) => {
  btn.addEventListener("click", () => addWidget(btn.dataset.widget));
});

document.getElementById("clear-canvas").addEventListener("click", () => {
  canvas.innerHTML = "";
  notes.innerHTML = "";
  counter = 1;
});

function addWidget(type) {
  const widget = template.content.firstElementChild.cloneNode(true);
  widget.dataset.type = type;
  widget.style.left = `${40 + counter * 14}px`;
  widget.style.top = `${40 + counter * 14}px`;
  widget.style.width = type === "kpi" ? "220px" : "320px";
  widget.style.height = type === "kpi" ? "160px" : "220px";
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

  widget.querySelector(".remove").addEventListener("click", () => {
    widget.remove();
    syncNotes();
  });

  makeDraggable(widget);
  makeResizable(widget);
  canvas.appendChild(widget);
  syncNotes();
  counter += 1;
}

function syncNotes() {
  const items = [...canvas.querySelectorAll(".widget")].map((node, idx) => {
    const name = node.querySelector(".widget-header").textContent.trim();
    return `<li>${idx + 1}. ${name}</li>`;
  });
  notes.innerHTML = items.join("") || "<li>No widgets added yet.</li>";
}

function makeDraggable(el) {
  const header = el.querySelector(".widget-header");
  let startX = 0;
  let startY = 0;
  let baseX = 0;
  let baseY = 0;
  let dragging = false;

  header.addEventListener("mousedown", (e) => {
    dragging = true;
    startX = e.clientX;
    startY = e.clientY;
    baseX = el.offsetLeft;
    baseY = el.offsetTop;
    el.style.zIndex = ++z;
    document.body.style.userSelect = "none";
  });

  window.addEventListener("mousemove", (e) => {
    if (!dragging) return;
    const x = baseX + (e.clientX - startX);
    const y = baseY + (e.clientY - startY);
    el.style.left = `${Math.max(0, x)}px`;
    el.style.top = `${Math.max(0, y)}px`;
  });

  window.addEventListener("mouseup", () => {
    dragging = false;
    document.body.style.userSelect = "";
  });
}

function makeResizable(el) {
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
    const w = Math.max(160, startW + (e.clientX - startX));
    const h = Math.max(120, startH + (e.clientY - startY));
    el.style.width = `${w}px`;
    el.style.height = `${h}px`;
  });

  window.addEventListener("mouseup", () => {
    resizing = false;
    document.body.style.userSelect = "";
  });
}

syncNotes();
