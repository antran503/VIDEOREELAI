import { RunwayML } from "@runwayml/sdk";

// Sửa lỗi 1: Tên thuộc tính đúng có thể là 'runway_token'.
const runway = new RunwayML({
  runway_token: "93mL0Hd1fUVky4jcbyFAjBgJz1OtxQem",
});

/**
 * Cố gắng tạo ảnh bằng RunwayML SDK với API key được cung cấp.
 * LƯU Ý: Yêu cầu này dự kiến sẽ thất bại trong môi trường trình duyệt do các hạn chế về CORS.
 * @param prompt Đoạn văn bản mô tả ảnh cần tạo.
 * @returns URL của ảnh được tạo.
 */
export const generateImageFromPrompt = async (prompt: string): Promise<string> => {
  console.log("Đang thử tạo ảnh với API key mới và RunwayML SDK...");
  try {
    // Sửa lỗi 2: Phương thức đúng có thể là 'query' được gọi trực tiếp trên instance,
    // thay vì 'hostedModel'.
    const result = await runway.query("runway-ml/stable-diffusion-v1-5", {
      prompt,
    });

    if (result?.image) {
      console.log("Tạo ảnh thành công:", result.image);
      return result.image;
    } else {
      console.error("Yêu cầu không trả về ảnh.", result);
      throw new Error("Yêu cầu không trả về ảnh.");
    }
  } catch (error) {
    console.error("Lỗi RunwayML SDK:", error);
    throw error;
  }
};