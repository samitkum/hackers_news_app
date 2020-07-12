import React from "react";
import "./Posts.scss";
import Card from "react-bootstrap/Card";
import { motion } from "framer-motion";
const Post = ({ id, title, url, points, user, date, comments }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      style={{
        width: "80%",
        margin: "auto",
        color: "whitesmoke",
        backgroundColor: "#333333",
      }}
    >
      <Card style={{ backgroundColor: "#333333", color: "whitesmoke" }}>
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
    </motion.div>
  );
};

export default Post;
