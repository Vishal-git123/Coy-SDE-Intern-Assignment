import "./MatchModal.css";

function MatchModal({ profile, onClose }) {
  if (!profile) return null;

  return (
    <div className="match-overlay" onClick={onClose}>
      <div className="match-modal" onClick={(e) => e.stopPropagation()}>
        <h1>It's a Match! ❤️</h1>

        <p>You and {profile.name} liked each other.</p>

        <img src={profile.photo} alt={profile.name} className="match-photo" />

        <h2>
          {profile.name}, {profile.age}
        </h2>

        <button onClick={onClose}>Continue Discovering</button>
      </div>
    </div>
  );
}

export default MatchModal;
