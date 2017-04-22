import React, { PropTypes, Component } from 'react'

const THUMBS = ['👍🏽','👍🏾','👍🏿','👍','👍🏻','👍🏼']


class LikeButton extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    numLikes: PropTypes.number.isRequired,
    likable: PropTypes.bool.isRequired,
    handleClick: PropTypes.func.isRequired,
  }
  
  state = {
    thumbsUp: '👍',
  }

  componentDidMount() {
    // Every second, get a value from the array of thumbs an set the state.
    this.timerId = setInterval(() => {
      this.setState((prevState) => ({
        thumbsUp: THUMBS[new Date().getSeconds() % THUMBS.length]
      }))
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  render() {
    const { numLikes, id, likable, handleClick } = this.props;
    return (
      <div className="like">
        <div className="numLikes">
          {numLikes}
        </div>
          <button className="likeTodo"
            onClick={() => handleClick(id)}
            disabled={!likable}>{this.state.thumbsUp}</button>
      </div>
    )
  }
}

export default LikeButton
