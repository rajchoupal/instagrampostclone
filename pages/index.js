import React from 'react';
import Post from '../components/Post';

class Index extends React.Component {
  state = {
    image: null,
  };

  handleImageChange = (e) => {
    this.setState({ image: URL.createObjectURL(e.target.files[0]) });
  };

  render() {
    return (
      <div>
        <input type="file" onChange={this.handleImageChange} />
        {this.state.image && <Post image={this.state.image} />}
      </div>
    );
  }
}

export default Index;
