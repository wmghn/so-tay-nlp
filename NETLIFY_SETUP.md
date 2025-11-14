# Hướng dẫn Setup Netlify Identity và Git Gateway

## Bước 1: Enable Netlify Identity

1. Truy cập Netlify Dashboard của bạn
2. Chọn site của bạn
3. Vào **Site settings** (Settings)
4. Click vào **Identity** trong menu bên trái
5. Click nút **Enable Identity**

## Bước 2: Enable Git Gateway

1. Trong trang Identity settings
2. Scroll xuống phần **Services**
3. Click **Enable Git Gateway**
4. Chọn repository và branch (thường là `main`)

## Bước 3: Cấu hình Registration

1. Trong trang Identity settings
2. Scroll xuống phần **Registration**
3. Chọn **Invite only** (khuyến nghị cho bảo mật)
   - Hoặc chọn **Open** nếu muốn cho phép đăng ký tự do

## Bước 4: Invite Users

1. Vào tab **Identity** trên dashboard
2. Click **Invite users**
3. Nhập email của bạn hoặc người cần quyền admin
4. Click **Send**

## Bước 5: Xác nhận Email

1. Kiểm tra email của bạn
2. Click vào link xác nhận từ Netlify
3. Tạo mật khẩu cho tài khoản admin

## Bước 6: Test Login

1. Truy cập `https://your-site.netlify.app/admin/`
2. Click **Login with Netlify Identity**
3. Nhập email và password đã tạo
4. Nếu thành công, bạn sẽ thấy Netlify CMS dashboard

## Khắc phục lỗi 404

Nếu vẫn gặp lỗi 404 `/.netlify/identity/settings`:

### Giải pháp 1: Kiểm tra Git Gateway
- Đảm bảo Git Gateway đã được enable
- Repository đã được liên kết đúng
- Branch được set đúng trong config.yml (main hoặc master)

### Giải pháp 2: Redeploy Site
1. Vào tab **Deploys**
2. Click **Trigger deploy** > **Deploy site**
3. Đợi deploy xong và thử lại

### Giải pháp 3: Clear Cache
1. Vào **Site settings** > **Build & deploy**
2. Click **Clear cache and deploy site**

### Giải pháp 4: Kiểm tra _redirects
Tạo file `public/_redirects` với nội dung:

```
/admin/* 200
/* /index.html 200
```

## Cấu trúc File sau khi Setup

```
public/
├── admin/
│   ├── config.yml      ✅ Git Gateway configured
│   └── index.html      ✅ Identity widget added
├── _redirects          ✅ (Optional) Redirects file
└── index.html          ✅ Identity widget added
```

## Kiểm tra hoạt động

1. **Trang chính**: `https://your-site.netlify.app/`
   - Nên load bình thường
   - Console không có lỗi

2. **Admin page**: `https://your-site.netlify.app/admin/`
   - Hiển thị form login
   - Sau khi login thành công, hiển thị CMS UI

3. **Test tạo/sửa content**:
   - Tạo một ghi chú mới
   - Lưu lại
   - Kiểm tra Git repository có commit mới không

## Lưu ý quan trọng

- **Identity widget** cần được load trước Decap CMS
- **Git Gateway** cần có quyền write vào repository
- **Branch** trong config.yml phải khớp với branch thực tế
- **Netlify Identity** free tier: 1,000 active users/month
- **Git Gateway** yêu cầu Netlify Identity được enable

## Debug

Mở Chrome DevTools (F12) và kiểm tra:

1. **Console**: Xem có lỗi JavaScript không
2. **Network**: Kiểm tra request đến `/.netlify/identity/*`
3. **Application** > **Local Storage**: Xem có token không

## Hỗ trợ

Nếu vẫn gặp vấn đề:
1. Kiểm tra Netlify Support docs: https://docs.netlify.com/security/secure-access-to-sites/identity/
2. Netlify CMS docs: https://decapcms.org/docs/authentication-backends/
