import type {
  AreaRiskProfile,
  RainfallForecastPoint,
  Alert,
  RouteOption,
  DataSourceStatus,
  SimulationParams,
  SimulationResult,
  InfrastructureAsset,
  HistoricalEvent,
  RiskLevel,
  EvacuationZone,
  ExplanationFactor,
} from '../types'

export const locations = [
  { name: 'Kochi', lat: 9.9312, lng: 76.2673 },
  { name: 'Mumbai', lat: 19.076, lng: 72.8777 },
  { name: 'Chennai', lat: 13.0827, lng: 80.2707 },
  { name: 'Delhi', lat: 28.7041, lng: 77.1025 },
  { name: 'Kolkata', lat: 22.5726, lng: 88.3639 },
]

export function buildRiskProfile(base: { lat: number; lng: number }): AreaRiskProfile {
  return {
    id: 'area-1',
    name: 'Willingdon Island',
    district: 'Ernakulam',
    city: 'Kochi',
    ward: 'Ward 21',
    localArea: 'Market Zone',
    roadZone: 'NH-966B',
    lat: base.lat,
    lng: base.lng,
    currentRainfall: 34,
    predictedRainfall: 118,
    floodProbability: 82,
    waterDepth: 1.4,
    risk: 'high',
    riskScore: 82,
    populationExposure: 12400,
    drainageStress: 68,
    soilSaturation: 86,
    criticalInfrastructure: ['General Hospital', 'Power Substation', 'Railway Station'],
    recommendedAction: 'Evacuate low-lying zones within 2 hours',
  }
}

export const demoAreas: AreaRiskProfile[] = [
  { ...buildRiskProfile(locations[0]), id: '1', name: 'Willingdon Island', lat: 9.955, lng: 76.272 },
  { ...buildRiskProfile(locations[0]), id: '2', name: 'Marine Drive', lat: 9.968, lng: 76.281, riskScore: 58, risk: 'moderate', waterDepth: 0.6, floodProbability: 54, predictedRainfall: 74, drainageStress: 44, populationExposure: 8600, soilSaturation: 72 },
  { ...buildRiskProfile(locations[0]), id: '3', name: 'Fort Kochi', lat: 9.966, lng: 76.242, riskScore: 91, risk: 'extreme', waterDepth: 2.1, floodProbability: 94, predictedRainfall: 142, drainageStress: 78, populationExposure: 18200, soilSaturation: 92, recommendedAction: 'Immediate evacuation — water rising rapidly' },
  { ...buildRiskProfile(locations[0]), id: '4', name: 'Vyttila', lat: 9.979, lng: 76.315, riskScore: 44, risk: 'moderate', waterDepth: 0.4, floodProbability: 41, predictedRainfall: 58, drainageStress: 35, populationExposure: 6400, soilSaturation: 61 },
  { ...buildRiskProfile(locations[0]), id: '5', name: 'Kakkanad', lat: 10.016, lng: 76.344, riskScore: 35, risk: 'low', waterDepth: 0.2, floodProbability: 28, predictedRainfall: 42, drainageStress: 22, populationExposure: 4200, soilSaturation: 48 },
]

export const rainfallForecast: RainfallForecastPoint[] = [
  { time: 'Now', intensity: 34, probability: 100, peak: 40 },
  { time: '+1h', intensity: 48, probability: 88, peak: 62 },
  { time: '+3h', intensity: 76, probability: 92, peak: 96 },
  { time: '+6h', intensity: 118, probability: 84, peak: 142 },
  { time: '+12h', intensity: 88, probability: 71, peak: 110 },
  { time: '+24h', intensity: 56, probability: 63, peak: 72 },
  { time: '+72h', intensity: 30, probability: 45, peak: 38 },
]

