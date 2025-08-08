/**
 * techAvailability.js
 * - Add this file as a JS block in Bolt.new or as a file in your StackBlitz project.
 * - Configure SUPABASE_URL and SUPABASE_ANON_KEY below (or use Bolt.new secure settings).
 *
 * Features:
 *  - Loads technicians from Supabase (fallback to local array if needed)
 *  - Renders clickable list with status badges
 *  - Click a tech to assign them to a ticket (calls Supabase REST PATCH)
 *  - Change tech status (Available, On Site, Busy, Unavailable)
 */

/* ====== CONFIGURE THESE ====== */
const SUPABASE_URL = "<YOUR_SUPABASE_URL>";            // e.g. https://abcxyz.supabase.co
const SUPABASE_ANON_KEY = "<YOUR_SUPABASE_ANON_KEY>";  // put anon key here or load from env
/* ============================ */

/* If you prefer not to paste keys directly, load them from Bolt.new environment variables
   (check Bolt.new project settings) and assign them to SUPABASE_URL / SUPABASE_ANON_KEY above. */

/* ----- DOM container id where the list will render ----- */
const CONTAINER_ID = "tech-availability-container";

/* ----- Local fallback - edit names/statuses here if you want local-only first ----- */
const LOCAL_TECHS_FALLBACK = [
  { id: 1, name: "Monica Ndlovu", status: "Available" },
  { id: 2, name: "Sisanda Mavuso", status: "On Site" },
  { id: 3, name: "Setu Xolilizwe", status: "Busy" },
  { id: 4, name: "Phelokazi Madala", status: "Available" },
  { id: 5, name: "Kabelo Molefe", status: "Unavailable" }
];

/* ---------- Helpers ---------- */
function apiHeaders() {
  return {
    "Content-Type": "application/json",
    "apikey": SUPABASE_ANON_KEY,
    "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
    "Prefer": "return=representation"
  };
}

function statusBadgeText(status) {
  // normalize text
  switch ((status || "").toLowerCase()) {
    case "available": return "Available";
    case "on site": case "onsite": return "On Site";
    case "busy": return "Busy";
    case "unavailable": return "Unavailable";
    default: return status || "Unknown";
  }
}

function statusBadgeColorClass(status) {
  switch ((status || "").toLowerCase()) {
    case "available": return "badge-available"; // green
    case "on site": case "onsite": return "badge-onsite"; // orange
    case "busy": return "badge-busy"; // red
    case "unavailable": return "badge-unavailable"; // grey
    default: return "badge-unknown";
  }
}

/* ---------- Rendering (simple vanilla DOM) ---------- */
function createStyles() {
  if (document.getElementById("tech-availability-styles")) return;
  const style = document.createElement("style");
  style.id = "tech-availability-styles";
  style.innerHTML = `
    #${CONTAINER_ID} { font-family: Arial, sans-serif; max-width: 420px; }
    .tech-card { display:flex; justify-content:space-between; align-items:center; padding:10px; border-radius:8px; margin-bottom:8px; box-shadow: 0 1px 2px rgba(0,0,0,0.05); background: #fff; }
    .tech-left { display:flex; align-items:center; gap:12px; }
    .tech-avatar { width:44px; height:44px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:600; background:#eee; color:#333; }
    .tech-name { font-size:15px; font-weight:600; }
    .tech-status { font-size:13px; }
    .badge-available { color: #166534; background: #dcfce7; padding:6px 8px; border-radius:999px; font-weight:600; }
    .badge-onsite { color: #92400e; background: #fff7ed; padding:6px 8px; border-radius:999px; font-weight:600; }
    .badge-busy { color: #991b1b; background: #fee2e2; padding:6px 8px; border-radius:999px; font-weight:600; }
    .badge-unavailable { color: #4b5563; background: #f3f4f6; padding:6px 8px; border-radius:999px; font-weight:600; }
    .assign-btn { margin-left:12px; padding:7px 10px; border-radius:8px; border: none; cursor: pointer; font-weight:600; }
    .assign-btn:hover { transform: translateY(-1px); }
    .assign-btn--primary { background:#0ea5a4; color:white; }
    .assign-btn--muted { background:#e6eef0; color:#064e52; }
    .status-select { margin-left:8px; padding:6px; border-radius:6px; }
    .small { font-size:12px; color:#6b7280; }
  `;
  document.head.appendChild(style);
}

