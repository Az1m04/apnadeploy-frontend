import styled from "@emotion/styled";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import io from "socket.io-client";
import axios from "axios";

const SubmissionPage = () => {
  const [repoLink, setRepoLink] = useState("");
  const [error, setError] = useState("");
  const [logs, setLogs] = useState("");
  const [status, setStatus] = useState({
    projectSlug: "",
    url: "",
    status: "idle",
  });
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:9001", {
      transports: ["websocket"], // Specify WebSocket as the transport
    });
    setSocket(newSocket);

    newSocket.on("message", (data) => {
      console.log("Received response:", data);
      setLogs((prev) => [...prev, data]);
      setStatus((prev) => ({ ...prev, status: "Running" }));
      const newData = JSON.parse(data);
      if (newData.log === "Done") {
        setStatus((prev) => ({ ...prev, status: "Done" }));
        newSocket.emit("taskEnded", "taskEnded");
      }
    });

    return () => {
      // Disconnect the socket when the component unmounts
      newSocket.disconnect();
    };
  }, []);

  document.title = "Submit Your Repo - Apna Deploy";

  const handleChange = (event) => {
    setRepoLink(event.target.value);
  };

  const handleSubmit = async () => {
    console.log(repoLink);
    const githubRepoRegex = /^https:\/\/github\.com\/[^\/]+\/[^\/]+$/;
    if (!githubRepoRegex.test(repoLink)) {
      setError("Invalid! GitHub repo link.");
    }
    try {
      const res = await axios.post("http://localhost:9000/deploy", {
        gitUrl: repoLink,
      });
      if (res.data.data) {
        setStatus({
          projectSlug: res.data.data.projectSlug,
          url: res.data.data.url,
          status: res.data.status,
        });
        socket.emit("subscribe", `logs:${res.data.data.projectSlug}`);
      }
    } catch (e) {
      setStatus({
        projectSlug: "",
        url: "",
        status: "error",
      });
    }
  };
  const Styled = useMemo(
    () => styled.div`
      display: flex;
      width: 100%;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
      gap: 12px;
      @media (max-width: 768px) {
        padding: 10px;
      }
      .error-text {
        margin: 4px 2px;
        color: red;
        font-size: 12px;
        text-align: center;
      }
    `,
    [error]
  );
  return (
    <Styled>
      <div
        className="label"
        style={{ textTransform: "uppercase", color: "#eee" }}
      >
        GitHub Repo Link:
      </div>
      <div style={{ width: "50%", marginBottom: "3rem" }}>
        <Input
          type="text"
          value={repoLink}
          onChange={handleChange}
          placeholder="https://github.com/username/repo"
        />
        {error && <div className="error-text">{error}</div>}
      </div>
      {status.url === "" && <Button onClick={handleSubmit} text={"Submit"} />}
      {status.status === "Done" && (
        <Link to={"/deploy"}>
          <Button text={"Deploy Another"} />
        </Link>
      )}
      {status.url !== "" && (
        <div style={{ width: "100%" }}>
          <div
            className="title"
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "98%",
              padding: "10px",
            }}
          >
            <div style={{ color: "#eee" }}>
              Showing logs for :{" "}
              <Link to={status.url} style={{ color: "#eee" }}> {status.projectSlug}</Link>
            </div>
            <div style={{ color: "#eee" }}>
              Status :{" "}
              <span style={{ textTransform: "uppercase" }}>
                {status.status}
              </span>
            </div>
          </div>
          <div className="log-container">
            {logs.length > 0 &&
              logs?.map((log, index) => (
                <div key={index} className="log-line">
                  {log}
                </div>
              ))}
          </div>
        </div>
      )}
    </Styled>
  );
};

export default SubmissionPage;
