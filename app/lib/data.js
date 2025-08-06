const fs = require("fs").promises;
const path = require("path");

const DATA_PATH = process.env.DATA_PATH || "./data/guests.json";

// Ensure data file exists
async function initializeData() {
  try {
    await fs.access(DATA_PATH);
  } catch {
    await fs.writeFile(DATA_PATH, JSON.stringify([]));
  }
}

// Read guests
async function getGuests() {
  await initializeData();
  const data = await fs.readFile(DATA_PATH, "utf8");
  if (!data.trim()) return [];
  try {
    return JSON.parse(data);
  } catch {
    await fs.writeFile(DATA_PATH, JSON.stringify([]));
    return [];
  }
}

// Write guests
async function saveGuests(guests) {
  await fs.writeFile(DATA_PATH, JSON.stringify(guests, null, 2));
}

// Add a guest
async function addGuest({ name, partySize, phone, priority }) {
  const guests = await getGuests();
  const quotedWait = calculateQuotedWait(guests, partySize);
  const newGuest = {
    id: Date.now().toString(),
    name,
    partySize: parseInt(partySize),
    phone: phone || null,
    priority: !!priority,
    status: "WAITING",
    createdAt: new Date().toISOString(),
    calledAt: null,
    seatedAt: null,
    removedAt: null,
    quotedWait,
  };
  guests.push(newGuest);
  // Sort: priority first, then by createdAt
  guests.sort((a, b) => {
    if (a.priority && !b.priority) return -1;
    if (!a.priority && b.priority) return 1;
    return new Date(a.createdAt) - new Date(b.createdAt);
  });
  await saveGuests(guests);
  return newGuest;
}

// Update guest status
async function updateGuest(id, updates) {
  const guests = await getGuests();
  const index = guests.findIndex((g) => g.id === id);
  if (index === -1) throw new Error("Guest not found");
  guests[index] = { ...guests[index], ...updates };
  await saveGuests(guests);
  return guests[index];
}

// Calculate quoted wait time
function calculateQuotedWait(guests, partySize) {
  const waitingGuests = guests.filter((g) => g.status === "WAITING");
  const position = waitingGuests.length + 1;
  return position * 15 + (partySize >= 5 ? 5 : 0);
}

// Get stats for today
async function getStats() {
  const guests = await getGuests();
  const today = new Date().toISOString().split("T")[0];
  const todayGuests = guests.filter((g) => g.createdAt.startsWith(today));

  const stats = {
    totalAdded: todayGuests.length,
    totalSeated: todayGuests.filter((g) => g.status === "SEATED").length,
    totalRemoved: todayGuests.filter((g) => g.status === "REMOVED").length,
    averageWait: 0,
    byPartySize: {
      small: todayGuests.filter((g) => g.partySize <= 2).length,
      medium: todayGuests.filter((g) => g.partySize >= 3 && g.partySize <= 4).length,
      large: todayGuests.filter((g) => g.partySize >= 5).length,
    },
  };

  const seated = todayGuests.filter((g) => g.status === "SEATED");
  if (seated.length > 0) {
    const totalWait = seated.reduce((sum, g) => {
      const wait = (new Date(g.seatedAt) - new Date(g.createdAt)) / (1000 * 60);
      return sum + wait;
    }, 0);
    stats.averageWait = Math.round(totalWait / seated.length);
  }

  stats.percentRemoved = stats.totalAdded > 0 ? Math.round((stats.totalRemoved / stats.totalAdded) * 100) : 0;

  return stats;
}

module.exports = {
  getGuests,
  addGuest,
  updateGuest,
  getStats,
};
