import React, { PropTypes } from 'react'
import '../css/LikeButton.css';

const LikeButton = ({ numLikes, id }) => (
  <div className="like">
    <div className="numLikes">
      {numLikes}
    </div>            
    <button className="likeTodo" onClick={()=>alert(`Clicked todo #${id}`)}>👍🏾</button>
  </div>
);

LikeButton.propTypes = {
  numLikes: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired, 
}

export default LikeButton

