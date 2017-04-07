import React, { PropTypes, Component } from 'react'

const thumbsUp = ['👍🏽','👍🏾','👍🏿','👍','👍🏻','👍🏼']

class LikeButton extends Component {
  static propTypes = {
    numLikes: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.timerId = setInterval(() => this.forceUpdate(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  render() {
    const { numLikes, handleClick } = this.props;
    return (
      <div className="like">
        <div className="numLikes">
          {numLikes}
        </div>            
        <button className="likeTodo" onClick={handleClick}>{thumbsUp[new Date().getSeconds() % thumbsUp.length]}</button>
      </div>
    )
  }
}

export default LikeButton
