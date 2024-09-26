import e from "express";
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

    // const moment = await api.get(
    //   `/archive/media/${videoSourceid}/${stop.data.timestamp}`,
    //   {
    //     responseType: "arraybuffer",
    //   }
    // );

    // if (!uuid.data.uuid) {
    //   throw { message: "stream not found", code: 404 };
    // }
    return stop.data.timestamp;
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
    console.error(
      "Error getFrame:",
      error.response.data.statusMessage,
      error.response.data.statusCode
    );
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
    console.error(
      "Error listEvents:",
      error.response.data.statusMessage,
      error.response.data.statusCode
    );
    throw error;
  }
}

async function exportArchive(videoSourceid, endtime, begintime, format) {
  try {
    const exportInit = await api.post(
      `/export/archive/${videoSourceid}/${begintime}/${endtime}`,
      format
    );

    const export_id = exportInit.headers.location.replace("/export/", "");

    return export_id;
  } catch (error) {
    console.error("Error exportArchive:", error);
    throw error;
  }
}

async function statusExportArchive(export_id) {
  try {
    const exportStatus = await api.get(`/export/${export_id}/status`);

    return exportStatus.data;
  } catch (error) {
    console.error(
      "Error statusExportArchive:",
      error.response.data.statusMessage,
      error.response.data.statusCode
    );
    throw error;
  }
}

async function deleteExport(export_id) {
  try {
    const exportStatus = await api.delete(`/export/${export_id}`);

    return exportStatus.data;
  } catch (error) {
    console.error(
      "Error statusExportArchive:",
      error.response.data.statusMessage,
      error.response.data.statusCode
    );
    throw error;
  }
}

async function downloadExport(export_id, fileName) {
  // http://127.0.0.1:80/export/ea221922-ef17-4f02-8e1d-b1183f3366db/file
  // ?name=LAPTOP-3UEDE0C4_DeviceIpint.14[20240923T113813.608000-20240923T113827.745000].mp4
  // console.log(`/export/${export_id}/file?name=${fileName}`);
  try {
    const exportFile = await api.get(
      `/export/${export_id}/file?name=${fileName}`,
      {
        responseType: "stream", // Isso garante que os dados sejam recebidos como um stream de arquivo
      }
    );

    // await deleteExport(export_id); // Deleta o arquivo

    return exportFile.data; // Retorna o stream do arquivo
  } catch (error) {
    // statusCode: 404,
    // statusMessage: 'Not Found',
    console.error(
      "Error downloadExport:",
      error.response.data.statusMessage,
      error.response.data.statusCode
    );
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
  exportArchive,
  statusExportArchive,
  deleteExport,
  downloadExport,
};
