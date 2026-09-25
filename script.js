const thanhBen = document.getElementById('thanh_ben');
const nutThuGon = document.getElementById('nut_thu_gon');
const chuaLogo = document.getElementById('chua_logo');

nutThuGon.addEventListener('click', () => {
    thanhBen.classList.add('da_thu_gon');
});

chuaLogo.addEventListener('click', () => {
    thanhBen.classList.remove('da_thu_gon');
});

const manHinhXacThuc = document.getElementById('man_hinh_xac_thuc');
const khungXacThuc = document.getElementById('khung_xac_thuc');
const noiDungGioiThieu = document.getElementById('noi_dung_gioi_thieu');
const lopPhuVideo = document.getElementById('lop_phu_video');

const nutMoDangNhap = document.getElementById('nut_mo_dang_nhap');
const nutMoDangKy = document.getElementById('nut_mo_dang_ky');
const nutDongPopup = document.getElementById('nut_dong_popup');

const bieuMauDangNhap = document.getElementById('bieu_mau_dang_nhap');
const bieuMauDangKy = document.getElementById('bieu_mau_dang_ky');
const chuyenSangDangKy = document.getElementById('chuyen_sang_dang_ky');
const chuyenSangDangNhap = document.getElementById('chuyen_sang_dang_nhap');

const moTaGioiThieu = noiDungGioiThieu.querySelector('p');
const noiDungMoTa = moTaGioiThieu.textContent.trim();
moTaGioiThieu.textContent = '';

let viTriMoTa = 0;
let dangXoaMoTa = false;

function hieuUngGoMoTa() {
    if (!dangXoaMoTa) {
        moTaGioiThieu.textContent = noiDungMoTa.substring(0, viTriMoTa + 1);
        viTriMoTa++;
        if (viTriMoTa === noiDungMoTa.length) {
            dangXoaMoTa = true;
            setTimeout(hieuUngGoMoTa, 1800);
            return;
        }
        setTimeout(hieuUngGoMoTa, 55);
    } else {
        moTaGioiThieu.textContent = noiDungMoTa.substring(0, viTriMoTa - 1);
        viTriMoTa--;
        if (viTriMoTa === 0) {
            dangXoaMoTa = false;
            setTimeout(hieuUngGoMoTa, 500);
            return;
        }
        setTimeout(hieuUngGoMoTa, 30);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(hieuUngGoMoTa, 400);
});

function moPopupXacThuc(loaiBieuMau) {
    khungXacThuc.classList.add('hien_popup');
    noiDungGioiThieu.classList.add('mo_di');
    lopPhuVideo.classList.add('lam_toi');

    if (loaiBieuMau === 'dang_ky') {
        bieuMauDangNhap.classList.remove('dang_hien');
        bieuMauDangKy.classList.add('dang_hien');
    } else {
        bieuMauDangKy.classList.remove('dang_hien');
        bieuMauDangNhap.classList.add('dang_hien');
    }
}

function dongPopupXacThuc() {
    khungXacThuc.classList.remove('hien_popup');
    noiDungGioiThieu.classList.remove('mo_di');
    lopPhuVideo.classList.remove('lam_toi');
}

nutMoDangNhap.addEventListener('click', () => {
    moPopupXacThuc('dang_nhap');
});

nutMoDangKy.addEventListener('click', () => {
    moPopupXacThuc('dang_ky');
});

nutDongPopup.addEventListener('click', dongPopupXacThuc);
lopPhuVideo.addEventListener('click', dongPopupXacThuc);

chuyenSangDangKy.addEventListener('click', () => {
    bieuMauDangNhap.classList.remove('dang_hien');
    bieuMauDangKy.classList.add('dang_hien');
});

chuyenSangDangNhap.addEventListener('click', () => {
    bieuMauDangKy.classList.remove('dang_hien');
    bieuMauDangNhap.classList.add('dang_hien');
});

bieuMauDangNhap.addEventListener('submit', (e) => {
    e.preventDefault();
    manHinhXacThuc.classList.add('an_man_hinh');
});

bieuMauDangKy.addEventListener('submit', (e) => {
    e.preventDefault();
    const matKhau = document.getElementById('mat_khau_dang_ky').value;
    const xacNhan = document.getElementById('xac_nhan_mat_khau').value;

    if (matKhau !== xacNhan) {
        alert('Mật khẩu xác nhận không khớp!');
        return;
    }

    manHinhXacThuc.classList.add('an_man_hinh');
});