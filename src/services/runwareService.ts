// LƯU Ý BẢO MẬT: API key của bạn không nên được lưu trữ trực tiếp trong mã nguồn.
// Trong một ứng dụng thực tế, hãy sử dụng biến môi trường hoặc một dịch vụ quản lý bí mật.
// Key này được lấy từ cài đặt của bạn, hãy đảm bảo nó chính xác.
const RUNWARE_API_KEY = "BoC1SEOiYbqsoj0ZKlY4q3HX0bAJaEN7"; 

// Đây là một endpoint API giả định. Nó có thể cần được điều chỉnh.
const RUNWARE_API_URL = "https://api.runware.ai/v1/images/generate";

/**
 * Tạo ảnh từ một đoạn văn bản prompt bằng Runware API.
 * @param prompt Đoạn văn bản mô tả ảnh cần tạo.
 * @returns URL của ảnh đã được tạo.
 */
export const generateImageFromPrompt = async (prompt: string): Promise<string> => {
  console.log("Attempting to generate image with Runware for prompt:", prompt);

  try {
    const response = await fetch(RUNWARE_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RUNWARE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt,
        n: 1, // Số lượng ảnh cần tạo
        size: "512x512", // Kích thước ảnh
      }),
    });

    if (!response.ok) {
      // Cố gắng đọc lỗi dưới dạng văn bản hoặc JSON để có thêm thông tin
      let errorBody;
      try {
        errorBody = await response.json();
      } catch (e) {
        errorBody = await response.text();
      }
      console.error("Runware API Error Response:", {
        status: response.status,
        statusText: response.statusText,
        body: errorBody,
      });
      throw new Error(`Lỗi từ Runware API: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Runware API Success Response:", result);

    // Kiểm tra các cấu trúc phản hồi phổ biến để tìm URL ảnh
    const imageUrl = result?.data?.[0]?.url || result?.images?.[0] || result?.url;

    if (imageUrl && typeof imageUrl === 'string') {
      console.log("Image URL found:", imageUrl);
      return imageUrl;
    } else {
      console.error("Could not find image URL in Runware response", result);
      throw new Error("Phản hồi từ Runware không chứa URL ảnh hợp lệ.");
    }

  } catch (error) {
    console.error("Failed to call Runware API:", error);
    // Nếu lỗi là do CORS, nó thường sẽ là một TypeError.
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error("Không thể kết nối đến Runware. Điều này có thể do lỗi mạng hoặc chính sách CORS của trình duyệt. Hãy kiểm tra kết nối mạng và bảng điều khiển của trình duyệt để biết thêm chi tiết.");
    }
    // Ném lại lỗi ban đầu hoặc một lỗi mới
    throw error;
  }
};