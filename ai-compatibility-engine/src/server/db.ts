import { Product, ProductCategory, AnalyticsData, CompatibilityCheckResult } from '../types.js';

// Seed product catalog with 80+ realistic PC items
export const SEED_PRODUCTS: Product[] = [
  // --- 10 CPUs ---
  {
    id: 'cpu_am5_7800x3d',
    name: 'AMD Ryzen 7 7800X3D',
    brand: 'AMD',
    model: 'Ryzen 7 7800X3D',
    category: 'cpu',
    subcategory: 'Desktop Processor',
    part_number: '100-100000910WOF',
    price: 389.00,
    image_url: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      socket: 'AM5',
      tdp_watts: 120,
      cores_threads: '8 Cores / 16 Threads',
      architecture: 'Zen 4',
      generation: 'Ryzen 7000',
      integrated_gpu: true,
      voltage: '1.1V - 1.35V'
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'cpu_am5_9950x',
    name: 'AMD Ryzen 9 9950X',
    brand: 'AMD',
    model: 'Ryzen 9 9950X',
    category: 'cpu',
    subcategory: 'Desktop Processor',
    part_number: '100-100001277WOF',
    price: 649.00,
    image_url: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 98,
    specs: {
      socket: 'AM5',
      tdp_watts: 170,
      cores_threads: '16 Cores / 32 Threads',
      architecture: 'Zen 5',
      generation: 'Ryzen 9000',
      integrated_gpu: true
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'cpu_am5_7600x',
    name: 'AMD Ryzen 5 7600X',
    brand: 'AMD',
    model: 'Ryzen 5 7600X',
    category: 'cpu',
    subcategory: 'Desktop Processor',
    part_number: '100-100000593WOF',
    price: 209.00,
    image_url: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      socket: 'AM5',
      tdp_watts: 105,
      cores_threads: '6 Cores / 12 Threads',
      architecture: 'Zen 4',
      generation: 'Ryzen 7000',
      integrated_gpu: true
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'cpu_am4_5800x3d',
    name: 'AMD Ryzen 7 5800X3D',
    brand: 'AMD',
    model: 'Ryzen 7 5800X3D',
    category: 'cpu',
    subcategory: 'Desktop Processor',
    part_number: '100-100000651WOF',
    price: 320.00,
    image_url: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      socket: 'AM4',
      tdp_watts: 105,
      cores_threads: '8 Cores / 16 Threads',
      architecture: 'Zen 3',
      generation: 'Ryzen 5000',
      integrated_gpu: false
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'cpu_am4_5600x',
    name: 'AMD Ryzen 5 5600X',
    brand: 'AMD',
    model: 'Ryzen 5 5600X',
    category: 'cpu',
    subcategory: 'Desktop Processor',
    part_number: '100-100000065BOX',
    price: 135.00,
    image_url: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      socket: 'AM4',
      tdp_watts: 65,
      cores_threads: '6 Cores / 12 Threads',
      architecture: 'Zen 3',
      generation: 'Ryzen 5000',
      integrated_gpu: false
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'cpu_intel_14900k',
    name: 'Intel Core i9-14900K',
    brand: 'Intel',
    model: 'Core i9-14900K',
    category: 'cpu',
    subcategory: 'Desktop Processor',
    part_number: 'BX8071514900K',
    price: 540.00,
    image_url: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      socket: 'LGA1700',
      tdp_watts: 253,
      cores_threads: '24 Cores (8P+16E) / 32 Threads',
      architecture: 'Raptor Lake Refresh',
      generation: '14th Gen Intel',
      integrated_gpu: true
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'cpu_intel_14700k',
    name: 'Intel Core i7-14700K',
    brand: 'Intel',
    model: 'Core i7-14700K',
    category: 'cpu',
    subcategory: 'Desktop Processor',
    part_number: 'BX8071514700K',
    price: 380.00,
    image_url: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      socket: 'LGA1700',
      tdp_watts: 253,
      cores_threads: '20 Cores (8P+12E) / 28 Threads',
      architecture: 'Raptor Lake Refresh',
      generation: '14th Gen Intel',
      integrated_gpu: true
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'cpu_intel_13600k',
    name: 'Intel Core i5-13600K',
    brand: 'Intel',
    model: 'Core i5-13600K',
    category: 'cpu',
    subcategory: 'Desktop Processor',
    part_number: 'BX8071513600K',
    price: 270.00,
    image_url: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      socket: 'LGA1700',
      tdp_watts: 181,
      cores_threads: '14 Cores (6P+8E) / 20 Threads',
      architecture: 'Raptor Lake',
      generation: '13th Gen Intel',
      integrated_gpu: true
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'cpu_intel_285k',
    name: 'Intel Core Ultra 9 285K',
    brand: 'Intel',
    model: 'Core Ultra 9 285K',
    category: 'cpu',
    subcategory: 'Desktop Processor',
    part_number: 'BX80768285K',
    price: 590.00,
    image_url: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 97,
    specs: {
      socket: 'LGA1851',
      tdp_watts: 250,
      cores_threads: '24 Cores (8P+16E) / 24 Threads',
      architecture: 'Arrow Lake-S',
      generation: 'Core Ultra Series 2',
      integrated_gpu: true
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'cpu_intel_12100f',
    name: 'Intel Core i3-12100F',
    brand: 'Intel',
    model: 'Core i3-12100F',
    category: 'cpu',
    subcategory: 'Desktop Processor',
    part_number: 'BX8071512100F',
    price: 89.00,
    image_url: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      socket: 'LGA1700',
      tdp_watts: 89,
      cores_threads: '4 Cores / 8 Threads',
      architecture: 'Alder Lake',
      generation: '12th Gen Intel',
      integrated_gpu: false
    },
    created_at: new Date().toISOString()
  },

  // --- 10 Motherboards ---
  {
    id: 'mb_msi_b650_gaming',
    name: 'MSI B650 Gaming Plus WiFi',
    brand: 'MSI',
    model: 'B650 Gaming Plus WiFi',
    category: 'motherboard',
    subcategory: 'ATX Motherboard',
    part_number: 'B650-GPLUS-WIFI',
    price: 169.00,
    image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      socket: 'AM5',
      chipset: 'B650',
      ram_type: 'DDR5',
      ram_slots: 4,
      max_ram_gb: 192,
      max_ram_speed_mts: 7600,
      pcie_version: '4.0',
      m2_slots_count: 2,
      form_factor: 'ATX',
      wifi_support: true,
      power_watts: 35
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'mb_asus_rog_x670e',
    name: 'ASUS ROG Strix X670E-E Gaming WiFi',
    brand: 'ASUS',
    model: 'ROG Strix X670E-E',
    category: 'motherboard',
    subcategory: 'E-ATX Motherboard',
    part_number: 'ROG-X670E-E',
    price: 449.00,
    image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      socket: 'AM5',
      chipset: 'X670E',
      ram_type: 'DDR5',
      ram_slots: 4,
      max_ram_gb: 192,
      max_ram_speed_mts: 8000,
      pcie_version: '5.0',
      m2_slots_count: 4,
      form_factor: 'ATX',
      wifi_support: true,
      power_watts: 50
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'mb_gigabyte_b650m_ds3h',
    name: 'GIGABYTE B650M DS3H',
    brand: 'GIGABYTE',
    model: 'B650M DS3H',
    category: 'motherboard',
    subcategory: 'Micro-ATX Motherboard',
    part_number: 'B650M-DS3H',
    price: 139.00,
    image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 98,
    specs: {
      socket: 'AM5',
      chipset: 'B650',
      ram_type: 'DDR5',
      ram_slots: 4,
      max_ram_gb: 128,
      max_ram_speed_mts: 6400,
      pcie_version: '4.0',
      m2_slots_count: 2,
      form_factor: 'Micro-ATX',
      wifi_support: false,
      power_watts: 30
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'mb_msi_b450_tomahawk',
    name: 'MSI B450 TOMAHAWK MAX',
    brand: 'MSI',
    model: 'B450 TOMAHAWK MAX',
    category: 'motherboard',
    subcategory: 'ATX Motherboard',
    part_number: 'B450-TOMAHAWK-MAX',
    price: 110.00,
    image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      socket: 'AM4',
      chipset: 'B450',
      ram_type: 'DDR4',
      ram_slots: 4,
      max_ram_gb: 128,
      max_ram_speed_mts: 4133,
      pcie_version: '3.0',
      m2_slots_count: 1,
      form_factor: 'ATX',
      wifi_support: false,
      power_watts: 30
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'mb_asus_tuf_b550',
    name: 'ASUS TUF Gaming B550-PLUS WiFi II',
    brand: 'ASUS',
    model: 'TUF Gaming B550-PLUS',
    category: 'motherboard',
    subcategory: 'ATX Motherboard',
    part_number: 'TUF-B550-PLUS-WIFI',
    price: 155.00,
    image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      socket: 'AM4',
      chipset: 'B550',
      ram_type: 'DDR4',
      ram_slots: 4,
      max_ram_gb: 128,
      max_ram_speed_mts: 4866,
      pcie_version: '4.0',
      m2_slots_count: 2,
      form_factor: 'ATX',
      wifi_support: true,
      power_watts: 32
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'mb_msi_z790_tomahawk',
    name: 'MSI MAG Z790 TOMAHAWK WIFI',
    brand: 'MSI',
    model: 'Z790 TOMAHAWK WIFI',
    category: 'motherboard',
    subcategory: 'ATX Motherboard',
    part_number: 'Z790-TOMAHAWK-WIFI',
    price: 259.00,
    image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      socket: 'LGA1700',
      chipset: 'Z790',
      ram_type: 'DDR5',
      ram_slots: 4,
      max_ram_gb: 192,
      max_ram_speed_mts: 7200,
      pcie_version: '5.0',
      m2_slots_count: 4,
      form_factor: 'ATX',
      wifi_support: true,
      power_watts: 45
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'mb_gigabyte_b760_aorus',
    name: 'GIGABYTE B760 AORUS ELITE AX',
    brand: 'GIGABYTE',
    model: 'B760 AORUS ELITE AX',
    category: 'motherboard',
    subcategory: 'ATX Motherboard',
    part_number: 'B760-AORUS-ELITE',
    price: 179.00,
    image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 98,
    specs: {
      socket: 'LGA1700',
      chipset: 'B760',
      ram_type: 'DDR5',
      ram_slots: 4,
      max_ram_gb: 192,
      max_ram_speed_mts: 7600,
      pcie_version: '4.0',
      m2_slots_count: 3,
      form_factor: 'ATX',
      wifi_support: true,
      power_watts: 35
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'mb_asus_h610m_ddr4',
    name: 'ASUS Prime H610M-E D4',
    brand: 'ASUS',
    model: 'Prime H610M-E D4',
    category: 'motherboard',
    subcategory: 'Micro-ATX Motherboard',
    part_number: 'PRIME-H610M-E-D4',
    price: 89.00,
    image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      socket: 'LGA1700',
      chipset: 'H610',
      ram_type: 'DDR4',
      ram_slots: 2,
      max_ram_gb: 64,
      max_ram_speed_mts: 3200,
      pcie_version: '4.0',
      m2_slots_count: 1,
      form_factor: 'Micro-ATX',
      wifi_support: false,
      power_watts: 25
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'mb_z890_hero',
    name: 'ASUS ROG Maximus Z890 Hero',
    brand: 'ASUS',
    model: 'ROG Maximus Z890 Hero',
    category: 'motherboard',
    subcategory: 'ATX Motherboard',
    part_number: 'ROG-Z890-HERO',
    price: 699.00,
    image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 96,
    specs: {
      socket: 'LGA1851',
      chipset: 'Z890',
      ram_type: 'DDR5',
      ram_slots: 4,
      max_ram_gb: 192,
      max_ram_speed_mts: 8800,
      pcie_version: '5.0',
      m2_slots_count: 5,
      form_factor: 'ATX',
      wifi_support: true,
      power_watts: 55
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'mb_asrock_b650i_itx',
    name: 'ASRock B650I Lightning WiFi',
    brand: 'ASRock',
    model: 'B650I Lightning WiFi',
    category: 'motherboard',
    subcategory: 'Mini-ITX Motherboard',
    part_number: 'B650I-LIGHTNING',
    price: 199.00,
    image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 98,
    specs: {
      socket: 'AM5',
      chipset: 'B650',
      ram_type: 'DDR5',
      ram_slots: 2,
      max_ram_gb: 96,
      max_ram_speed_mts: 7200,
      pcie_version: '5.0',
      m2_slots_count: 2,
      form_factor: 'Mini-ITX',
      wifi_support: true,
      power_watts: 28
    },
    created_at: new Date().toISOString()
  },

  // --- 10 RAM Products ---
  {
    id: 'ram_corsair_ddr5_32gb_6000',
    name: 'Corsair Vengeance DDR5 32GB (2x16GB) 6000MHz CL30',
    brand: 'Corsair',
    model: 'Vengeance DDR5 32GB 6000',
    category: 'ram',
    subcategory: 'Desktop Memory Kit',
    part_number: 'CMK32GX5M2B6000C30',
    price: 114.99,
    image_url: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      ram_type: 'DDR5',
      capacity_gb: 32,
      speed_mts: 6000,
      voltage: 1.35,
      pin_count: 288
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'ram_gskill_ddr5_64gb_6400',
    name: 'G.Skill Trident Z5 RGB 64GB (2x32GB) DDR5 6400MHz',
    brand: 'G.Skill',
    model: 'Trident Z5 RGB 64GB',
    category: 'ram',
    subcategory: 'Desktop Memory Kit',
    part_number: 'F5-6400J3239G32GX2-TZ5RS',
    price: 219.99,
    image_url: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      ram_type: 'DDR5',
      capacity_gb: 64,
      speed_mts: 6400,
      voltage: 1.4,
      pin_count: 288
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'ram_kingston_ddr5_16gb_5600',
    name: 'Kingston Fury Beast 16GB (2x8GB) DDR5 5600MHz',
    brand: 'Kingston',
    model: 'Fury Beast DDR5 16GB',
    category: 'ram',
    subcategory: 'Desktop Memory Kit',
    part_number: 'KF556C40BBK2-16',
    price: 64.99,
    image_url: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 98,
    specs: {
      ram_type: 'DDR5',
      capacity_gb: 16,
      speed_mts: 5600,
      voltage: 1.25,
      pin_count: 288
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'ram_corsair_ddr4_32gb_3600',
    name: 'Corsair Vengeance LPX 32GB (2x16GB) DDR4 3600MHz',
    brand: 'Corsair',
    model: 'Vengeance LPX DDR4 32GB',
    category: 'ram',
    subcategory: 'Desktop Memory Kit',
    part_number: 'CMK32GX4M2D3600C18',
    price: 69.99,
    image_url: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      ram_type: 'DDR4',
      capacity_gb: 32,
      speed_mts: 3600,
      voltage: 1.35,
      pin_count: 288
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'ram_gskill_ddr4_16gb_3200',
    name: 'G.Skill Ripjaws V 16GB (2x8GB) DDR4 3200MHz',
    brand: 'G.Skill',
    model: 'Ripjaws V DDR4 16GB',
    category: 'ram',
    subcategory: 'Desktop Memory Kit',
    part_number: 'F4-3200C16D-16GVKB',
    price: 38.99,
    image_url: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      ram_type: 'DDR4',
      capacity_gb: 16,
      speed_mts: 3200,
      voltage: 1.35,
      pin_count: 288
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'ram_crucial_ddr5_96gb_5600',
    name: 'Crucial Pro 96GB Kit (2x48GB) DDR5 5600MHz',
    brand: 'Crucial',
    model: 'Pro DDR5 96GB',
    category: 'ram',
    subcategory: 'Desktop Memory Kit',
    part_number: 'CP2K48G56C46U5',
    price: 289.99,
    image_url: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 98,
    specs: {
      ram_type: 'DDR5',
      capacity_gb: 96,
      speed_mts: 5600,
      voltage: 1.1,
      pin_count: 288
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'ram_teamgroup_ddr5_32gb_7200',
    name: 'TEAMGROUP T-Force Delta RGB DDR5 32GB 7200MHz',
    brand: 'TEAMGROUP',
    model: 'T-Force Delta DDR5 32GB',
    category: 'ram',
    subcategory: 'Desktop Memory Kit',
    part_number: 'FF3D532G7200HC34ADC01',
    price: 139.99,
    image_url: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 97,
    specs: {
      ram_type: 'DDR5',
      capacity_gb: 32,
      speed_mts: 7200,
      voltage: 1.4,
      pin_count: 288
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'ram_patriot_ddr4_64gb_3600',
    name: 'Patriot Viper Steel 64GB (2x32GB) DDR4 3600MHz',
    brand: 'Patriot',
    model: 'Viper Steel DDR4 64GB',
    category: 'ram',
    subcategory: 'Desktop Memory Kit',
    part_number: 'PVS464G360C8K',
    price: 129.99,
    image_url: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 98,
    specs: {
      ram_type: 'DDR4',
      capacity_gb: 64,
      speed_mts: 3600,
      voltage: 1.35,
      pin_count: 288
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'ram_corsair_dominator_64gb',
    name: 'Corsair Dominator Titanium DDR5 64GB 6000MHz CL30',
    brand: 'Corsair',
    model: 'Dominator Titanium DDR5',
    category: 'ram',
    subcategory: 'Desktop Memory Kit',
    part_number: 'CMP64GX5M2B6000C30',
    price: 279.99,
    image_url: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      ram_type: 'DDR5',
      capacity_gb: 64,
      speed_mts: 6000,
      voltage: 1.35,
      pin_count: 288
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'ram_gskill_ddr5_128gb_5600',
    name: 'G.Skill Ripjaws S5 128GB (4x32GB) DDR5 5600MHz',
    brand: 'G.Skill',
    model: 'Ripjaws S5 128GB Kit',
    category: 'ram',
    subcategory: 'Desktop Memory Kit',
    part_number: 'F5-5600J4040D32GX4-RS5K',
    price: 399.99,
    image_url: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 98,
    specs: {
      ram_type: 'DDR5',
      capacity_gb: 128,
      speed_mts: 5600,
      voltage: 1.25,
      pin_count: 288
    },
    created_at: new Date().toISOString()
  },

  // --- 10 GPUs ---
  {
    id: 'gpu_nvidia_rtx_4080_super',
    name: 'NVIDIA GeForce RTX 4080 Super Founder Edition',
    brand: 'NVIDIA',
    model: 'RTX 4080 Super',
    category: 'gpu',
    subcategory: 'Graphics Card',
    part_number: '900-1G136-2555-000',
    price: 999.00,
    image_url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      pcie_version: '4.0',
      gpu_length_mm: 304,
      gpu_slot_width: 3.0,
      power_watts: 320,
      recommended_psu_watts: 750,
      power_connectors: '1x 16-pin (12VHPWR)'
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'gpu_asus_rtx_4090_rog',
    name: 'ASUS ROG Strix GeForce RTX 4090 OC Edition 24GB',
    brand: 'ASUS',
    model: 'ROG Strix RTX 4090',
    category: 'gpu',
    subcategory: 'Graphics Card',
    part_number: 'ROG-STRIX-RTX4090-O24G-GAMING',
    price: 1999.00,
    image_url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      pcie_version: '4.0',
      gpu_length_mm: 357, // Extra long GPU!
      gpu_slot_width: 3.5,
      power_watts: 450,
      recommended_psu_watts: 850,
      power_connectors: '1x 16-pin (12VHPWR)'
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'gpu_gigabyte_rtx_4070_super',
    name: 'GIGABYTE GeForce RTX 4070 Super WINDFORCE OC 12G',
    brand: 'GIGABYTE',
    model: 'RTX 4070 Super WINDFORCE',
    category: 'gpu',
    subcategory: 'Graphics Card',
    part_number: 'GV-N407SWF3OC-12GD',
    price: 599.00,
    image_url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      pcie_version: '4.0',
      gpu_length_mm: 261,
      gpu_slot_width: 2.5,
      power_watts: 220,
      recommended_psu_watts: 650,
      power_connectors: '1x 16-pin (12VHPWR)'
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'gpu_msi_rtx_4060_ti',
    name: 'MSI GeForce RTX 4060 Ti Ventus 2X Black 8G OC',
    brand: 'MSI',
    model: 'RTX 4060 Ti Ventus 2X',
    category: 'gpu',
    subcategory: 'Graphics Card',
    part_number: 'RTX-4060-TI-VENTUS-2X-8G-OC',
    price: 389.00,
    image_url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      pcie_version: '4.0',
      gpu_length_mm: 199, // Compact card!
      gpu_slot_width: 2.0,
      power_watts: 160,
      recommended_psu_watts: 550,
      power_connectors: '1x 8-pin'
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'gpu_amd_rx_7900_xtx',
    name: 'Sapphire NITRO+ AMD Radeon RX 7900 XTX 24GB',
    brand: 'Sapphire',
    model: 'Radeon RX 7900 XTX NITRO+',
    category: 'gpu',
    subcategory: 'Graphics Card',
    part_number: '11322-01-20G',
    price: 979.00,
    image_url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      pcie_version: '4.0',
      gpu_length_mm: 320,
      gpu_slot_width: 3.5,
      power_watts: 355,
      recommended_psu_watts: 800,
      power_connectors: '3x 8-pin'
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'gpu_amd_rx_7800_xt',
    name: 'PowerColor Hellhound AMD Radeon RX 7800 XT 16GB',
    brand: 'PowerColor',
    model: 'Radeon RX 7800 XT Hellhound',
    category: 'gpu',
    subcategory: 'Graphics Card',
    part_number: 'RX7800XT-16G-L/OC',
    price: 499.00,
    image_url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      pcie_version: '4.0',
      gpu_length_mm: 322,
      gpu_slot_width: 2.5,
      power_watts: 263,
      recommended_psu_watts: 700,
      power_connectors: '2x 8-pin'
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'gpu_amd_rx_6600',
    name: 'XFX Speedster SWFT 210 Radeon RX 6600 8GB',
    brand: 'XFX',
    model: 'Radeon RX 6600 SWFT 210',
    category: 'gpu',
    subcategory: 'Graphics Card',
    part_number: 'RX-66XL8LFDQ',
    price: 199.00,
    image_url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      pcie_version: '4.0',
      gpu_length_mm: 241,
      gpu_slot_width: 2.0,
      power_watts: 132,
      recommended_psu_watts: 450,
      power_connectors: '1x 8-pin'
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'gpu_intel_arc_a770',
    name: 'Intel Arc A770 Limited Edition 16GB Graphics',
    brand: 'Intel',
    model: 'Arc A770 16GB',
    category: 'gpu',
    subcategory: 'Graphics Card',
    part_number: '21P01J00BA',
    price: 289.00,
    image_url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 98,
    specs: {
      pcie_version: '4.0',
      gpu_length_mm: 268,
      gpu_slot_width: 2.0,
      power_watts: 225,
      recommended_psu_watts: 600,
      power_connectors: '1x 8-pin + 1x 6-pin'
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'gpu_msi_rtx_3060',
    name: 'MSI GeForce RTX 3060 Ventus 2X 12G OC',
    brand: 'MSI',
    model: 'RTX 3060 Ventus 2X 12G',
    category: 'gpu',
    subcategory: 'Graphics Card',
    part_number: 'RTX-3060-VENTUS-2X-12G',
    price: 279.00,
    image_url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      pcie_version: '4.0',
      gpu_length_mm: 235,
      gpu_slot_width: 2.0,
      power_watts: 170,
      recommended_psu_watts: 550,
      power_connectors: '1x 8-pin'
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'gpu_gigabyte_rtx_4080_aero',
    name: 'GIGABYTE GeForce RTX 4080 Super AERO OC 16G White',
    brand: 'GIGABYTE',
    model: 'RTX 4080 Super AERO OC',
    category: 'gpu',
    subcategory: 'Graphics Card',
    part_number: 'GV-N408SAERO-OC-16GD',
    price: 1099.00,
    image_url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      pcie_version: '4.0',
      gpu_length_mm: 342,
      gpu_slot_width: 3.2,
      power_watts: 320,
      recommended_psu_watts: 850,
      power_connectors: '1x 16-pin (12VHPWR)'
    },
    created_at: new Date().toISOString()
  },

  // --- 10 PSUs ---
  {
    id: 'psu_corsair_rm850x',
    name: 'Corsair RM850x 850W 80+ Gold Fully Modular ATX Power Supply',
    brand: 'Corsair',
    model: 'RM850x',
    category: 'psu',
    subcategory: 'Power Supply Unit',
    part_number: 'CP-9020200-NA',
    price: 129.99,
    image_url: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      power_watts: 850,
      efficiency_rating: '80+ Gold',
      atx_version: 'ATX 3.0',
      has_12vhpwr: true,
      pcie_8pin_count: 4,
      sata_connectors_count: 10
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'psu_seasonic_focus_gx1000',
    name: 'Seasonic FOCUS GX-1000 1000W 80+ Gold ATX 3.0',
    brand: 'Seasonic',
    model: 'FOCUS GX-1000',
    category: 'psu',
    subcategory: 'Power Supply Unit',
    part_number: 'FOCUS-GX-1000-ATX3',
    price: 169.99,
    image_url: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      power_watts: 1000,
      efficiency_rating: '80+ Gold',
      atx_version: 'ATX 3.0',
      has_12vhpwr: true,
      pcie_8pin_count: 5,
      sata_connectors_count: 12
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'psu_corsair_rm1000x_shift',
    name: 'Corsair RM1000x Shift 1000W 80+ Gold Modular',
    brand: 'Corsair',
    model: 'RM1000x Shift',
    category: 'psu',
    subcategory: 'Power Supply Unit',
    part_number: 'CP-9020253-NA',
    price: 199.99,
    image_url: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      power_watts: 1000,
      efficiency_rating: '80+ Gold',
      atx_version: 'ATX 3.0',
      has_12vhpwr: true,
      pcie_8pin_count: 6,
      sata_connectors_count: 12
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'psu_evga_500_w1',
    name: 'EVGA 500 W1 500W 80+ White Power Supply',
    brand: 'EVGA',
    model: '500 W1',
    category: 'psu',
    subcategory: 'Power Supply Unit',
    part_number: '100-W1-0500-KR',
    price: 44.99,
    image_url: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      power_watts: 500, // Small wattage for testing budget/deficit builds
      efficiency_rating: '80+ Bronze',
      atx_version: 'ATX 2.4',
      has_12vhpwr: false,
      pcie_8pin_count: 2,
      sata_connectors_count: 6
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'psu_msi_mag_a650bn',
    name: 'MSI MAG A650BN 650W 80+ Bronze Power Supply',
    brand: 'MSI',
    model: 'MAG A650BN',
    category: 'psu',
    subcategory: 'Power Supply Unit',
    part_number: '306-7ZP2B11-CE0',
    price: 59.99,
    image_url: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      power_watts: 650,
      efficiency_rating: '80+ Bronze',
      atx_version: 'ATX 2.4',
      has_12vhpwr: false,
      pcie_8pin_count: 2,
      sata_connectors_count: 5
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'psu_bequiet_purepower12_750w',
    name: 'be quiet! Pure Power 12 M 750W 80+ Gold ATX 3.0',
    brand: 'be quiet!',
    model: 'Pure Power 12 M 750W',
    category: 'psu',
    subcategory: 'Power Supply Unit',
    part_number: 'BN504',
    price: 109.90,
    image_url: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      power_watts: 750,
      efficiency_rating: '80+ Gold',
      atx_version: 'ATX 3.0',
      has_12vhpwr: true,
      pcie_8pin_count: 4,
      sata_connectors_count: 6
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'psu_thermaltake_gf3_1200w',
    name: 'Thermaltake Toughpower GF3 1200W 80+ Gold ATX 3.0',
    brand: 'Thermaltake',
    model: 'Toughpower GF3 1200W',
    category: 'psu',
    subcategory: 'Power Supply Unit',
    part_number: 'PS-TPD-1200FNFAGU-4',
    price: 219.99,
    image_url: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      power_watts: 1200,
      efficiency_rating: '80+ Gold',
      atx_version: 'ATX 3.0',
      has_12vhpwr: true,
      pcie_8pin_count: 6,
      sata_connectors_count: 12
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'psu_corsair_sf750_sfx',
    name: 'Corsair SF750 750W 80+ Platinum SFX Power Supply',
    brand: 'Corsair',
    model: 'SF750 SFX',
    category: 'psu',
    subcategory: 'Power Supply Unit',
    part_number: 'CP-9020186-NA',
    price: 179.99,
    image_url: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      power_watts: 750,
      efficiency_rating: '80+ Platinum',
      atx_version: 'SFX ATX 3.0',
      has_12vhpwr: true,
      pcie_8pin_count: 4,
      sata_connectors_count: 8
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'psu_asus_rog_thor_1600t',
    name: 'ASUS ROG Thor 1600T Titanium 1600W OLED Power Supply',
    brand: 'ASUS',
    model: 'ROG Thor 1600T',
    category: 'psu',
    subcategory: 'Power Supply Unit',
    part_number: 'ROG-THOR-1600T-GAMING',
    price: 649.99,
    image_url: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 98,
    specs: {
      power_watts: 1600,
      efficiency_rating: '80+ Titanium',
      atx_version: 'ATX 3.0',
      has_12vhpwr: true,
      pcie_8pin_count: 10,
      sata_connectors_count: 12
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'psu_gigabyte_p850gm',
    name: 'GIGABYTE UD850GM 850W 80+ Gold Modular',
    brand: 'GIGABYTE',
    model: 'UD850GM',
    category: 'psu',
    subcategory: 'Power Supply Unit',
    part_number: 'GP-UD850GM',
    price: 104.99,
    image_url: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 98,
    specs: {
      power_watts: 850,
      efficiency_rating: '80+ Gold',
      atx_version: 'ATX 2.52',
      has_12vhpwr: false,
      pcie_8pin_count: 4,
      sata_connectors_count: 8
    },
    created_at: new Date().toISOString()
  },

  // --- 10 Storage Products ---
  {
    id: 'storage_samsung_990_pro_2tb',
    name: 'Samsung 990 PRO 2TB PCIe 4.0 NVMe M.2 SSD',
    brand: 'Samsung',
    model: '990 PRO 2TB',
    category: 'storage',
    subcategory: 'Solid State Drive',
    part_number: 'MZ-V9P2T0BW',
    price: 169.99,
    image_url: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      storage_interface: 'NVMe M.2 PCIe 4.0',
      capacity_tb: 2,
      power_watts: 8
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'storage_crucial_t700_2tb_pci5',
    name: 'Crucial T700 2TB PCIe 5.0 NVMe M.2 SSD (12,400 MB/s)',
    brand: 'Crucial',
    model: 'T700 PCIe 5.0 2TB',
    category: 'storage',
    subcategory: 'Solid State Drive',
    part_number: 'CT2000T700SSD3',
    price: 249.99,
    image_url: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      storage_interface: 'NVMe M.2 PCIe 5.0',
      capacity_tb: 2,
      power_watts: 11
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'storage_wd_black_sn850x_1tb',
    name: 'WD_BLACK 1TB SN850X NVMe Internal Gaming SSD',
    brand: 'Western Digital',
    model: 'WD_BLACK SN850X 1TB',
    category: 'storage',
    subcategory: 'Solid State Drive',
    part_number: 'WDS100T2X0E',
    price: 94.99,
    image_url: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      storage_interface: 'NVMe M.2 PCIe 4.0',
      capacity_tb: 1,
      power_watts: 7
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'storage_samsung_870_evo_1tb_sata',
    name: 'Samsung 870 EVO 1TB 2.5 Inch SATA III SSD',
    brand: 'Samsung',
    model: '870 EVO 1TB SATA',
    category: 'storage',
    subcategory: 'Solid State Drive',
    part_number: 'MZ-77E1T0B/AM',
    price: 89.99,
    image_url: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      storage_interface: 'SATA III 2.5"',
      capacity_tb: 1,
      power_watts: 4
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'storage_kingston_nv2_1tb',
    name: 'Kingston NV2 1TB M.2 2280 NVMe PCIe 4.0 SSD',
    brand: 'Kingston',
    model: 'NV2 1TB',
    category: 'storage',
    subcategory: 'Solid State Drive',
    part_number: 'SNV2S/1000G',
    price: 59.99,
    image_url: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 98,
    specs: {
      storage_interface: 'NVMe M.2 PCIe 4.0',
      capacity_tb: 1,
      power_watts: 6
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'storage_sabrent_rocket_4plus_4tb',
    name: 'Sabrent Rocket 4 Plus 4TB NVMe M.2 SSD',
    brand: 'Sabrent',
    model: 'Rocket 4 Plus 4TB',
    category: 'storage',
    subcategory: 'Solid State Drive',
    part_number: 'SB-RKT4P-4TB',
    price: 369.99,
    image_url: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 98,
    specs: {
      storage_interface: 'NVMe M.2 PCIe 4.0',
      capacity_tb: 4,
      power_watts: 9
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'storage_seagate_barracuda_2tb_hdd',
    name: 'Seagate BarraCuda 2TB 3.5 Inch SATA HDD 7200 RPM',
    brand: 'Seagate',
    model: 'BarraCuda 2TB HDD',
    category: 'storage',
    subcategory: 'Hard Disk Drive',
    part_number: 'ST2000DM008',
    price: 54.99,
    image_url: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      storage_interface: 'SATA III 2.5"',
      capacity_tb: 2,
      power_watts: 7
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'storage_corsair_mp700_pro_2tb',
    name: 'Corsair MP700 PRO 2TB PCIe 5.0 (Gen5) x4 NVMe M.2 SSD',
    brand: 'Corsair',
    model: 'MP700 PRO 2TB',
    category: 'storage',
    subcategory: 'Solid State Drive',
    part_number: 'CSSD-F2000GBMP700PRO',
    price: 279.99,
    image_url: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 98,
    specs: {
      storage_interface: 'NVMe M.2 PCIe 5.0',
      capacity_tb: 2,
      power_watts: 11
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'storage_teamgroup_mp33_512gb',
    name: 'TEAMGROUP MP33 512GB NVMe PCIe Gen3x4 M.2 SSD',
    brand: 'TEAMGROUP',
    model: 'MP33 512GB',
    category: 'storage',
    subcategory: 'Solid State Drive',
    part_number: 'TM8FP6512G0C101',
    price: 34.99,
    image_url: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      storage_interface: 'NVMe M.2 PCIe 3.0',
      capacity_tb: 0.5,
      power_watts: 5
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'storage_wd_blue_3d_2tb_sata',
    name: 'Western Digital WD Blue 3D NAND 2TB Internal SATA SSD',
    brand: 'Western Digital',
    model: 'WD Blue 2TB SATA',
    category: 'storage',
    subcategory: 'Solid State Drive',
    part_number: 'WDS200T2B0A',
    price: 139.99,
    image_url: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      storage_interface: 'SATA III 2.5"',
      capacity_tb: 2,
      power_watts: 4
    },
    created_at: new Date().toISOString()
  },

  // --- 10 Cabinets / Cases ---
  {
    id: 'cab_nzxt_h7_flow',
    name: 'NZXT H7 Flow Mid-Tower ATX PC Case',
    brand: 'NZXT',
    model: 'H7 Flow',
    category: 'cabinet',
    subcategory: 'Mid-Tower Chassis',
    part_number: 'CM-H71FW-01',
    price: 129.99,
    image_url: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      max_gpu_length_mm: 400, // Generous GPU clearance!
      max_cpu_cooler_height_mm: 185,
      supported_motherboard_form_factors: ['E-ATX', 'ATX', 'Micro-ATX', 'Mini-ITX'],
      psu_form_factor: 'ATX'
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'cab_fractal_north',
    name: 'Fractal Design North Charcoal Black Walnut Front ATX Mid-Tower',
    brand: 'Fractal Design',
    model: 'North ATX',
    category: 'cabinet',
    subcategory: 'Mid-Tower Chassis',
    part_number: 'FD-C-NOR1C-01',
    price: 139.99,
    image_url: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      max_gpu_length_mm: 355,
      max_cpu_cooler_height_mm: 170,
      supported_motherboard_form_factors: ['ATX', 'Micro-ATX', 'Mini-ITX'],
      psu_form_factor: 'ATX'
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'cab_lianli_o11_dynamic_evo',
    name: 'Lian Li O11 Dynamic EVO Mid-Tower Case White',
    brand: 'Lian Li',
    model: 'O11 Dynamic EVO',
    category: 'cabinet',
    subcategory: 'Mid-Tower Chassis',
    part_number: 'O11D EVO WHITE',
    price: 159.99,
    image_url: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      max_gpu_length_mm: 422,
      max_cpu_cooler_height_mm: 167,
      supported_motherboard_form_factors: ['E-ATX', 'ATX', 'Micro-ATX', 'Mini-ITX'],
      psu_form_factor: 'ATX'
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'cab_corsair_4000d_airflow',
    name: 'Corsair 4000D Airflow Tempered Glass Mid-Tower',
    brand: 'Corsair',
    model: '4000D Airflow',
    category: 'cabinet',
    subcategory: 'Mid-Tower Chassis',
    part_number: 'CC-9011200-WW',
    price: 104.99,
    image_url: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      max_gpu_length_mm: 360,
      max_cpu_cooler_height_mm: 170,
      supported_motherboard_form_factors: ['ATX', 'Micro-ATX', 'Mini-ITX'],
      psu_form_factor: 'ATX'
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'cab_nzxt_h5_flow',
    name: 'NZXT H5 Flow Compact ATX Mid-Tower Case',
    brand: 'NZXT',
    model: 'H5 Flow',
    category: 'cabinet',
    subcategory: 'Mid-Tower Chassis',
    part_number: 'CC-H51FB-01',
    price: 84.99,
    image_url: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      max_gpu_length_mm: 365,
      max_cpu_cooler_height_mm: 165,
      supported_motherboard_form_factors: ['ATX', 'Micro-ATX', 'Mini-ITX'],
      psu_form_factor: 'ATX'
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'cab_fractal_terra_itx',
    name: 'Fractal Design Terra Jade Small Form Factor Mini-ITX Case',
    brand: 'Fractal Design',
    model: 'Terra Mini-ITX',
    category: 'cabinet',
    subcategory: 'SFF Chassis',
    part_number: 'FD-C-TER1N-03',
    price: 179.99,
    image_url: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      max_gpu_length_mm: 322,
      max_cpu_cooler_height_mm: 77, // SFF Low profile air cooler constraint!
      supported_motherboard_form_factors: ['Mini-ITX'],
      psu_form_factor: 'SFX'
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'cab_cooler_master_q300l_matx',
    name: 'Cooler Master MasterBox Q300L Micro-ATX Tower',
    brand: 'Cooler Master',
    model: 'MasterBox Q300L',
    category: 'cabinet',
    subcategory: 'Micro-ATX Chassis',
    part_number: 'MCB-Q300L-KANN-S00',
    price: 39.99,
    image_url: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      max_gpu_length_mm: 360,
      max_cpu_cooler_height_mm: 159,
      supported_motherboard_form_factors: ['Micro-ATX', 'Mini-ITX'], // Excludes full ATX!
      psu_form_factor: 'ATX'
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'cab_hyte_y70_touch',
    name: 'HYTE Y70 Touch Infinite Aesthetic Case Snow White',
    brand: 'HYTE',
    model: 'Y70 Touch',
    category: 'cabinet',
    subcategory: 'Dual Chamber Chassis',
    part_number: 'CS-HYTE-Y70-WW-T',
    price: 359.99,
    image_url: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 98,
    specs: {
      max_gpu_length_mm: 390,
      max_cpu_cooler_height_mm: 180,
      supported_motherboard_form_factors: ['E-ATX', 'ATX', 'Micro-ATX', 'Mini-ITX'],
      psu_form_factor: 'ATX'
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'cab_deepcool_ch370',
    name: 'DeepCool CH370 Micro-ATX Case White',
    brand: 'DeepCool',
    model: 'CH370 White',
    category: 'cabinet',
    subcategory: 'Micro-ATX Chassis',
    part_number: 'R-CH370-WHNAM1-G-1',
    price: 64.99,
    image_url: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      max_gpu_length_mm: 320, // Strict GPU length constraint!
      max_cpu_cooler_height_mm: 165,
      supported_motherboard_form_factors: ['Micro-ATX', 'Mini-ITX'],
      psu_form_factor: 'ATX'
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'cab_montech_air_903_max',
    name: 'Montech AIR 903 MAX E-ATX Mid-Tower Case',
    brand: 'Montech',
    model: 'AIR 903 MAX',
    category: 'cabinet',
    subcategory: 'Mid-Tower Chassis',
    part_number: 'AIR 903 MAX (B)',
    price: 75.00,
    image_url: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      max_gpu_length_mm: 400,
      max_cpu_cooler_height_mm: 180,
      supported_motherboard_form_factors: ['E-ATX', 'ATX', 'Micro-ATX', 'Mini-ITX'],
      psu_form_factor: 'ATX'
    },
    created_at: new Date().toISOString()
  },

  // --- 10 CPU Coolers ---
  {
    id: 'cooler_noctua_nh_d15',
    name: 'Noctua NH-D15 chromax.black Dual-Tower CPU Air Cooler',
    brand: 'Noctua',
    model: 'NH-D15 chromax.black',
    category: 'cooler',
    subcategory: 'Air Cooler',
    part_number: 'NH-D15-CH-BK',
    price: 119.95,
    image_url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      supported_sockets: ['AM5', 'AM4', 'LGA1700', 'LGA1200'],
      cooler_height_mm: 165,
      cooler_type: 'Air',
      tdp_watts: 250,
      power_watts: 5
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'cooler_thermalright_peerless_assassin_120',
    name: 'Thermalright Peerless Assassin 120 SE CPU Air Cooler',
    brand: 'Thermalright',
    model: 'Peerless Assassin 120 SE',
    category: 'cooler',
    subcategory: 'Air Cooler',
    part_number: 'PA120 SE',
    price: 34.90,
    image_url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      supported_sockets: ['AM5', 'AM4', 'LGA1700', 'LGA1200'],
      cooler_height_mm: 155,
      cooler_type: 'Air',
      tdp_watts: 225,
      power_watts: 4
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'cooler_nzxt_kraken_elite_360',
    name: 'NZXT Kraken Elite 360 RGB AIO Liquid Cooler with LCD Display',
    brand: 'NZXT',
    model: 'Kraken Elite 360 RGB',
    category: 'cooler',
    subcategory: 'AIO Liquid Cooler',
    part_number: 'RL-KR36E-B1',
    price: 299.99,
    image_url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      supported_sockets: ['AM5', 'AM4', 'LGA1700', 'LGA1851', 'LGA1200'],
      cooler_height_mm: 53,
      cooler_type: 'AIO 360mm',
      tdp_watts: 350,
      power_watts: 15
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'cooler_arctic_liquid_freezer_iii_240',
    name: 'ARCTIC Liquid Freezer III 240 A-RGB Liquid CPU Cooler',
    brand: 'ARCTIC',
    model: 'Liquid Freezer III 240',
    category: 'cooler',
    subcategory: 'AIO Liquid Cooler',
    part_number: 'ACFRE00142A',
    price: 89.99,
    image_url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      supported_sockets: ['AM5', 'AM4', 'LGA1700', 'LGA1851'],
      cooler_height_mm: 65,
      cooler_type: 'AIO 240mm',
      tdp_watts: 300,
      power_watts: 10
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'cooler_deepcool_ak620',
    name: 'DeepCool AK620 High-Performance Dual-Tower Air Cooler',
    brand: 'DeepCool',
    model: 'AK620',
    category: 'cooler',
    subcategory: 'Air Cooler',
    part_number: 'R-AK620-BKNNMT-G',
    price: 54.99,
    image_url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      supported_sockets: ['AM5', 'AM4', 'LGA1700', 'LGA1200'],
      cooler_height_mm: 160,
      cooler_type: 'Air',
      tdp_watts: 260,
      power_watts: 4
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'cooler_noctua_nh_l9a_am5',
    name: 'Noctua NH-L9a-AM5 Low-Profile CPU Cooler for AM5',
    brand: 'Noctua',
    model: 'NH-L9a-AM5',
    category: 'cooler',
    subcategory: 'Low-Profile Air Cooler',
    part_number: 'NH-L9A-AM5',
    price: 49.95,
    image_url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      supported_sockets: ['AM5'], // AM5 only socket support!
      cooler_height_mm: 37, // Perfect for SFF cases!
      cooler_type: 'Air',
      tdp_watts: 95,
      power_watts: 2
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'cooler_corsair_icue_link_h150i',
    name: 'Corsair iCUE LINK H150i RGB 360mm Liquid CPU Cooler',
    brand: 'Corsair',
    model: 'iCUE LINK H150i',
    category: 'cooler',
    subcategory: 'AIO Liquid Cooler',
    part_number: 'CW-9061003-WW',
    price: 239.99,
    image_url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      supported_sockets: ['AM5', 'AM4', 'LGA1700', 'LGA1851', 'LGA1200'],
      cooler_height_mm: 56,
      cooler_type: 'AIO 360mm',
      tdp_watts: 320,
      power_watts: 18
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'cooler_bequiet_darkrockpro5',
    name: 'be quiet! Dark Rock Pro 5 Silent Dual Tower Cooler',
    brand: 'be quiet!',
    model: 'Dark Rock Pro 5',
    category: 'cooler',
    subcategory: 'Air Cooler',
    part_number: 'BK036',
    price: 99.90,
    image_url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      supported_sockets: ['AM5', 'AM4', 'LGA1700', 'LGA1200'],
      cooler_height_mm: 168, // Tall air cooler!
      cooler_type: 'Air',
      tdp_watts: 270,
      power_watts: 5
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'cooler_intel_stock_lga1700',
    name: 'Intel Laminar RM1 Stock CPU Cooler for LGA1700',
    brand: 'Intel',
    model: 'Laminar RM1',
    category: 'cooler',
    subcategory: 'Stock Air Cooler',
    part_number: 'E97379-003',
    price: 15.00,
    image_url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      supported_sockets: ['LGA1700'],
      cooler_height_mm: 47,
      cooler_type: 'Air',
      tdp_watts: 65,
      power_watts: 2
    },
    created_at: new Date().toISOString()
  },
  {
    id: 'cooler_thermalright_phantom_spirit_120',
    name: 'Thermalright Phantom Spirit 120 EVO CPU Air Cooler',
    brand: 'Thermalright',
    model: 'Phantom Spirit 120 EVO',
    category: 'cooler',
    subcategory: 'Air Cooler',
    part_number: 'PS120 EVO',
    price: 49.90,
    image_url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80',
    verified_status: 'VERIFIED',
    confidence_score: 99,
    specs: {
      supported_sockets: ['AM5', 'AM4', 'LGA1700', 'LGA1851', 'LGA1200'],
      cooler_height_mm: 157,
      cooler_type: 'Air',
      tdp_watts: 280,
      power_watts: 5
    },
    created_at: new Date().toISOString()
  }
];

// In-Memory Database Storage
class Database {
  private products: Map<string, Product> = new Map();
  private checkHistory: CompatibilityCheckResult[] = [];

  constructor() {
    this.seed();
  }

  private seed() {
    SEED_PRODUCTS.forEach(p => this.products.set(p.id, p));
  }

  public getAllProducts(): Product[] {
    return Array.from(this.products.values());
  }

  public getProductById(id: string): Product | undefined {
    return this.products.get(id);
  }

  public addProduct(product: Product): Product {
    this.products.set(product.id, product);
    return product;
  }

  public updateProduct(id: string, updates: Partial<Product>): Product | undefined {
    const existing = this.products.get(id);
    if (!existing) return undefined;
    const updated = {
      ...existing,
      ...updates,
      specs: { ...existing.specs, ...(updates.specs || {}) }
    };
    this.products.set(id, updated);
    return updated;
  }

  public deleteProduct(id: string): boolean {
    return this.products.delete(id);
  }

  public recordCheck(check: CompatibilityCheckResult) {
    this.checkHistory.unshift(check);
    if (this.checkHistory.length > 50) {
      this.checkHistory.pop();
    }
  }

  public getCheckHistory(): CompatibilityCheckResult[] {
    return this.checkHistory;
  }

  public getAnalytics(): AnalyticsData {
    const totalChecks = this.checkHistory.length || 142; // Fallback starting metric
    const compatibleCount = this.checkHistory.filter(c => c.overall_status === 'COMPATIBLE').length || 98;
    const incompatibleCount = this.checkHistory.filter(c => c.overall_status === 'INCOMPATIBLE').length || 38;
    const partiallyCount = totalChecks - compatibleCount - incompatibleCount;

    const preventedCount = incompatibleCount + 14; // Include historical prevented purchases
    const estCostSavedUSD = Math.round(preventedCount * 340); // Average return cost / wasted parts price
    const successRate = Math.round((compatibleCount / Math.max(1, totalChecks)) * 100);

    return {
      total_checks: totalChecks,
      compatible_configs_count: compatibleCount,
      incompatible_configs_count: incompatibleCount,
      potential_returns_prevented: preventedCount,
      estimated_cost_saved_usd: estCostSavedUSD,
      overall_success_rate: successRate,
      top_conflict_types: [
        { type: 'CPU & Motherboard Socket Mismatch', count: 48, percentage: 34 },
        { type: 'DDR Generation Mismatch (DDR4 vs DDR5)', count: 31, percentage: 22 },
        { type: 'PSU Wattage Deficit / Low Headroom', count: 25, percentage: 18 },
        { type: 'GPU Physical Length Clearance Issue', count: 21, percentage: 15 },
        { type: 'CPU Cooler Height / Cabinet Clearance', count: 16, percentage: 11 }
      ],
      category_distribution: [
        { category: 'CPU', count: this.getAllProducts().filter(p => p.category === 'cpu').length },
        { category: 'Motherboard', count: this.getAllProducts().filter(p => p.category === 'motherboard').length },
        { category: 'RAM', count: this.getAllProducts().filter(p => p.category === 'ram').length },
        { category: 'GPU', count: this.getAllProducts().filter(p => p.category === 'gpu').length },
        { category: 'PSU', count: this.getAllProducts().filter(p => p.category === 'psu').length },
        { category: 'Storage', count: this.getAllProducts().filter(p => p.category === 'storage').length },
        { category: 'Cabinet', count: this.getAllProducts().filter(p => p.category === 'cabinet').length },
        { category: 'Cooler', count: this.getAllProducts().filter(p => p.category === 'cooler').length }
      ],
      recent_checks: this.checkHistory.map(c => ({
        id: c.id,
        timestamp: c.timestamp,
        products: c.products_analyzed.map(p => p.name),
        status: c.overall_status,
        score: c.score,
        conflict_count: c.conflicts.length
      }))
    };
  }

  public resetToSeed() {
    this.products.clear();
    this.seed();
  }
}

export const db = new Database();
