import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "",
  timeout: 30000,
});
console.log(import.meta.env.VITE_API_BASE_URL);

export async function uploadDocuments(payload) {
  // Replace this mock boundary with POST /uploads when the backend is ready.
  return Promise.resolve({ data: payload });
}

export async function fetchSummaryHistory() {
  // Replace this mock boundary with GET /summaries when the backend is ready.
  return Promise.resolve({ data: [] });
}

export async function retrySummaryProcessing(recordId) {
  // Replace this mock boundary with POST /summaries/:id/retry when the backend is ready.
  return Promise.resolve({ data: { recordId } });
}

export default apiClient;
