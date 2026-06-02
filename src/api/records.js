const API = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

async function request(url, options = {}) {
  const res = await fetch(`${API}${url}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.error || 'Request failed')
  }
  return res.json()
}

export async function getAllRecords(params = {}) {
  const query = new URLSearchParams()
  if (params.page) query.set('page', params.page)
  if (params.limit) query.set('limit', params.limit)
  if (params.search) query.set('search', params.search)
  if (params.status) query.set('status', params.status)
  if (params.serviceType) query.set('serviceType', params.serviceType)
  if (params.startDate) query.set('startDate', params.startDate)
  if (params.endDate) query.set('endDate', params.endDate)

  const qs = query.toString()
  const res = await fetch(`${API}/records${qs ? `?${qs}` : ''}`)
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.error || 'Request failed')
  }
  const total = parseInt(res.headers.get('X-Total-Count') || '0')
  const data = await res.json()
  return {
    records: data.map(normalizeRecord),
    total,
  }
}

export async function getRecordsSummary() {
  return request('/records/summary')
}

export async function addRecord(data) {
  const result = await request('/records', {
    method: 'POST',
    body: JSON.stringify(data),
  })
  return result.id
}

export async function updateRecord(id, data) {
  await request(`/records/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export async function deleteRecord(id) {
  await request(`/records/${id}`, {
    method: 'DELETE',
  })
}

function normalizeRecord(row) {
  return {
    id: row.id,
    tanggal: row.tanggal,
    customerName: row.customer_name,
    customerPhone: row.customer_phone,
    serviceType: row.service_type,
    shoeBrand: row.shoe_brand,
    shoeType: row.shoe_type,
    quantity: row.quantity,
    hargaSatuan: row.harga_satuan,
    totalHarga: row.total_harga,
    status: row.status,
    catatan: row.catatan,
    inputBy: row.input_by,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export const SERVICE_TYPES = [
  'Deep Cleaning',
  'Unyellowing',
  'Repaint & Restoration',
]

export const SHOE_TYPES = [
  'Sneakers',
  'Boots',
  'Canvas',
  'High Heels',
  'Leather Shoes',
  'Sandals',
  'Sports Shoes',
  'Loafers',
]

export const STATUS_OPTIONS = ['Diproses', 'Selesai', 'Diambil']

export const SERVICE_PRICES = {
  'Deep Cleaning': 50000,
  'Unyellowing': 75000,
  'Repaint & Restoration': 150000,
}

export const ADMIN_USERNAME =
  import.meta.env.VITE_ADMIN_USERNAME || 'admin'
export const ADMIN_PASSWORD =
  import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'
