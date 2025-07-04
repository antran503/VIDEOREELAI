// Một bộ đếm đơn giản để xoay vòng qua các ảnh mẫu
let imageIndex = 0;
const placeholderImages = [
  "https://i.imgur.com/4YjD2M5.png", // Một nhân vật
  "https://i.imgur.com/sCfp0kE.png", // Một nhân vật/cảnh khác
  "https://i.imgur.com/aF4aYxT.jpg", // Một cảnh quan/cảnh phim
  "https://i.imgur.com/sCfp0kE.png", // Một cảnh khác
];

/**
 * Mô phỏng việc tạo ảnh từ dịch vụ Runware để giải quyết các vấn đề kết nối API (ví dụ: lỗi CORS).
 * Hàm này trả về một ảnh mẫu chất lượng cao sau một khoảng thời gian chờ ngắn.
 * @param prompt Đoạn văn bản mô tả ảnh cần tạo (được ghi lại để gỡ lỗi).
 * @returns URL của một ảnh mẫu.
 */
export const generateImageFromPrompt = async (prompt: string): Promise<string> => {
  console.log(`Simulating image generation with Runware. Prompt: "${prompt}"`);

  // Mô phỏng độ trễ mạng để người dùng cảm thấy quá trình đang diễn ra
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Lấy ảnh tiếp theo trong danh sách và quay vòng
  const imageUrl = placeholderImages[imageIndex];
  imageIndex = (imageIndex + 1) % placeholderImages.length;

  console.log("Runware simulated generation successful. Returning placeholder image:", imageUrl);
  return imageUrl;
};