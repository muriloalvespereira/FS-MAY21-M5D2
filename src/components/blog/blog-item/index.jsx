import React, { Component } from "react";
import { Card } from "react-bootstrap";
import BlogAuthor from "../blog-author";
import { Link } from "react-router-dom";
import "./styles.css";
export default class BlogItem extends Component {
  render() {
    const { description, id, imageUrl } = this.props;
    return (
      <Link to={`/blog/${id}`} className="blog-link">
        <Card className="blog-card">
          <Card.Img variant="top" src={imageUrl} className="blog-cover" />
          <Card.Body>
            <Card.Title><div dangerouslySetInnerHTML={{ __html: description }} /></Card.Title>
          </Card.Body>
          <Card.Footer>
            <BlogAuthor {...this.props} />
          </Card.Footer>
        </Card>
      </Link>
    );
  }
}
