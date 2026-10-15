import { Product, CompatibilityConflict, CompatibilityWarning, CompatibilityGraphData, GraphNode, GraphEdge, CompatibilityCheckResult } from '../types.js';
import { db } from './db.js';

export function evaluateCompatibility(products: Product[]): {
  overall_status: 'COMPATIBLE' | 'PARTIALLY_COMPATIBLE' | 'INCOMPATIBLE';
  score: number;
  passed_rules_count: number;
  total_rules_evaluated: number;
  estimated_system_wattage: number;
  recommended_psu_wattage: number;
  conflicts: CompatibilityConflict[];
  warnings: CompatibilityWarning[];
  graph: CompatibilityGraphData;
} {
  const conflicts: CompatibilityConflict[] = [];
  const warnings: CompatibilityWarning[] = [];
  let evaluatedRulesCount = 0;
  let passedRulesCount = 0;

  // Find components by category
  const cpu = products.find(p => p.category === 'cpu');
  const motherboard = products.find(p => p.category === 'motherboard');
  const ram = products.find(p => p.category === 'ram');
  const gpu = products.find(p => p.category === 'gpu');
  const psu = products.find(p => p.category === 'psu');
  const storage = products.find(p => p.category === 'storage');
  const cabinet = products.find(p => p.category === 'cabinet');
  const cooler = products.find(p => p.category === 'cooler');

  // Helper to find compatible replacements from DB
  const findAlternatives = (category: Product['category'], filterFn: (p: Product) => boolean): Product[] => {
    return db.getAllProducts()
      .filter(p => p.category === category && filterFn(p))
      .slice(0, 3);
  };

  // Rule 1: CPU ↔ Motherboard Socket
  if (cpu && motherboard) {
    evaluatedRulesCount++;
    const cpuSocket = cpu.specs.socket?.toUpperCase().trim();
    const mbSocket = motherboard.specs.socket?.toUpperCase().trim();

    if (cpuSocket && mbSocket && cpuSocket !== mbSocket) {
      const altMotherboards = findAlternatives('motherboard', p => p.specs.socket?.toUpperCase().trim() === cpuSocket);
      conflicts.push({
        id: `conflict_socket_${cpu.id}_${motherboard.id}`,
        rule_id: 'RULE_SOCKET_MATCH',
        componentA_id: cpu.id,
        componentA_name: cpu.name,
        componentB_id: motherboard.id,
        componentB_name: motherboard.name,
        rule_name: 'CPU & Motherboard Socket Compatibility',
        expected: `Motherboard socket matching ${cpuSocket}`,
        actual: `Motherboard features ${mbSocket} socket`,
        severity: 'CRITICAL',
        status: 'INCOMPATIBLE',
        explanation: `The selected CPU (${cpu.name}) uses the ${cpuSocket} socket, whereas the motherboard (${motherboard.name}) supports the ${mbSocket} socket. They cannot physically connect or operate together.`,
        fix_suggestion: `Choose an ${cpuSocket}-compatible motherboard (e.g., ${altMotherboards.map(m => m.name).join(' or ')}) or select an ${mbSocket} processor.`,
        recommended_alternatives: altMotherboards
      });
    } else {
      passedRulesCount++;
    }
  }

  // Rule 2: Motherboard ↔ RAM DDR Type
  if (motherboard && ram) {
    evaluatedRulesCount++;
    const mbRamType = motherboard.specs.ram_type?.toUpperCase().trim();
    const ramType = ram.specs.ram_type?.toUpperCase().trim();

    if (mbRamType && ramType && mbRamType !== ramType) {
      const altRam = findAlternatives('ram', p => p.specs.ram_type?.toUpperCase().trim() === mbRamType);
      conflicts.push({
        id: `conflict_ram_${motherboard.id}_${ram.id}`,
        rule_id: 'RULE_RAM_TYPE_MATCH',
        componentA_id: motherboard.id,
        componentA_name: motherboard.name,
        componentB_id: ram.id,
        componentB_name: ram.name,
        rule_name: 'RAM Generation Compatibility',
        expected: `${mbRamType} RAM Kit`,
        actual: `Selected RAM is ${ramType}`,
        severity: 'CRITICAL',
        status: 'INCOMPATIBLE',
        explanation: `The motherboard (${motherboard.name}) requires ${mbRamType} memory slots, but the selected memory kit (${ram.name}) is ${ramType}. ${mbRamType} and ${ramType} slots have different notch keying and voltage standards.`,
        fix_suggestion: `Replace memory with a compatible ${mbRamType} kit such as ${altRam.map(r => r.name).join(' or ')}.`,
        recommended_alternatives: altRam
      });
    } else {
      passedRulesCount++;
    }

    // Rule 2b: RAM speed warning
    if (ram.specs.speed_mts && motherboard.specs.max_ram_speed_mts) {
      evaluatedRulesCount++;
      if (ram.specs.speed_mts > motherboard.specs.max_ram_speed_mts) {
        warnings.push({
          id: `warn_ram_speed_${ram.id}`,
          type: 'RAM Speed Downclocking',
          message: `Selected RAM speed (${ram.specs.speed_mts} MT/s) exceeds motherboard max supported speed (${motherboard.specs.max_ram_speed_mts} MT/s). Memory will run at downclocked speed.`,
          components_involved: [motherboard.name, ram.name]
        });
      } else {
        passedRulesCount++;
      }
    }
  }

  // Rule 3: Motherboard ↔ Cabinet Form Factor
  if (motherboard && cabinet) {
    evaluatedRulesCount++;
    const mbForm = motherboard.specs.form_factor;
    const supportedForms = cabinet.specs.supported_motherboard_form_factors || [];

    if (mbForm && supportedForms.length > 0 && !supportedForms.includes(mbForm)) {
      const altCabinets = findAlternatives('cabinet', p => p.specs.supported_motherboard_form_factors?.includes(mbForm) || false);
      conflicts.push({
        id: `conflict_form_${motherboard.id}_${cabinet.id}`,
        rule_id: 'RULE_FORM_FACTOR_MATCH',
        componentA_id: motherboard.id,
        componentA_name: motherboard.name,
        componentB_id: cabinet.id,
        componentB_name: cabinet.name,
        rule_name: 'Motherboard Form Factor Clearance',
        expected: `Case supporting ${mbForm} form factor`,
        actual: `Case supports only [${supportedForms.join(', ')}]`,
        severity: 'CRITICAL',
        status: 'INCOMPATIBLE',
        explanation: `The ${motherboard.name} (${mbForm}) motherboard is too large for the ${cabinet.name} case, which only accepts [${supportedForms.join(', ')}] boards. Mounting standoffs will not align.`,
        fix_suggestion: `Select a case that supports ${mbForm} form factor motherboards like ${altCabinets.map(c => c.name).join(' or ')}.`,
        recommended_alternatives: altCabinets
      });
    } else {
      passedRulesCount++;
    }
  }

  // Rule 4: GPU ↔ Cabinet Length Clearance
  if (gpu && cabinet) {
    evaluatedRulesCount++;
    const gpuLen = gpu.specs.gpu_length_mm;
    const maxGpuLen = cabinet.specs.max_gpu_length_mm;

    if (gpuLen && maxGpuLen && gpuLen > maxGpuLen) {
      const altGpus = findAlternatives('gpu', p => (p.specs.gpu_length_mm || 999) <= maxGpuLen);
      conflicts.push({
        id: `conflict_gpu_len_${gpu.id}_${cabinet.id}`,
        rule_id: 'RULE_GPU_LENGTH_CLEARANCE',
        componentA_id: gpu.id,
        componentA_name: gpu.name,
        componentB_id: cabinet.id,
        componentB_name: cabinet.name,
        rule_name: 'GPU Length Physical Clearance',
        expected: `GPU length <= ${maxGpuLen}mm`,
        actual: `GPU length is ${gpuLen}mm (${gpuLen - maxGpuLen}mm excess)`,
        severity: 'CRITICAL',
        status: 'INCOMPATIBLE',
        explanation: `The graphics card (${gpu.name}) length of ${gpuLen}mm exceeds the maximum clearance of ${maxGpuLen}mm inside the ${cabinet.name} case. The card will collide with drive bays or front radiators.`,
        fix_suggestion: `Choose a shorter graphics card under ${maxGpuLen}mm or pick a larger chassis.`,
        recommended_alternatives: altGpus
      });
    } else {
      passedRulesCount++;
    }
  }

  // Rule 5: CPU Cooler ↔ Cabinet Height Clearance
  if (cooler && cabinet) {
    evaluatedRulesCount++;
    const coolerHeight = cooler.specs.cooler_height_mm;
    const maxCoolerHeight = cabinet.specs.max_cpu_cooler_height_mm;

    if (coolerHeight && maxCoolerHeight && coolerHeight > maxCoolerHeight) {
      const altCoolers = findAlternatives('cooler', p => (p.specs.cooler_height_mm || 999) <= maxCoolerHeight);
      conflicts.push({
        id: `conflict_cooler_height_${cooler.id}_${cabinet.id}`,
        rule_id: 'RULE_COOLER_HEIGHT_CLEARANCE',
        componentA_id: cooler.id,
        componentA_name: cooler.name,
        componentB_id: cabinet.id,
        componentB_name: cabinet.name,
        rule_name: 'CPU Cooler Height Clearance',
        expected: `Cooler height <= ${maxCoolerHeight}mm`,
        actual: `Cooler height is ${coolerHeight}mm (${coolerHeight - maxCoolerHeight}mm excess)`,
        severity: 'CRITICAL',
        status: 'INCOMPATIBLE',
        explanation: `The CPU cooler (${cooler.name}) height of ${coolerHeight}mm exceeds the maximum allowed side-panel clearance of ${maxCoolerHeight}mm in ${cabinet.name}. The glass/metal side panel will not close.`,
        fix_suggestion: `Select a lower profile air cooler or liquid AIO under ${maxCoolerHeight}mm height.`,
        recommended_alternatives: altCoolers
      });
    } else {
      passedRulesCount++;
    }
  }

  // Rule 6: CPU Cooler ↔ CPU Socket Support
  if (cooler && cpu) {
    evaluatedRulesCount++;
    const cpuSocket = cpu.specs.socket?.toUpperCase().trim();
    const supportedSockets = (cooler.specs.supported_sockets || []).map(s => s.toUpperCase().trim());

    if (cpuSocket && supportedSockets.length > 0 && !supportedSockets.includes(cpuSocket)) {
      const altCoolers = findAlternatives('cooler', p => (p.specs.supported_sockets || []).map(s => s.toUpperCase()).includes(cpuSocket));
      conflicts.push({
        id: `conflict_cooler_socket_${cooler.id}_${cpu.id}`,
        rule_id: 'RULE_COOLER_SOCKET_SUPPORT',
        componentA_id: cooler.id,
        componentA_name: cooler.name,
        componentB_id: cpu.id,
        componentB_name: cpu.name,
        rule_name: 'CPU Cooler Mounting Bracket Support',
        expected: `Cooler supporting ${cpuSocket} mounting bracket`,
        actual: `Supported sockets: [${supportedSockets.join(', ')}]`,
        severity: 'CRITICAL',
        status: 'INCOMPATIBLE',
        explanation: `The CPU cooler (${cooler.name}) does not include mounting brackets or hardware for socket ${cpuSocket} used by ${cpu.name}.`,
        fix_suggestion: `Pick a cooler natively supporting ${cpuSocket} bracket mounting.`,
        recommended_alternatives: altCoolers
      });
    } else {
      passedRulesCount++;
    }
  }

  // Rule 7: System Wattage & PSU Capacity Calculation
  let estimatedSystemWattage = 35; // Base motherboard standby
  if (cpu) estimatedSystemWattage += (cpu.specs.tdp_watts || 105);
  if (gpu) estimatedSystemWattage += (gpu.specs.power_watts || 220);
  if (ram) estimatedSystemWattage += 12;
  if (storage) estimatedSystemWattage += 8;
  if (cooler) estimatedSystemWattage += (cooler.specs.power_watts || 8);
  estimatedSystemWattage += 20; // Case fans & RGB lighting overhead

  const recommendedPsuWattage = Math.ceil((estimatedSystemWattage * 1.25) / 50) * 50; // 25% safety headroom rounded up to 50W

  if (psu) {
    evaluatedRulesCount++;
    const psuWattage = psu.specs.power_watts || 0;

    if (psuWattage < estimatedSystemWattage) {
      const altPsus = findAlternatives('psu', p => (p.specs.power_watts || 0) >= recommendedPsuWattage);
      conflicts.push({
        id: `conflict_power_deficit_${psu.id}`,
        rule_id: 'RULE_PSU_WATTAGE_DEFICIT',
        componentA_id: psu.id,
        componentA_name: psu.name,
        componentB_id: 'system_power_load',
        componentB_name: 'System Peak Power Draw',
        rule_name: 'Power Supply Capacity & Safety Deficit',
        expected: `>= ${recommendedPsuWattage}W (includes 25% safety headroom)`,
        actual: `${psuWattage}W PSU vs ${estimatedSystemWattage}W Peak Load`,
        severity: 'CRITICAL',
        status: 'INCOMPATIBLE',
        explanation: `The selected Power Supply (${psu.name}) rated at ${psuWattage}W is lower than the estimated total system peak draw of ${estimatedSystemWattage}W. The system will trigger OCP (Over Current Protection) shutdowns or fail to boot under load.`,
        fix_suggestion: `Upgrade power supply to at least ${recommendedPsuWattage}W (e.g., ${altPsus.map(p => p.name).join(' or ')}).`,
        recommended_alternatives: altPsus
      });
    } else if (psuWattage < recommendedPsuWattage) {
      warnings.push({
        id: `warn_psu_headroom_${psu.id}`,
        type: 'Low PSU Power Headroom',
        message: `PSU capacity (${psuWattage}W) covers estimated load (${estimatedSystemWattage}W), but falls below recommended ${recommendedPsuWattage}W headroom. Efficiency and transient response may be impacted.`,
        components_involved: [psu.name]
      });
      passedRulesCount++;
    } else {
      passedRulesCount++;
    }

    // Rule 7b: 12VHPWR check for high-end GPUs
    if (gpu && gpu.specs.power_connectors?.includes('12VHPWR') && !psu.specs.has_12vhpwr) {
      warnings.push({
        id: `warn_12vhpwr_adapter_${gpu.id}`,
        type: 'Requires 12VHPWR Adapter',
        message: `The GPU (${gpu.name}) uses a 12VHPWR 16-pin connector. The selected PSU lacks native 12VHPWR cable, requiring an included multi-8pin PCIe adapter.`,
        components_involved: [gpu.name, psu.name]
      });
    }
  }

  // Calculate Overall Status and Score
  let overallStatus: 'COMPATIBLE' | 'PARTIALLY_COMPATIBLE' | 'INCOMPATIBLE' = 'COMPATIBLE';
  if (conflicts.some(c => c.severity === 'CRITICAL')) {
    overallStatus = 'INCOMPATIBLE';
  } else if (conflicts.length > 0 || warnings.length > 0) {
    overallStatus = 'PARTIALLY_COMPATIBLE';
  }

  let baseScore = 100;
  baseScore -= conflicts.filter(c => c.severity === 'CRITICAL').length * 35;
  baseScore -= warnings.length * 8;
  const score = Math.max(0, Math.min(100, baseScore));

  // Build Graph
  const graph = buildGraphData(products, conflicts, warnings);

  return {
    overall_status: overallStatus,
    score,
    passed_rules_count: passedRulesCount,
    total_rules_evaluated: evaluatedRulesCount,
    estimated_system_wattage: estimatedSystemWattage,
    recommended_psu_wattage: recommendedPsuWattage,
    conflicts,
    warnings,
    graph
  };
}

