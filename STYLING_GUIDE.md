# 🎨 Hướng dẫn Styling Markdown Content

## ✅ Đã cập nhật:

### 1. Sắp xếp lại layout:
- **Ảnh** hiển thị đầu tiên (ngay sau tiêu đề)
- **Video** hiển thị tiếp theo
- **Nội dung markdown** (description) ở cuối

### 2. Thêm CSS styling đầy đủ:

File: `public/markdown-styles.css`

**Các element được style:**
- ✅ Headings (H1-H6) với font size, weight, và margin phù hợp
- ✅ Paragraphs với line-height dễ đọc
- ✅ **Ordered lists (1, 2, 3...)** với decimal numbering
- ✅ **Unordered lists (bullets)** với disc, circle, square
- ✅ Nested lists (sub-lists) với styling riêng
- ✅ Links với hover effect
- ✅ Bold và Italic text
- ✅ Code inline và code blocks
- ✅ Blockquotes với border và background
- ✅ Tables với alternating row colors
- ✅ Horizontal rules
- ✅ Images trong markdown

### 3. Responsive design:
- Desktop: Font size đầy đủ
- Mobile: Font size giảm nhẹ để dễ đọc hơn

## 📋 Chi tiết styling:

### Headings:
```markdown
## H2 Heading
### H3 Heading
#### H4 Heading
```

**Kết quả:**
- H2: Font 1.5rem, bold 700, border-bottom
- H3: Font 1.25rem, bold 600
- H4: Font 1.125rem, bold 600

### Lists:

**Ordered list:**
```markdown
1. Item 1
2. Item 2
   1. Sub-item 2.1
   2. Sub-item 2.2
3. Item 3
```

**Styling:**
- Main list: decimal (1, 2, 3...)
- Sub-list level 2: lower-alpha (a, b, c...)
- Padding left: 1.75rem
- List items: margin-bottom 0.5rem

**Unordered list:**
```markdown
* Item 1
* Item 2
  * Sub-item 2.1
  * Sub-item 2.2
* Item 3
```

**Styling:**
- Main list: disc (●)
- Sub-list level 2: circle (○)
- Sub-list level 3: square (■)

### Bold & Italic:
```markdown
**Bold text** - font-weight 700
*Italic text* - font-style italic
***Bold italic*** - both
```

### Links:
```markdown
[Link text](https://example.com)
```
- Color: cyan-600 (#0891b2)
- Hover: cyan-700 (#0e7490)
- Underline on hover

### Code:
```markdown
Inline code: `console.log()`
```

**Block code:**
```
\`\`\`javascript
function hello() {
  console.log("Hello");
}
\`\`\`
```

### Blockquotes:
```markdown
> This is a quote
> Multiple lines
```
- Border-left: 4px cyan
- Background: gray-50
- Italic text

## 🎯 Layout Order:

```
┌─────────────────────────────┐
│  📌 Title (Header)          │
│  [Always visible]           │
├─────────────────────────────┤
│  🖼️ Image (if exists)       │
│  [Appears first when open]  │
├─────────────────────────────┤
│  🎬 Video (if exists)       │
│  [Appears second]           │
├─────────────────────────────┤
│  📝 Description (Markdown)  │
│  [Content with full styling]│
│  - Headings                 │
│  - Lists (ordered/unordered)│
│  - Bold, Italic             │
│  - Links                    │
│  - Code                     │
│  - Blockquotes              │
└─────────────────────────────┘
```

## 🚀 Test Styling:

Đã tạo file test: `public/content/notes/test-styling.md`

Chứa:
- H2, H3 headings
- Ordered lists (1, 2, 3) với nested lists
- Unordered lists với nested bullets
- Bold, italic, bold-italic
- Links và inline code
- Blockquotes
- Horizontal rule

Run `npm run build:notes` và xem trên trang web!

## 💡 Tips:

1. **Spacing giữa các sections:**
   - Image: margin-top 4 (1rem)
   - Video: margin-top 4 (1rem)
   - Description: margin-top 4 (1rem)

2. **Max height của collapsed card:**
   - Tăng từ 1000px → 2000px
   - Để chứa content dài hơn

3. **Shadow effects:**
   - Image: shadow-md, hover:shadow-xl
   - Video iframe: shadow-md

4. **Readable line-height:**
   - Paragraphs: 1.75
   - Lists: 1.65

## 🔧 Customization:

Muốn thay đổi styling? Edit file:
```
public/markdown-styles.css
```

Ví dụ:
```css
/* Đổi màu links */
.markdown-content a {
  color: #your-color;
}

/* Đổi font size headings */
.markdown-content h2 {
  font-size: 2rem;
}
```

Sau đó reload trang (không cần rebuild).

---

**Kết quả:** Content giờ dễ đọc hơn với lists rõ ràng, spacing hợp lý, và media (ảnh + video) hiển thị trước!
