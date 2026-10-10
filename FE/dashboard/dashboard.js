function layChuoiNgay(ngay_thang) {
    const nam = ngay_thang.getFullYear();
    const thang = String(ngay_thang.getMonth() + 1).padStart(2, '0');
    const ngay = String(ngay_thang.getDate()).padStart(2, '0');
    return `${nam}-${thang}-${ngay}`;
}

function capNhatThoiGianThuc() {
    const phan_tu_thoi_gian = document.getElementById('thoi_gian_thuc');
    if (!phan_tu_thoi_gian) return;
    const thoi_gian_hien_tai = new Date();
    const gio = String(thoi_gian_hien_tai.getHours()).padStart(2, '0');
    const phut = String(thoi_gian_hien_tai.getMinutes()).padStart(2, '0');
    const giay = String(thoi_gian_hien_tai.getSeconds()).padStart(2, '0');
    const ngay = String(thoi_gian_hien_tai.getDate()).padStart(2, '0');
    const thang = String(thoi_gian_hien_tai.getMonth() + 1).padStart(2, '0');
    const nam = thoi_gian_hien_tai.getFullYear();
    phan_tu_thoi_gian.textContent = `${ngay}/${thang}/${nam} - ${gio}:${phut}:${giay}`;
}

async function veBangDieuKhien() {
    try {
        const phan_hoi = await fetch('http://localhost:3000/api/dashboard');
        const du_lieu = await phan_hoi.json();

        const ds_san_pham = du_lieu.san_pham || [];
        const ds_khach_hang = du_lieu.khach_hang || [];
        const ds_hoa_don = du_lieu.hoa_don || [];

        const tong_ton_kho = ds_san_pham.reduce((tong, sp) => tong + Number(sp.ton_kho || 0), 0);
        const tong_doanh_thu = ds_hoa_don.reduce((tong, hd) => tong + Number(hd.tong_tien || 0), 0);

        document.getElementById('tk_doanh_thu').textContent = dinhDangTien(tong_doanh_thu);
        document.getElementById('tk_so_hoa_don').textContent = ds_hoa_don.length;
        document.getElementById('tk_ton_kho').textContent = tong_ton_kho;
        document.getElementById('tk_khach_hang').textContent = ds_khach_hang.length;

        const bang_canh_bao = document.getElementById('bang_canh_bao_ton');
        const ds_sp_sap_het = ds_san_pham.filter(sp => sp.ton_kho <= 5);

        if (ds_sp_sap_het.length === 0) {
            bang_canh_bao.innerHTML = `<tr><td colspan="4" class="chu_giua">Tất cả mặt hàng đều đảm bảo định mức tồn kho.</td></tr>`;
        } else {
            bang_canh_bao.innerHTML = ds_sp_sap_het.map(sp => `
                <tr>
                    <td><strong>${sp.ma_sp}</strong></td>
                    <td>${sp.ten_sp}</td>
                    <td>${sp.ton_kho} ${sp.don_vi}</td>
                    <td><span class="nhan_trang_thai tt_canh_bao">Cần nhập thêm</span></td>
                </tr>
            `).join('');
        }

        const bang_giao_dich = document.getElementById('bang_giao_dich_gan_day');
        const ds_giao_dich_moi = ds_hoa_don.slice(-6).reverse();

        if (ds_giao_dich_moi.length === 0) {
            bang_giao_dich.innerHTML = `<tr><td colspan="5" class="chu_giua">Chưa có giao dịch nào.</td></tr>`;
        } else {
            const tap_hop_khach_hang = new Map(ds_khach_hang.map(kh => [kh.ma_kh, kh]));
            bang_giao_dich.innerHTML = ds_giao_dich_moi.map(hd => {
                const khach_hang_info = tap_hop_khach_hang.get(hd.ma_kh);
                let lop_trang_thai = 'tt_dang_xu_ly';
                if (hd.trang_thai === 'Đã thanh toán') lop_trang_thai = 'tt_thanh_cong';
                if (hd.trang_thai === 'Đã hủy') lop_trang_thai = 'tt_da_huy';

                return `
                    <tr>
                        <td><strong>${hd.ma_hd}</strong></td>
                        <td>${khach_hang_info ? khach_hang_info.ho_ten : 'Khách lẻ'}</td>
                        <td>${hd.ngay_lap || ''}</td>
                        <td>${dinhDangTien(hd.tong_tien)}</td>
                        <td><span class="nhan_trang_thai ${lop_trang_thai}">${hd.trang_thai || 'Đã thanh toán'}</span></td>
                    </tr>
                `;
            }).join('');
        }

    } catch (loi) {
        console.error('Lỗi kết nối máy chủ:', loi);
    }
}

capNhatThoiGianThuc();
setInterval(capNhatThoiGianThuc, 1000);
veBangDieuKhien();