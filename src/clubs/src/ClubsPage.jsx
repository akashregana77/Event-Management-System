import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, SlidersHorizontal, Users, ArrowRight, Sparkles, Trophy, Palette } from "lucide-react";
import clubsData from "./clubsData";
import eventsData from "../../Events/data/events.json";
import "./ClubsPage.css";
import Navbar from "../../Home/navbar";

const categoryIcons = {
  Technical: <Sparkles size={14} />,
  Cultural: <Palette size={14} />,
};

const categoryGradients = {
  Technical: "technical",
  Cultural: "cultural",
};

export default function ClubsPage() {
  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Ctrl+K shortcut
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const categories = ["All", ...new Set(clubsData.map((c) => c.category))];

  const filteredClubs = clubsData.filter((club) => {
    const matchesSearch = club.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" || club.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const activeFilterCount = categoryFilter !== "All" ? 1 : 0;

  // Get events count for a specific club from events.json
  const getClubEventCount = (clubName) =>
    eventsData.filter((e) => e.club === clubName).length;

  const totalEvents = eventsData.length;

  return (
    <>
      <Navbar />
      <div className="clubs-page">
        {/* Sidebar Filters */}
        <aside className="clubs-filters">
          <div className="clubs-filters-header">
            <div className="clubs-filters-title">
              <SlidersHorizontal size={18} />
              <h3>Filters</h3>
            </div>
            {activeFilterCount > 0 && (
              <button
                className="clubs-clear-btn"
                onClick={() => setCategoryFilter("All")}
              >
                <X size={14} />
                Clear
              </button>
            )}
          </div>

          <div className="clubs-filter-group">
            <label>Category</label>
            <div className="clubs-filter-pills">
              {categories.map((cat, i) => (
                <button
                  key={cat}
                  className={`clubs-filter-pill ${categoryFilter === cat ? "active" : ""} ${cat !== "All" ? categoryGradients[cat] || "" : ""}`}
                  onClick={() => setCategoryFilter(cat)}
                  style={{ "--pill-index": i }}
                >
                  {cat !== "All" && categoryIcons[cat]}
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Stats summary */}
          <div className="clubs-stats-summary">
            <div className="clubs-stat-item">
              <span className="clubs-stat-number">{clubsData.length}</span>
              <span className="clubs-stat-label">Total Clubs</span>
            </div>
            <div className="clubs-stat-item">
              <span className="clubs-stat-number">{totalEvents}</span>
              <span className="clubs-stat-label">Total Events</span>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="clubs-content">
          <div className="clubs-header-section">
            <h1>Explore Clubs</h1>
            <p className="clubs-subtitle">
              Showing <strong>{filteredClubs.length}</strong> of{" "}
              <strong>{clubsData.length}</strong> clubs
            </p>
          </div>

          {/* Search Bar */}
          <div className="clubs-search-box">
            <Search className="clubs-search-icon" size={18} />
            <input
              ref={searchRef}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search clubs..."
            />
            {searchText && (
              <>
                <span className="clubs-search-count">
                  {filteredClubs.length} found
                </span>
                <button
                  className="clubs-search-clear"
                  onClick={() => setSearchText("")}
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              </>
            )}
            <kbd className="clubs-search-kbd">Ctrl K</kbd>
          </div>

          {/* Clubs Grid */}
          <div className="clubs-grid-page">
            {filteredClubs.map((club, index) => {
              const eventCount = getClubEventCount(club.name);
              const gradientClass = categoryGradients[club.category] || "";

              return (
                <div
                  className="clubs-card"
                  key={club.id}
                  style={{ "--card-index": index }}
                >
                  {/* Gradient banner */}
                  <div className={`clubs-card-banner ${gradientClass}`}>
                    <span className="clubs-banner-pattern" />
                  </div>

                  <div className="clubs-shimmer-effect" />

                  <div className="clubs-card-body">
                    <div className="clubs-card-header">
                      <span className={`clubs-tag ${gradientClass}`}>
                        {categoryIcons[club.category]}
                        {club.category}
                      </span>
                      {eventCount > 0 && (
                        <span className="clubs-upcoming-badge">
                          {eventCount} event{eventCount !== 1 ? "s" : ""}
                        </span>
                      )}
                    </div>

                    <h3>{club.name}</h3>
                    <p className="clubs-description">{club.description}</p>

                    <div className="clubs-meta">
                      <div className="clubs-meta-item">
                        <Users size={16} />
                        <span>{club.members} Members</span>
                      </div>
                      <div className="clubs-meta-item">
                        <Trophy size={16} />
                        <span>{eventCount} Events</span>
                      </div>
                    </div>

                    <button
                      className="clubs-view-btn"
                      onClick={() => navigate(`/clubs/${club.id}`)}
                    >
                      View Events
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredClubs.length === 0 && (
            <div className="clubs-no-results">
              <div className="clubs-no-results-icon">🏢</div>
              <h3>No clubs found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