export const alerts: Alert[] = [
  {
    id: 'a1',
    title: 'FLASH FLOOD WARNING',
    location: 'Fort Kochi & Surroundings',
    hazard: 'Flash Flood / Inundation',
    expectedTime: 'Next 2 hours',
    severity: 'emergency',
    confidence: 91,
    recommendedAction: [
      'Avoid low-lying roads immediately',
      'Move away from drainage channels',
      'Follow designated evacuation routes',
      'Move to higher ground if in affected zone',
    ],
    factors: [
      { label: 'Heavy rainfall forecast', magnitude: '+118 mm expected', weight: 35, positive: false },
      { label: 'High soil saturation', magnitude: '92% saturation', weight: 22, positive: false },
      { label: 'Low drainage capacity', magnitude: '78% capacity', weight: 18, positive: false },
      { label: 'Rising river level', magnitude: '+1.2 m above normal', weight: 15, positive: false },
      { label: 'Low-lying terrain', magnitude: '<2 m elevation', weight: 10, positive: false },
    ],
  },
  {
    id: 'a2',
    title: 'HEAVY RAINFALL WARNING',
    location: 'Willingdon Island',
    hazard: 'Heavy Rainfall',
    expectedTime: 'Next 6 hours',
    severity: 'warning',
    confidence: 84,
    recommendedAction: [
      'Secure loose objects outdoors',
      'Stay indoors where possible',
      'Monitor local advisories',
      'Keep emergency supplies ready',
    ],
    factors: [
      { label: 'Active monsoon system', magnitude: 'Multiple convective bands', weight: 40, positive: false },
      { label: 'High atmospheric moisture', magnitude: '92% RH', weight: 30, positive: false },
      { label: 'Moderate drainage stress', magnitude: '68% utilization', weight: 20, positive: false },
      { label: 'Wind convergence zone', magnitude: 'Overlapping jet streams', weight: 10, positive: false },
    ],
  },
  {
    id: 'a3',
    title: 'INUNDATION WATCH',
    location: 'Vyttila Junction',
    hazard: 'Urban Flooding',
    expectedTime: 'Next 12-24 hours',
    severity: 'watch',
    confidence: 72,
    recommendedAction: [
      'Prepare emergency kit',
      'Review evacuation routes',
      'Keep vehicles on higher ground',
    ],
    factors: [
      { label: 'Moderate rainfall forecast', magnitude: '+58 mm', weight: 45, positive: false },
      { label: 'Drainage stress', magnitude: '35% utilization', weight: 30, positive: true },
      { label: 'Soil absorption capacity', magnitude: 'Moderate', weight: 25, positive: true },
    ],
  },
]

export const routes: RouteOption[] = [
  { label: 'Fastest Route', distance: 4.2, eta: 12, floodRisk: 'high', roadCondition: 'Flooded segments' },
  { label: 'Normal Route', distance: 4.8, eta: 15, floodRisk: 'moderate', roadCondition: 'Waterlogged patches' },
  { label: 'Safest Route', distance: 6.1, eta: 19, floodRisk: 'low', roadCondition: 'Clear' },
  { label: 'Emergency Route', distance: 5.4, eta: 17, floodRisk: 'low', roadCondition: 'Cleared for access' },
]

export const dataSourceStatus: DataSourceStatus[] = [
  { name: 'Satellite', status: 'online', icon: '🛰' },
  { name: 'Weather Radar', status: 'online', icon: '📡' },
  { name: 'Weather Stations', status: 'online', icon: '🌧' },
  { name: 'NWP', status: 'online', icon: '🌐' },
  { name: 'DEM / Terrain', status: 'available', icon: '🏔' },
  { name: 'River Data', status: 'online', icon: '🌊' },
]

