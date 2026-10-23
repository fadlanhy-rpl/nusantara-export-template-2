/**
 * NusantaraExport Template 2 — Container Cargo & Maritime Math Engine
 * Section 7 PRD-NO2-COMMODITY-V2
 *
 * Implements exact cubic vs weight-limited physics calculations
 * and IMO Non-DG Special Provision 925 compliance metrics.
 */

export interface MasterBoxSpec {
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  netWeightKg: number;
  grossWeightKg: number;
  cbm: number;
}

export const MASTER_BOX_10KG: MasterBoxSpec = {
  lengthCm: 32.0,
  widthCm: 26.0,
  heightCm: 21.5,
  netWeightKg: 10.0,
  grossWeightKg: 10.4,
  cbm: (32.0 * 26.0 * 21.5) / 1_000_000, // 0.017888 m³
};

export type ContainerType = '20FT' | '40HC';

export interface ContainerSpec {
  name: string;
  type: ContainerType;
  internalLengthM: number;
  internalWidthM: number;
  internalHeightM: number;
  totalCbm: number;
  stowageFactor: number;
  effectiveCbm: number;
  maxPayloadKg: number; // Legal road/maritime safety weight limit
  floorStackMaxBoxes: number;
}

export const CONTAINER_SPECS: Record<ContainerType, ContainerSpec> = {
  '20FT': {
    name: "20ft Standard Dry Container (20' GP)",
    type: '20FT',
    internalLengthM: 5.9,
    internalWidthM: 2.35,
    internalHeightM: 2.39,
    totalCbm: 33.2,
    stowageFactor: 0.95,
    effectiveCbm: 33.2 * 0.95, // 31.54 m³
    maxPayloadKg: 18_000, // 18 MT safe port limit
    floorStackMaxBoxes: 1800,
  },
  '40HC': {
    name: "40ft High Cube Dry Container (40' HC)",
    type: '40HC',
    internalLengthM: 12.03,
    internalWidthM: 2.35,
    internalHeightM: 2.69,
    totalCbm: 76.4,
    stowageFactor: 0.95,
    effectiveCbm: 76.4 * 0.95, // 72.58 m³
    maxPayloadKg: 26_000, // 26 MT legal port limit
    floorStackMaxBoxes: 2600,
  },
};

export interface CargoCalculationResult {
  container: ContainerSpec;
  box: MasterBoxSpec;
  maxVolumeBoxes: number;
  maxPayloadBoxes: number;
  effectiveBoxes: number;
  totalNetWeightMt: number;
  totalGrossWeightMt: number;
  utilizedCbm: number;
  cbmUtilizationPercent: number;
  weightUtilizationPercent: number;
  limitingFactor: 'WEIGHT-LIMITED' | 'VOLUME-LIMITED';
  maritimeClassification: {
    unCode: string;
    classStandard: string;
    specialProvision: string;
    testPassed: string;
    dgSurcharge: string;
    shippingStatus: string;
  };
}

export function calculateContainerCargo(
  containerType: ContainerType = '40HC',
  box: MasterBoxSpec = MASTER_BOX_10KG
): CargoCalculationResult {
  const container = CONTAINER_SPECS[containerType];

  // 1. Pure Cubic Capacity: Floor((Total CBM * Stowage Factor) / Box CBM)
  const maxVolumeBoxes = Math.floor(container.effectiveCbm / box.cbm);

  // 2. Road/Rail Port Weight Limit: Floor(Max Payload Kg / Gross Weight)
  const maxWeightBoxes = Math.floor(container.maxPayloadKg / box.grossWeightKg);

  // Floor stacked operational standard (max 2600 for 40HC, 1800 for 20FT)
  const maxPayloadBoxes = Math.min(container.floorStackMaxBoxes, maxWeightBoxes);

  // 3. Effective Loadable Boxes
  const effectiveBoxes = Math.min(maxVolumeBoxes, maxPayloadBoxes);

  // 4. Weight and Volume Metrics
  const totalNetWeightMt = (effectiveBoxes * box.netWeightKg) / 1000;
  const totalGrossWeightMt = (effectiveBoxes * box.grossWeightKg) / 1000;
  const utilizedCbm = Number((effectiveBoxes * box.cbm).toFixed(3));
  const cbmUtilizationPercent = Number(
    ((utilizedCbm / container.totalCbm) * 100).toFixed(1)
  );
  const weightUtilizationPercent = Number(
    ((totalGrossWeightMt * 1000 / container.maxPayloadKg) * 100).toFixed(1)
  );

  const limitingFactor: 'WEIGHT-LIMITED' | 'VOLUME-LIMITED' =
    effectiveBoxes === maxPayloadBoxes ? 'WEIGHT-LIMITED' : 'VOLUME-LIMITED';

  return {
    container,
    box,
    maxVolumeBoxes,
    maxPayloadBoxes,
    effectiveBoxes,
    totalNetWeightMt,
    totalGrossWeightMt,
    utilizedCbm,
    cbmUtilizationPercent,
    weightUtilizationPercent,
    limitingFactor,
    maritimeClassification: {
      unCode: 'UN 1361 Exemption',
      classStandard: 'Class 4.2 Spontaneous Combustion Exempted',
      specialProvision: 'IMO IMDG Code Special Provision 925 (SP925)',
      testPassed: 'UN 3313 Self-Heating Test (Part III 33.3.1.3.3)',
      dgSurcharge: '$0.00 (Standard Dry Cargo Rates Applied)',
      shippingStatus: 'General Non-Hazardous Cargo Approved',
    },
  };
}
