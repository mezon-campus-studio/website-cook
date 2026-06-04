# 🍳 Website Cook — Backend API

Backend API server cho dự án **Website Cook**, xây dựng bằng **Express.js** với kiến trúc phân lớp (Layered Architecture). Tích hợp **Supabase** (database), **Spoonacular API** (tìm kiếm nguyên liệu & công thức) và **Google Gemini AI** (gợi ý công thức thông minh).

---

## 📋 Mục lục

- [Yêu cầu hệ thống](#-yêu-cầu-hệ-thống)
- [Cài đặt nhanh](#-cài-đặt-nhanh)
- [Cấu hình biến môi trường](#-cấu-hình-biến-môi-trường)
- [Chạy ứng dụng](#-chạy-ứng-dụng)
- [API Endpoints](#-api-endpoints)
- [Cấu trúc thư mục](#-cấu-trúc-thư-mục)
- [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [Xử lý sự cố](#-xử-lý-sự-cố)

---

## 💻 Yêu cầu hệ thống

| Phần mềm   | Phiên bản tối thiểu | Ghi chú                        |
| ----------- | -------------------- | ------------------------------ |
| **Node.js** | `>= 18.x`           | Khuyến nghị `v20.x` hoặc mới hơn |
| **npm**     | `>= 9.x`            | Đi kèm với Node.js            |
| **Git**     | Bất kỳ               | Để clone repository            |

---

## 🚀 Cài đặt nhanh

### Bước 1 — Clone repository

```bash
git clone <repository-url>
cd website-cook/backend
```

### Bước 2 — Cài đặt dependencies

```bash
npm install
```

Lệnh này sẽ cài đặt tất cả các package cần thiết được liệt kê trong `package.json`.

### Bước 3 — Tạo file cấu hình môi trường

Sao chép file `.env.example` thành `.env`:

```bash
# Windows (Command Prompt)
copy .env.example .env

# Windows (PowerShell)
Copy-Item .env.example .env

# macOS / Linux
cp .env.example .env
```

### Bước 4 — Cấu hình biến môi trường

Mở file `.env` và điền các giá trị cần thiết (xem phần [Cấu hình biến môi trường](#-cấu-hình-biến-môi-trường) bên dưới).

### Bước 5 — Khởi chạy server

```bash
# Chế độ phát triển (tự động restart khi thay đổi code)
npm run dev

# Chế độ production
npm start
```

Server sẽ chạy tại: **http://localhost:3000**

---

## 🔑 Cấu hình biến môi trường

Mở file `.env` và điền các giá trị sau:

```env
# Môi trường chạy: development | production
NODE_ENV=development

# Cổng server
PORT=3000

# Supabase — Database
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-supabase-service-role-key

# Google Gemini AI — Gợi ý công thức
GEMINI_API_KEY=your-gemini-api-key
GEMINI_MODEL=gemini-2.0-flash

# Spoonacular API — Tìm kiếm nguyên liệu & công thức
SPOONACULAR_API_KEY=your-spoonacular-api-key
SPOONACULAR_BASE_URL=https://api.spoonacular.com
SPOONACULAR_TIMEOUT=10000
```

### Hướng dẫn lấy API keys

| Dịch vụ          | Cách lấy key                                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------------------------------ |
| **Supabase**      | Đăng ký tại [supabase.com](https://supabase.com) → Tạo project → Settings → API → Lấy `URL` và `service_role key` |
| **Gemini AI**     | Truy cập [Google AI Studio](https://aistudio.google.com/apikey) → Tạo API key                                |
| **Spoonacular**   | Đăng ký tại [spoonacular.com/food-api](https://spoonacular.com/food-api) → My Console → Lấy API key          |

> ⚠️ **Lưu ý bảo mật:** Không bao giờ commit file `.env` lên Git. File này đã được thêm vào `.gitignore`.

---

## 🌐 API Endpoints

### Health Check

| Method | Endpoint | Mô tả              |
| ------ | -------- | ------------------- |
| `GET`  | `/`      | Kiểm tra server hoạt động |

### Nguyên liệu (Ingredients)

| Method | Endpoint                | Mô tả                                    | Params                  |
| ------ | ----------------------- | ----------------------------------------- | ----------------------- |
| `GET`  | `/ingredients/suggest`  | Gợi ý nguyên liệu (Supabase)             | `q` — từ khóa tìm kiếm |
| `GET`  | `/ingredients/search`   | Tìm kiếm nguyên liệu (Spoonacular API)   | `query` — từ khóa       |

### Công thức (Recipes)

| Method | Endpoint                  | Mô tả                                            | Params / Body                                      |
| ------ | ------------------------- | ------------------------------------------------- | -------------------------------------------------- |
| `POST` | `/recipes/suggest`        | AI gợi ý công thức từ nguyên liệu (Gemini AI)    | Body: `{ "ingredients": ["Cá hồi", "Bơ", "Chanh"] }` |
| `GET`  | `/recipes/by-ingredients` | Tìm công thức theo nguyên liệu (Spoonacular API) | `ingredients` — danh sách nguyên liệu              |

---

## 📁 Cấu trúc thư mục

```
backend/
├── .env                    # Biến môi trường (KHÔNG commit)
├── .env.example            # Template biến môi trường
├── .gitignore              # Danh sách file bị ignore bởi Git
├── package.json            # Dependencies & scripts
├── package-lock.json       # Lock file cho npm
│
└── src/                    # Source code chính
    ├── server.js           # Entry point — khởi động server
    ├── app.js              # Cấu hình Express app & middleware
    │
    ├── config/             # ⚙️ Cấu hình
    │   ├── env.js          #    Đọc & validate biến môi trường (Zod)
    │   ├── supabase.js     #    Supabase client singleton
    │   └── spoonacular.js  #    Axios client cho Spoonacular API
    │
    ├── presentation/       # 🎯 Tầng Presentation (HTTP)
    │   ├── routes/         #    Định nghĩa routes
    │   │   ├── ingredient.routes.js
    │   │   └── recipe.routes.js
    │   ├── controllers/    #    Xử lý request/response
    │   │   ├── ingredient.controller.js
    │   │   ├── recipe.controller.js
    │   │   └── spoonacular.controller.js
    │   ├── validators/     #    Zod schemas cho validation
    │   │   └── schemas.js
    │   └── middlewares/    #    Express middlewares
    │       └── validate.js
    │
    ├── business/           # 💼 Tầng Business Logic
    │   ├── services/       #    Logic nghiệp vụ
    │   │   ├── ai.service.js
    │   │   ├── ingredient.service.js
    │   │   ├── recipe.service.js
    │   │   └── spoonacular.service.js
    │   └── mappers/        #    Chuyển đổi dữ liệu
    │       └── spoonacular.mapper.js
    │
    ├── repository/         # 🗄️ Tầng Data Access
    │   └── spoonacular.repository.js
    │
    └── utils/              # 🔧 Tiện ích dùng chung
        ├── logger.js       #    Logger
        ├── response.js     #    Response helper
        └── vietnamese.js   #    Xử lý tiếng Việt
```

---

## 🛠 Công nghệ sử dụng

| Package              | Vai trò                                          |
| -------------------- | ------------------------------------------------ |
| **express**          | Web framework chính                              |
| **cors**             | Cho phép Cross-Origin requests                   |
| **morgan**           | HTTP request logger                              |
| **dotenv**           | Đọc biến môi trường từ file `.env`               |
| **zod**              | Validate dữ liệu đầu vào (request params/body)  |
| **@supabase/supabase-js** | Client SDK cho Supabase database            |
| **axios**            | HTTP client gọi Spoonacular API                  |
| **nodemon** *(dev)*  | Tự động restart server khi code thay đổi         |

---

## 🔧 Xử lý sự cố

### ❌ `npm install` thất bại

```bash
# Xóa node_modules và cài lại
rm -rf node_modules package-lock.json   # Linux/macOS
rd /s /q node_modules & del package-lock.json   # Windows CMD

npm install
```

### ❌ Server không khởi động được

1. **Kiểm tra Node.js đã cài chưa:**
   ```bash
   node --version   # Cần >= 18.x
   ```

2. **Kiểm tra file `.env` tồn tại** và đã điền đầy đủ các giá trị cần thiết.

3. **Kiểm tra port 3000 có đang bị sử dụng không:**
   ```bash
   # Windows
   netstat -ano | findstr :3000

   # macOS / Linux
   lsof -i :3000
   ```
   Nếu port đang bị chiếm, đổi `PORT` trong file `.env` sang giá trị khác (ví dụ: `3001`).

### ❌ Lỗi Supabase: "Supabase is not configured"

Kiểm tra lại `SUPABASE_URL` và `SUPABASE_SERVICE_KEY` trong file `.env`. Đảm bảo:
- URL có dạng `https://xxx.supabase.co`
- Service key là key có role `service_role` (không phải `anon` key)

### ❌ Lỗi Spoonacular API: timeout hoặc 401

- Kiểm tra `SPOONACULAR_API_KEY` đã được điền chính xác.
- API miễn phí của Spoonacular có giới hạn **150 requests/ngày**. Kiểm tra quota tại [Spoonacular Dashboard](https://spoonacular.com/food-api/console).

---

## 📝 Scripts có sẵn

| Lệnh           | Mô tả                                                     |
| --------------- | ---------------------------------------------------------- |
| `npm run dev`   | Chạy server ở chế độ dev (tự restart khi thay đổi code)   |
| `npm start`     | Chạy server ở chế độ production                            |

---

> 💡 **Tip:** Khi chạy ở chế độ `dev`, server sẽ tự động restart mỗi khi bạn thay đổi file `.js` hoặc `.json` trong thư mục `src/`.
