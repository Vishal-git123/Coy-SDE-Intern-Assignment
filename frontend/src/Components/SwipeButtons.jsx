import "./SwipeButtons.css";

function SwipeButtons({ onLike, onPass }) {
  
  return (
    <div className="swipe-buttons">
      <button onClick={onPass} className="pass-btn">
        ✕ Pass
      </button>

      <button onClick={onLike} className="like-btn">
        ♥ Like
      </button>
    </div>
  );
}

export default SwipeButtons;
