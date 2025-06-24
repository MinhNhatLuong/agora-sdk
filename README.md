# Agora Video Call & Chat Application

Ứng dụng này cho phép thực hiện video call và chat giữa nhiều người dùng sử dụng Agora SDK.

## Tính năng

- Video call giữa hai hoặc nhiều người dùng
- Chat realtime trong khi video call
- Giao diện đơn giản, dễ sử dụng

## Cài đặt

1. Clone repository:

```bash
git clone <repository-url>
cd agora-sdk
```

2. Cài đặt dependencies:

```bash
npm install
```

3. Cấu hình Agora App ID:

   - Đăng ký tài khoản tại [Agora.io](https://www.agora.io/)
   - Tạo project và lấy App ID
   - Tạo file `.env` tại thư mục gốc của project và thêm App ID của bạn:
   ```
   VITE_AGORA_APP_ID=your_agora_app_id_here
   ```

## Chạy ứng dụng

```bash
npm run dev
```

Truy cập ứng dụng tại `http://localhost:5173`

## Cách sử dụng

1. Nhập tên phòng (có thể tự đặt)
2. Nhấn "Tham gia" để bắt đầu cuộc gọi
3. Để người khác tham gia cùng phòng, họ cần nhập đúng tên phòng của bạn
4. Sử dụng khung chat bên phải để gửi tin nhắn

## Lưu ý

- Cần cấp quyền camera và microphone cho trình duyệt
- Với môi trường development, bạn có thể sử dụng token null, nhưng với production cần triển khai server token
- File `.env` không được commit lên git vì lý do bảo mật

## Công nghệ sử dụng

- React
- Vite
- Agora RTC SDK (video call)
- Agora RTM SDK (chat)

## Môi trường

Ứng dụng được phát triển và thử nghiệm trên:
- Node.js v18+
- npm v9+
