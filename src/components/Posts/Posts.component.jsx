import React from "react";
import Post from "./Post.component";

import "./Posts.scss";

class Posts extends React.Component {
  render() {
    return this.props.posts.map((post) => {
      if (
        (post.title || "")
          .toLowerCase()
          .indexOf(this.props.searchTerm.toLowerCase()) > -1 &&
        this.props.searchTerm.length
      ) {
        return (
          <div style={{ padding: "5px 20px" }}>
            <Post
              key={post.id}
              id={post.id}
              title={<mark>{post.title}</mark>}
              url={post.url}
              points={post.points}
              user={post.user}
              date={post.date}
              comments={post.comments}
            />
          </div>
        );
      }
      if (!this.props.searchTerm.length) {
        return (
          <div style={{ padding: "5px 20px" }}>
            <Post
              key={post.id}
              id={post.id}
              title={post.title}
              url={post.url}
              points={post.points}
              user={post.user}
              date={post.date}
              comments={post.comments}
            />
          </div>
        );
      }
      return null;
    });
  }
}

export default Posts;
