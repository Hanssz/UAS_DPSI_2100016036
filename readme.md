## Dokumentasi API UAS DPSI

**# Dokumentasi API UAS DPSI**

## Ringkasan

Dokumentasi API dari aplikasi jualan kaca, API ini mencakup fitur registrasi, login, kelola product, serta pembuatan pesanan.

## URL Dasar

```
Endpoint: POST /auth/register
URL: https://uas-dpsi.vercel.app/auth/register
```

## Endpoint

### 1. Registrasi

- **URL:** `/auth/register`
- **Metode:** `POST`
- **Header:** Tidak ada
- **Body:**
```json
{
  "username":"hanif",
  "password":"hanif", 
  "email":"1@1",
  "role":"hanif"
}
```
- **Deskripsi:** Daftar pengguna baru.

### 2. Login
Endpoint: POST /auth/login
URL: https://uas-dpsi.vercel.app/auth/login

- **URL:** `/auth/login`
- **Metode:** `POST`
- **Header:** Tidak ada
- **Body:**
```json
{
  "username":"hanif",
  "password":"hanif", 
  "email":"1@1",
  "role":"hanif"
}
```
- **Deskripsi:** masuk dengan username pw.

### 3. Tambah Produk

Endpoint: POST /products/
URL: https://uas-dpsi.vercel.app/products/

- **URL:** `/products/`
- **Metode:** `POST`
- **Header:**
```json
{
    "Authorization": "Bearer <token>"
}
```
- **Body:**
```json
{
    "name": "Toko Kaca",
    "desc": "Variasi kaca yang menarik untuk kebutuhan antum",
    "stock": "100",
    "price": "27100000",
    "userID": "01",
    "img": "/home/hanif/Pictures/gambar wajah.png"
}
```
- **Deskripsi:** menambahkan prduk ke sistem.

### 4. Buat Pesanan
Endpoint: POST /order/
URL: https://uas-dpsi.vercel.app/order/
- **URL:** `/order/`
- **Metode:** `POST`
- **Header:**
```json
{
    "Authorization": "Bearer <token>"
}
```
- **Body:**
```json
{
{
  "creditCard": "134252627",
  "totalPrice": 271000,
  "quantity": 3,
  "productID": 1,
  "userID": 01
}

}
```
- **Deskripsi:** Emembuat pesanan baru produk


```json
{
    "Authorization": "Bearer <token>"
}
```

## Respons

Respons dari setiap permintaan akan berupa JSON yang memberikan informasi mengenai hasil dari permintaan yang dilakukan.

Responnya dari tiap get ialah berupa file json yg memberikan info seputar get nya.

## Tester Postman File
https://docs.google.com/document/d/1BWv3G6bingz5MbHhq4zVzt5jS2cIJuB4/edit?usp=sharing&ouid=115565985569067867656&rtpof=true&sd=true

## Contoh Penggunaan

### Registrasi

```bash
curl -X POST https://uas-dpsi.vercel.app/auth/register \
-H "Content-Type: application/json" \
-d '{
  "username":"hanif",
  "password":"hanif", 
  "email":"1@1",
  "role":"hanif"
}'
```

### Login

```bash
curl -X POST https://uas-dpsi.vercel.app/auth/login \
-H "Content-Type: application/json" \
-d '{
  "username":"hanif",
  "password":"hanif", 
  "email":"1@1",
  "role":"hanif"
}'
```

### Tambah Produk

```bash
curl -X POST https://uas-dpsi.vercel.app/products/ \
-H "Authorization: Bearer <token>" \
-H "Content-Type: multipart/form-data" \
-F "name=Toko Kaca" \
-F "desc=Variasi kaca yang menarik untuk kebutuhan antum" \
-F "stock=100" \
-F "price=27100000" \
-F "userID=01" \
-F "img=@/home/hanif/Pictures/gambar wajah.png"
```

### Buat Pesanan

```bash
curl -X POST https://uas-dpsi.vercel.app/order/ \
-H "Authorization: Bearer <token>" \
-H "Content-Type: application/json" \
-d '{
    "creditCard": "134252627