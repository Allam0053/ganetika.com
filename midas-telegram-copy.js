/*
const elements = $0.querySelectorAll('.translatable-message, .media-photo');

const elementToCopy = elements;

// (In your code, you'd do this)
// const elementToCopy = document.querySelector('#some-element');

// 2. Get its full HTML as a string
const htmlString = elementToCopy.outerHTML;

// 3. Use the modern Clipboard API to copy the string
navigator.clipboard.writeText(htmlString)
  .then(() => {
    console.log('Element HTML successfully copied to clipboard!');
  })
  .catch(err => {
    console.error('Failed to copy element: ', err);
  });

*/

const elements = $0.querySelectorAll('.translatable-message, .media-photo');

const elementToCopy = elements;

// (In your code, you'd do this)
// const elementToCopy = document.querySelector('#some-element');

// 2. Get its full HTML as a string
const htmlString = Array.from(elements).map(ele => ele.outerHTML);

// 3. Use the modern Clipboard API to copy the string
htmlString.forEach(st => console.log(st));


[
    "<canvas class=\"canvas-thumbnail thumbnail media-photo\" width=\"40\" height=\"26\"></canvas>",
    "<img class=\"media-photo\" src=\"blob:https://web.telegram.org/df4db8b5-d5f1-4f28-8d96-420309d5a347\">",
    "<span class=\"translatable-message\"><strong>[Quick Review: MEDC]</strong>\n\nMEDC adalah produsen oil &amp; gas dan juga memiliki 21% saham AMMN, tambang emas terbesar ke-2 di Indonesia setelah Freeport. \n\nJuni kemarin, MEDC baru menuntaskan akuisisi 24% hak partisipasi dari 46% jadi 70%.\n\nLalu mereka juga berencana terus buyback saham hingga triliunan</span>",
    "<span class=\"translatable-message\">[Quick Update: Medco (MEDC) Tambah Kepemilikan PSC Corridor Jadi 70% lewat Akuisisi US$425 Juta]\n\nPT...</span>",
    "<span class=\"translatable-message\">Bisa baca aksi MEDC disini</span>",
    "<span class=\"translatable-message\">Bagi member lama, Anda bisa baca lebih detail soal bisnis MEDC di analisa saham. Kita pernah punya kenangan manis di MEDC tahun 2022, bedah bisnisnya juga 3 tahun lalu, tapi masih relevan kok secara bisnis.</span>",
    "<span class=\"translatable-message\"><strong>Business Overview</strong>\n\nSecara produksi roughly 70-80% gas, 20-30% oil. Harga jual oil mengikuti market (acuannya Brent) jadi bisa fluktuasi. Harga gas, itu 50% sudah fixed di $5.8 - $5.9/mmbtu, sisanya 20% itu ngikut harga Brent.\n\nJadi kasarnya, roughly 50% harga jual fixed, 50% harga jual ngikut brent. Nah gimana dengan harga brent?</span>",
    "<img class=\"media-photo\" src=\"blob:https://web.telegram.org/27f77757-a272-4efa-8aa2-aaf3fecc9ee6\">",
    "<span class=\"translatable-message\">Harga Brent cukup rendah dalam beberapa tahun terakhir. Selain karena pertumbuhan ekonomi global yang melambat, US juga terus menerus menjual cadangan minyaknya (strategic petroleum reserves). Hal ini membuat supply minyak banjir di market dan harga cukup turun).\n\nNamun, perkembangan terakhir, US mulai akan kembali mengisi SPR nya. \n\nFurter reference: <a class=\"anchor-url\" href=\"http://bloomberg.com/news/articles/2025-10-21/us-to-buy-1-million-barrels-for-strategic-petroleum-reserve\" target=\"_blank\" rel=\"noopener noreferrer\">http://bloomberg.com/news/articles/2025-10-21/us-to-buy-1-million-barrels-for-strategic-petroleum-reserve</a>\n\nOil di harga &lt;$70 agak kurang sustain, karena cost produksi dan eksplorasi bisa mencapai $70 di beberapa tempat. \n\nSo, kalo harga oil naik, MEDC juga akan terkena dampak karena harga acuan mereka ngikut Brent.</span>",
    "<span class=\"translatable-message\"><strong>AMMN ga bisa jualan</strong>\n\nPer 2025, AMMN mengalami kerugian besar. Hal ini karena mereka ga diperbolehkan jualan concentrate dan harus diolah dulu gold &amp; copper nya. \n\nNah di Q2 kemarin mereka uda berhasil ngolah copper nya jadi cathode dan uda bisa jualan. Lalu di bulan Juli (Q3) mereka uda berhasil commissioning pabrik emasnya. \n\nTotal kapasitasnya 220 ribu ton (440 Mlbs) copper dan 579ribu oz emas. Setahu saya, smelter copper cuma ada 2 di Indonesia, yaitu milik Freeport dan milik AMMN.</span>",
    "<img class=\"media-photo\" src=\"blob:https://web.telegram.org/d515d9ce-e7be-4573-925d-a9b4ebcbcf78\">",
    "<span class=\"translatable-message\">Berikut development timelinenya AMMN.</span>",
    "<img class=\"media-photo\" src=\"blob:https://web.telegram.org/72869937-8209-41e3-9666-02ba359e0f17\">",
    "<span class=\"translatable-message\">Harga jual gold di Q3 dan memasuki Q4 ini juga terlihat naik. So ketika smelter gold &amp; coppernya jika sudah bisa jualan, tentu akan kasih dampak yang positif bagi AMMN dan juga bagi MEDC.</span>",
    "<span class=\"translatable-message\"><strong>Berapa laba MEDC Nanti?</strong>\n\nKita pake asumsi harga brent di kisaran $70 - 80 saja, karena ini harga yang make sense bagi produsen. Ga kerendahan, ga ketinggian. Kita tahu MEDC akuisisi tambahan 24% di PSC Corridor, artinya bagian mereka juga nambah roughly 50% kan (46% jadi 70% naik roughly 50%).\n\nKita tinggal cek saja berapa laba mereka ketika oil di $70 - 80, yaitu tahun lalu. Laba sebelum pajak $671 juta, kita kurangin laba dari AMMN $113 juta saat itu = $558 juta.\n\nTahun 2024 produksinya 152 mboepd, per 1H 2025 setelah akuisisi tambahan 24% Corridor, produksi bisa jadi 155 - 160, naik cuma 5%. Yah ini karena by nature, year by year produksi di sumur oil &amp; gas memang akan turun.\n\nIntinya kita bisa kira - kira, harusnya laba sebelum pajak bisa lah tetap $558 juta (Rp 9.4T) dan harusnya sih bisa lebih dari Rp 10 T.</span>",
    "<span class=\"translatable-message\"><strong>Lalu untuk AMMN..</strong>\nLet say produksi copper &amp; gold bisa 80% capacity.\n\nSmelter AMMN bisa produksi 220 ribu ton Copper Cathode, 80% dari itu 176 ribu ton.\n\nKaliin harga jual $10ribu/ton = $1.76 miliar.\n\nKapasitas Gold 579kOz x 80% x ASP $3500/oz (estimasi aja) = $1.62 miliar\n\nTotal sales $3.38 miliar kan. Buletin $3.5 miliar deh, Rp 58 T.</span>",
    "<span class=\"translatable-message\">EBITDA margin (istilah lainnya cash margin, yaitu ASP - cash cost) di Q2 2025 mencapai 71%. Di Q2 kita tahu smelternya sudah jalan kan. Artinya komponen cost besar itu kemungkinan dari depresiasi dan amortisasi, serta beban bunga saja. Kira2 EBITDA Rp 41 T.\n\nBeban bunga AMMN sekitar 6% dari debt. Debt AMMN itu sekitar $6 bio, jadi beban bunga $360 jt atau Rp 6T.\n\nBeban depresiasi dari aset tetap dibagi aja masa manfaat aset tersebut. Kalo dilihat dari LK, beban depresiasi roughly $200 jt per tahun, ya taroklah kasarnya jadi $250 juta. Rp 4.2T.\n\nJadi laba AMMN = (Rp 41 T - Rp 6 T - 4.2 T) - 22% tax = Rp 24 T. Bagian MEDC 21% = Rp 4 T.\n\nDari hitung - hitungan kasar ini, <strong>keliatannya laba MEDC bisa melebihi laba 2022 nya</strong> yang di kisaran Rp 8 T atau setidaknya menyamai.</span>",
    "<img class=\"media-photo\" src=\"blob:https://web.telegram.org/660ca86f-9bc1-410f-b455-277076818090\">",
    "<span class=\"translatable-message\">Ini belum termasuk ekspansi ini yang uda mau selesai, efeknya di Q1 2026</span>",
    "<span class=\"translatable-message\"><strong>Valuasi</strong>\n\nLet say asumsi PE 8 x Rp 8 T (angka cantik banget haha) = Rp 64 T seharusnya harga wajar MEDC.\n\nMarket cap per tulisan ini dibuat Rp 35 T. Ada margin of safety yang lumayan 45%. Ya taroklah perkiraan saya salah dan meleset jadi Rp 55 T. Maybe ada hal - hal yang tidak saya duga, oil turun lagi, smelternya telat, etc. Diskonnya masih lumayan.\n\nKalo ternyata labanya lebih tinggi, ya bagus.</span>",
    "<span class=\"translatable-message\"><strong>Risk</strong>\n\nDon’t forget about risk, penting ini:\n\n- MEDC dan AMMN, keduanya punya debt cukup tinggi. Tapi keduanya punya cash flow yang lebih dari cukup buat bayar debt.\n- Oil, Copper &amp; Gold turun. Kalo ketiga komoditas ini turun, jelas ngefek banget ke harga jual dan laba MEDC/AMMN. Tapi ya kalo disuruh prediksi, harusnya oil yang naik, gantian dong masa gold mulu.\n\nKalo tertarik, silahkan dalami dan adjust your risk accordingly. Jangan juga masuk kegedean, buat apa hold tapi deg - degan, ga bisa makan, ga bisa tidur. \n\nJangan all in, apalagi masih pemula. Jangan juga ngikutin saya. Ingat mantra ini: Orang yang ngikut aja, ga mungkin cuan besar. Orang yang cuan besar, ga mungkin cuma ikut - ikutan. \n\nHave a great day! Semoga ulasan ini bermanfaat.</span>"
]