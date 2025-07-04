import { RunwayML } from "@runwayml/sdk";

// LƯU Ý QUAN TRỌNG: Trong một ứng dụng thực tế, API key này nên được lưu trữ an toàn
// trên một máy chủ backend và không nên để lộ trong mã nguồn frontend.
// Vì mục đích demo, tôi sẽ sử dụng key bạn đã cung cấp.
const RUNWAY_API_KEY = "BoC1SEOiYbqsoj0ZKlY4q3HX0bAJaEN7";

const runway = new RunwayML({
  runway_host: "https://api.runwayml.com",
  runway_token: RUNWAY_API_KEY,
});

/**
 * Tạo ảnh từ một đoạn văn bản prompt bằng Runway API.
 * @param prompt Đoạn văn bản mô tả ảnh cần tạo.
 * @returns URL của ảnh đã được tạo.
 */
export const generateImageFromPrompt = async (prompt: string): Promise<string> => {
  try {
    // Sử dụng một model text-to-image phổ biến. Tên model này có thể cần
    // được điều chỉnh dựa trên các model có sẵn trên nền tảng RunwayML.
    const model = await runway.hostedModel("runway-ml/stable-diffusion-v1-5");
    
    console.log("Sending prompt to Runway:", prompt);
    const result = await model.query({ prompt });
    console.log("Received result from Runway:", result);

    if (result && result.image) {
      return result.image;
    }

    throw new Error("Không thể lấy ảnh đã tạo từ Runway. Phản hồi không hợp lệ.");

  } catch (error) {
    console.error("Lỗi khi tạo ảnh bằng Runway:", error);
    // Trả về một ảnh placeholder nếu có lỗi
    throw new Error("Quá trình tạo ảnh thất bại.");
  }
};