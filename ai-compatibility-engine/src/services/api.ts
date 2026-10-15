import { Product, CompatibilityCheckResult, ExtractionResult, VisualAnalysisResult, AnalyticsData } from '../types.js';

export async function fetchProducts(filters?: {
  category?: string;
  search?: string;
  brand?: string;
  socket?: string;
}): Promise<Product[]> {
  const params = new URLSearchParams();
  if (filters?.category) params.append('category', filters.category);
  if (filters?.search) params.append('search', filters.search);
  if (filters?.brand) params.append('brand', filters.brand);
  if (filters?.socket) params.append('socket', filters.socket);

  const res = await fetch(`/api/products?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch products catalog');
  const data = await res.json();
  return data.products;
}

export async function createProduct(product: Partial<Product>): Promise<Product> {
  const res = await fetch('/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  });
  if (!res.ok) throw new Error('Failed to create product');
  return res.json();
}

export async function updateProduct(id: string, product: Partial<Product>): Promise<Product> {
  const res = await fetch(`/api/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  });
  if (!res.ok) throw new Error('Failed to update product');
  return res.json();
}

export async function deleteProduct(id: string): Promise<void> {
  const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete product');
}

export async function resetDatabase(): Promise<void> {
  const res = await fetch('/api/products/reset', { method: 'POST' });
  if (!res.ok) throw new Error('Failed to reset catalog');
}

export async function checkCompatibility(
  productIds: string[],
  configurationName?: string
): Promise<CompatibilityCheckResult> {
  const res = await fetch('/api/compatibility/check', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ product_ids: productIds, configuration_name: configurationName })
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to check compatibility');
  }
  return res.json();
}

export async function extractSpecifications(rawText: string): Promise<ExtractionResult> {
  const res = await fetch('/api/ai/extract-specifications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: rawText })
  });
  if (!res.ok) throw new Error('Failed to extract specifications');
  return res.json();
}

export async function analyzeVisualImage(imageBase64: string, mimeType: string = 'image/png'): Promise<VisualAnalysisResult> {
  const res = await fetch('/api/ai/visual-analysis', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image_base64: imageBase64, mime_type: mimeType })
  });
  if (!res.ok) throw new Error('Failed to analyze image');
  return res.json();
}

export async function fetchAnalytics(): Promise<AnalyticsData> {
  const res = await fetch('/api/analytics');
  if (!res.ok) throw new Error('Failed to fetch analytics data');
  return res.json();
}

export async function fetchRules(): Promise<{ rules: any[] }> {
  const res = await fetch('/api/rules');
  if (!res.ok) throw new Error('Failed to fetch rules');
  return res.json();
}
