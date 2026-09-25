if (!sessionStorage.getItem('da_dang_nhap')) {
    window.location.replace('login.html');
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