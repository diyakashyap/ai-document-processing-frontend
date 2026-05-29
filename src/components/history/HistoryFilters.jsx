const filters = [
  { id: "7", label: "Past 1 week", days: 7 },
  { id: "30", label: "Past 1 month", days: 30 },
  { id: "90", label: "Past 3 months", days: 90 },
];

export default function HistoryFilters({ activeFilter, onFilterChange }) {
  return (
    <div className="segmented-control" aria-label="History date filter">
      {filters.map((filter) => (
        <button
          type="button"
          key={filter.id}
          className={activeFilter === filter.id ? "active" : ""}
          onClick={() => onFilterChange(filter.id)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

export { filters };
