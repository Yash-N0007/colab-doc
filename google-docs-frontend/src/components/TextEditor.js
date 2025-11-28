import Quill from "quill";
import "quill/dist/quill.snow.css";
import React, { useEffect, useRef, useState } from "react";
import socket from "../socket";

const SAVE_INTERVAL_MS = 2000;

const TextEditor = () => {
  const wrapperRef = useRef(null);
  const [quill, setQuill] = useState(null);
  const [users, setUsers] = useState([]);
  const [showSaved, setShowSaved] = useState(false);

  // Setup Quill editor
  useEffect(() => {
    if (!wrapperRef.current) return;

    const editorContainer = document.createElement("div");
    wrapperRef.current.innerHTML = "";
    wrapperRef.current.append(editorContainer);

    const q = new Quill(editorContainer, {
      theme: "snow",
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline"],
          ["code-block", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link"],
          ["clean"],
        ],
      },
    });

    q.disable();
    q.setText("Loading document...");
    setQuill(q);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      wrapperRef.current.innerHTML = "";
    };
  }, []);

  // Socket & sync logic
  useEffect(() => {
    if (!quill) return;

    socket.emit("get-document");

    socket.once("load-document", (document) => {
      quill.setContents(document);
      quill.enable();
    });

    socket.on("update-users", (userList) => {
      setUsers(userList);
    });

    const handleReceive = (delta) => {
      quill.updateContents(delta);
    };

    const handleChange = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };

    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents());
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 1200);
    }, SAVE_INTERVAL_MS);

    socket.on("receive-changes", handleReceive);
    quill.on("text-change", handleChange);

    return () => {
      clearInterval(interval);
      socket.off("receive-changes", handleReceive);
      socket.off("update-users");
      quill.off("text-change", handleChange);
    };
  }, [quill]);

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#f3f3f3",
        padding: "40px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1000px",
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          padding: "20px",
          position: "relative",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "10px" }}>
          <h2 style={{ margin: 0 }}>CollabDoc 📝</h2>
          <div style={{ fontSize: "14px", color: "#666" }}>
            {users.length} Collaborator{users.length !== 1 && "s"}
          </div>

          {/* User bubbles */}
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: 5 }}>
            {users.map((id, i) => (
              <div
                key={id}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "#3498db",
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                U{i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Editor */}
        <div ref={wrapperRef} style={{ height: "70vh" }} />

        {/* Save Floating Message */}
        {showSaved && (
          <div
            style={{
              position: "fixed",
              bottom: "25px",
              right: "30px",
              backgroundColor: "#4caf50",
              color: "#fff",
              padding: "10px 16px",
              borderRadius: "40px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
              display: "flex",
              alignItems: "center",
              fontWeight: "500",
              transition: "all 0.3s ease-in-out",
              zIndex: 1000,
            }}
          >
            💾 Document saved
          </div>
        )}
      </div>
    </div>
  );
};

export default TextEditor;