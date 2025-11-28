import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Dashboard() {
  const [docs, setDocs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const res = await axios.get('http://localhost:5000/all-docs');
      setDocs(res.data);
    } catch (err) {
      console.error("Error fetching documents:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this document?")) {
      await axios.delete(`http://localhost:5000/docs/${id}`);
      fetchDocuments();
    }
  };

  const handleCreate = async () => {
    const res = await axios.post('http://localhost:5000/create-new');
    navigate(`/docs/${res.data._id}`);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📄 All Documents</h2>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {docs.map(doc => (
          <li key={doc._id} style={{ marginBottom: '1rem' }}>
            <Link to={`/docs/${doc._id}`} style={{ marginRight: '1rem' }}>
              Document ID: {doc._id}
            </Link>
            <button onClick={() => handleDelete(doc._id)}>🗑️ Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={handleCreate}>➕ Create New Document</button>
    </div>
  );
}

export default Dashboard;