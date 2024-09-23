import api from "../api/api.js";

async function listCameras(server) {
  try {
    const response = await api.get(`/camera/list?filter=${server}`);

    if (!response.data) {
      throw { message: "Cameras not found", code: 404 };
    }

    return response.data;
  } catch (error) {
    console.error("Error listCameras:", error.status);
    throw error;
  }
}

async function listCamerasVideoOrigens() {
  try {
    const response = await api.get("/video-origins");

    if (!response.data) {
      throw { message: "Cameras not found", code: 404 };
    }

    return response.data;
  } catch (error) {
    console.error("Error listCamerasVideoOrigens:", error.status);
    throw error;
  }
}

async function snapshotCamera(videoSourceid) {
  try {
    const response = await api.get(`/live/media/snapshot/${videoSourceid}`, {
      responseType: "arraybuffer",
    });

    if (!response.data) {
      throw { message: "Cameras not found", code: 404 };
    }

    return response.data;
  } catch (error) {
    console.error("Error snapshotCamera:", error.status);
    throw error;
  }
}

async function liveCamera(videoSourceid) {
  try {
    const response = await api.get(
      `/live/media/${videoSourceid}?speed=1&w=650&h=300`,
      {
        responseType: "stream",
      }
    );

    if (!response.data) {
      throw { message: "Cameras not found", code: 404 };
    }

    return response.data;
  } catch (error) {
    console.error("Error liveCamera:", error.status);
    throw error;
  }
}

export const cameraService = {
  listCameras,
  listCamerasVideoOrigens,
  snapshotCamera,
  liveCamera,
};
