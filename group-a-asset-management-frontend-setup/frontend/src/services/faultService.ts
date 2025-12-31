const BASE_URL = "http://localhost:5219/api/faults";

/* =========================
   Types
========================= */
export interface FaultCreatePayload {
  assetId: number;
  reportedByUserId: number;
  description: string;
  severity: string;
}

export interface FaultUpdatePayload {
  status: string;
  assignedToUserId?: number | null;
  rootCauseNotes?: string | null;
  resolution?: string | null;
}

/* =========================
   API Calls
========================= */

// GET ALL FAULTS
export const getFaults = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch faults");
  return res.json();
};

// CREATE FAULT
export const createFault = async (payload: FaultCreatePayload) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to create fault");
  return res.json();
};

// UPDATE FAULT
export const updateFault = async (
  id: number,
  payload: FaultUpdatePayload
) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to update fault");
  return res.json();
};

// DELETE FAULT
export const deleteFault = async (id: number) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete fault");
};
