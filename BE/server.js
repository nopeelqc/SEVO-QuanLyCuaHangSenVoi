const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); 

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      
    password: '',      
    database: 'sevo_db'
});

db.connect((err) => {
    if (err) {
        console.error('Lỗi kết nối MySQL:', err.message);
        return;
    }
    console.log('Đã kết nối thành công với MySQL (sevo_db)!');
});

app.get('/api/taikhoan', (req, res) => {
    const sql = 'SELECT * FROM tai_khoan';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

app.post('/api/login', (req, res) => {
    const { ten_dn, mat_khau } = req.body;
    const sql = 'SELECT * FROM tai_khoan WHERE ten_dn = ? AND mat_khau = ?';
    
    db.query(sql, [ten_dn, mat_khau], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Lỗi server' });
        }
        if (results.length > 0) {
            res.json({ success: true, user: results[0] });
        } else {
            res.status(401).json({ success: false, message: 'Sai tài khoản hoặc mật khẩu' });
        }
    });
});

const PORT = 3000;
app.get('/', (req, res) => {
    res.send('Server Backend đang hoạt động ');
});
app.listen(PORT, () => {
    console.log(`Server Backend đang chạy tại http://localhost:${PORT}`);
});