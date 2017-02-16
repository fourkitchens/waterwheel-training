import React, { PropTypes } from 'react'

const LikeButton = ({ numLikes, id/*, handleClick*/ }) => (
  <div className="like">
    <div className="numLikes">
      {numLikes}
    </div>            
    <button className="likeTodo" onClick={()=> alert(`Clicked todo #${id}`)}>👍🏾</button>
  </div>
);

LikeButton.propTypes = {
  numLikes: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  // handleClick: PropTypes.func.isRequired
}

export default LikeButton

