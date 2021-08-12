import "react-quill/dist/quill.snow.css";
import { Container, Form, Button } from "react-bootstrap";
import "./styles.css";
import { useState } from "react";
import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const NewBlogPost = () => {
  const [post, setPost] = useState({});
  const [imgToSend, setImgToSend] = useState('');

  const handleChange = (level, e) => {
    if (!level) {
      setPost({
        ...post,
        [e.target.name]: e.target.value,
      });
    } else if (level === "content") {
      setPost({
        ...post,
        [level]: e.getData(),
      });
    } else {
      setPost({
        ...post,
        [level]: {
          ...post[level],
          [e.target.name]: e.target.value,
        },
      });
    }
  };

  const path = "img/postimg/"

  const imageHandler = (e) => {
        let postImage = new FormData()
        postImage.append('post', e.target.files[0])
        setImgToSend(postImage)
        console.log(e)
        setPost({
          ...post,
          cover: path + e.target.files[0].name,
        })
      };

      const avatarHandler = (e) => {
        let postImage = new FormData()
        postImage.append('post', e.target.files[0])
        setImgToSend(postImage)
        console.log(e)
        setPost({
          ...post,
          avatar: path + e.target.files[0].name,
        })
      };

  const sendData = async () => {
    let response = await fetch("http://localhost:3005/authors/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
    let data = await response.json();
    let id = data.id
    if (imgToSend){
      sendImage(id)
    }
  };

  const sendImage = async (id) => {
    console.log(imgToSend)
    try {
      let response = await fetch("http://localhost:3005/files/addimg",
        {
          method: "POST",
          body: imgToSend
        }
      );
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  return (
    <Container className="new-blog-container">
      <Form className="mt-5">
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Title"
            name="title"
            onChange={(e) => handleChange("", e)}
          />
        </Form.Group>
        <Form.Group controlId="blog-category" className="my-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Category"
            name="category"
            onChange={(e) => handleChange("", e)}
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
                  <input type="file" name="arquivo" id="arquivo" onChange={imageHandler}/>
                 
                </span>
        {/* <Form.Group controlId="blog-cover" className="mt-3">
          <Form.Label>Cover Link</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Cover"
            name="cover"
            onChange={(e) => handleChange("", e)}
          />
        </Form.Group> */}
        <Form.Group controlId="blog-value" className="mt-3">
          <Form.Label>Read</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Read"
            name="value"
            onChange={(e) => handleChange("readTime", e)}
          />
        </Form.Group>
        <Form.Group controlId="blog-time" className="mt-3">
          <Form.Label>Time</Form.Label>
          <Form.Control
            size="lg"
            as="select"
            name="unit"
            onChange={(e) => handleChange("readTime", e)}
          >
            <option>Seconds</option>
            <option>Minutes</option>
            <option>Hour</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Blog Content</Form.Label>
          <CKEditor
            editor={ClassicEditor}
            onChange={(e, editor) => handleChange("content", editor)}
          />
        </Form.Group>
        <Form.Group controlId="blog-author" className="my-3">
          <Form.Label>Author</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Author"
            name="name"
            onChange={(e) => handleChange("author", e)}
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
                  <input type="file" name="arquivo" id="arquivo" onChange={avatarHandler}/>
                 
                </span>
        {/* <Form.Group controlId="blog-avatar" className="mt-3">
          <Form.Label>Avatar</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Avatar"
            name="avatar"
            onChange={(e) => handleChange("author", e)}
          />
        </Form.Group> */}
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
