import express from 'express'
import cors from 'cors'
import pool from './db.js'

const app = express()
const PORT = process.env.API_PORT || 3001

app.use(cors())
app.use(express.json())

app.get('/api/records', async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1)
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 50, 1), 100)
    const offset = (page - 1) * limit
    const search = req.query.search || ''
    const status = req.query.status || ''
    const serviceType = req.query.serviceType || ''
    const startDate = req.query.startDate || ''
    const endDate = req.query.endDate || ''

    const conditions = []
    const params = []

    if (search) {
      conditions.push('(customer_name LIKE ? OR customer_phone LIKE ?)')
      params.push(`%${search}%`, `%${search}%`)
    }
    if (status) {
      conditions.push('status = ?')
      params.push(status)
    }
    if (serviceType) {
      conditions.push('service_type = ?')
      params.push(serviceType)
    }
    if (startDate) {
      conditions.push('tanggal >= ?')
      params.push(startDate)
    }
    if (endDate) {
      conditions.push('tanggal <= ?')
      params.push(endDate)
    }

    const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''

    const [countRows] = await pool.query(
      `SELECT COUNT(*) AS total FROM laundry_records ${where}`,
      params
    )
    const total = countRows[0].total

    const [rows] = await pool.query(
      `SELECT * FROM laundry_records ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    )

    res.set('X-Total-Count', String(total))
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.get('/api/records/summary', async (req, res) => {
  try {
    const today = new Date().toISOString().slice(0, 10)
    const yesterdayDate = new Date(Date.now() - 86400000).toISOString().slice(0, 10)

    const [
      [todayStats],
      [yesterdayStats],
      statusRows,
      serviceRows,
      [recentRows],
    ] = await Promise.all([
      pool.query(
        `SELECT
           COUNT(*) AS total_transactions,
           COALESCE(SUM(total_harga), 0) AS total_revenue,
           COALESCE(SUM(quantity), 0) AS total_shoes
         FROM laundry_records WHERE tanggal = ?`,
        [today]
      ),
      pool.query(
        `SELECT COALESCE(SUM(total_harga), 0) AS revenue
         FROM laundry_records WHERE tanggal = ?`,
        [yesterdayDate]
      ),
      pool.query(
        `SELECT status, COUNT(*) AS count
         FROM laundry_records WHERE tanggal = ?
         GROUP BY status`,
        [today]
      ),
      pool.query(
        `SELECT service_type, COALESCE(SUM(total_harga), 0) AS revenue
         FROM laundry_records WHERE tanggal = ?
         GROUP BY service_type`,
        [today]
      ),
      pool.query(
        `SELECT * FROM laundry_records ORDER BY created_at DESC LIMIT 10`
      ),
    ])

    const statusCount = { Diproses: 0, Selesai: 0, Diambil: 0 }
    for (const row of statusRows[0]) {
      if (statusCount[row.status] !== undefined) statusCount[row.status] = row.count
    }

    const revenueByService = {}
    for (const row of serviceRows[0]) {
      revenueByService[row.service_type] = row.revenue
    }

    const totalTransactions = todayStats.total_transactions
    const totalRevenue = Number(todayStats.total_revenue)
    const totalShoes = Number(todayStats.total_shoes)
    const yesterdayRevenue = Number(yesterdayStats.revenue)
    const revenueTrend = yesterdayRevenue > 0
      ? Math.round(((totalRevenue - yesterdayRevenue) / yesterdayRevenue) * 100)
      : 0

    res.json({
      todayShoes: totalShoes,
      todayRevenue: totalRevenue,
      todayCustomers: totalTransactions,
      avgPerCust: totalTransactions > 0 ? Math.round(totalRevenue / totalTransactions) : 0,
      yesterdayRevenue,
      revenueTrend,
      revenueByService,
      statusCount,
      recentRecords: recentRows,
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.post('/api/records', async (req, res) => {
  const {
    tanggal,
    customerName,
    customerPhone,
    serviceType,
    shoeBrand,
    shoeType,
    quantity,
    hargaSatuan,
    totalHarga,
    status,
    catatan,
    inputBy,
  } = req.body

  try {
    const [result] = await pool.query(
      `INSERT INTO laundry_records
       (tanggal, customer_name, customer_phone, service_type, shoe_brand, shoe_type,
        quantity, harga_satuan, total_harga, status, catatan, input_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        tanggal,
        customerName,
        customerPhone,
        serviceType,
        shoeBrand,
        shoeType,
        quantity,
        hargaSatuan,
        totalHarga,
        status,
        catatan,
        inputBy,
      ]
    )
    res.json({ id: result.insertId })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.put('/api/records/:id', async (req, res) => {
  const { id } = req.params
  const {
    tanggal,
    customerName,
    customerPhone,
    serviceType,
    shoeBrand,
    shoeType,
    quantity,
    hargaSatuan,
    totalHarga,
    status,
    catatan,
  } = req.body

  try {
    await pool.query(
      `UPDATE laundry_records SET
       tanggal = ?, customer_name = ?, customer_phone = ?, service_type = ?,
       shoe_brand = ?, shoe_type = ?, quantity = ?, harga_satuan = ?,
       total_harga = ?, status = ?, catatan = ?, updated_at = NOW()
       WHERE id = ?`,
      [
        tanggal,
        customerName,
        customerPhone,
        serviceType,
        shoeBrand,
        shoeType,
        quantity,
        hargaSatuan,
        totalHarga,
        status,
        catatan,
        id,
      ]
    )
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.delete('/api/records/:id', async (req, res) => {
  const { id } = req.params
  try {
    await pool.query('DELETE FROM laundry_records WHERE id = ?', [id])
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`)
})
