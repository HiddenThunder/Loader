import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import './App.css';
import './Icon.css';

const Icon = ({ local, handleCopy, handleDelete }) => {
  return (
    <li key={local.cid}>
      <span>{local.name}</span>
      <div>
        <p>{local.cid}</p>
        <button
          type="button"
          onClick={() => handleCopy(local.cid)}
          className="copy"
        >
          Copy CID
        </button>
        <ToastContainer />
      </div>

      <button
        type="button"
        onClick={() => handleDelete(`/${local.name}`, local.cid)}
        className="remove"
      >
        Remove
      </button>
    </li>
  );
};

export default Icon;
