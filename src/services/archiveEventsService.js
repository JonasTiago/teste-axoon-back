import api from "../api/api.js";

async function listContents(videoSourceid) {
  try {
    const response = await api.get(
      `/archive/contents/intervals/${videoSourceid}/future/past`
    );

    if (!response.data) {
      throw { message: "Cameras not found", code: 404 };
    }

    return response.data;
  } catch (error) {
    console.error("Error listContents:", error.status);
    throw error;
  }
}

async function getUuid() {
  try {
    const uuid = await api.get("/uuid");

    if (!uuid.data.uuid) {
      throw { message: "Cameras not found", code: 404 };
    }

    return uuid.data;
  } catch (error) {
    console.error("Error getUuid:", error.status);
    throw error;
  }
}

async function archiveStream(videoSourceid, starttime, uuid) {
  try {
    const response = await api.get(
      `/archive/media/${videoSourceid}/${starttime}/?format=mp4&speed=1&w=640&h=480&enable_token_auth=1&valid_token_hours=12&id=${uuid}`
    );

    if (!response.data.path) {
      throw { message: "Cameras not found", code: 404 };
    }

    const stream = await api.get(response.data.path, {
      responseType: "stream",
    });

    return stream.data;
  } catch (error) {
    console.error("Error archiveStream:", error.status);
    throw error;
  }
}

async function archiveStopStream(uuid, videoSourceid) {
  try {
    const stop = await api.get(`archive/media/stop/${uuid}`);

    const moment = await api.get(
      `/archive/media/${videoSourceid}/${stop.data.timestamp}`,
      {
        responseType: "arraybuffer",
      }
    );

    // if (!uuid.data.uuid) {
    //   throw { message: "stream not found", code: 404 };
    // }
    return moment.data;
  } catch (error) {
    console.error("Error archiveStopStream:", error.status);
    throw error;
  }
}

async function listFramesByVideo(videoSourceid, endtime, begintime) {
  try {
    const frames = await api.get(
      `/archive/contents/frames/${videoSourceid}/${endtime}/${begintime}`
    );

    if (!frames.data) {
      throw { message: "frames not found", code: 404 };
    }
    return frames.data;
  } catch (error) {
    console.error("Error listFramesByVideo:", error.status);
    throw error;
  }
}

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

async function listEvents(videoSourceid) {
  try {
    const response = await api.get(
      `/archive/events/detectors/${videoSourceid}`
    );

    if (!response.data) {
      throw { message: "Events not found", code: 404 };
    }

    return response.data;
  } catch (error) {
    console.error("Error listEvents:", error.status);
    throw error;
  }
}

export const archiveEventsService = {
  listFramesByVideo,
  listContents,
  listEvents,
  archiveStream,
  getUuid,
  archiveStopStream,
  getFrame,
};