export const infrastructure: InfrastructureAsset[] = [
  { id: 'i1', type: 'Hospital', name: 'General Hospital', lat: 9.958, lng: 76.268, risk: 'high', inundation: 1.6, accessibility: 45, floodProbability: 78, recommendedAction: 'Pre-position medical supplies, prepare for possible shelter-in-place' },
  { id: 'i2', type: 'School', name: 'St. Teresa School', lat: 9.965, lng: 76.276, risk: 'moderate', inundation: 0.7, accessibility: 70, floodProbability: 52, recommendedAction: 'Monitor closely, prepare evacuation notice' },
  { id: 'i3', type: 'Fire Station', name: 'Fire & Rescue HQ', lat: 9.97, lng: 76.27, risk: 'low', inundation: 0.2, accessibility: 95, floodProbability: 12, recommendedAction: 'Maintain full readiness, stage vehicles on high ground' },
  { id: 'i4', type: 'Police Station', name: 'Central Police HQ', lat: 9.968, lng: 76.283, risk: 'moderate', inundation: 0.5, accessibility: 78, floodProbability: 45, recommendedAction: 'Increase patrol staffing, prepare road closure plans' },
  { id: 'i5', type: 'Power Station', name: 'Power Substation', lat: 9.949, lng: 76.264, risk: 'extreme', inundation: 2.3, accessibility: 22, floodProbability: 94, recommendedAction: 'Emergency shutdown plan activation, protect transformers' },
  { id: 'i6', type: 'Transport Hub', name: 'Kochi Railway Stn', lat: 9.967, lng: 76.284, risk: 'high', inundation: 1.2, accessibility: 55, floodProbability: 72, recommendedAction: 'Reroute services, suspend low-lying platforms' },
  { id: 'i7', type: 'Bridge', name: 'Vypeen Bridge', lat: 9.961, lng: 76.258, risk: 'high', inundation: 1.1, accessibility: 50, floodProbability: 68, recommendedAction: 'Close to heavy vehicles, monitor water level' },
  { id: 'i8', type: 'Government', name: 'Collectorate Office', lat: 9.969, lng: 76.278, risk: 'moderate', inundation: 0.4, accessibility: 82, floodProbability: 38, recommendedAction: 'Ensure emergency operations center is staffed' },
  { id: 'i9', type: 'Hospital', name: 'Lakeshore Hospital', lat: 9.972, lng: 76.288, risk: 'moderate', inundation: 0.6, accessibility: 74, floodProbability: 48, recommendedAction: 'Prepare backup power and essential supply stockpile' },
  { id: 'i10', type: 'Power Station', name: 'Kaloor Substation', lat: 9.939, lng: 76.272, risk: 'high', inundation: 1.5, accessibility: 42, floodProbability: 76, recommendedAction: 'Deploy flood barriers, prepare for load shedding' },
]

export const evacuationZones: EvacuationZone[] = [
  { id: 'ez1', name: 'Fort Kochi Lowlands', lat: 9.965, lng: 76.242, priority: 1, population: 18200, severity: 'extreme', waterDepth: 2.1, evacuationTime: '30 min', shelters: ['St. Marys School', 'Community Hall'], roads: ['KP Rd', 'Bazaar Rd', 'Bridge Rd'] },
  { id: 'ez2', name: 'Willingdon Island South', lat: 9.948, lng: 76.270, priority: 2, population: 12400, severity: 'high', waterDepth: 1.6, evacuationTime: '45 min', shelters: ['Island School', 'Club House'], roads: ['Canal Rd', 'Shipyard Rd'] },
  { id: 'ez3', name: 'Marine Drive Corridor', lat: 9.968, lng: 76.281, priority: 3, population: 8600, severity: 'moderate', waterDepth: 0.9, evacuationTime: '60 min', shelters: ['Boat Jetty Complex', 'Mahatma Ground'], roads: ['Marine Drive Walkway', 'Shanmugham Rd'] },
  { id: 'ez4', name: 'Vyttila Junction Area', lat: 9.978, lng: 76.312, priority: 4, population: 6400, severity: 'moderate', waterDepth: 0.5, evacuationTime: '90 min', shelters: ['Vyttila Community Center'], roads: ['Vyttila Mobiyity Hub Rd'] },
]

export const explanationFactors: ExplanationFactor[] = [
  { label: 'Heavy Rainfall Forecast', magnitude: '+118 mm expected', weight: 35, positive: false },
  { label: 'High Soil Saturation', magnitude: '92% saturation', weight: 22, positive: false },
  { label: 'Low Drainage Capacity', magnitude: '78% stress level', weight: 18, positive: false },
  { label: 'Rising River Level', magnitude: '+1.2 m above normal', weight: 15, positive: false },
  { label: 'Low-Lying Terrain', magnitude: '<2 m elevation zone', weight: 10, positive: false },
]

export function runSimulation(params: SimulationParams): SimulationResult {
  const rainfallFactor = params.rainfall / 60
  const durationFactor = params.duration / 12
  const drainageFactor = (100 - params.drainage) / 50
  const riverFactor = params.riverLevel / 4
  const soilFactor = params.soilSaturation / 80

  const base = rainfallFactor * durationFactor * drainageFactor * riverFactor * soilFactor
  const inundatedArea = Math.round(base * 1200)
  const maxWaterDepth = Math.round(base * 2.4 * 10) / 10
  const roadsAffected = Math.round(base * 45)
  const criticalInfrastructure = Math.round(base * 10)
  const populationExposure = Math.round(base * 32000)

  const score = Math.min(100, Math.round(base * 95))
  const risk: RiskLevel =
    score >= 80 ? 'extreme' : score >= 60 ? 'high' : score >= 35 ? 'moderate' : 'low'

  return { inundatedArea, maxWaterDepth, roadsAffected, criticalInfrastructure, populationExposure, risk }
}

