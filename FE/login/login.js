const manHinhXacThuc = document.getElementById('man_hinh_xac_thuc');
const khungXacThuc = document.getElementById('khung_xac_thuc');
const noiDungGioiThieu = document.getElementById('noi_dung_gioi_thieu');
const lopPhuVideo = document.getElementById('lop_phu_video');
const videoNen = document.getElementById('video_nen');

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
let idHieuUngGo = null;
let popupDangMo = false;

function hieuUngGoMoTa() {
    if (popupDangMo) return;

    if (!dangXoaMoTa) {
        moTaGioiThieu.textContent = noiDungMoTa.substring(0, viTriMoTa + 1);
        viTriMoTa++;
        if (viTriMoTa === noiDungMoTa.length) {
            dangXoaMoTa = true;
            idHieuUngGo = setTimeout(hieuUngGoMoTa, 1800);
            return;
        }
        idHieuUngGo = setTimeout(hieuUngGoMoTa, 55);
    } else {
        moTaGioiThieu.textContent = noiDungMoTa.substring(0, viTriMoTa - 1);
        viTriMoTa--;
        if (viTriMoTa === 0) {
            dangXoaMoTa = false;
            idHieuUngGo = setTimeout(hieuUngGoMoTa, 500);
            return;
        }
        idHieuUngGo = setTimeout(hieuUngGoMoTa, 30);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    idHieuUngGo = setTimeout(hieuUngGoMoTa, 400);
});

function moPopupXacThuc(loaiBieuMau) {
    popupDangMo = true;
    clearTimeout(idHieuUngGo);
    if (videoNen && !videoNen.paused) {
        videoNen.pause();
    }

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
    popupDangMo = false;
    khungXacThuc.classList.remove('hien_popup');
    noiDungGioiThieu.classList.remove('mo_di');
    lopPhuVideo.classList.remove('lam_toi');

    if (videoNen && videoNen.paused) {
        videoNen.play().catch(() => {});
    }
    clearTimeout(idHieuUngGo);
    idHieuUngGo = setTimeout(hieuUngGoMoTa, 300);
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

function chuyenSangTrangChu() {
    sessionStorage.setItem('da_dang_nhap', 'true');
    if (videoNen) {
        videoNen.pause();
    }
    manHinhXacThuc.classList.add('an_man_hinh');
    setTimeout(() => {
        window.location.href = '../index.html';
    }, 250);
}

bieuMauDangNhap.addEventListener('submit', (e) => {
    e.preventDefault();
    chuyenSangTrangChu();
});

bieuMauDangKy.addEventListener('submit', (e) => {
    e.preventDefault();
    const matKhau = document.getElementById('mat_khau_dang_ky').value;
    const xacNhan = document.getElementById('xac_nhan_mat_khau').value;

    if (matKhau !== xacNhan) {
        alert('Mật khẩu xác nhận không khớp!');
        return;
    }

    chuyenSangTrangChu();
});