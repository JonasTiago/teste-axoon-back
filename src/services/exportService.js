import api from "../api/api.js";

async function getFrame(videoSourceid, starttime) {
  try {
    const frame = await api.get(
      `/archive/media/${videoSourceid}/${starttime}`,
      {
        responseType: "arraybuffer",
      }
    );

    if (!frame) {
      throw { message: "stream not found", code: 404 };
    }

    return frame.data;
  } catch (error) {
    console.error("Error getFrame:", error.status);
    throw error;
  }
}

export const exportService = {
  getFrame,
};
