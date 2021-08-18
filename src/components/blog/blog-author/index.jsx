import React, { Component } from "react";
import { Row, Col, Image } from "react-bootstrap";
import "./styles.css";
export default class BlogAuthor extends Component {
  render() {
    const { imageUrl, name, price, brand } = this.props;
    return (
      <Row>
        <Col xs={2}>
          <Image className="blog-author" src={imageUrl} roundedCircle />
        </Col>
        <Col>
          <div>€ {price}</div>
          <h6>{name}  {brand}</h6>
        </Col>
      </Row>
    );
  }
}
