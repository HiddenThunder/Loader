import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import icon from '../../assets/logo.svg';
import Icon from './Icon';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const { ipc } = window.electron;

const Hello = () => {
  const [percents, setPercents] = useState('');
  const [locals, setLocals] = useState([]);

  const handleLocals = async () => {
    const result = ipc.sendSync('mfs-content');
    return result;
  };

  useEffect(() => {
    (async () => {
      const tmpLocals = await handleLocals();
      setLocals(tmpLocals);
    })();
  }, []);

  const handleFile = async () => {
    const result = ipc.sendSync('open-select-file-dialog');
    if (result === -1) {
      setPercents('Something went wrong. Try again');
      return;
    }
    setPercents('');
    const Locals = await handleLocals();
    setLocals(Locals);
  };

  const handleFolder = async () => {
    const result = ipc.sendSync('open-select-folder-dialog');
    if (result === -1) {
      setPercents('Something went wrong. Try again');
      return;
    }
    setPercents('');
    const Locals = await handleLocals();
    setLocals(Locals);
  };

  const handleDelete = async (path: string, cid: string) => {
    const res = ipc.sendSync('mfs-delete', path, cid);
    setLocals(res);
  };

  const handleCopy = async (cid: string) => {
    navigator.clipboard.writeText(cid);
    toast.success('Success', {
      position: 'bottom-right',
      autoClose: 1000,
    });
  };

  return (
    <div>
      <div className="Hello">
        <img width="200px" alt="icon" src={icon} />
      </div>
      <div className="Hello">
        <button type="button" onClick={handleFile}>
          Upload File
        </button>
        <button type="button" onClick={handleFolder}>
          Upload Folder
        </button>
      </div>

      {percents.length !== 0 ? (
        <h3 id="percents" className="Hello">
          {percents}
        </h3>
      ) : (
        <h3 id="percents" className="Hello">
          Select file or folder
        </h3>
      )}
      <h2 className="Hello">Local Files</h2>
      <div className="Hello">
        {locals.length ? (
          <ul>
            {locals.map((local) => {
              return (
                <Icon
                  key={local.cid}
                  local={local}
                  handleCopy={handleCopy}
                  handleDelete={handleDelete}
                />
              );
            })}
          </ul>
        ) : (
          <h4>No local files</h4>
        )}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
