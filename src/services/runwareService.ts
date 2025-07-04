// LƯU Ý QUAN TRỌNG: Trong một ứng dụng thực tế, API key này nên được lưu trữ an toàn
// trên một máy chủ backend và không nên để lộ trong mã nguồn frontend.
const RUNWARE_API_KEY = "BoC1SEOiYbqsoj0ZKlY4q3HX0bAJaEN7";

// Đây là một URL giả định dựa trên các API thông thường.
// Nếu không đúng, chúng ta có thể cần điều chỉnh lại.
const RUNWARE_API_URL = "https://api.runware.ai/v1/images/generate";

/**
 * Tạo ảnh từ một đoạn văn bản prompt bằng Runware API.
 * @param prompt Đoạn văn bản mô tả ảnh cần tạo.
 * @returns URL của ảnh đã được tạo.
 */
export const generateImageFromPrompt = async (prompt: string): Promise<string> => {
  console.log("Sending prompt to Runware:", prompt);

  const response = await fetch(RUNWARE_API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RUNWARE_API_KEY}`,
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      prompt: prompt,
      // Các tham số khác có thể cần thiết, ví dụ:
      // model: "stable-diffusion-v1-5",
      // n: 1,
      // size: "512x512"
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Lỗi từ Runware API:", errorData);
    throw new Error(errorData.message || "Quá trình tạo ảnh với Runware thất bại.");
  }

  const result = await response.json();
  console.log("Received result from Runware:", result);

  // Giả định rằng kết quả trả về có chứa URL của ảnh
  // Cấu trúc này có thể cần điều chỉnh dựa trên phản hồi thực tế của API
  if (result && result.data && result.data.url) {
    return result.data.url;
  } else if (result && result.imageUrl) {
    return result.imageUrl;
  }

  throw new Error("Không thể lấy ảnh đã tạo từ Runware. Phản hồi không hợp lệ.");
};