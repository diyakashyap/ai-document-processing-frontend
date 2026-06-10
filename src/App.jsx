import AppShell from "./components/layout/AppShell.jsx";
import { useState } from "react";
import UploadWorkspace from "./pages/UploadWorkspace.jsx";
import History from "./pages/History.jsx";
import { mockSummaryHistory } from "./data/mockData.js";
import { getToken, uploadDocuments, getSummary } from "./services/apiClient.js";
import { createMockUploadRecords } from "./services/mockUploadService.js";

const tabs = {
  upload: UploadWorkspace,
  history: History,
};

export default function App() {
  const [activeTab, setActiveTab] = useState("upload");
  const [records, setRecords] = useState(mockSummaryHistory);
  const [currentEmail, setCurrentEmail] = useState("");

  const Page = tabs[activeTab] ?? UploadWorkspace;

  async function handleUploadAccepted(files, email) {
    const tokenResponse = await getToken(email);

    const uploadResponse = await uploadDocuments(
    files,
    tokenResponse.data.access_token
    );



  
const docId = uploadResponse.data.uploaded[0].id;
alert(`Document ID: ${docId}`);

// const summaryResponse = await getSummary(
//   docId,
//   tokenResponse.data.access_token
// );

// console.log("SUMMARY:", summaryResponse.data);






    console.log("UPLOAD RESPONSE:", uploadResponse.data);
    const nextRecords = createMockUploadRecords(files, email);
    setCurrentEmail(email);
    setRecords((current) => [...nextRecords, ...current]);
  }

  function handleRetry(recordId) {
    setRecords((current) =>
      current.map((record) =>
        record.id === recordId
          ? {
              ...record,
              status: "Processing",
              retryAvailable: false,
              summaryPreview: "Retry queued. The final summary will appear after processing completes.",
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
        onUploadAccepted={handleUploadAccepted}
        onRetry={handleRetry}
        onNavigate={setActiveTab}
      />
    </AppShell>
  );
}
