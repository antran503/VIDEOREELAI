import { RunwayML } from "@runwayml/sdk";

const runway = new RunwayML({
  apiKey: "93mL0Hd1fUVky4jcbyFAjBgJz1OtxQem",
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
    // Lấy mô hình được lưu trữ trước
    const model = await runway.hostedModel("runway-ml/stable-diffusion-v1-5");
    
    // Sửa lỗi: Gọi 'query' trên đối tượng 'model' đã lấy được
    const result = await model.query({ prompt });

    if (result?.image) {
      console.log("Tạo ảnh thành công:", result.image);
      return result.image;
    } else {
      console.error("Yêu cầu không trả về ảnh.", result);
      throw new Error("Yêu cầu không trả về ảnh.");
    }
  } catch (error) {
    console.error("Lỗi RunwayML SDK:", error);
    // Lỗi CORS hoặc lỗi mạng khác có thể sẽ bị bắt ở đây.
    throw error;
  }
};