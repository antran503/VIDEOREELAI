/**
 * Mô phỏng việc tạo ảnh từ một prompt.
 * Trong một ứng dụng thực tế, hàm này sẽ gọi đến một API tạo ảnh (ví dụ: DALL-E, Midjourney, Stable Diffusion).
 * Tuy nhiên, do các hạn chế về bảo mật của trình duyệt (CORS) và các thư viện chỉ dành cho máy chủ,
 * việc gọi trực tiếp API từ phía client thường không thể thực hiện.
 *
 * Thay vào đó, chúng ta trả về một URL ảnh giữ chỗ để cho phép giao diện người dùng hoạt động.
 * @param prompt - Đoạn văn bản mô tả ảnh cần tạo.
 * @param currentImage - URL của ảnh hiện tại để đảm bảo ảnh mới khác biệt.
 * @returns Một promise phân giải thành một URL ảnh giữ chỗ mới.
 */
export const generateImageFromPrompt = async (prompt: string, currentImage?: string): Promise<string> => {
  console.log(`Mô phỏng tạo ảnh cho prompt: "${prompt}"`);

  // Giả lập độ trễ mạng
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Trả về một ảnh giữ chỗ ngẫu nhiên để có sự đa dạng
  const placeholderImages = [
    "https://i.imgur.com/sCfp0kE.png",
    "https://i.imgur.com/4YjD2M5.png",
    "https://i.imgur.com/aF4aYxT.jpg",
    "https://i.imgur.com/9yV4aG2.png", // Thêm một ảnh mới để tăng sự đa dạng
  ];
  
  let newImage = currentImage;
  // Tiếp tục chọn ảnh mới cho đến khi nó khác với ảnh hiện tại
  // Điều này chỉ chạy nếu có nhiều hơn 1 ảnh trong danh sách
  if (placeholderImages.length > 1 && currentImage) {
    while (newImage === currentImage) {
      newImage = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
    }
  } else {
    newImage = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
  }

  console.log(`Trả về ảnh giữ chỗ: ${newImage}`);
  return newImage;
};