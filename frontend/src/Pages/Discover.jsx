import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

import ProfileCard from "../Components/ProfileCard.jsx";
import SwipeButtons from "../Components/SwipeButtons.jsx";
import MatchModal from "../Components/MatchModal.jsx";
import MatchesView from "../Components/MatchesView.jsx";

import "./Discover.css";

const API_URL = "http://localhost:5000/api";

function Discover() {
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [showMatch, setShowMatch] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState(null);

  const [matches, setMatches] = useState([]);
  const [activeView, setActiveView] = useState("discover");

  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");

  const x = useMotionValue(0);

  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const likeOpacity = useTransform(x, [20, 120], [0, 1]);
  const passOpacity = useTransform(x, [-120, -20], [1, 0]);

  // Fetch feed and existing matches
  useEffect(() => {
    async function loadData() {
      try {
        const [feedResponse, matchesResponse] = await Promise.all([
          fetch(`${API_URL}/feed`),
          fetch(`${API_URL}/matches`),
        ]);

        if (!feedResponse.ok || !matchesResponse.ok) {
          throw new Error("Failed to load data from backend");
        }

        const feedData = await feedResponse.json();
        const matchesData = await matchesResponse.json();

        setProfiles(feedData.profiles || []);
        setMatches(matchesData.matches || []);
      } catch (err) {
        console.error("API Error:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  const currentProfile = profiles[currentIndex];

  // Save swipe in MongoDB
  async function handleSwipe(direction) {
    if (!currentProfile || isAnimating || showMatch) return;

    setIsAnimating(true);
    setActionError("");

    const swipedProfile = currentProfile;
    const action = direction === 1 ? "like" : "pass";

    try {
      const response = await fetch(`${API_URL}/swipe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profileId: swipedProfile.id,
          action,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save swipe");
      }

      // Animate card after backend successfully saves swipe
      animate(x, direction * 500, {
        duration: 0.3,

        onComplete: () => {
          setCurrentIndex((prev) => prev + 1);
          x.set(0);
          setIsAnimating(false);

          // Show match only when backend confirms mutual like
          if (data.isMatch) {
            setMatchedProfile(data.profile || swipedProfile);
            setShowMatch(true);
          }
        },
      });

      // Refresh matches from backend
      const matchesResponse = await fetch(`${API_URL}/matches`);

      if (matchesResponse.ok) {
        const matchesData = await matchesResponse.json();
        setMatches(matchesData.matches || []);
      }
    } catch (err) {
      console.error("Swipe Error:", err);
      setActionError(err.message);
      setIsAnimating(false);
    }
  }

  function handleDragEnd() {
    if (isAnimating || showMatch) return;

    if (x.get() > 100) {
      handleSwipe(1);
    } else if (x.get() < -100) {
      handleSwipe(-1);
    } else {
      animate(x, 0, { duration: 0.2 });
    }
  }

  if (isLoading) {
    return <div className="empty-state">Loading profiles...</div>;
  }

  if (error) {
    return <div className="empty-state">Error: {error}</div>;
  }

  return (
    <div className="discover-container">
      <div className="discover-tabs">
        <button
          className={activeView === "discover" ? "active" : ""}
          onClick={() => setActiveView("discover")}
        >
          Discover
        </button>

        <button
          className={activeView === "matches" ? "active" : ""}
          onClick={() => setActiveView("matches")}
        >
          Matches ({matches.length})
        </button>
      </div>

      {activeView === "discover" ? (
        <>
          {actionError && <p className="empty-state">Error: {actionError}</p>}

          {currentProfile ? (
            <>
              <motion.div
                className="swipe-card"
                style={{ x, rotate }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
              >
                <motion.div
                  className="swipe-indicator like-indicator"
                  style={{ opacity: likeOpacity }}
                >
                  LIKE
                </motion.div>

                <motion.div
                  className="swipe-indicator pass-indicator"
                  style={{ opacity: passOpacity }}
                >
                  PASS
                </motion.div>

                <ProfileCard profile={currentProfile} />
              </motion.div>

              <SwipeButtons
                onLike={() => handleSwipe(1)}
                onPass={() => handleSwipe(-1)}
              />
            </>
          ) : (
            <div className="empty-state">
              <h2>No more profiles available!</h2>
              <p>You've viewed all available profiles.</p>
            </div>
          )}
        </>
      ) : (
        <MatchesView matches={matches} />
      )}

      {showMatch && (
        <MatchModal
          profile={matchedProfile}
          onClose={() => setShowMatch(false)}
        />
      )}
    </div>
  );
}

export default Discover;
