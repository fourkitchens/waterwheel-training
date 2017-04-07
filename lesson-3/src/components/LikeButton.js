import React, { PropTypes } from 'react'

const thumbsUp = ['👍🏽','👍🏾','👍🏿','👍','👍🏻','👍🏼']

const LikeButton = ({ userLiked, numLikes, handleClick, id }) => (
  <div className="like">
    <div className="numLikes">
      {numLikes}
    </div>            
    <button className="likeTodo" onClick={handleClick}>{thumbsUp[numLikes % thumbsUp.length]}</button>
  </div>
)

LikeButton.propTypes = {
  numLikes: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
}

export default LikeButton
