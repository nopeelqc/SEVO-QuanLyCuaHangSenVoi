function layChuoiNgay(dt) {
    const nam = dt.getFullYear();
    const thang = String(dt.getMonth() + 1).padStart(2, '0');
    const ngay = String(dt.getDate()).padStart(2, '0');
    return `${nam}-${thang}-${ngay}`;
}

function capNhatThoiGianThuc() {
    const el = document.getElementById('thoi_gian_thuc');
    if (!el) return;
    const hienTai = new Date();
    const gio = String(hienTai.getHours()).padStart(2, '0');
    const phut = String(hienTai.getMinutes()).padStart(2, '0');
    const giay = String(hienTai.getSeconds()).padStart(2, '0');
    const ngay = String(hienTai.getDate()).padStart(2, '0');
    const thang = String(hienTai.getMonth() + 1).padStart(2, '0');
    const nam = hienTai.getFullYear();
    el.textContent = `${ngay}/${thang}/${nam} - ${gio}:${phut}:${giay}`;
}

function veBangDieuKhien() {
    const homNay = new Date();
    const chuoiHomNay = layChuoiNgay(homNay);

    const hdHomNay = csdl.hoaDon.filter(h => h.ngay === chuoiHomNay);
    const dsHoaDonHomNay = hdHomNay.length > 0 ? hdHomNay : csdl.hoaDon;
    const hdHopLeHomNay = dsHoaDonHomNay.filter(h => h.trangThai === 'Đã thanh toán');

    const hdHopLe = csdl.hoaDon.filter(h => h.trangThai === 'Đã thanh toán');
    const tongDoanhThuHomNay = hdHopLeHomNay.reduce((t, h) => t + h.tongTien, 0);
    const tongTon = csdl.sanPham.reduce((t, s) => t + Number(s.tonKho), 0);

    document.getElementById('tk_doanh_thu').textContent = dinhDangTien(tongDoanhThuHomNay);
    document.getElementById('tk_so_hoa_don').textContent = dsHoaDonHomNay.length;
    document.getElementById('tk_ton_kho').textContent = tongTon;
    document.getElementById('tk_khach_hang').textContent = csdl.khachHang.length;

    const mapSanPham = new Map(csdl.sanPham.map(sp => [sp.ma, sp]));
    const mapKhachHang = new Map(csdl.khachHang.map(kh => [kh.ma, kh]));
    const mapDanhMuc = new Map(csdl.danhMuc.map(dm => [dm.ma, dm]));

    const dsNgay = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(homNay);
        d.setDate(homNay.getDate() - (6 - i));
        return layChuoiNgay(d);
    });

    const doanhThuTheoNgay = {};
    hdHopLe.forEach(h => {
        doanhThuTheoNgay[h.ngay] = (doanhThuTheoNgay[h.ngay] || 0) + h.tongTien;
    });

    const duLieu7Ngay = dsNgay.map((ngay) => {
        const tongTheoNgay = doanhThuTheoNgay[ngay] || 0;
        return {
            nhan: ngay.slice(8, 10) + '/' + ngay.slice(5, 7),
            giaTri: tongTheoNgay
        };
    });

    const maxDT = Math.max(...duLieu7Ngay.map(d => d.giaTri), 1);
    const khungBieuDo = document.getElementById('bieu_do_doanh_thu');
    const chieuRong = khungBieuDo && khungBieuDo.clientWidth > 0 ? khungBieuDo.clientWidth - 40 : 500;
    const chieuCao = 115;
    const leTren = 22;
    const leDuoi = 10;
    const vungVe = chieuCao - leTren - leDuoi;

    const toaDoDiem = duLieu7Ngay.map((d, i) => {
        const x = Math.round((i / (duLieu7Ngay.length - 1)) * (chieuRong - 40) + 20);
        const y = Math.round(leTren + vungVe - (d.giaTri / maxDT) * vungVe);
        return { x, y, giaTri: d.giaTri, nhan: d.nhan };
    });

    const chuoiDiem = toaDoDiem.map(p => `${p.x},${p.y}`).join(' ');
    const chuoiVung = `${toaDoDiem[0].x},${chieuCao} ${chuoiDiem} ${toaDoDiem[toaDoDiem.length - 1].x},${chieuCao}`;

    if (khungBieuDo) {
        khungBieuDo.innerHTML = `
            <svg viewBox="0 0 ${chieuRong} ${chieuCao}" class="svg_bieu_do">
                <defs>
                    <linearGradient id="mau_nen_bieu_do" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#2b6cb0" stop-opacity="0.25"/>
                        <stop offset="100%" stop-color="#2b6cb0" stop-opacity="0.0"/>
                    </linearGradient>
                </defs>
                <polygon points="${chuoiVung}" fill="url(#mau_nen_bieu_do)" />
                <polyline fill="none" stroke="#2b6cb0" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" points="${chuoiDiem}" />
                ${toaDoDiem.map(p => `
                    <circle cx="${p.x}" cy="${p.y}" r="4" fill="#ffffff" stroke="#2b6cb0" stroke-width="2.5">
                        <title>${dinhDangTien(p.giaTri)}</title>
                    </circle>
                    <text x="${p.x}" y="${p.y - 9}" text-anchor="middle" font-size="10.5" font-weight="600" fill="#475569">${p.giaTri > 0 ? (p.giaTri / 1000000).toFixed(1) + 'tr' : '0'}</text>
                `).join('')}
            </svg>
            <div class="nhan_ngay_bieu_do">
                ${toaDoDiem.map(p => `<span>${p.nhan}</span>`).join('')}
            </div>
        `;
    }

    const demTheoDM = {};
    hdHopLe.forEach(hd => {
        hd.chiTiet.forEach(ct => {
            const sp = mapSanPham.get(ct.maSP);
            if (sp) {
                demTheoDM[sp.maDM] = (demTheoDM[sp.maDM] || 0) + Number(ct.soLuong);
            }
        });
    });

    const dsTheoDM = Object.keys(demTheoDM).map(maDM => {
        const dm = mapDanhMuc.get(maDM);
        return {
            ten: dm ? dm.ten : maDM,
            soLuong: demTheoDM[maDM]
        };
    });

    dsTheoDM.sort((a, b) => b.soLuong - a.soLuong);
    const thongKeBanChay = dsTheoDM.slice(0, 4);

    if (thongKeBanChay.length === 0) {
        thongKeBanChay.push({ ten: 'Chưa có dữ liệu', soLuong: 0 });
    }

    const maxSL = Math.max(...thongKeBanChay.map(m => m.soLuong), 1);
    const khungBanChay = document.getElementById('danh_sach_ban_chay');
    if (khungBanChay) {
        khungBanChay.innerHTML = thongKeBanChay.map(m => {
            const phanTram = Math.round((m.soLuong / maxSL) * 100);
            return `
                <div class="muc_ban_chay">
                    <div class="thong_tin_ban_chay">
                        <span>${m.ten}</span>
                        <span class="so_luong_ban_chay">${m.soLuong} đã bán</span>
                    </div>
                    <div class="thanh_nen_ban_chay">
                        <div class="thanh_gia_tri_ban_chay" style="width: ${phanTram}%"></div>
                    </div>
                </div>
            `;
        }).join('');
    }

    const bangGD = document.getElementById('bang_giao_dich_gan_day');
    const dsGiaoDich = csdl.hoaDon.slice(-6).reverse();

    if (dsGiaoDich.length === 0) {
        bangGD.innerHTML = `<tr><td colspan="5" class="chu_giua">Chưa có giao dịch nào.</td></tr>`;
    } else {
        bangGD.innerHTML = dsGiaoDich.map(hd => {
            const kh = mapKhachHang.get(hd.maKH);
            let lopTT = 'tt_dang_xu_ly';
            if (hd.trangThai === 'Đã thanh toán') lopTT = 'tt_thanh_cong';
            if (hd.trangThai === 'Đã hủy') lopTT = 'tt_da_huy';
            
            return `
                <tr>
                    <td><strong>${hd.ma}</strong></td>
                    <td>${kh ? kh.ten : 'Khách lẻ'}</td>
                    <td>${hd.ngay}</td>
                    <td>${dinhDangTien(hd.tongTien)}</td>
                    <td><span class="nhan_trang_thai ${lopTT}">${hd.trangThai}</span></td>
                </tr>
            `;
        }).join('');
    }

    const bangCanhBao = document.getElementById('bang_canh_bao_ton');
    const spSapHet = csdl.sanPham.filter(s => s.tonKho <= 5);
    if (spSapHet.length === 0) {
        bangCanhBao.innerHTML = `<tr><td colspan="4" class="chu_giua">Tất cả mặt hàng đều đảm bảo định mức tồn kho.</td></tr>`;
    } else {
        bangCanhBao.innerHTML = spSapHet.map(sp => `
            <tr>
                <td><strong>${sp.ma}</strong></td>
                <td>${sp.ten}</td>
                <td>${sp.tonKho} ${sp.donVi}</td>
                <td><span class="nhan_trang_thai tt_canh_bao">Cần nhập thêm</span></td>
            </tr>
        `).join('');
    }
}

capNhatThoiGianThuc();
setInterval(capNhatThoiGianThuc, 1000);
veBangDieuKhien();

window.addEventListener('storage', () => {
    if (typeof taiDuLieu === 'function') {
        taiDuLieu();
    }
    veBangDieuKhien();
});