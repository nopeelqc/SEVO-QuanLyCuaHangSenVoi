require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.post('/api/login', async (req, res) => {
    const { ten_dn, mat_khau } = req.body;
    try {
        const { data, error } = await supabase
            .from('tai_khoan')
            .select('*')
            .eq('ten_dn', ten_dn)
            .eq('mat_khau', mat_khau);

        if (error) throw error;

        if (data && data.length > 0) {
            res.json({ success: true, user: data[0] });
        } else {
            res.status(401).json({ success: false, message: 'Sai tài khoản hoặc mật khẩu' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Lỗi máy chủ' });
    }
});

app.get('/api/dashboard', async (req, res) => {
    try {
        const [truy_van_sp, truy_van_kh, truy_van_hd, truy_van_dm] = await Promise.all([
            supabase.from('san_pham').select('*'),
            supabase.from('khach_hang').select('*'),
            supabase.from('hoa_don').select('*, chi_tiet_hoa_don(*)'),
            supabase.from('danh_muc').select('*')
        ]);

        if (truy_van_sp.error) throw truy_van_sp.error;
        if (truy_van_kh.error) throw truy_van_kh.error;
        if (truy_van_hd.error) throw truy_van_hd.error;
        if (truy_van_dm.error) throw truy_van_dm.error;

        res.json({
            san_pham: truy_van_sp.data,
            khach_hang: truy_van_kh.data,
            hoa_don: truy_van_hd.data,
            danh_muc: truy_van_dm.data
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/sanpham', async (req, res) => {
    try {
        const { data, error } = await supabase.from('san_pham').select('*');
        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/sanpham', async (req, res) => {
    try {
        const { data, error } = await supabase.from('san_pham').insert([req.body]);
        if (error) throw error;
        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/khachhang', async (req, res) => {
    try {
        const { data, error } = await supabase.from('khach_hang').select('*');
        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/khachhang', async (req, res) => {
    try {
        const { data, error } = await supabase.from('khach_hang').insert([req.body]);
        if (error) throw error;
        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/danhmuc', async (req, res) => {
    try {
        const { data, error } = await supabase.from('danh_muc').select('*');
        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/hoadon', async (req, res) => {
    try {
        const { data, error } = await supabase.from('hoa_don').select('*, chi_tiet_hoa_don(*)');
        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/taikhoan', async (req, res) => {
    try {
        const { data, error } = await supabase.from('tai_khoan').select('*');
        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/', (req, res) => {
    res.send('Server Backend SEVO đang hoạt động với Supabase');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server Backend đang chạy tại http://localhost:${PORT}`);
});