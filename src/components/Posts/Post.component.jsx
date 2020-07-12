import React from "react";
import "./Posts.scss";
import Card from "react-bootstrap/Card";

const Post = ({ id, title, url, points, user, date, comments }) => {
  return (
    <Card
      style={{
        width: "80%",
        margin: "auto",
        color: "whitesmoke",
        backgroundColor: "#333333",
      }}
    >
      <Card.Body>
        <Card.Link href={url} target="_blank">
          <Card.Title className="newsTitle" style={{}}>
            {title}
          </Card.Title>
        </Card.Link>

        <Card.Subtitle
          className="mb-2 text-muted"
          style={{ paddingTop: "5px" }}
        >
          by {user}
        </Card.Subtitle>
        <Card.Text className="text-muted">
          Comments : {comments ? comments.length : 0} | Points : {points} |
          Created At : {date}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Post;
