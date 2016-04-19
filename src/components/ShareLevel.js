import { PropTypes } from 'react';

const ShareLevel = (props) => {
  let levelUrl = location.href;
  let twitterLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(levelUrl)}&hashtags=reshapybius,ld35&text=I challenge you to beat this level!`;
  return (
    <div id="share-level">
      <h1>CUSTOM LEVEL COMPLETED</h1>

      <hr />
      <h3 className="label">Share link:</h3>

      <input type="text" value={levelUrl} readOnly autoFocus className="copy-url" onFocus={(e) => e.target.select()}/>

      <h3>or</h3>

      <a href={twitterLink} target="_blank">Share on twitter</a>

      <h3>or</h3>

      <a onClick={() => props.onClose()}>Play Again</a>
    </div>
  );
};

ShareLevel.propTypes = {
  levelData: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
};

export default ShareLevel;
