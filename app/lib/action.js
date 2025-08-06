"use server";

const { addGuest, updateGuest } = require("./data");

export async function addGuestAction(formData) {
  try {
    const guest = await addGuest({
      name: formData.get("name"),
      partySize: parseInt(formData.get("partySize")),
      phone: formData.get("phone"),
      priority: formData.get("priority") === "on",
    });
    return { success: true, guest };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function callGuestAction(id) {
  try {
    const guest = await updateGuest(id, {
      status: "CALLED",
      calledAt: new Date().toISOString(),
    });
    return { success: true, guest };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function seatGuestAction(id) {
  try {
    const guest = await updateGuest(id, {
      status: "SEATED",
      seatedAt: new Date().toISOString(),
      calledAt: null,
    });
    return { success: true, guest };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function removeGuestAction(id) {
  try {
    const guest = await updateGuest(id, {
      status: "REMOVED",
      removedAt: new Date().toISOString(),
      calledAt: null,
    });
    return { success: true, guest };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
