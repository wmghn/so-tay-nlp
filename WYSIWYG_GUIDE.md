# 📝 Hướng dẫn sử dụng Rich Text Editor (WYSIWYG) trong Netlify CMS

## ✅ Đã cấu hình:

1. **Config.yml**: Trường "Mô tả" giờ dùng `widget: markdown` với 2 modes:
   - **Rich Text** (WYSIWYG): Giao diện trực quan với toolbar
   - **Raw**: Xem/sửa markdown thuần

2. **Frontend**: Component `NoteCard` giờ dùng `react-markdown` để render markdown đẹp

## 🎨 Cách sử dụng Rich Text Editor:

### 1. Truy cập Admin CMS
```
https://your-site.netlify.app/admin/
```
Hoặc local: `http://localhost:3001/admin/`

### 2. Tạo hoặc sửa Ghi Chú

Click vào note hoặc "New Ghi Chú"

### 3. Sử dụng Toolbar

Trong trường **"Mô tả"**, bạn sẽ thấy toolbar với các nút:

| Icon | Chức năng | Markdown tương đương |
|------|-----------|---------------------|
| **B** | Bold (Đậm) | `**text**` |
| *I* | Italic (Nghiêng) | `*text*` |
| H1-H6 | Headings | `# H1`, `## H2`, v.v. |
| • | Bullet list | `* item` hoặc `- item` |
| 1. | Numbered list | `1. item` |
| 🔗 | Link | `[text](url)` |
| 📷 | Image | `![alt](url)` |
| `<>` | Code | `` `code` `` |
| "" | Quote | `> quote` |

### 4. Ví dụ sử dụng

**Muốn tạo:**
> ## Tiêu đề lớn
> 
> Đây là **chữ đậm** và *chữ nghiêng*.
> 
> ### Danh sách:
> - Item 1
> - Item 2

**Trong CMS:**
1. Click icon **H2** → gõ "Tiêu đề lớn"
2. Xuống dòng, gõ "Đây là ", chọn text "chữ đậm", click **B**
3. Gõ " và ", chọn "chữ nghiêng", click **I**
4. Click **H3** → gõ "Danh sách:"
5. Click bullet icon, gõ "Item 1"
6. Enter để tạo item mới

### 5. Chuyển đổi giữa Rich Text ↔ Raw

Click tab **"Raw"** ở góc trên để xem markdown code:

```markdown
## Tiêu đề lớn

Đây là **chữ đậm** và *chữ nghiêng*.

### Danh sách:
- Item 1
- Item 2
```

Sửa trong Raw mode nếu quen với markdown, sau đó quay lại **Rich Text** để xem preview.

## 📋 Workflow sau khi sửa nội dung:

1. **Sửa trong CMS** → Click **Save** (CMS tự commit vào Git)
2. **Build notes.json**:
   ```bash
   npm run build:notes
   ```
   (Hoặc tự động khi deploy nếu có `prebuild` script)

3. **Reload trang** để xem thay đổi

## 🎯 Tips:

- **Paste từ Word/Google Docs**: CMS tự convert sang markdown
- **Ctrl+Z / Cmd+Z**: Undo
- **Preview**: Tab giữa Rich Text và Raw để kiểm tra
- **Images**: Upload ảnh sẽ lưu vào `/public/images/uploads/`

## 📸 Screenshot trong câu hỏi của bạn:

Trong screenshot, bạn đang ở tab **"MÔ TẢ"** (Rich Text mode).

Toolbar có các options:
- Headings (H1, H2, H3...)
- Bold, Italic
- Lists (Bullets, Numbers)
- Links, Images
- Code blocks

Nội dung bên phải hiển thị **preview** của markdown đã format.

## 🚀 Next Steps:

1. Thử thêm ghi chú mới qua CMS
2. Dùng các nút format để tạo nội dung đẹp
3. Save và xem trên frontend
4. Ảnh preview sẽ render với heading styles, bullet points, bold text, etc.

---

**Lưu ý**: Sau khi sửa trực tiếp file .md, nhớ chạy `npm run build:notes` để generate JSON mới!
