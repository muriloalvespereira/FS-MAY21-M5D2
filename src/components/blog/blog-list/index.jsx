import React from "react";
import { Row, Col } from "react-bootstrap";
import BlogItem from "../blog-item";
import { useEffect } from "react";
import { useState } from "react";

const BlogList = () => {
   const[posts, setPosts] = useState([])

  const fetchProducts = async () => {
      let response = await fetch('https://strivestudent.herokuapp.com/products',
      {
        method: 'GET'
      })
      let data = await response.json()
      console.log(data)
      setPosts(data)

  }

  useEffect(() => {
     fetchProducts()
  }, [])

    return (
      <Row style={{marginTop: "100px"}}>
        {posts.map((post) => (
          <Col md={4} style={{ marginBottom: 50 }}>
            <BlogItem key={post.name} {...post} />
          </Col>
        ))}
      </Row>
    );
  
}

export default BlogList