export const riskColor = (risk: RiskLevel): string => {
  switch (risk) {
    case 'low': return '#22c55e'
    case 'moderate': return '#eab308'
    case 'high': return '#f97316'
    case 'extreme': return '#ef4444'
  }
}

export const severityColor = (s: string): string => {
  switch (s) {
    case 'advisory': return '#3b82f6'
    case 'watch': return '#eab308'
    case 'warning': return '#f97316'
    case 'emergency': return '#ef4444'
    default: return '#22c55e'
  }
}

export const rainfallTrendData = [
  { hour: '00:00', actual: 8, predicted: 10 },
  { hour: '03:00', actual: 15, predicted: 14 },
  { hour: '06:00', actual: 38, predicted: 40 },
  { hour: '09:00', actual: 62, predicted: 58 },
  { hour: '12:00', actual: 78, predicted: 82 },
  { hour: '15:00', actual: 118, predicted: 112 },
  { hour: '18:00', actual: 95, predicted: 100 },
  { hour: '21:00', actual: 68, predicted: 72 },
  { hour: '24:00', actual: 45, predicted: 50 },
]

export const modelForecasts = [
  { model: 'Model A (ConvLSTM)', value: 82 },
  { model: 'Model B (Hybrid Ensemble)', value: 96 },
  { model: 'Model C (XGBoost)', value: 91 },
  { model: 'Model D (Ensemble Blend)', value: 88 },
]

export const alertHistory = [
  { date: 'Sep 01', advisory: 1, watch: 0, warning: 0, emergency: 0, total: 1 },
  { date: 'Sep 02', advisory: 1, watch: 1, warning: 0, emergency: 0, total: 2 },
  { date: 'Sep 03', advisory: 2, watch: 1, warning: 1, emergency: 0, total: 4 },
  { date: 'Sep 04', advisory: 1, watch: 2, warning: 2, emergency: 1, total: 6 },
  { date: 'Sep 05', advisory: 2, watch: 1, warning: 1, emergency: 1, total: 5 },
  { date: 'Sep 06', advisory: 1, watch: 2, warning: 3, emergency: 2, total: 8 },
  { date: 'Sep 07', advisory: 1, watch: 1, warning: 2, emergency: 1, total: 5 },
]

export const riskTrend = [
  { date: 'Sep 01', score: 18 },
  { date: 'Sep 02', score: 25 },
  { date: 'Sep 03', score: 38 },
  { date: 'Sep 04', score: 55 },
  { date: 'Sep 05', score: 68 },
  { date: 'Sep 06', score: 82 },
  { date: 'Sep 07', score: 91 },
]

export const depthPrediction = [
  { hour: '+1h', min: 0.2, mid: 0.6, max: 1.0 },
  { hour: '+3h', min: 0.5, mid: 1.1, max: 1.8 },
  { hour: '+6h', min: 0.9, mid: 1.8, max: 2.7 },
  { hour: '+12h', min: 1.2, mid: 2.3, max: 3.4 },
  { hour: '+24h', min: 0.8, mid: 1.6, max: 2.5 },
]

export const historicalEvents: HistoricalEvent[] = [
  { id: 'h1', name: '2018 Kerala Floods', year: 2018, rainfall: 128, duration: 72, floodExtent: 5400, waterDepth: 2.8, recoveryTime: 90 },
  { id: 'h2', name: '2021 Monsoon Surge', year: 2021, rainfall: 96, duration: 48, floodExtent: 2300, waterDepth: 1.9, recoveryTime: 45 },
  { id: 'h3', name: '2023 Urban Event', year: 2023, rainfall: 74, duration: 24, floodExtent: 900, waterDepth: 1.1, recoveryTime: 12 },
  { id: 'h4', name: 'Current Event (2026)', year: 2026, rainfall: 118, duration: 36, floodExtent: 3100, waterDepth: 2.1, recoveryTime: 60 },
]
