import axios from "axios";

const API_BASE_URL = "http://localhost:5219/api";

export interface Asset {
  assetId: number;
  dasId: string;
  userName: string;
  assetsLocation: string;
  make: string;
  model: string;
  laptopCategory: string;
  laptopAssetsTag: string;
  powerAdapterDetails: string;
  assignmentDate: string;
  installStatus: string;
  assetsStatus: string;
  additional16GbRamStatus: string;
  assetsProcureStatus: string;
  warrantyStartDate: string;
  warrantyExpiredDate: string;
  ageingOfAssets: number;

  technicalSpecification: TechnicalSpecification | null;
  assignment: Assignment | null;
  movements: Movement[] | null;
  maintenanceHistory: Maintenance[] | null;
}

export interface TechnicalSpecification {
  processor: string;
  ram: string;
  storage: string;
  display: string;
  gpu: string;
}

export interface Assignment {
  currentLocation: string;
  department: string;
  owner: string;
  custodian: string;
}

export interface Movement {
  movementType: string;
  fromLocation: string;
  toLocation: string;
  movedBy: string;
  movementDate: string;
}

export interface Maintenance {
  maintenanceType: string;
  description: string;
  technician: string;
  status: string;
  maintenanceDate: string;
}

export interface CreateAssetRequest {
  dasId: string;
  userName: string;
  assetsLocation: string;
  make: string;
  model: string;
  laptopCategory: string;
  laptopAssetsTag: string;
  powerAdapterDetails?: string;
  assignmentDate?: string;
  installStatus?: string;
  assetsStatus: string;
  additional16GbRamStatus?: string;
  assetsProcureStatus?: string;
  warrantyStartDate?: string;
  warrantyExpiredDate?: string;
  ageingOfAssets?: number;

  processor?: string;
  ram?: string;
  storage?: string;
  display?: string;
  gpu?: string;

  department?: string;
  owner?: string;
}

// LIST
export const getAssets = async (): Promise<Asset[]> => {
  const res = await axios.get(`${API_BASE_URL}/assets`);
  return res.data;
};

// DETAILS
export const getAssetById = async (id: string): Promise<Asset> => {
  const res = await axios.get(`${API_BASE_URL}/assets/${id}`);
  return res.data;
};

export const createAsset = async (payload: CreateAssetRequest): Promise<Asset> => {
  const res = await axios.post(`${API_BASE_URL}/assets`, payload);
  return res.data;
};

export interface UpdateAssetStatusLocationRequest {
  assetsStatus: string;
  assetsLocation: string;
}

export const updateAssetStatusLocation = async (
  id: string,
  payload: UpdateAssetStatusLocationRequest
): Promise<Asset> => {
  const res = await axios.put(`${API_BASE_URL}/assets/${id}`, payload);
  return res.data;
};

export const deleteAsset = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/assets/${id}`);
};

export interface CreateMovementRequest {
  movementType: string;
  fromLocation?: string;
  toLocation?: string;
  movedBy: string;
  movementDate: string;
}

export const createMovement = async (assetId: string, payload: CreateMovementRequest) => {
  const res = await axios.post(`${API_BASE_URL}/assets/${assetId}/movements`, payload);
  return res.data;
};
