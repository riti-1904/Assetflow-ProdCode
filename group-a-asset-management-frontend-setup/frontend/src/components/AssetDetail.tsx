import { ArrowLeft, Edit2, Trash2, Package, Calendar, DollarSign, MapPin, Users, FileText, Clock, TrendingUp } from 'lucide-react';
 import { useEffect, useMemo, useState } from "react";
import { getAssetById, Asset } from "../services/assetService.ts";

type User = {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Asset Manager' | 'Technician' | 'Employee';
};

type AssetDetailProps = {
  assetId: string;
  user: User;
  onBack: () => void;
};

type MovementHistoryItem = {
  id: number;
  date: string;
  action: string;
  from: string;
  to: string;
  by: string;
};

type MaintenanceHistoryItem = {
  id: number;
  date: string;
  type: string;
  description: string;
  technician: string;
  status: string;
};

export function AssetDetail({ assetId, user, onBack }: AssetDetailProps) {
  // Mock asset detail data
  const [asset, setAsset] = useState<Asset | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError("");

    getAssetById(assetId)
      .then((data) => {
        if (cancelled) return;
        setAsset(data);
      })
      .catch(() => {
        if (cancelled) return;
        setError("Failed to load asset details");
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [assetId]);

  const viewModel = useMemo(() => {
    if (!asset) return null;

    const assetTag = asset.laptopAssetsTag;
    const model = asset.model;
    const category = asset.laptopCategory;
    const type = "Laptop";
    const vendor = asset.make;

    const assignment = asset.assignment;
    const location = assignment?.currentLocation ?? asset.assetsLocation;
    const department = assignment?.department ?? "";
    const owner = assignment?.owner ?? "";
    const custodian = assignment?.custodian ?? asset.userName;

    const purchaseDate = asset.assignmentDate ?? "";
    const warranty = asset.warrantyExpiredDate ?? "";

    const lifecycleStatus = asset.assetsStatus;

    const description = asset.powerAdapterDetails ?? "";

    const specifications = asset.technicalSpecification
      ? {
          processor: asset.technicalSpecification.processor,
          ram: asset.technicalSpecification.ram,
          storage: asset.technicalSpecification.storage,
          display: asset.technicalSpecification.display,
          gpu: asset.technicalSpecification.gpu,
        }
      : {};

    type ApiMovement = NonNullable<Asset["movements"]>[number];
    type ApiMaintenance = NonNullable<Asset["maintenanceHistory"]>[number];

    const movementHistory: MovementHistoryItem[] = (asset.movements ?? []).map((m: ApiMovement, idx: number) => {
      const movementId = (m as unknown as { movementId?: number }).movementId;
      return {
        id: movementId ?? idx,
        date: m.movementDate,
        action: m.movementType,
        from: m.fromLocation,
        to: m.toLocation,
        by: m.movedBy,
      };
    });

    const maintenanceHistory: MaintenanceHistoryItem[] = (asset.maintenanceHistory ?? []).map((m: ApiMaintenance, idx: number) => {
      const maintenanceId = (m as unknown as { maintenanceId?: number }).maintenanceId;
      return {
        id: maintenanceId ?? idx,
        date: m.maintenanceDate,
        type: m.maintenanceType,
        description: m.description,
        technician: m.technician,
        status: m.status,
      };
    });

    return {
      assetTag,
      model,
      category,
      type,
      vendor,
      purchaseCost: 0,
      purchaseDate,
      warranty,
      lifecycleStatus,
      location,
      department,
      owner,
      custodian,
      serialNumber: "",
      description,
      specifications,
      movementHistory,
      maintenanceHistory,
    };
  }, [asset]);

  const canEdit = user.role === 'Admin' || user.role === 'Asset Manager';

  const getStatusColor = (status: string) => {
    const colors = {
      'Procured': 'bg-blue-100 text-blue-700',
      'In Use': 'bg-green-100 text-green-700',
      'Under Maintenance': 'bg-yellow-100 text-yellow-700',
      'Repaired': 'bg-purple-100 text-purple-700',
      'Decommissioned': 'bg-gray-100 text-gray-700',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  if (loading) return <p className="p-4">Loading asset...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!viewModel) return <p className="p-4">Asset not found</p>;

  const movementHistory = viewModel.movementHistory;
  const maintenanceHistory = viewModel.maintenanceHistory;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h2 className="text-gray-900">{viewModel.assetTag} - {viewModel.model}</h2>
            <p className="text-gray-600">{viewModel.type} • {viewModel.category}</p>
          </div>
        </div>
        {canEdit && (
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Edit2 className="w-4 h-4" />
              Edit Asset
            </button>
            <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Status Badge */}
      <div>
        <span className={`px-4 py-2 rounded-full ${getStatusColor(viewModel.lifecycleStatus)}`}>
          {viewModel.lifecycleStatus}
        </span>
      </div>

      {/* Main Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Basic Information */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-gray-900 mb-4">Basic Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-gray-600 mb-1">Asset Tag</div>
              <div className="text-gray-900">{viewModel.assetTag}</div>
            </div>
            <div>
              <div className="text-gray-600 mb-1">Serial Number</div>
              <div className="text-gray-900">{viewModel.serialNumber}</div>
            </div>
            <div>
              <div className="text-gray-600 mb-1">Type</div>
              <div className="text-gray-900">{viewModel.type}</div>
            </div>
            <div>
              <div className="text-gray-600 mb-1">Category</div>
              <div className="text-gray-900">{viewModel.category}</div>
            </div>
            <div>
              <div className="text-gray-600 mb-1">Model</div>
              <div className="text-gray-900">{viewModel.model}</div>
            </div>
            <div>
              <div className="text-gray-600 mb-1">Vendor</div>
              <div className="text-gray-900">{viewModel.vendor}</div>
            </div>
            <div className="col-span-2">
              <div className="text-gray-600 mb-1">Description</div>
              <div className="text-gray-900">{viewModel.description}</div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-gray-600">Purchase Cost</div>
            </div>
            <div className="text-gray-900">${viewModel.purchaseCost.toLocaleString()}</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-gray-600">Warranty Until</div>
            </div>
            <div className="text-gray-900">
              {viewModel.warranty ? new Date(viewModel.warranty).toLocaleDateString() : "-"}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-gray-600">Age</div>
            </div>
            <div className="text-gray-900">
              {viewModel.purchaseDate
                ? `${Math.floor((Date.now() - new Date(viewModel.purchaseDate).getTime()) / (1000 * 60 * 60 * 24))} days`
                : "-"}
            </div>
          </div>
        </div>
      </div>

      {/* Location & Assignment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-gray-600" />
            <h3 className="text-gray-900">Location & Assignment</h3>
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-gray-600 mb-1">Current Location</div>
              <div className="text-gray-900">{viewModel.location}</div>
            </div>
            <div>
              <div className="text-gray-600 mb-1">Department</div>
              <div className="text-gray-900">{viewModel.department}</div>
            </div>
            <div>
              <div className="text-gray-600 mb-1">Owner</div>
              <div className="text-gray-900">{viewModel.owner}</div>
            </div>
            <div>
              <div className="text-gray-600 mb-1">Custodian</div>
              <div className="text-gray-900">{viewModel.custodian}</div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-5 h-5 text-gray-600" />
            <h3 className="text-gray-900">Technical Specifications</h3>
          </div>
          <div className="space-y-2">
            {Object.entries(viewModel.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="text-gray-600 capitalize">{key}:</span>
                <span className="text-gray-900">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Movement History */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-gray-600" />
          <h3 className="text-gray-900">Movement History</h3>
        </div>
        <div className="space-y-3">
          {movementHistory.map((movement: any) => (
            <div key={movement.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-900">{movement.action}</span>
                  <span className="text-gray-500">{new Date(movement.date).toLocaleDateString()}</span>
                </div>
                <div className="text-gray-600">
                  From: {movement.from} → To: {movement.to}
                </div>
                <div className="text-gray-500">By: {movement.by}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Maintenance History */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-gray-600" />
          <h3 className="text-gray-900">Maintenance History</h3>
        </div>
        {maintenanceHistory.length > 0 ? (
          <div className="space-y-3">
            {maintenanceHistory.map((maintenance: any) => (
              <div key={maintenance.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">{maintenance.type}</span>
                    <span className="text-gray-900">{maintenance.description}</span>
                  </div>
                  <span className="text-gray-500">{new Date(maintenance.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-4 text-gray-600">
                  <span>Technician: {maintenance.technician}</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">{maintenance.status}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No maintenance records available</p>
        )}
      </div>
    </div>
  );
}
