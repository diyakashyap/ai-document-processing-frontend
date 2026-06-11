import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "",
  timeout: 30000,
});

console.log(import.meta.env.VITE_API_BASE_URL);

export async function fetchSummaryHistory() {
  return Promise.resolve({ data: [] });
}

export async function retrySummaryProcessing(recordId) {
  return Promise.resolve({ data: { recordId } });
}

export async function getToken(email) {
  return apiClient.post("/auth/token", {
    email,
  });
}

export async function uploadDocuments(files, token) {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  return apiClient.post("/files/upload", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function getSummary(docId, token) {
  return apiClient.get(`/files/${docId}/summary`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function listFiles(token) {
  return apiClient.get("/files", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function downloadFile(docId, token) {
  const response = await apiClient.get(`/files/${docId}/download`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.url;
}

export async function downloadSummary(docId, token) {
  const response = await apiClient.get(
    `/files/${docId}/summary/download`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    }
  );

  return response.data;
}

export default apiClient;