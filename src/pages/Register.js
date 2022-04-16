import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Row, Col, Image, Card, Spinner } from "react-bootstrap";
import happy from "../images/happy.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Register = () => {
  const [disabled, setDisabled] = useState(false);
  const [button, setButton] = useState("Register");
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [fetching, setFetching] = useState(false);
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [tos, setTos] = useState(false);

  const controller = new AbortController();

  const endpoint = process.env.REACT_APP_API_ENDPOINT;

  const handleName = (e) => {
    const name_value = e.target.value;
    setName(name_value);
  };

  const handleEmail = (e) => {
    const email_value = e.target.value;
    setEmail(email_value);
  };

  const handlePassword = (e) => {
    const password_value = e.target.value;
    setPassword(password_value);
  };

  const handlepassword_confirmation = (e) => {
    const password_confirmation_value = e.target.value;
    setPassword_confirmation(password_confirmation_value);
  };

  const handleCheckbox = (e) => {
    const theCheckbox = e.target.value;
    setTos(theCheckbox);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setFetching(true);

    if (name == "") {
      toast.error("Name cannot be empty");
    } else if (email == "") {
      toast.error("email or phone number cannot be empty");
    } else if (password.length < 8) {
      toast.error("password should minimum 8 characters.");
    } else if (password !== password_confirmation) {
      toast.error("password didn't matched with retype password");
    } else if (tos == "") {
      toast.error(
        "You have to agree with terms and conditions for register a new account."
      );
    } else {
      if (fetching) {
        setDisabled(true);
        setButton(
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        );
      }

      // refetch();

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      let method = "post";
      let payload = { name, email, password, password_confirmation };
      let url = endpoint + "register";
      let basicConig = { method: method, url: url, data: payload };
      Object.assign(config, basicConig);

      // console.log(config);

      const request = axios(config)
        .catch((err) => {
          console.log(err);
          toast.error(err.message);
          controller.abort(err);
        })
        .then((data) => {
          if (data) {
            if (data.data.message) {
              toast.error(data.data.message);
            } else {
              // console.log(data.data.token);
              // const token = data.data.token;
              // const uid = data.data.user.id;
              // const name = data.data.user.name;
              // const role = data.data.user.role;

              toast.success("Registerd successfully!");

              // if (tos) {
              //   const futureDate = new Date();
              //   futureDate.setDate(futureDate.getDate() + 30);
              // } else {
              // 1 minute for check purposne
              // var minutesToAdd = 60;
              // var currentDate = new Date();
              // var futureDate = new Date(
              //   currentDate.getTime() + minutesToAdd * 60000
              // );

              // localStorage.setItem("logged", true);
              // localStorage.setItem("uid", uid);
              // localStorage.setItem("name", name);
              // localStorage.setItem("role", role);
              // localStorage.setItem("token", token);
              // localStorage.setItem("session_time", futureDate);

              navigate("/login/");
            }
          }
        });

      setDisabled(false);
      setButton("Register");
    }
  };

  useEffect(() => {
    if (
      localStorage.getItem("logged") &&
      localStorage.getItem("logged") !== null
    ) {
      navigate("/client-management/");
    }

    document.title = "Register";
  });

  return (
    <>
      <ToastContainer />
      <main className="mt-3 pt-3">
        <div className="container">
          <Row className="mt-2 mb-5">
            <Col md={6} className="mt-5 d-xs-none">
              <Image className="happy-login mt-5" src={happy} />
            </Col>
            <Col md={6}>
              <Card className="p-2 p-md-3 pb-3 mt-3 auth-form">
                <h3 className="text-center fw-bold text-brand fs-1">
                  Register
                </h3>
                <p className="text-center text-muted">
                  Plese fill in your information to create a new account.
                </p>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Input name"
                      required={true}
                      name="name"
                      onKeyUp={handleName}
                      defaultValue={name}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email or Phone</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Input email or phone number"
                      required={true}
                      name="email"
                      onKeyUp={handleEmail}
                      defaultValue={email}
                    />
                  </Form.Group>

                  <Form.Group
                    className="ms-0 mb-3"
                    controlId="formBasicPassword"
                  >
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Input your password"
                      required={true}
                      name="password"
                      onKeyUp={handlePassword}
                      defaultValue={password}
                    />
                  </Form.Group>

                  <Form.Group
                    className="ms-0 mb-3"
                    controlId="formBasicRePassword"
                  >
                    <Form.Label>Retype Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Input password again"
                      required={true}
                      name="password_confirmation"
                      onKeyUp={handlepassword_confirmation}
                      defaultValue={password_confirmation}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check
                      type="checkbox"
                      label="I accept terms and conditions."
                      className="ms-2"
                      onChange={handleCheckbox}
                      defaultValue={tos}
                    />
                  </Form.Group>
                  <Button
                    variant="default w-100"
                    className="mt-2"
                    onClick={handleRegister}
                    type="submit"
                    disabled={disabled}
                  >
                    {button}
                  </Button>
                </Form>

                <div className="mt-4 text-center">
                  <p className="text-muted">
                    If you are already a member of us then please login here.
                  </p>
                  <Link to="/login/">Login Here</Link>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </main>
    </>
  );
};

export default Register;
