// LƯU Ý BẢO MẬT: API key của bạn không nên được lưu trữ trực tiếp trong mã nguồn.
// Trong một ứng dụng thực tế, hãy sử dụng biến môi trường hoặc một dịch vụ quản lý bí mật.
const RUNWARE_API_KEY = "BoC1SEOiYbqsoj0ZKlY4q3HX0bAJaEN7";
const MODEL_ID = "runway-ml/stable-diffusion-v1-5"; // Model mặc định dựa trên tài liệu

const INFERENCE_API_URL = `https://api.runware.ai/v1/inference/${MODEL_ID}`;
const JOB_STATUS_API_URL = "https://api.runware.ai/v1/inference/jobs/";

// Hàm tiện ích để tạo độ trễ giữa các lần kiểm tra
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Tạo ảnh từ một đoạn văn bản prompt bằng Runware API theo quy trình bất đồng bộ.
 * @param prompt Đoạn văn bản mô tả ảnh cần tạo.
 * @returns URL của ảnh đã được tạo.
 */
export const generateImageFromPrompt = async (prompt: string): Promise<string> => {
  console.log(`Starting image generation job for prompt: "${prompt}"`);

  // --- Bước 1: Gửi yêu cầu để bắt đầu công việc tạo ảnh ---
  const startJobResponse = await fetch(INFERENCE_API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RUNWARE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parameters: {
        prompt: prompt,
      },
    }),
  });

  if (!startJobResponse.ok) {
    const errorBody = await startJobResponse.text();
    console.error("Runware API Error (starting job):", errorBody);
    throw new Error(`Failed to start image generation job: ${startJobResponse.statusText}`);
  }

  const job = await startJobResponse.json();
  const jobId = job.uuid;

  if (!jobId) {
    console.error("Runware response did not contain a job UUID", job);
    throw new Error("Invalid response from Runware when starting job.");
  }

  console.log(`Job started successfully. Job ID: ${jobId}`);

  // --- Bước 2: Lặp lại việc kiểm tra trạng thái công việc cho đến khi hoàn thành ---
  const maxAttempts = 20; // Tối đa 20 lần thử (khoảng 60 giây)
  for (let i = 0; i < maxAttempts; i++) {
    console.log(`Polling for job status... Attempt ${i + 1}`);
    
    await sleep(3000); // Chờ 3 giây

    const getStatusResponse = await fetch(`${JOB_STATUS_API_URL}${jobId}`, {
      headers: {
        "Authorization": `Bearer ${RUNWARE_API_KEY}`,
      },
    });

    if (!getStatusResponse.ok) {
      console.warn(`Could not get job status: ${getStatusResponse.statusText}`);
      continue; // Thử lại sau giây lát
    }

    const jobStatus = await getStatusResponse.json();

    if (jobStatus.status === "SUCCEEDED") {
      console.log("Job succeeded!", jobStatus);
      const imageUrl = jobStatus.outputs?.[0]?.url;
      if (imageUrl) {
        return imageUrl;
      } else {
        throw new Error("Job succeeded but no image URL was found in the output.");
      }
    } else if (jobStatus.status === "FAILED") {
      console.error("Job failed:", jobStatus);
      throw new Error(`Image generation failed. Reason: ${jobStatus.failure_reason}`);
    }
    // Nếu trạng thái là PENDING hoặc RUNNING, vòng lặp sẽ tiếp tục
  }

  throw new Error("Image generation timed out after 60 seconds.");
};