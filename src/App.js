import React, { useState } from 'react';
import './style.css';

export default function App() {
  const [input, setInput] = useState('');
  const [addInput, setAddInput] = useState([]);
  const [toggleBtn, setToggleBtn] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  const addItems = () => {
    if (!input) {
      alert('please fill the data');
    } else if (toggleBtn && !toggleBtn) {
      setAddInput(
        addInput.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: input };
          }
          return elem;
        })
      );
      setToggleBtn(true);
      setInput('');
      setIsEditItem(null);
    } else {
      const allInputData = { id: new Date().toString(), name: input };
      setAddInput([...addInput, allInputData]);
      setInput('');
    }
  };

  const deleteHandler = (index) => {
    const updatedItem = addInput.filter((elem) => {
      return index !== elem.id;
    });
    setAddInput(updatedItem);
  };

  const editHandler = (id) => {
    let newEditItem = addInput.find((elem) => {
      return elem.id === id;
    });
    console.log(newEditItem);
    setToggleBtn(false);
    setInput(newEditItem.name);
    setIsEditItem(id);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="items to add"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={addItems}>{toggleBtn ? 'submit' : 'edit'}</button>

      {addInput.map((add) => {
        return (
          <div key={add.id}>
            <h5>You have added -{add.name}</h5>
            <button onClick={() => deleteHandler(add.id)}>Delete</button>
            <button onClick={() => editHandler(add.id)}>Edit</button>
          </div>
        );
      })}
    </div>
  );
}
