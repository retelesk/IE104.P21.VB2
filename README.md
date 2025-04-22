# 📰 CarNews - Website Tin Tức Ô Tô

Một website tin tức về ô tô có khả năng phản hồi, được xây dựng bằng **HTML**, **CSS** và **JavaScript**.  
Website sở hữu thiết kế hiện đại, sạch sẽ với nhiều mẫu trang, khả năng tải nội dung động và chức năng tìm kiếm mạnh mẽ.

---

## 🌐 Tổng Quan Website

![Car News](./images/logo-final.webp)
**CarNews Website**

---

## 🚀 Tính Năng

- **Thiết Kế Responsive**: Giao diện hoạt động tốt trên cả máy tính và thiết bị di động
- **Nội Dung Động**: Tải nội dung từ nguồn dữ liệu JSON
- **Nhiều Mẫu Trang**:
  - Trang chủ với carousel bài viết nổi bật
  - Trang chi tiết tin tức có phần bình luận
  - Duyệt tin theo chuyên mục
  - Tìm kiếm tin tức
- **Tương Tác Người Dùng**:
  - Carousel hình ảnh
  - Thanh tin tức đang thịnh hành
  - Tích hợp mạng xã hội
  - Điều hướng dễ sử dụng

---

## 📄 Các Trang

- **Trang Chủ** (`index.html`) - Trang chính hiển thị nội dung nổi bật
- **Trang Chi Tiết Tin Tức** (`news.html`) - Hiển thị bài viết riêng lẻ và bình luận
- **Trang Chuyên Mục** (`category.html`) - Hiển thị các bài viết theo chuyên mục
- **Trang Tìm Kiếm** (`search.html`) - Hiển thị kết quả tìm kiếm

---

## 🗂️ Cấu Trúc Dự Án

├── css/ \# Stylesheet files │ ├── resetCss.css \# CSS reset │ ├──
universal.css \# Shared styles │ ├── home.css \# Homepage specific
styles │ ├── news.css \# News page styles │ ├── category.css \# Category
page styles │ └── search.css \# Search page styles ├── images/ \# Image
assets │ ├── 100x75/ \# Image thumbnails │ ├── 1021x580/ \# Banner
images │ └── 150x150/ \# Profile images ├── js/ \# JavaScript files │
├── homePage.js \# Homepage functionality │ ├── headerOtherPage.js \#
Header functionality for secondary pages │ ├── news.js \# News page
functionality │ ├── search.js \# Search functionality │ └── category.js
\# Category page functionality ├── data/ \# Data files │ └──
dataSample.json \# Sample article data ├── index.html \# Homepage ├──
news.html \# News article template ├── category.html \# Category page
template ├── search.html \# Search results template └── README.md \#
Project documentation

---

## ⚙️ Bắt Đầu

1. **Clone repository** về máy
2. **Mở bất kỳ file HTML nào** trong trình duyệt để xem website
3. Không cần thiết lập máy chủ – đây là website tĩnh

---

## 🔁 Quy Trình Phát Triển

### 📁 Cấu Trúc Nhánh

- `master` – Chứa mã đã được duyệt và kiểm tra
- `develop` – Chứa mã đang chờ kiểm tra
- `feature/[page-name]` – Nhánh chức năng riêng biệt cho từng trang

### 👨‍💻 Quy Trình Đóng Góp Mã

1. Tạo nhánh riêng từ `develop`
2. Sau khi lập trình, commit và tạo Pull Request (PR) về `develop` để được duyệt
3. Sau khi PR được duyệt và merge, kiểm tra lại tích hợp
4. Khi tất cả chức năng hoàn thiện, tạo PR từ `develop` sang `master` để triển khai chính thức

---

## 👥 Thành Viên Nhóm

- **Dương Gia Hưng**
- **Trần Hồng Quân**
- **Lê Phong Vũ**

---

## 📋 Phân Công Nhiệm Vụ

| Tên Thành Viên | Nhiệm Vụ                   | Trạng Thái       |
| -------------- | -------------------------- | ---------------- |
| Trần Hồng Quân | HTML/CSS cho Trang Chủ     | ✅ Đã hoàn thành |
| Dương Gia Hưng | HTML/CSS cho Trang Tin Tức | ✅ Đã hoàn thành |
| Lê Phong Vũ    | HTML/CSS cho Trang Tin Tức | ✅ Đã hoàn thành |

---

## 🔗 Tài Nguyên

- **Demo Website** (nếu có link)
- **[Font Awesome](https://fontawesome.com/)** – Thư viện icon
- **[Google Fonts](https://fonts.google.com/)** – Thư viện font chữ
