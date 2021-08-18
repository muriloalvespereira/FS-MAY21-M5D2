import "react-quill/dist/quill.snow.css";
import { Container, Form, Button } from "react-bootstrap";
import "./styles.css";
import { useState } from "react";
import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const NewBlogPost = () => {
  const [post, setPost] = useState({});
  const [imgToSend, setImgToSend] = useState("");

  const handleChange = (key, value) => {
    if (key !== "description") {
      setPost({
        ...post,
        [key]: value.target.value,
      });
    } else {
      setPost({
        ...post,
        [key]: value.getData(),
      });
    }
  };

  const path = "http://localhost:3005/img/";

  const imageHandler = (e) => {
    let postImage = new FormData();
    postImage.append("image", e.target.files[0]);
    setImgToSend(postImage);
    console.log(e);
    if (e.target.files[0] !== undefined ) {
      setPost({
        ...post,
        imageUrl: path + e.target.files[0].name,
      });
    }
  };

  const sendData = async () => {
    let response = await fetch("https://strivestudent.herokuapp.com/products/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
    let data = await response.json();
    let id = data.id;
    if (imgToSend) {
      sendImage(id);
    }
  };

  const sendImage = async (id) => {
    console.log(imgToSend);
    try {
      // eslint-disable-next-line
      let response = await fetch("https://strivestudent.herokuapp.com/products/addimg", {
        method: "POST",
        body: imgToSend,
      });
      let data = await response.json();
      console.log(data.message)
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  return (
    <Container className="new-blog-container" style={{marginTop: "120px"}}>
      <Form className="mt-5">
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Name"
            name="name"
            onChange={(e) => handleChange("name", e)}
          />
        </Form.Group>
        <Form.Group controlId="blog-category" className="my-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Category"
            name="category"
            onChange={(e) => handleChange("category", e)}
          />
        </Form.Group>
        <span className="mt-3">
          <label htmlFor="arquivo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              data-supported-dps="24x24"
              fill="currentColor"
              className="mercado-match"
              width="24"
              height="24"
              focusable="false"
            >
              <path d="M19 4H5a3 3 0 00-3 3v10a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3zm1 13a1 1 0 01-.29.71L16 14l-2 2-6-6-4 4V7a1 1 0 011-1h14a1 1 0 011 1zm-2-7a2 2 0 11-2-2 2 2 0 012 2z"></path>
            </svg>
          </label>
          <input
            type="file"
            name="arquivo"
            id="arquivo"
            onChange={imageHandler}
          />
        </span>
        <Form.Group controlId="blog-value" className="mt-3">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Brand"
            name="brand"
            onChange={(e) => handleChange("brand", e)}
          />
        </Form.Group>
        <Form.Group controlId="blog-time" className="mt-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Price"
            name="price"
            onChange={(e) => handleChange("price", e)}
          />
        </Form.Group>
        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Description</Form.Label>
          <CKEditor
            editor={ClassicEditor}
            onChange={(e, editor) => handleChange("description", editor)}
          />
        </Form.Group>

        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            type="button"
            size="lg"
            variant="dark"
            style={{ marginLeft: "1em" }}
            onClick={sendData}
          >
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};
export default NewBlogPost;
