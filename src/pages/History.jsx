import { useMemo, useState } from "react";
import HistoryFilters, { filters } from "../components/history/HistoryFilters.jsx";
import HistoryTable from "../components/history/HistoryTable.jsx";

export default function History({ records, currentEmail, onRetry, onNavigate }) {
  const [activeFilter, setActiveFilter] = useState("30");

  const filteredRecords = useMemo(() => {
    const selected = filters.find((filter) => filter.id === activeFilter);
    const userRecords = records.filter(
      (record) => record.email.toLowerCase() === currentEmail.toLowerCase()
    );

    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - selected.days);
    return userRecords.filter((record) => new Date(record.uploadedAt) >= cutoff);
  }, [activeFilter, currentEmail, records]);

  console.log("Current Email:", currentEmail);
  console.log("First Record:", records[0]);

  if (!currentEmail) {
    return (
      <section className="content-panel wide">
        <div className="empty-state">
          Enter your email id on the upload page first to view matching history.
          <div className="empty-action">
            <button type="button" className="primary-button" onClick={() => onNavigate("upload")}>
              Go to upload
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="content-panel wide">
      <div className="panel-heading">
        <div>
          <h2>Upload and summary history</h2>
          <p>Showing records for {currentEmail}.</p>
        </div>
        <HistoryFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      </div>
      <HistoryTable records={filteredRecords} onRetry={onRetry} />
    </section>
  );
}
