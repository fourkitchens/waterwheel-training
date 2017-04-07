import React, { PropTypes } from 'react'
import '../css/LikeButton.css';

const thumbsUp = ['👍🏽','👍🏾','👍🏿','👍','👍🏻','👍🏼']

const LikeButton = ({ numLikes, id, handleClick }) => (
  <div className="like">
    <div className="numLikes">
      {numLikes}
    </div>            
    <button className="likeTodo" onClick={handleClick}>{thumbsUp[numLikes % thumbsUp.length]}</button>
  </div>
);

LikeButton.propTypes = {
  numLikes: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired
}

export default LikeButton
