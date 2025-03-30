# IE104.P21.VB2
Github Repo cho đồ án môn học IE104

## Danh sách thành viên
1. Dương Gia Hưng
2. Trần Hồng Quân
3. Lê Phong Vũ
4. Bổ sung thêm

## [Link Demo](https://demo.tagdiv.com/newsmag_cars)
## Bảng phân công nhiệm vụ
| Họ và tên | Nhiệm vụ | Hoàn thành |
| ----------- | ----------- | ----------- |
| Trần Hồng Quân | HTML CSS cho Trang chủ |  |
| Dương Gia Hưng | HTML CSS cho trang Tin tức |  |
| Lê Phong Vũ | HTML CSS cho trang Tin tức |  |

## Tasklist
- [ ] File thiết kế Figma
- [ ] Triển khai code

## Hướng dẫn
### Cấu trúc Branch

1. Branch **master** -> Chứa code đã review
2. Branch **develop** -> Chứa code chưa review
3. Branch **feature/[trang con]** -> Chứa code của mỗi thành viên

### Quy trình upload code

1. Tạo feature branch riêng của mỗi người để làm việc
2. Sau khi code xong. Commit và tạo Pull Request (PR) từ feature branch vào develop để các thành viên review code.
3. Sau khi PR được approve và merge vào develop, tiến hành kiểm thử tích hợp.
4. Khi tất cả tính năng hoàn tất, tạo PR từ develop vào main để deploy.

### Cách tạo branch riêng (nên Google thêm)

1. Clone Repo bằng:
   `git clone https://github.com/retelesk/IE104.P21.VB2.git`
2. Thiết lập lại Git user.name và user.email
   `git config --global user.email <EMAIL>
   git config --global user.name <USERNAME>`
3. Tạo feature brand riêng cho mỗi người từ brand develop
   `git checkout develop
    git pull origin develop
    git checkout -b feature/[tên-trang]`