function makeAvatar(name) {
  if (!name) return "";
  const parts = name.split(" ");
  const initials = (parts[0][0] || "") + (parts[1] ? parts[1][0] : "");
  return initials.toUpperCase();
}

function renderTechs(techs = [], currentTicketId = null) {
  createStyles();
  const container = document.getElementById(CONTAINER_ID);
  if (!container) {
    console.error(`[techAvailability] Missing container element with id '${CONTAINER_ID}'. Create a div with that id.`);
    return;
  }
  container.innerHTML = ""; // clear

  // Header (optional)
  const header = document.createElement("div");
  header.style.display = "flex";
  header.style.justifyContent = "space-between";
  header.style.alignItems = "center";
  header.style.marginBottom = "10px";
  header.innerHTML = `<div style="font-weight:700">Tech Availability</div>
                      <div class="small">Click a tech to assign${currentTicketId ? " (ticket ID: " + currentTicketId + ")" : ""}</div>`;
  container.appendChild(header);

  techs.forEach(tech => {
    const card = document.createElement("div");
    card.className = "tech-card";

    const left = document.createElement("div");
    left.className = "tech-left";
    const avatar = document.createElement("div");
    avatar.className = "tech-avatar";
    avatar.textContent = makeAvatar(tech.name);

    const info = document.createElement("div");
    const nameEl = document.createElement("div");
    nameEl.className = "tech-name";
    nameEl.textContent = tech.name;

    const statusEl = document.createElement("div");
    statusEl.className = "tech-status";
    statusEl.innerHTML = `<span class="${statusBadgeColorClass(tech.status)}">${statusBadgeText(tech.status)}</span>`;

    info.appendChild(nameEl);
    info.appendChild(statusEl);

    left.appendChild(avatar);
    left.appendChild(info);

    const right = document.createElement("div");
    right.style.display = "flex";
    right.style.alignItems = "center";

    // Assign button
    const assignBtn = document.createElement("button");
    assignBtn.className = "assign-btn assign-btn--primary";
    assignBtn.textContent = "Assign";
    assignBtn.title = `Assign ${tech.name}`;
    assignBtn.onclick = () => {
      // If currentTicketId is null, ask for ticket id
      let ticketId = currentTicketId;
      if (!ticketId) {
        ticketId = prompt("Enter ticket ID to assign to " + tech.name + " (exact ID):");
        if (!ticketId) return;
      }
      assignTechnicianToTicket(ticketId, tech).then(() => {
        alert(`${tech.name} assigned to ticket ${ticketId}`);
        // optional: refresh things
        fetchAndRender(currentTicketId);
      }).catch(err => {
        console.error(err);
        alert("Failed to assign technician. See console.");
      });
    };

    // Status select
    const select = document.createElement("select");
    select.className = "status-select";
    ["Available", "On Site", "Busy", "Unavailable"].forEach(s => {
      const o = document.createElement("option");
      o.value = s;
      o.textContent = s;
      if ((tech.status || "").toLowerCase() === s.toLowerCase()) o.selected = true;
      select.appendChild(o);
    });
    select.onchange = () => {
      const newStatus = select.value;
      updateTechnicianStatus(tech.id, newStatus).then(() => {
        // local update UI quickly
        tech.status = newStatus;
        renderTechs(techs, currentTicketId);
      }).catch(e => {
        console.error(e);
        alert("Failed to update status");
      });
    };

    right.appendChild(assignBtn);
    right.appendChild(select);

    card.appendChild(left);
    card.appendChild(right);
    container.appendChild(card);
  });
}

