// Database Toping
const listMenu = {
   seblak: 10000,
   kerupuk: 1000,
   makaroni: 1000,
   mie: 1000,
   kwetiau: 1000,
   baso: 2000,
   sosis: 2000,
   batagor: 1500,
   ceker: 3000,
   sayur: 1500,
   telor: 3000
}

// Database Diskon
const diskon = [
   ['Hari ini indah banget', 0],
   ['Kamu beruntung banget', 5000],
   ['Kami sial banget', 10000]
]

// Nilai Awal Pesanan Dan Total Harga
let pesanan = {
   nama: '',
   menu: [],
   levelPedas: 0
};
let totalHarga = 0;

// Menerima Input Pilihan Toping Dari User
var checkboxes = document.querySelectorAll('input[type=checkbox][name=menu]');

let newArr = Array.from(checkboxes);
for(let i = 0; i < checkboxes.length; i++) {
let checkbox = checkboxes[i];

checkbox.addEventListener('change', function() {
   pesanan.menu = [];

   for(let j = 0; j < newArr.length; j++) {
      if(newArr[j].checked) {
         pesanan.menu.push(newArr[j].id);
      }
   }

   console.log(pesanan);
})
}

// Menerima Input Pilihan Tingkat Pedas Dari User
function myFunction(pedas) {
   pesanan.levelPedas = pedas;

   console.log(pesanan);
}

// Menerima Input Nama User
function inputNama () {
   let nama = document.getElementById('name').value;
   pesanan.nama = nama;

   console.log(pesanan);
}
   
// Akses Page2
function page2() {
   // Pengecekan Syarat Beralih Interface
   if (!pesanan.nama) {
      alert('Nama kosong');
   } else if (pesanan.menu.length === 0) {
      alert('Tidak ada pesanan');
   } else 
   
   {
   // Non Aktif Style Page1 Dan Aktif Style Page2
   document.getElementById('page2').style.display = 'inline';
   document.getElementById('page1').style.display = 'none';

   // Interface Check Total Pesanan User
   let titlePesanan = document.getElementById('title-pesanan');
   titlePesanan.innerHTML = `${pesanan.nama}, silahkan cek pesanan kamu`;
   
   // List Total Pesanan User
   totalHarga = 0;
   for (let i = 0; i < pesanan.menu.length; i++) {
      let topingBaru = document.createElement('li');
      let menu = pesanan.menu[i];
      let harga = 0;

      for (let key in listMenu) {
         
         if (menu === key) {
            harga = listMenu[key];
            totalHarga += harga;
         }
      }

      topingBaru.innerText = `${menu.toUpperCase()} -- ${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR'}).format(harga)}`;
      topingBaru.classList.add('toping');
      titlePesanan.appendChild(topingBaru);
   }

   let topingBaru = document.createElement('li'); 
   topingBaru.innerText = `SEBLAK -- ${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR'}).format(10000)}`;
   topingBaru.classList.add('toping');
   titlePesanan.appendChild(topingBaru);
   totalHarga += 10000;

   // List Total Harga Pesanan User
   let jumlahHarga = document.getElementById('jumlah-harga');
   jumlahHarga.innerHTML = `${pesanan.nama}, total harga pesanan kamu: ${totalHarga}`;
   }
}

// Akses Page1 
function page1() {
   // Non Aktif Style Page2 Dan Aktif Style Page1
   document.getElementById('page2').style.display = 'none';
   document.getElementById('page1').style.display = 'inline';
}

// Lucky Test
function luckyTest() {
   let luckyNumber = Math.floor(Math.random()*3);
   return diskon[luckyNumber];
}

// Akses Page3
function page3() {
   // Non Aktif Style Page2 Dan Aktif Style Page3
   document.getElementById('page2').style.display = 'none';
   document.getElementById('page3').style.display = 'inline';

   // Generate Lucky Test
   let resultLuckyDiskon = luckyTest();

   // Lucky Diskon
   let luckyResult = document.getElementById('lucky-diskon');
   luckyResult.innerText = resultLuckyDiskon[0];

   // Total Pembayaran Dan Terima Kasih
   let finalP = document.getElementById('final-price')
   finalP.innerHTML = `${pesanan.nama}, silahkan membayarkan ${new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(totalHarga-resultLuckyDiskon[1])}
   ke kasir`;
   let buby = document.getElementById('thankyou')
   buby.innerHTML = `<span>Terima kasih</span>`
}