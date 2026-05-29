import StatusBadge from "../common/StatusBadge.jsx";
import { formatDate, formatBytes } from "../../utils/formatters.js";

export default function HistoryTable({ records, onRetry }) {
  if (!records.length) {
    return <div className="empty-state">No records match the selected filter.</div>;
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
                <small>{formatBytes(record.size)} by {record.email}</small>
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
                    disabled
                    title="File download will be connected to S3 after backend integration."
                  >
                    File
                  </button>
                  <button
                    type="button"
                    className="ghost-button"
                    disabled
                    title="Summary download will be connected to the database after backend integration."
                  >
                    Summary
                  </button>
                  {record.status === "Failed" && record.retryAvailable && (
                    <button type="button" className="retry-button" onClick={() => onRetry(record.id)}>
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
