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

app.get('/api/taikhoan', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('tai_khoan')
            .select('*');

        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

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
        res.status(500).json({ success: false, message: 'Lỗi server' });
    }
});

const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send('Server Backend SEVO đang hoạt động với Supabase');
});

app.listen(PORT, () => {
    console.log(` Đang chạy tại http://localhost:${PORT}`);
});