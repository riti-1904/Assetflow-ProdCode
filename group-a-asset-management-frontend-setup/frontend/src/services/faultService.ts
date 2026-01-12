// src/services/faultService.ts
const API_BASE_URL = 'http://localhost:5219/api';

export interface FaultCreatePayload {
  assetId: number;
  reportedByUserId: number;
  description: string;
  severity: string;
}

export interface FaultUpdatePayload {
  status?: string;
  assignedToUserId?: number | null;
  rootCauseNotes?: string | null;
  resolution?: string | null;
}

export interface FaultResponse {
  id: string;
  faultId: string;
  assetTag: string;
  assetName: string;
  status: 'New' | 'Assigned' | 'In Progress' | 'Resolved';
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  type: string;
  description: string;
  reportedBy: string;
  reportedDate: string;
  assignedTo?: string;
  location: string;
  department: string;
  sla: string;
  rootCause?: string;
  resolution?: string;
}

// Get all faults
export async function getFaults(): Promise<FaultResponse[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/faults`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return mapFaultsFromAPI(data);
  } catch (error) {
    console.error('Error fetching faults:', error);
    throw error;
  }
}

// Get single fault
export async function getFaultById(id: string): Promise<FaultResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/faults/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return mapFaultFromAPI(data);
  } catch (error) {
    console.error('Error fetching fault:', error);
    throw error;
  }
}

// Create fault
export async function createFault(payload: FaultCreatePayload): Promise<FaultResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/faults`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return mapFaultFromAPI(data);
  } catch (error) {
    console.error('Error creating fault:', error);
    throw error;
  }
}

// Update fault
export async function updateFault(id: string, payload: FaultUpdatePayload): Promise<FaultResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/faults/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return mapFaultFromAPI(data);
  } catch (error) {
    console.error('Error updating fault:', error);
    throw error;
  }
}

// Delete fault
export async function deleteFault(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/faults/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error deleting fault:', error);
    throw error;
  }
}

// Helper function to map API response to FaultResponse
function mapFaultFromAPI(apiData: any): FaultResponse {
  return {
    id: String(apiData.faultId),
    faultId: apiData.faultId,
    assetTag: apiData.asset?.assetTag ?? 'N/A',
    assetName: apiData.asset?.assetName ?? 'N/A',
    status: apiData.status || 'New',
    severity: apiData.severity || 'Low',
    type: apiData.type || 'General',
    description: apiData.description || '',
    reportedBy: apiData.reporter?.name ?? 'Unknown',
    reportedDate: apiData.reportedAt || new Date().toISOString(),
    assignedTo: apiData.technician?.name,
    location: apiData.location || 'N/A',
    department: apiData.department || 'N/A',
    sla: apiData.slaDueAt || new Date().toISOString(),
    rootCause: apiData.rootCauseNotes,
    resolution: apiData.resolution,
  };
}

function mapFaultsFromAPI(apiDataArray: any[]): FaultResponse[] {
  return apiDataArray.map(mapFaultFromAPI);
}










// -----------------------

// const BASE_URL = "http://localhost:5219/api/faults";

// /* =========================
//    Types
// ========================= */
// export interface FaultCreatePayload {
//   assetId: number;
//   reportedByUserId: number;
//   description: string;
//   severity: string;
// }

// export interface FaultUpdatePayload {
//   status: string;
//   assignedToUserId?: number | null;
//   rootCauseNotes?: string | null;
//   resolution?: string | null;
// }

// /* =========================
//    API Calls
// ========================= */

// // GET ALL FAULTS
// export const getFaults = async () => {
//   const res = await fetch(BASE_URL);
//   if (!res.ok) throw new Error("Failed to fetch faults");
//   return res.json();
// };

// // CREATE FAULT
// export const createFault = async (payload: FaultCreatePayload) => {
//   const res = await fetch(BASE_URL, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload),
//   });

//   if (!res.ok) throw new Error("Failed to create fault");
//   return res.json();
// };

// // UPDATE FAULT
// export const updateFault = async (
//   id: number,
//   payload: FaultUpdatePayload
// ) => {
//   const res = await fetch(`${BASE_URL}/${id}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload),
//   });

//   if (!res.ok) throw new Error("Failed to update fault");
//   return res.json();
// };

// // DELETE FAULT
// export const deleteFault = async (id: number) => {
//   const res = await fetch(`${BASE_URL}/${id}`, {
//     method: "DELETE",
//   });

//   if (!res.ok) throw new Error("Failed to delete fault");
// };
