// server.js

const express = require('express');
const bodyParser = require('body-parser');
const wifi = require('node-wifi');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Inisialisasi modul wifi
wifi.init({
  iface: null // Pilih interface WiFi (jika null, otomatis akan memilih yang pertama)
});

// Endpoint untuk mendapatkan informasi WiFi
app.get('/api/wifi', (req, res) => {
  wifi.scan((error, networks) => {
    if (error) {
      return res.status(500).json({ error: 'Gagal mendapatkan informasi WiFi.' });
    }
    
    const wifiInfo = networks.map(network => ({
      ssid: network.ssid,
      security: network.security,
      wps: network.wps
    }));
    
    res.json(wifiInfo);
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
