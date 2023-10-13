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
        <div className='todoUpdate-container' key={date}>
          <h3>{date === 'No Date' ? 'No Date' : new Date(date).toDateString()}</h3>
          <div className='todo-div'>
          <ul>
            {dateTodos.map((todo, index) => (
              <li key={index} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                <div className='todocontent'>
                <input type="checkbox" checked={todo.completed} onChange={() => toggleCompleted(index)} />
                {todo.editing ? (
                  <>
                    <textarea
                      type="text"
                      value={todo.text}
                      onChange={(e) => handleEdit(index, e.target.value)}
                    />
                    <button onClick={() => handleEdit(index, todo.text)}>Done</button>
                  </>
                ) : (
                    <div className='todocontent'>
                    <div>
                    <span className='texttodo'>{todo.text}</span>
                    <span>{todo.time}</span>
                    </div>
                    <div className='erbtn'>
                    <button onClick={() => toggleEdit(index)}>Edit</button>
                    <button onClick={() => removeTodo(index)}>Remove</button>
                    </div>
                    </div>
                  
                  
                )}
                </div>    
              </li>
            ))}

          </ul>
          </div>
        </div>
      ))}
      <div className='input-container'>
        <div className='input-area' >
        <input rows={7} type="text" placeholder="Enter activity" value={newTodo} onChange={handleInputChange} />
        <input type="date" value={newDate} onChange={handleDateChange} />
        <input type="time" value={newTime} onChange={handleTimeChange} />
        </div>
        <button className='addbtn' onClick={addTodo}>Add</button>
      </div>
    </div>
  );
};

export default TodoList;
