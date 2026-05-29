const navItems = [
  { id: "upload", label: "Upload", symbol: "UP" },
  { id: "history", label: "History", symbol: "HS" },
];

export default function Sidebar({ activeTab, onTabChange }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">AI</div>
        <div>
          <strong>DocuSummarize</strong>
          <span>Frontend</span>
        </div>
      </div>
      <nav className="nav-list" aria-label="Primary navigation">
        {navItems.map((item) => (
          <button
            type="button"
            key={item.id}
            className={activeTab === item.id ? "nav-item active" : "nav-item"}
            onClick={() => onTabChange(item.id)}
          >
            <span>{item.symbol}</span>
            {item.label}
          </button>
        ))}
      </nav>
      <div className="sidebar-note">
        <strong>Frontend only</strong>
        <span>Mock data and API boundaries are ready for backend connection.</span>
      </div>
    </aside>
  );
}