function buildGraphData(
  products: Product[],
  conflicts: CompatibilityConflict[],
  warnings: CompatibilityWarning[]
): CompatibilityGraphData {
  const nodes: GraphNode[] = products.map(p => {
    const hasCritical = conflicts.some(c => c.componentA_id === p.id || c.componentB_id === p.id);
    const hasWarn = warnings.some(w => w.components_involved.includes(p.name));
    
    let status: 'COMPATIBLE' | 'INCOMPATIBLE' | 'WARNING' = 'COMPATIBLE';
    if (hasCritical) status = 'INCOMPATIBLE';
    else if (hasWarn) status = 'WARNING';

    return {
      id: p.id,
      label: p.name,
      category: p.category,
      brand: p.brand,
      hasConflict: hasCritical,
      status
    };
  });

  const edges: GraphEdge[] = [];
  const motherboard = products.find(p => p.category === 'motherboard');
  const cpu = products.find(p => p.category === 'cpu');
  const ram = products.find(p => p.category === 'ram');
  const gpu = products.find(p => p.category === 'gpu');
  const psu = products.find(p => p.category === 'psu');
  const storage = products.find(p => p.category === 'storage');
  const cabinet = products.find(p => p.category === 'cabinet');
  const cooler = products.find(p => p.category === 'cooler');

  // CPU -> Motherboard
  if (cpu && motherboard) {
    const conflict = conflicts.find(c => (c.componentA_id === cpu.id && c.componentB_id === motherboard.id) || (c.componentA_id === motherboard.id && c.componentB_id === cpu.id));
    edges.push({
      id: `edge_cpu_mb`,
      source: cpu.id,
      target: motherboard.id,
      relationship: conflict ? 'INCOMPATIBLE' : 'COMPATIBLE',
      label: conflict ? 'SOCKET MISMATCH' : 'SOCKET MATCH',
      status: conflict ? 'INCOMPATIBLE' : 'COMPATIBLE',
      reason: conflict ? conflict.explanation : `Matches Socket ${cpu.specs.socket}`
    });
  }

  // RAM -> Motherboard
  if (ram && motherboard) {
    const conflict = conflicts.find(c => (c.componentA_id === ram.id && c.componentB_id === motherboard.id) || (c.componentA_id === motherboard.id && c.componentB_id === ram.id));
    edges.push({
      id: `edge_ram_mb`,
      source: ram.id,
      target: motherboard.id,
      relationship: conflict ? 'INCOMPATIBLE' : 'SUPPORTS',
      label: conflict ? 'DDR TYPE MISMATCH' : 'FITS DDR SLOT',
      status: conflict ? 'INCOMPATIBLE' : 'COMPATIBLE',
      reason: conflict ? conflict.explanation : `Supports ${ram.specs.ram_type} Memory`
    });
  }

  // GPU -> Motherboard & Cabinet
  if (gpu && motherboard) {
    edges.push({
      id: `edge_gpu_mb`,
      source: gpu.id,
      target: motherboard.id,
      relationship: 'CONNECTS_TO',
      label: 'PCIe 4.0/5.0 SLOT',
      status: 'COMPATIBLE',
      reason: `Connects via PCIe slot`
    });
  }
  if (gpu && cabinet) {
    const conflict = conflicts.find(c => (c.componentA_id === gpu.id && c.componentB_id === cabinet.id) || (c.componentA_id === cabinet.id && c.componentB_id === gpu.id));
    edges.push({
      id: `edge_gpu_cabinet`,
      source: gpu.id,
      target: cabinet.id,
      relationship: conflict ? 'INCOMPATIBLE' : 'FITS_IN',
      label: conflict ? 'GPU LENGTH OVERFLOW' : 'FITS LENGTH CLEARANCE',
      status: conflict ? 'INCOMPATIBLE' : 'COMPATIBLE',
      reason: conflict ? conflict.explanation : `GPU length (${gpu.specs.gpu_length_mm}mm) <= Case clearance (${cabinet.specs.max_gpu_length_mm}mm)`
    });
  }

  // Cooler -> CPU & Cabinet
  if (cooler && cpu) {
    const conflict = conflicts.find(c => (c.componentA_id === cooler.id && c.componentB_id === cpu.id) || (c.componentA_id === cpu.id && c.componentB_id === cooler.id));
    edges.push({
      id: `edge_cooler_cpu`,
      source: cooler.id,
      target: cpu.id,
      relationship: conflict ? 'INCOMPATIBLE' : 'COMPATIBLE',
      label: conflict ? 'SOCKET UNMATCHED' : 'MOUNTS TO CPU',
      status: conflict ? 'INCOMPATIBLE' : 'COMPATIBLE',
      reason: conflict ? conflict.explanation : `Mounts to Socket ${cpu.specs.socket}`
    });
  }
  if (cooler && cabinet) {
    const conflict = conflicts.find(c => (c.componentA_id === cooler.id && c.componentB_id === cabinet.id) || (c.componentA_id === cabinet.id && c.componentB_id === cooler.id));
    edges.push({
      id: `edge_cooler_cabinet`,
      source: cooler.id,
      target: cabinet.id,
      relationship: conflict ? 'INCOMPATIBLE' : 'FITS_IN',
      label: conflict ? 'COOLER HEIGHT OVERFLOW' : 'FITS HEIGHT CLEARANCE',
      status: conflict ? 'INCOMPATIBLE' : 'COMPATIBLE',
      reason: conflict ? conflict.explanation : `Cooler height (${cooler.specs.cooler_height_mm}mm) <= Case clearance (${cabinet.specs.max_cpu_cooler_height_mm}mm)`
    });
  }

  // PSU -> System / Components
  if (psu && (gpu || cpu || motherboard)) {
    const conflict = conflicts.find(c => c.rule_id === 'RULE_PSU_WATTAGE_DEFICIT');
    if (motherboard) {
      edges.push({
        id: `edge_psu_mb`,
        source: psu.id,
        target: motherboard.id,
        relationship: conflict ? 'INCOMPATIBLE' : 'POWERED_BY',
        label: conflict ? 'WATTAGE DEFICIT' : 'SUPPLIES POWER',
        status: conflict ? 'INCOMPATIBLE' : 'COMPATIBLE',
        reason: conflict ? conflict.explanation : `Delivers clean 24-pin & EPS power`
      });
    }
  }

  // Storage -> Motherboard
  if (storage && motherboard) {
    edges.push({
      id: `edge_storage_mb`,
      source: storage.id,
      target: motherboard.id,
      relationship: 'CONNECTS_TO',
      label: 'M.2 / SATA INTERFACE',
      status: 'COMPATIBLE',
      reason: `Plugs into ${storage.specs.storage_interface} port`
    });
  }

  return { nodes, edges };
}
