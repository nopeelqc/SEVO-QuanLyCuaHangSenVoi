if (!sessionStorage.getItem('da_dang_nhap')) {
    const duongDanHienTai = window.location.pathname;
    const duongDanLogin = duongDanHienTai.includes('/dashboard/') ? '../login/login.html' : 'login/login.html';
    window.location.replace(duongDanLogin);
}

const thanhBen = document.getElementById('thanh_ben');
const nutThuGon = document.getElementById('nut_thu_gon');
const chuaLogo = document.getElementById('chua_logo');

nutThuGon.addEventListener('click', () => {
    thanhBen.classList.add('da_thu_gon');
});

chuaLogo.addEventListener('click', () => {
    thanhBen.classList.remove('da_thu_gon');
});

const duLieuMacDinh = {
    danhMuc: [
        { ma: 'DM01', ten: 'Sen cây tắm đứng' },
        { ma: 'DM02', ten: 'Vòi chậu Lavabo' },
        { ma: 'DM03', ten: 'Vòi rửa bát nhà bếp' },
        { ma: 'DM04', ten: 'Phụ kiện phòng tắm' }
    ],
    sanPham: [
        { ma: 'SP001', ten: 'Bộ sen cây tắm nóng lạnh Inox 304 SEVO-S1', maDM: 'DM01', donVi: 'Bộ', giaNhap: 1850000, giaBan: 2650000, tonKho: 18, baoHanh: 36 },
        { ma: 'SP002', ten: 'Sen tắm âm tường cao cấp mạ Crom SEVO-S2', maDM: 'DM01', donVi: 'Bộ', giaNhap: 3200000, giaBan: 4500000, tonKho: 4, baoHanh: 48 },
        { ma: 'SP003', ten: 'Vòi chậu Lavabo nóng lạnh đồng thau SEVO-L1', maDM: 'DM02', donVi: 'Chiếc', giaNhap: 650000, giaBan: 980000, tonKho: 25, baoHanh: 24 },
        { ma: 'SP004', ten: 'Vòi rửa bát cần rút dây nóng lạnh SEVO-K1', maDM: 'DM03', donVi: 'Chiếc', giaNhap: 780000, giaBan: 1250000, tonKho: 3, baoHanh: 24 },
        { ma: 'SP005', ten: 'Vắt khăn giàn Inox 304 cao cấp SEVO-A1', maDM: 'DM04', donVi: 'Bộ', giaNhap: 320000, giaBan: 550000, tonKho: 30, baoHanh: 12 }
    ],
    khachHang: [
        { ma: 'KH001', ten: 'Nguyễn Văn Hoàng', sdt: '0912345678', diaChi: '259 Vĩnh Hưng, Hoàng Mai, Hà Nội' },
        { ma: 'KH002', ten: 'Trần Thị Mai Hương', sdt: '0987654321', diaChi: 'KĐT Times City, Hai Bà Trưng, Hà Nội' },
        { ma: 'KH003', ten: 'Lê Minh Tuấn', sdt: '0905112233', diaChi: '124 Minh Khai, Hai Bà Trưng, Hà Nội' }
    ],
    nhaCungCap: [
        { ma: 'NCC01', ten: 'Công ty Thiết bị vệ sinh Inax Việt Nam', sdt: '0243888999', diaChi: 'KCN Tiên Sơn, Bắc Ninh' },
        { ma: 'NCC02', ten: 'Tổng kho Sen Vòi Toto Miền Bắc', sdt: '0243777666', diaChi: 'Lô CN2, KCN Thăng Long, Hà Nội' },
        { ma: 'NCC03', ten: 'Nhà máy Sản xuất Sen Vòi Thăng Long', sdt: '0243666555', diaChi: '85A Ngõ 259 Vĩnh Hưng, Hoàng Mai, Hà Nội' }
    ],
    hoaDon: [
        {
            ma: 'HD001',
            ngay: '2026-09-20',
            maKH: 'KH001',
            nguoiLap: 'Lương Quốc Cường',
            tongTien: 3630000,
            trangThai: 'Đã thanh toán',
            chiTiet: [
                { maSP: 'SP001', tenSP: 'Bộ sen cây tắm nóng lạnh Inox 304 SEVO-S1', soLuong: 1, donGia: 2650000 },
                { maSP: 'SP003', tenSP: 'Vòi chậu Lavabo nóng lạnh đồng thau SEVO-L1', soLuong: 1, donGia: 980000 }
            ]
        },
        {
            ma: 'HD002',
            ngay: '2026-09-24',
            maKH: 'KH002',
            nguoiLap: 'Lương Quốc Cường',
            tongTien: 4500000,
            trangThai: 'Đã thanh toán',
            chiTiet: [
                { maSP: 'SP002', tenSP: 'Sen tắm âm tường cao cấp mạ Crom SEVO-S2', soLuong: 1, donGia: 4500000 }
            ]
        }
    ],
    phieuNhap: [
        {
            ma: 'PN001',
            ngay: '2026-09-15',
            maNCC: 'NCC03',
            nguoiLap: 'Lương Quốc Cường',
            tongTien: 18500000,
            chiTiet: [
                { maSP: 'SP001', tenSP: 'Bộ sen cây tắm nóng lạnh Inox 304 SEVO-S1', soLuong: 10, giaNhap: 1850000 }
            ]
        }
    ],
    taiKhoan: [
        { ma: 'NV001', tenDN: 'admin', hoTen: 'Lương Quốc Cường', sdt: '0968000075', quyen: 'Admin', trangThai: 'Hoạt động' },
        { ma: 'NV002', tenDN: 'nhanvien01', hoTen: 'Đỗ Minh Hiền', sdt: '0977123456', quyen: 'Nhân viên bán hàng', trangThai: 'Hoạt động' }
    ]
};

if (!localStorage.getItem('sevo_csdl')) {
    localStorage.setItem('sevo_csdl', JSON.stringify(duLieuMacDinh));
}

const csdl = JSON.parse(localStorage.getItem('sevo_csdl'));

function dinhDangTien(so) {
    return Number(so).toLocaleString('vi-VN') + ' ₫';
}

document.getElementById('nut_dang_xuat_nhanh').addEventListener('click', () => {
    sessionStorage.removeItem('da_dang_nhap');
    const duongDanHienTai = window.location.pathname;
    const duongDanLogin = duongDanHienTai.includes('/dashboard/') ? '../login/login.html' : 'login/login.html';
    window.location.replace(duongDanLogin);
});