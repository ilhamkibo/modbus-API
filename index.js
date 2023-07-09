const express = require('express');
const ModbusTCP = require('modbus-serial');
const axios = require('axios');

const app = express();
const port = 3005; // Ganti dengan port yang diinginkan

// Inisialisasi koneksi Modbus TCP
const client = new ModbusTCP();
const MODBUS_HOST = '192.168.1.20'; // Ganti dengan alamat IP perangkat Modbus
const MODBUS_PORT = 502; // Ganti dengan port Modbus TCP yang sesuai
client.connectTCP(MODBUS_HOST, { port: MODBUS_PORT });
client.setID(1);
let datatest;
setInterval(() => {
    const MODBUS_START_ADDRESS = 0;
    const MODBUS_NUM_REGISTERS = 10;
    client.readHoldingRegisters(MODBUS_START_ADDRESS, MODBUS_NUM_REGISTERS, (err,data) => {
        datatest = data;
    });
            
}, 1000);
// Endpoint untuk mengambil data dari Modbus dan mengirimnya ke API
app.get('/data', (req, res) => {
  
    // Mengirimkan JSON sebagai respons
    res.json(datatest);
  });
// Jalankan server Express.js
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});

process.on("uncaughtException", ()=>{})