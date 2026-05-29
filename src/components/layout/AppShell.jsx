import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";

export default function AppShell({ activeTab, onTabChange, children }) {
  return (
    <div className="app-shell">
      <Sidebar activeTab={activeTab} onTabChange={onTabChange} />
      <main className="main-panel">
        <Header />
        <section className="page-content">{children}</section>
      </main>
    </div>
  );
}
