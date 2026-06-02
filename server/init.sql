CREATE DATABASE IF NOT EXISTS saveshoesjakarta;
USE saveshoesjakarta;

CREATE TABLE IF NOT EXISTS laundry_records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tanggal DATE NOT NULL,
  customer_name VARCHAR(100) NOT NULL,
  customer_phone VARCHAR(20) DEFAULT '',
  service_type VARCHAR(50) NOT NULL,
  shoe_brand VARCHAR(50) DEFAULT '',
  shoe_type VARCHAR(50) DEFAULT '',
  quantity INT NOT NULL DEFAULT 1,
  harga_satuan INT NOT NULL DEFAULT 0,
  total_harga INT NOT NULL DEFAULT 0,
  status VARCHAR(20) NOT NULL DEFAULT 'Diproses',
  catatan TEXT DEFAULT '',
  input_by VARCHAR(100) DEFAULT '',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_created_at ON laundry_records(created_at);
CREATE INDEX idx_tanggal ON laundry_records(tanggal);
CREATE INDEX idx_status ON laundry_records(status);
CREATE INDEX idx_service_type ON laundry_records(service_type);
