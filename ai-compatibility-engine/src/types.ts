export type ProductCategory = 
  | 'cpu'
  | 'motherboard'
  | 'ram'
  | 'gpu'
  | 'psu'
  | 'storage'
  | 'cabinet'
  | 'cooler';

export interface TechSpecs {
  // Common / Electric
  voltage?: string | number;
  power_watts?: number; // TDP or Wattage rating
  tdp_watts?: number;
  recommended_psu_watts?: number;

  // CPU Specific
  socket?: string; // AM5, AM4, LGA1700, LGA1851, LGA1200, etc.
  architecture?: string;
  generation?: string;
  cores_threads?: string;
  integrated_gpu?: boolean;

  // Motherboard Specific
  chipset?: string; // B650, X670, B550, Z790, B760
  ram_type?: 'DDR4' | 'DDR5' | 'DDR3';
  ram_slots?: number;
  max_ram_gb?: number;
  max_ram_speed_mts?: number;
  pcie_version?: string; // 5.0, 4.0, 3.0
  m2_slots_count?: number;
  form_factor?: 'ATX' | 'Micro-ATX' | 'Mini-ITX' | 'E-ATX';
  wifi_support?: boolean;

  // RAM Specific
  capacity_gb?: number;
  speed_mts?: number;
  pin_count?: number;

  // GPU Specific
  gpu_length_mm?: number;
  gpu_slot_width?: number; // e.g. 2.5 slots, 3 slots
  power_connectors?: string; // e.g., '1x 16-pin (12VHPWR)' or '2x 8-pin'

  // PSU Specific
  efficiency_rating?: '80+ Bronze' | '80+ Gold' | '80+ Platinum' | '80+ Titanium';
  atx_version?: string; // e.g. ATX 3.0, ATX 2.4
  pcie_8pin_count?: number;
  has_12vhpwr?: boolean;
  sata_connectors_count?: number;

  // Storage Specific
  storage_interface?: 'NVMe M.2 PCIe 5.0' | 'NVMe M.2 PCIe 4.0' | 'NVMe M.2 PCIe 3.0' | 'SATA III 2.5"' | 'SATA III M.2';
  capacity_tb?: number;

  // Cabinet / Case Specific
  max_gpu_length_mm?: number;
  max_cpu_cooler_height_mm?: number;
  supported_motherboard_form_factors?: string[]; // ['E-ATX', 'ATX', 'Micro-ATX', 'Mini-ITX']
  psu_form_factor?: 'ATX' | 'SFX';

  // Cooler Specific
  supported_sockets?: string[]; // ['AM5', 'AM4', 'LGA1700', 'LGA1851']
  cooler_height_mm?: number;
  cooler_type?: 'Air' | 'AIO 240mm' | 'AIO 360mm';

  // Extra generic metadata
  [key: string]: any;
}

export interface RawSpec {
  raw_key: string;
  raw_value: string;
  normalized_value?: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  model: string;
  category: ProductCategory;
  subcategory?: string;
  part_number?: string;
  price?: number;
  image_url?: string;
  verified_status: 'VERIFIED' | 'NEEDS_VERIFICATION' | 'UNVERIFIED';
  confidence_score: number; // 0 - 100
  specs: TechSpecs;
  raw_specs?: RawSpec[];
  created_at: string;
}

export type ConflictSeverity = 'CRITICAL' | 'WARNING' | 'INFO';

export interface CompatibilityConflict {
  id: string;
  rule_id: string;
  componentA_id: string;
  componentA_name: string;
  componentB_id: string;
  componentB_name: string;
  rule_name: string;
  expected: string;
  actual: string;
  severity: ConflictSeverity;
  status: 'INCOMPATIBLE' | 'WARNING_NEEDED' | 'VERIFICATION_REQUIRED';
  explanation: string;
  fix_suggestion: string;
  recommended_alternatives?: Product[];
}

export interface CompatibilityWarning {
  id: string;
  type: string;
  message: string;
  components_involved: string[];
}

export interface GraphNode {
  id: string;
  label: string;
  category: ProductCategory;
  brand: string;
  hasConflict?: boolean;
  status: 'COMPATIBLE' | 'INCOMPATIBLE' | 'WARNING';
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  relationship: 'COMPATIBLE' | 'INCOMPATIBLE' | 'WARNING' | 'SUPPORTS' | 'POWERED_BY' | 'FITS_IN' | 'CONNECTS_TO';
  label: string;
  status: 'COMPATIBLE' | 'INCOMPATIBLE' | 'WARNING';
  reason: string;
}

export interface CompatibilityGraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface CompatibilityCheckResult {
  id: string;
  timestamp: string;
  configuration_name?: string;
  overall_status: 'COMPATIBLE' | 'PARTIALLY_COMPATIBLE' | 'INCOMPATIBLE';
  score: number; // 0 - 100
  passed_rules_count: number;
  total_rules_evaluated: number;
  estimated_system_wattage: number;
  recommended_psu_wattage: number;
  conflicts: CompatibilityConflict[];
  warnings: CompatibilityWarning[];
  graph: CompatibilityGraphData;
  ai_summary_explanation: string;
  products_analyzed: Product[];
}

export interface ExtractionResult {
  brand?: string;
  model?: string;
  category?: ProductCategory;
  specs: TechSpecs;
  field_confidence: Record<string, number>; // e.g. { socket: 0.95, tdp: 0.8 }
  raw_extracted_json: Record<string, any>;
  needs_verification_fields: string[];
  overall_confidence: number;
  source_notes?: string;
}

export interface VisualAnalysisResult {
  detected_category: string;
  detected_connector: string;
  pin_count_estimate: string;
  mounting_pattern: string;
  shape_and_form: string;
  perceived_compatibility_notes: string[];
  confidence_score: number;
  disclaimer: string;
}

export interface AnalyticsData {
  total_checks: number;
  compatible_configs_count: number;
  incompatible_configs_count: number;
  potential_returns_prevented: number;
  estimated_cost_saved_usd: number;
  overall_success_rate: number; // percentage
  top_conflict_types: { type: string; count: number; percentage: number }[];
  category_distribution: { category: string; count: number }[];
  recent_checks: {
    id: string;
    timestamp: string;
    products: string[];
    status: 'COMPATIBLE' | 'PARTIALLY_COMPATIBLE' | 'INCOMPATIBLE';
    score: number;
    conflict_count: number;
  }[];
}

export interface PresetConfig {
  id: string;
  name: string;
  description: string;
  tag: 'COMPATIBLE' | 'INCOMPATIBLE' | 'WARNING';
  product_ids: string[];
}
