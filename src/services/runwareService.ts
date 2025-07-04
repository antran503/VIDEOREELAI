/**
 * Mô phỏng việc tạo ảnh từ một đoạn văn bản prompt.
 * Thay vì gọi API Runware thực tế có thể đang gặp sự cố,
 * hàm này sẽ trả về một ảnh mẫu sau một khoảng thời gian chờ ngắn.
 * @param prompt Đoạn văn bản mô tả ảnh cần tạo.
 * @returns URL của một ảnh mẫu.
 */
export const generateImageFromPrompt = async (prompt: string): Promise<string> => {
  console.log("Simulating image generation for prompt:", prompt);

  // Mô phỏng độ trễ mạng
  await new Promise(resolve => setTimeout(resolve, 2500));

  // Trả về một ảnh mẫu ngẫu nhiên để cho thấy có sự thay đổi
  const placeholderImages = [
    "https://i.imgur.com/sCfp0kE.png",
    "https://i.imgur.com/4YjD2M5.png",
    "https://i.imgur.com/aF4aYxT.jpg",
    "https://i.imgur.com/sCfp0kE.png"
  ];
  const randomImage = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];

  console.log("Simulated generation successful. Returning image:", randomImage);
  return randomImage;
};