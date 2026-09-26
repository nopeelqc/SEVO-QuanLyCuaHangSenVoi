function veBangDieuKhien() {
    const hdHopLe = csdl.hoaDon.filter(h => h.trangThai === 'Đã thanh toán');
    const tongDoanhThu = hdHopLe.reduce((t, h) => t + h.tongTien, 0);
    const tongTon = csdl.sanPham.reduce((t, s) => t + Number(s.tonKho), 0);

    document.getElementById('tk_doanh_thu').textContent = dinhDangTien(tongDoanhThu);
    document.getElementById('tk_so_hoa_don').textContent = csdl.hoaDon.length;
    document.getElementById('tk_ton_kho').textContent = tongTon;
    document.getElementById('tk_khach_hang').textContent = csdl.khachHang.length;

    const dsNgay = ['2026-09-19', '2026-09-20', '2026-09-21', '2026-09-22', '2026-09-23', '2026-09-24', '2026-09-25'];
    const doanhThuMacDinh7Ngay = [1250000, 3630000, 1960000, 3150000, 1500000, 4500000, 2650000];

    const duLieu7Ngay = dsNgay.map((ngay, i) => {
        const tongTheoNgay = hdHopLe
            .filter(h => h.ngay === ngay)
            .reduce((t, h) => t + h.tongTien, 0);
        return {
            nhan: ngay.slice(8, 10) + '/' + ngay.slice(5, 7),
            giaTri: tongTheoNgay > 0 ? tongTheoNgay : doanhThuMacDinh7Ngay[i]
        };
    });

    const maxDT = Math.max(...duLieu7Ngay.map(d => d.giaTri), 1);
    const chieuRong = 500;
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

    const khungBieuDo = document.getElementById('bieu_do_doanh_thu');
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
                    <circle cx="${p.x}" cy="${p.y}" r="4" fill="#ffffff" stroke="#2b6cb0" stroke-width="2.5" />
                    <text x="${p.x}" y="${p.y - 9}" text-anchor="middle" font-size="10.5" font-weight="600" fill="#475569">${(p.giaTri / 1000000).toFixed(1)}tr</text>
                `).join('')}
            </svg>
            <div class="nhan_ngay_bieu_do">
                ${toaDoDiem.map(p => `<span>${p.nhan}</span>`).join('')}
            </div>
        `;
    }

    const thongKeBanChay = [
        { ten: 'Sen tắm', maDM: 'DM01', soLuongGoc: 14 },
        { ten: 'Vòi lavabo', maDM: 'DM02', soLuongGoc: 10 },
        { ten: 'Vòi bếp', maDM: 'DM03', soLuongGoc: 7 },
        { ten: 'Phụ kiện phòng tắm', maDM: 'DM04', soLuongGoc: 5 }
    ].map(muc => {
        let soLuongHD = 0;
        hdHopLe.forEach(hd => {
            hd.chiTiet.forEach(ct => {
                const sp = csdl.sanPham.find(s => s.ma === ct.maSP);
                if (sp && sp.maDM === muc.maDM) {
                    soLuongHD += Number(ct.soLuong);
                }
            });
        });
        return {
            ten: muc.ten,
            soLuong: muc.soLuongGoc + soLuongHD
        };
    });

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
    bangGD.innerHTML = csdl.hoaDon.slice().reverse().slice(0, 6).map(hd => {
        const kh = csdl.khachHang.find(k => k.ma === hd.maKH);
        const lopTT = hd.trangThai === 'Đã thanh toán' ? 'tt_thanh_cong' : 'tt_da_huy';
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

veBangDieuKhien();