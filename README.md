# MHBOT

Bot Discord simple dengan fitur ekonomi, game, dan lain-lain yang berbasis Slash Commands dan menggunakan Javascript.

## Fitur Utama
- **/ping** — Cek respons bot.
- **/saldo** — Cek saldo koin kamu.
- **/harian** — Klaim saldo harian (setiap 24 jam sekali).
- **/roulette (jumlah)** — Main roulette melawan bot, taruhan minimal 10 koin, maksimal 10x per hari, delay 6 detik per main.
- **/help** — Daftar semua command bot.
- **/about** — Info pemilik bot dan link source code.

## Cara Install & Menjalankan

1. **Clone repository**
   ```bash
   git clone https://github.com/mhudas/mhbot.git
   cd mhbot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Buat file `.env`**
   - Buat file baru bernama `.env` lalu isi dengan token dan client ID Discord bot kamu:
     ```env
     TOKEN=ISI_TOKEN_DISINI
     CLIENT_ID=ISI_CLIENT_ID_DISINI
     ```
     Token atau Client ID Discord bot bisa didapatkan di https://discord.com/developers/applications

4. **Jalankan bot**
   ```bash
   npm start
   ```

5. **Invite bot ke server Discord**
   - Gunakan link invite dengan permission bot dan scope `applications.commands`.
   - Untuk membuat link invite discord, lebih mudahnya silahkan ke https://discordapi.com/permissions.html

## Struktur Folder
- `index.js` — File utama bot
- `commands/` — Semua file command (ping, saldo, harian, roulette, help, about, dll)
- `playerdata.json` — Data saldo user (otomatis dibuat)
- `roulette_cooldown.json` — Data limit & cooldown roulette (otomatis dibuat)

## Catatan Penting
- Jika ingin merubah atau menambahkan command, silahkan diubah/ditambah di folder `commands/`.
- Beri credit ke repositori ini atau setidaknya berikan saya Star ✌.
---

> if you get an error message, please contact me via discord, @hudmeh

> Made in love by huda ❤️.
