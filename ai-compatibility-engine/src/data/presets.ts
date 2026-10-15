import { PresetConfig } from '../types.js';

export const PRESET_CONFIGURATIONS: PresetConfig[] = [
  {
    id: 'preset_am5_compatible',
    name: '1. AM5 Flagship Build (100% Guaranteed Fit)',
    description: 'Ryzen 7 7800X3D + MSI B650 + DDR5 RAM + RTX 4080 Super + 850W PSU + H7 Flow Case + Noctua NH-D15.',
    tag: 'COMPATIBLE',
    product_ids: [
      'cpu_am5_7800x3d',
      'mb_msi_b650_gaming',
      'ram_corsair_ddr5_32gb_6000',
      'gpu_nvidia_rtx_4080_super',
      'psu_corsair_rm850x',
      'storage_samsung_990_pro_2tb',
      'cab_nzxt_h7_flow',
      'cooler_noctua_nh_d15'
    ]
  },
  {
    id: 'preset_incompatible_socket_ram',
    name: '2. Demo Incompatible Setup (Socket Mismatch & DDR4 vs DDR5)',
    description: 'AM5 Ryzen 7800X3D paired with AM4 B450 Motherboard and DDR4 RAM (Will trigger CRITICAL rule conflicts).',
    tag: 'INCOMPATIBLE',
    product_ids: [
      'cpu_am5_7800x3d',
      'mb_msi_b450_tomahawk', // AM4 Motherboard!
      'ram_corsair_ddr4_32gb_3600', // DDR4 RAM!
      'gpu_nvidia_rtx_4080_super',
      'psu_evga_500_w1', // Power Deficit (500W vs 600W+ requirement)!
      'cab_nzxt_h7_flow',
      'cooler_noctua_nh_d15'
    ]
  },
  {
    id: 'preset_physical_clearance_overflow',
    name: '3. Demo Physical Clearance Conflict (Oversized GPU & Cooler vs SFF Case)',
    description: '357mm ROG RTX 4090 + 168mm Dark Rock Pro 5 placed inside a 77mm max cooler SFF Terra ITX Case.',
    tag: 'INCOMPATIBLE',
    product_ids: [
      'cpu_am5_7800x3d',
      'mb_asrock_b650i_itx',
      'ram_corsair_ddr5_32gb_6000',
      'gpu_asus_rtx_4090_rog', // 357mm length!
      'psu_corsair_sf750_sfx',
      'cab_fractal_terra_itx', // Max GPU 322mm, max cooler 77mm!
      'cooler_bequiet_darkrockpro5' // 168mm height!
    ]
  },
  {
    id: 'preset_intel_14th_gen_build',
    name: '4. Intel Core i7-14700K Gaming RIG (Compatible)',
    description: 'Intel i7-14700K + Z790 Tomahawk + 64GB DDR5 6400MHz + RTX 4070 Super + Seasonic 1000W.',
    tag: 'COMPATIBLE',
    product_ids: [
      'cpu_intel_14700k',
      'mb_msi_z790_tomahawk',
      'ram_gskill_ddr5_64gb_6400',
      'gpu_gigabyte_rtx_4070_super',
      'psu_seasonic_focus_gx1000',
      'storage_wd_black_sn850x_1tb',
      'cab_corsair_4000d_airflow',
      'cooler_nzxt_kraken_elite_360'
    ]
  }
];
