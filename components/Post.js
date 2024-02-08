import React from 'react';
import axios from 'axios';
import { Button, TextField } from '@material-ui/core';
import { io } from 'socket.io-client';

const socket = io();

class Post extends React.Component {
  state = {
    description: '',
  };

  handleDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
  };

  handleSubmit = async () => {
    const formData = new FormData();
    formData.append('image', this.props.image);
    formData.append('description', this.state.description);

    try {
      await axios.post('/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      this.setState({ description: '' });
      socket.emit('like');
      socket.emit('comment', 'New comment');
    } catch (error) {
      console.error('Error posting image: ', error);
    }
  };

  render() {
    return (
      <div>
        <img src={this.props.image} alt="Uploaded" />
        <TextField
          label="Description"
          value={this.state.description}
          onChange={this.handleDescriptionChange}
        />
        <Button onClick={this.handleSubmit}>Post</Button>
      </div>
    );
  }
}

export default Post;