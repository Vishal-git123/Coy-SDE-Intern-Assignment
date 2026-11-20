import "./MatchesView.css";

function MatchesView({ matches = [] }) {
  if (matches.length === 0) {
    return (
      <div className="matches-empty">
        <h2>No matches yet ❤️</h2>
        <p>Keep discovering to find your match!</p>
      </div>
    );
  }

  return (
    <div className="matches-container">
      <h2>Your Matches ❤️</h2>

      <div className="matches-grid">
        {matches.map((profile) => (
          <div className="match-card" key={profile.id}>
            <img
              src={profile.photo}
              alt={profile.name}
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/300x300?text=Profile";
              }}
            />

            <div className="match-card-info">
              <h3>
                {profile.name}, {profile.age}
              </h3>
              <p>{profile.city}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MatchesView;