/* ---------- Supabase REST functions ---------- */

/**
 * Fetch technicians from Supabase
 * Returns array of { id, name, status, ... }
 */
async function fetchTechnicians() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.warn("[techAvailability] Supabase keys not configured — using local fallback.");
    return LOCAL_TECHS_FALLBACK;
  }
  const url = `${SUPABASE_URL}/rest/v1/technicians?select=id,name,status&order=name.asc`;
  const res = await fetch(url, {
    method: "GET",
    headers: apiHeaders()
  });
  if (!res.ok) {
    console.error("Failed to fetch technicians from Supabase", res.status, await res.text());
    return LOCAL_TECHS_FALLBACK;
  }
  const data = await res.json();
  return data;
}

/**
 * Assign a technician to a ticket (PATCH)
 * ticketId: id of ticket (string or number)
 * tech: technician object { id, name, status }
 *
 * Assumes your tickets table has a column 'assigned_to' (string or technician id)
 */
async function assignTechnicianToTicket(ticketId, tech) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    // Local simulation fallback
    console.log(`[techAvailability] (Local) Assigning ${tech.name} -> ticket ${ticketId}`);
    return Promise.resolve();
  }
  // If your tickets.assigned_to stores the tech name:
  // body = { assigned_to: tech.name, status: "Assigned" }
  // If it stores tech id, change accordingly (assigned_to_id: tech.id)
  const body = {
    assigned_to: tech.name,
    status: "Assigned"
  };

  const url = `${SUPABASE_URL}/rest/v1/tickets?id=eq.${encodeURIComponent(ticketId)}`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: apiHeaders(),
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Supabase assign failed: ${res.status} ${txt}`);
  }
  const updated = await res.json();
  return updated;
}

/**
 * Update technician status in Supabase
 */
async function updateTechnicianStatus(techId, newStatus) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.log(`[techAvailability] (Local) updating tech ${techId} status -> ${newStatus}`);
    return Promise.resolve();
  }
  // adjust id format if your techId is uuid (wrap in quotes for eq.'uuid')
  const idFilter = typeof techId === "string" ? `id=eq.${encodeURIComponent(techId)}` : `id=eq.${techId}`;
  const url = `${SUPABASE_URL}/rest/v1/technicians?${idFilter}`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: apiHeaders(),
    body: JSON.stringify({ status: newStatus })
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Supabase update status failed: ${res.status} ${txt}`);
  }
  const updated = await res.json();
  return updated;
}

/* ---------- Public init + refresh ---------- */

/**
 * Call this to render availability in the page.
 * Provide optional ticketId to show which ticket will be assigned by default on "Assign".
 * Example: initTechAvailability("ticket-12345");
 */
async function initTechAvailability(ticketId = null) {
  // Make sure container exists; if not, create in body (for quick test)
  if (!document.getElementById(CONTAINER_ID)) {
    const div = document.createElement("div");
    div.id = CONTAINER_ID;
    // Optionally append somewhere specific in Bolt.new page
    document.body.appendChild(div);
  }
  createStyles();
  try {
    const techs = await fetchTechnicians();
    renderTechs(techs, ticketId);
  } catch (err) {
    console.error("Error initializing tech availability:", err);
    // fallback to local
    renderTechs(LOCAL_TECHS_FALLBACK, ticketId);
  }
}

/**
 * Utility to refresh UI (re-fetch)
 */
async function fetchAndRender(ticketId = null) {
  try {
    const techs = await fetchTechnicians();
    renderTechs(techs, ticketId);
  } catch (err) {
    console.warn("Refresh failed, using fallback", err);
    renderTechs(LOCAL_TECHS_FALLBACK, ticketId);
  }
}

/* Export functions for other scripts or Bolt blocks to call */
window.techAvailability = {
  init: initTechAvailability,
  refresh: fetchAndRender,
  assign: assignTechnicianToTicket,
  updateStatus: updateTechnicianStatus
};
