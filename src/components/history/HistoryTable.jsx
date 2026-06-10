import StatusBadge from "../common/StatusBadge.jsx";
import { formatDate, formatBytes } from "../../utils/formatters.js";
import { downloadFile, downloadSummary } from "../../services/apiClient.js";

export default function HistoryTable({ records, onRetry }) {
  if (!records.length) {
    return <div className="empty-state">No records match the selected filter.</div>;
  }

  async function handleFileDownload(record) {
  try {
    const url = await downloadFile(record.id, record.token);

    const link = document.createElement("a");

    link.href = url;
    link.download = record.fileName;

    document.body.appendChild(link);

    link.click();

    link.remove();
  } catch (error) {
    console.error(error);
    alert("Failed to download file.");
  }
}

  async function handleSummaryDownload(record) {
    try {
      const blob = await downloadSummary(record.id, record.token);

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = `${record.fileName}-summary.txt`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Failed to download summary.");
    }
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>File name</th>
            <th>Upload date</th>
            <th>Status</th>
            <th>Summary preview</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>
                <strong>{record.fileName}</strong>
                <small>
                  {formatBytes(record.size)} by {record.email}
                </small>
              </td>

              <td>{formatDate(record.uploadedAt)}</td>

              <td>
                <StatusBadge status={record.status} />
              </td>

              <td>{record.summaryPreview}</td>

              <td>
                <div className="action-row">
                  <button
                    type="button"
                    className="ghost-button"
                    onClick={() => handleFileDownload(record)}
                  >
                    File
                  </button>

                  <button
                    type="button"
                    className="ghost-button"
                    onClick={() => handleSummaryDownload(record)}
                  >
                    Summary
                  </button>

                  {record.status === "Failed" && record.retryAvailable && (
                    <button
                      type="button"
                      className="retry-button"
                      onClick={() => onRetry(record.id)}
                    >
                      Retry
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}