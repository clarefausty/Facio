import React, { useState } from 'react';
import "./todolist.css"

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleDateChange = (e) => {
    setNewDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setNewTime(e.target.value);
  };

  const addTodo = () => {
    if (newTodo.trim() === '') return; // Prevent adding empty todo
    const newTodoItem = {
      text: newTodo,
      date: newDate,
      time: newTime,
      editing: false,
      completed: false,
    };
    setTodos([...todos, newTodoItem]);
    setNewTodo('');
    setNewDate('');
    setNewTime('');
  };

  const removeTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const toggleEdit = (index) => {
    const updatedTodos = todos.map((todo, i) => ({
      ...todo,
      editing: i === index ? !todo.editing : false,
    }));
    setTodos(updatedTodos);
  };

  const handleEdit = (index, newText) => {
    const updatedTodos = todos.map((todo, i) => ({
      ...todo,
      text: i === index ? newText : todo.text,
      editing: false,
    }));
    setTodos(updatedTodos);
  };

  const toggleCompleted = (index) => {
    const updatedTodos = todos.map((todo, i) => ({
      ...todo,
      completed: i === index ? !todo.completed : todo.completed,
    }));
    setTodos(updatedTodos);
  };

  // Group todos by date
  const groupedTodos = todos.reduce((acc, todo) => {
    const key = todo.date || 'No Date';
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(todo);
    return acc;
  }, {});

  return (
    <div className='facio-container'>
      <h1>Facio</h1>
      
      {Object.entries(groupedTodos).map(([date, dateTodos]) => (
        <div key={date}>
          <h3>{date === 'No Date' ? 'No Date' : new Date(date).toDateString()}</h3>
          <ul>
            {dateTodos.map((todo, index) => (
              <li key={index} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                <input type="checkbox" checked={todo.completed} onChange={() => toggleCompleted(index)} />
                {todo.editing ? (
                  <>
                    <input
                      type="text"
                      value={todo.text}
                      onChange={(e) => handleEdit(index, e.target.value)}
                    />
                    <button onClick={() => handleEdit(index, todo.text)}>Done</button>
                  </>
                ) : (
                  <>
                    <span>{todo.text}</span>
                    <span>{todo.time}</span>
                    <button onClick={() => toggleEdit(index)}>Edit</button>
                  </>
                )}
                <button onClick={() => removeTodo(index)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className='input-container'>
        <div className='input-area' >
        <textarea rows={7} type="text" placeholder="Enter activity" value={newTodo} onChange={handleInputChange} />
        <input type="date" value={newDate} onChange={handleDateChange} />
        <input type="time" value={newTime} onChange={handleTimeChange} />
        </div>
        <button onClick={addTodo}>Add</button>
      </div>
    </div>
  );
};

export default TodoList;
