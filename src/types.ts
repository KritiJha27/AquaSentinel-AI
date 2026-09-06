export type RiskLevel = 'low' | 'moderate' | 'high' | 'extreme'

export type AlertSeverity = 'advisory' | 'watch' | 'warning' | 'emergency'

export interface AreaRiskProfile {
  id: string
  name: string
  district: string
  city: string
  ward: string
  localArea: string
  roadZone: string
  lat: number
  lng: number
  currentRainfall: number
  predictedRainfall: number
  floodProbability: number
  waterDepth: number
  risk: RiskLevel
  riskScore: number
  populationExposure: number
  drainageStress: number
  soilSaturation: number
  criticalInfrastructure: string[]
  recommendedAction: string
}

export interface RainfallForecastPoint {
  time: string
  intensity: number
  probability: number
  peak: number
}

export interface ExplanationFactor {
  label: string
  magnitude: string
  weight: number
  positive: boolean
}

export interface Alert {
  id: string
  title: string
  location: string
  hazard: string
  expectedTime: string
  severity: AlertSeverity
  confidence: number
  recommendedAction: string[]
  factors: ExplanationFactor[]
}

export interface RouteOption {
  label: string
  distance: number
  eta: number
  floodRisk: RiskLevel
  roadCondition: string
}

export interface DataSourceStatus {
  name: string
  status: 'online' | 'available' | 'offline'
  icon: string
}

export interface SimulationParams {
  rainfall: number
  duration: number
  drainage: number
  riverLevel: number
  soilSaturation: number
}

export interface SimulationResult {
  inundatedArea: number
  maxWaterDepth: number
  roadsAffected: number
  criticalInfrastructure: number
  populationExposure: number
  risk: RiskLevel
}

export interface InfrastructureAsset {
  id: string
  type: string
  name: string
  lat: number
  lng: number
  risk: RiskLevel
  inundation: number
  accessibility: number
  floodProbability: number
  recommendedAction: string
}

export interface EvacuationZone {
  id: string
  name: string
  lat: number
  lng: number
  priority: number
  population: number
  severity: RiskLevel
  waterDepth: number
  evacuationTime: string
  shelters: string[]
  roads: string[]
}

export interface HistoricalEvent {
  id: string
  name: string
  year: number
  rainfall: number
  duration: number
  floodExtent: number
  waterDepth: number
  recoveryTime: number
}
