import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import useFetech from "../components/useFetech";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link } from "react-router-dom";
import Notfound from "./Notfound";

import swal from "sweetalert";

import {
  AiFillPlusCircle,
  AiTwotoneEdit,
  AiFillDelete,
  AiOutlineOrderedList,
  AiOutlineUndo,
} from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";

const Clients = () => {
  useEffect(() => {
    document.title = "Clients";
  });

  const handleDeleteNumber = (id) => {};
  const handleStatus = (id) => {};

  const endpoint = process.env.REACT_APP_API_ENDPOINT;
  const controller = new AbortController();

  const [page, setPage] = useState(
    localStorage.getItem("page") ? localStorage.getItem("page") : 1
  );

  const { preloader, data, isError, error, isFetching, refetch } = useFetech({
    key: ["clients", page],
    url: endpoint + "clients",
    page: page,
  });

  if (data?.data?.pages < page) {
    setPage(data?.data?.pages);
    localStorage.setItem("page", data?.data?.pages);
  }

  if (data?.data?.result?.length == 0) {
    return (
      <>
        <Notfound />
      </>
    );
  }

  return (
    <>
      <div className="container">
        <Row>
          <Col className="fw-bold fs-3">Clients</Col>
        </Row>

        {isFetching && !data ? (
          <Skeleton count={1} className="mt-3" height={500} />
        ) : (
          <Card className="mt-3">
            {data?.data?.result?.map((todo) => {
              return (
                <div key={todo.id} className="row p-3 the-shadow">
                  <div className="col-6 fw-bold fs-4">{todo.name}</div>
                  <div className="col-2">
                    <span className="badge bg-primary text-white">
                      {todo.tasks} tasks
                    </span>
                  </div>
                  <div className="col-4">
                    <Link to={"edit/" + todo.id}>
                      <span className="btn btn-primary">
                        <AiTwotoneEdit /> Edit
                      </span>
                    </Link>
                    <span
                      className="btn btn-danger ms-2"
                      onClick={(n, e) => handleDeleteNumber(todo.name, todo.id)}
                    >
                      <AiFillDelete /> Delete
                    </span>

                    <Link to={"tasks/" + todo.id}>
                      <button
                        className="ms-2 btn btn-primary"
                        onClick={(n, e) => handleStatus(0, todo.id)}
                      >
                        <AiOutlineOrderedList /> See All Tasks
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </Card>
        )}
      </div>
    </>
  );
};

export default Clients;
