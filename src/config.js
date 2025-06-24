const config = {
  appId: import.meta.env.VITE_AGORA_APP_ID || "", // Lấy từ biến môi trường
  token: "b6aeb08fe1774624bbda0fe476b75028", // Cho phát triển, để null. Cho production, cần token server
  channel: "main", // Tên channel mặc định
};

export default config; 