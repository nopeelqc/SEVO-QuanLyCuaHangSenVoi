function veBangDieuKhien() {
    const hdHopLe = csdl.hoaDon.filter(h => h.trangThai === 'Đã thanh toán');
    const tongDoanhThu = hdHopLe.reduce((t, h) => t + h.tongTien, 0);
    const tongTon = csdl.sanPham.reduce((t, s) => t + Number(s.tonKho), 0);

    document.getElementById('tk_doanh_thu').textContent = dinhDangTien(tongDoanhThu);
    document.getElementById('tk_so_hoa_don').textContent = csdl.hoaDon.length;
    document.getElementById('tk_ton_kho').textContent = tongTon;
    document.getElementById('tk_khach_hang').textContent = csdl.khachHang.length;

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