import React from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io();

class PostPage extends React.Component {
  state = {
    likes: 0,
    comments: [],
  };

  componentDidMount() {
    socket.on('initialData', ({ likes, comments }) => {
      this.setState({ likes, comments });
    });

    socket.on('updateLikes', (likes) => {
      this.setState({ likes });
    });

    socket.on('updateComments', (comments) => {
      this.setState({ comments });
    });
  }

  handleLike = () => {
    socket.emit('like');
  };

  handleComment = () => {
    socket.emit('comment', 'New comment');
  };

  render() {
    return (
      <div>
        <h1>Post Page</h1>
        <p>Likes: {this.state.likes}</p>
        <button onClick={this.handleLike}>Like</button>
        <h3>Comments</h3>
        {this.state.comments.map((comment, index) => (
          <p key={index}>{comment}</p>
        ))}
        <button onClick={this.handleComment}>Add Comment</button>
      </div>
    );
  }
}

export default PostPage;