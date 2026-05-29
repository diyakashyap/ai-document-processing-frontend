const statusClass = {
  Uploaded: "uploaded",
  Processing: "processing",
  Completed: "completed",
  Failed: "failed",
};

export default function StatusBadge({ status }) {
  return <span className={`status-badge ${statusClass[status] || "uploaded"}`}>{status}</span>;
}
