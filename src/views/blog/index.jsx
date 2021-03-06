import React from "react";
import { useState, useEffect } from "react";
import {
  Container,
  Image,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
  Form,
} from "react-bootstrap";
import { withRouter } from "react-router";
import BlogAuthor from "../../components/blog/blog-author";
import "./styles.css";

const Blog = (props) => {
  const [post, setPost] = useState();
  // const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState({});
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  console.log(review);

  const { id } = props.match.params;


  const addtoCart =async ()=>{
    const carts= [{productId: id, qty: 1}]
    localStorage.setItem('cart_item', carts);
    const result= await fetch("https://strivestudent.herokuapp.com/carts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(carts),
      });
      if(result){
        console.log(result)
      }
  }
  // const getPDF = async () => {
  //   const { id } = props.match.params;
  //  const response = await fetch("https://strivestudent.herokuapp.com/products/pdf/" + id, {
  //     method: "GET",
  //   })
  //   if(response.ok){
  //     window.open(`https://strivestudent.herokuapp.com/products/pdf/${id}`,'_blank');
  //   }
  // };

  const fetchProducts = async () => {
    const { id } = props.match.params;
    let response = await fetch("https://strivestudent.herokuapp.com/products/" + id, {
      method: "GET",
    });
    let data = await response.json();
    if (response.ok) {
      setPost(data);
      setLoading(false);
    } else {
      props.history.push("/404");
    }
  };

  // const fetchReviews = async () => {
  //   const { id } = props.match.params;
  //   let response = await fetch("https://strivestudent.herokuapp.com/reviews/product/" + id, {
  //     method: "GET",
  //   });
  //   let data = await response.json();
  //   if (response.ok) {
  //     setReviews(data);
  //     setLoading(false);
  //   } else {
  //     props.history.push("/404");
  //   }
  // };

  const postReview = async (e) => {
    e.preventDefault();
    if (review.rate && review.comment) {
      const { id } = props.match.params;
      await fetch("https://strivestudent.herokuapp.com/reviews/" + id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
      });
      e.target.reset();
      fetchProducts();
      setError(false)
    } else {
      setError("Comment and rate is required!")
    }
  };

  const handleReview = (key, e) => {
    setReview({
      ...review,
      [key]: e.target.value,
    });
  };

  useEffect(() => {
    fetchProducts();
    fetchProducts();
  }, []);

  // state = {
  //   blog: {},
  //   loading: true,
  // };
  // componentDidMount() {
  //   const { id } = this.props.match.params;
  //   console.log(posts);
  //   const blog = posts.find((post) => post._id.toString() === id);
  //   if (blog) {
  //     this.setState({ blog, loading: false });
  //   } else {
  //     this.props.history.push("/404");
  //   }
  // }

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="blog-details-root" style={{ marginTop: "150px" }}>
        {post&& <Container>
          <Row>
            <Col className="d-flex">
              <div>
                <Image
                  className="blog-details-cover text-center"
                  src={post.imageUrl}
                  fluid
                />
              </div>
              <div style={{ marginLeft: "50px" }}>
                <h1 className="blog-details-title">{post.name}</h1>

                <div className="blog-details-container">
                  <div className="blog-details-author">
                    <BlogAuthor {...post} />
                    <Button onClick={addtoCart} className="blog-navbar-add-button bg-dark" size="lg">
                    Add to Cart
                    </Button>
                    <div
                      className="border-top pt-3 mt-3"
                      dangerouslySetInnerHTML={{ __html: post.description }}
                    ></div>
                  </div>
                  <div className="blog-details-info">
                    {/* <div>{post.createdAt}</div>
                    <div>{`${post.price} ${post.brand} read`}</div> */}
                  </div>
                </div>
              </div>
              <div className="mt-5" style={{ paddingLeft: "50px" }}>
                <h3>Comments</h3>
                {post.comments.map((review) => (
                  <ListGroup key={review._id}>
                    <ListGroupItem>{review.comment}</ListGroupItem>
                  </ListGroup>
                ))}
                <Form onSubmit={postReview}>
                  <textarea
                    rows="3"
                    className="my-3"
                    onChange={(e) => handleReview("comment", e)}
                  />
                  <p className="mb-0">
                    <label htmlFor="rate">Rate</label>
                    <select
                      name="rate"
                      id="rate"
                      onChange={(e) => handleReview("rate", e)}
                    >
                      <option>Let your opinion!</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </p>
                  {error && <p style={{color: "red"}}>{error}</p>}
                  <p>
                    <Button variant="primary" type="submit">
                      Send
                    </Button>
                    <a href={`https://strivestudent.herokuapp.com/products/pdf/${id}`}>
                      <Button variant="primary" style={{marginLeft: "20px"}} >
                        Create a PDF
                      </Button>
                    </a>
                  </p>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>}
      </div>
    );
  }
};

export default withRouter(Blog);
