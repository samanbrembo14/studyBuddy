# 📘 StudyBuddy Personal Dashboard

## 🎯 Deskripsi Aplikasi
**StudyBuddy** adalah aplikasi web dashboard pribadi yang dirancang untuk membantu mahasiswa tetap produktif dan terorganisir. Aplikasi ini memungkinkan pengguna untuk mencatat tugas, menyimpan catatan kuliah, mengatur timer fokus (Pomodoro), serta mengganti tampilan ke mode gelap untuk kenyamanan visual.

Aplikasi ini bersifat sepenuhnya interaktif dan menyimpan data secara lokal menggunakan `localStorage`, sehingga catatan dan tugas tetap tersimpan meskipun halaman di-refresh.

---

## ✨ Fitur Utama
- 🕒 **Jam Real-Time**: Menampilkan waktu saat ini yang terus diperbarui.
- 📌 **Daftar Tugas**:
  - Tambah, edit, dan hapus tugas.
  - Data tersimpan otomatis di `localStorage`.
- 📝 **Catatan Kuliah**:
  - Menulis catatan multiline dengan checklist per baris.
  - Fitur centang dan hapus per item catatan.
- 📂 **Catatan Terakhir**:
  - Menampilkan semua catatan terakhir dalam mode collapsible (bisa dibuka/tutup).
- ⏳ **Fokus Timer (Pomodoro)**:
  - Pengatur waktu fleksibel (default 25 menit).
  - Bunyi alarm saat waktu habis.
  - Suara otomatis berhenti saat alert ditutup.
- 🌓 **Mode Gelap / Terang**:
  - Menggunakan toggle button untuk mengganti tema.
  - Preferensi tema tersimpan di `localStorage`.

---

## 🌟 Fitur Modern JavaScript (ES6+) yang Digunakan
- `const` & `let`: Untuk deklarasi variabel yang lebih aman dan jelas.
- **Arrow Functions**: Digunakan di seluruh fungsi pendek dan event handler.
- **Class**:
  - `TodoList`: Untuk mengelola dan merender daftar tugas.
- **Template Literals**: Untuk menyusun HTML dinamis dan string multiline.
- **Async/Await**:
  - Digunakan pada fungsi `saveNotes`, `removeNoteLine`, dan `fakeAsyncSave()` untuk simulasi proses asynchronous dengan efek loading.

---

## 📸 Screenshot Aplikasi
### Tema Terang
![Tampilan Aplikasi Terang](/assets/dashboard1.png)

![Tampilan Aplikasi Terang 2](/assets/dashboard2.png)



### Tema Gelap
![Tampilan Aplikasi Gelap](/assets/dashboard_gelap.png)

![Tampilan Aplikasi Gelap 2](/assets/dashborad_gelap2.png)
---
