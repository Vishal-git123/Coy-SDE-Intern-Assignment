import "./ProfileCard.css";

function ProfileCard({ profile }) {
  if (!profile) return null;

  return (
    <div className="profile-card">
      {/* Profile Image */}
      <div className="profile-image">
        <img
          src={profile.photo}
          alt={profile.name}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "https://placehold.co/400x500?text=Profile";
          }}
        />

        {/* Name, Age and City */}
        <div className="profile-info">
          <h2>
            {profile.name}, {profile.age}
          </h2>

          <p>📍 {profile.city}</p>
        </div>
      </div>

      {/* Profile Details */}
      <div className="profile-details">
        <p className="profile-bio">{profile.bio}</p>

        {/* Interests */}
        <h4>Interests</h4>

        <div className="interests">
          {profile.interests?.map((interest, index) => (
            <span
              key={`${profile.id}-${interest}-${index}`}
              className="interest-tag"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
