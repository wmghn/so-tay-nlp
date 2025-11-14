# 🎬 Hướng dẫn Embed Video YouTube

## ✅ Đã sửa lỗi X-Frame-Options

### Vấn đề trước đây:
- Lỗi: `Refused to display 'https://www.youtube.com/' in a frame because it set 'X-Frame-Options' to 'sameorigin'`
- Nguyên nhân: URL YouTube thông thường không thể embed trong iframe

### Giải pháp đã áp dụng:

Component `NoteCard.tsx` giờ có function `getYouTubeEmbedUrl()` tự động chuyển đổi:

**Từ** (các format phổ biến):
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/v/VIDEO_ID`

**Sang**:
- `https://www.youtube.com/embed/VIDEO_ID`

## 📋 Cách sử dụng:

### 1. Trong Netlify CMS

Khi thêm/sửa ghi chú:

1. Mở video YouTube bạn muốn embed
2. Copy URL từ thanh địa chỉ (bất kỳ format nào):
   ```
   https://www.youtube.com/watch?v=dQw4w9WgXcQ
   ```
   hoặc
   ```
   https://youtu.be/dQw4w9WgXcQ
   ```

3. Paste vào trường **"Video URL"** trong CMS

4. Save → Video sẽ tự động hiển thị đúng!

### 2. Ví dụ:

**URL gốc (copy từ browser):**
```
https://www.youtube.com/watch?v=g8yB8AMi5e0
```

**Tự động chuyển thành:**
```
https://www.youtube.com/embed/g8yB8AMi5e0
```

### 3. Test với note có sẵn:

File markdown example:
```yaml
---
id: "2"
title: "Cách quay phim và chụp ảnh"
videoUrl: "https://www.youtube.com/watch?v=g8yB8AMi5e0"
---
```

Hoặc format ngắn:
```yaml
videoUrl: "https://youtu.be/g8yB8AMi5e0"
```

Cả 2 đều hoạt động!

## 🎯 Responsive Design

Video giờ có aspect ratio 16:9 đúng chuẩn:
- Desktop: Full width với height tự động
- Mobile: Tự động scale, không bị méo
- Rounded corners + border-0 để đẹp hơn

## 🔍 Troubleshooting

Nếu video vẫn không hiển thị:

1. **Kiểm tra URL có đúng không:**
   - Phải là YouTube URL
   - Video không bị xóa/private

2. **Kiểm tra Console:**
   - Mở DevTools (F12) → Console
   - Xem có lỗi nào khác không

3. **Test với video mẫu:**
   ```
   https://www.youtube.com/watch?v=dQw4w9WgXcQ
   ```

4. **Rebuild notes.json:**
   ```bash
   npm run build:notes
   ```

## 💡 Pro Tips:

- **Playlist**: Muốn embed playlist? URL vẫn hoạt động:
  ```
  https://www.youtube.com/watch?v=VIDEO_ID&list=PLAYLIST_ID
  ```
  
- **Start time**: Muốn bắt đầu từ giây thứ 30?
  ```
  https://www.youtube.com/watch?v=VIDEO_ID&t=30s
  ```
  Component sẽ giữ nguyên params!

- **Shorts**: YouTube Shorts cũng hoạt động:
  ```
  https://www.youtube.com/shorts/VIDEO_ID
  ```

## 🚀 Deploy lên Production:

1. Commit changes:
   ```bash
   git add .
   git commit -m "Fix YouTube embed with auto URL conversion"
   git push
   ```

2. Netlify sẽ tự động rebuild

3. Test lại trên production URL

---

**Tóm tắt**: Giờ bạn có thể paste bất kỳ YouTube URL nào vào CMS, component sẽ tự động chuyển sang format embed đúng!
