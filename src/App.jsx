import AppShell from "./components/layout/AppShell.jsx";
import { useEffect, useState } from "react";
import UploadWorkspace from "./pages/UploadWorkspace.jsx";
import History from "./pages/History.jsx";
import {
  getToken,
  uploadDocuments,
  getSummary,
  listFiles,
} from "./services/apiClient.js";

const tabs = {
  upload: UploadWorkspace,
  history: History,
};

export default function App() {
  const [activeTab, setActiveTab] = useState("upload");
  const [records, setRecords] = useState([]);
  const [currentEmail, setCurrentEmail] = useState("");
  const [summary, setSummary] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
  async function loadHistory() {
    if (!token) {
      return;
    }

    try {
      const response = await listFiles(token);

      console.log("FILES RESPONSE:", response.data);
    } catch (error) {
      console.error("Failed to load history:", error);
    }
  }

  loadHistory();
}, [token]);

  const Page = tabs[activeTab] ?? UploadWorkspace;

  async function handleUploadAccepted(files, email) {
    try {
      const tokenResponse = await getToken(email);
      setToken(tokenResponse.data.access_token);
      const uploadResponse = await uploadDocuments(
        files,
        tokenResponse.data.access_token
      );

      const uploadedDocument = uploadResponse.data.uploaded[0];

      const summaryResponse = await getSummary(
        uploadedDocument.id,
        tokenResponse.data.access_token
      );

      console.log("SUMMARY:", summaryResponse.data);

      setSummary(summaryResponse.data.summary_text);

      const historyRecord = {
        id: uploadedDocument.id,
        fileName: uploadedDocument.doc_name,
        email,
        uploadedAt: uploadedDocument.uploaded_at,
        size: uploadedDocument.doc_size_bytes,
        status: uploadedDocument.status,
        retryAvailable: false,
        summaryPreview: summaryResponse.data.summary_text,
        summaryText: summaryResponse.data.summary_text,
        token: tokenResponse.data.access_token,
      };

      setCurrentEmail(email);

      setRecords((current) => [historyRecord, ...current]);

      console.log("UPLOAD RESPONSE:", uploadResponse.data);
    } catch (error) {
      console.error(error);
      alert("Failed to upload document.");
    }
  }

  function handleRetry(recordId) {
    setRecords((current) =>
      current.map((record) =>
        record.id === recordId
          ? {
              ...record,
              status: "Processing",
              retryAvailable: false,
              summaryPreview:
                "Retry queued. The final summary will appear after processing completes.",
            }
          : record
      )
    );
  }

  return (
    <AppShell activeTab={activeTab} onTabChange={setActiveTab}>
      <Page
        records={records}
        currentEmail={currentEmail}
        summary={summary}
        onUploadAccepted={handleUploadAccepted}
        onRetry={handleRetry}
        onNavigate={setActiveTab}
      />
    </AppShell>
  );
}