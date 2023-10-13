import React, { useState } from 'react';
import "./todolist.css";
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

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


  const calculateCompletionPercentage = () => {
    const completedCount = todos.filter(todo => todo.completed).length;
    const totalCount = todos.length;
    return totalCount === 0 ? 0 : (completedCount / totalCount) * 100;
  };

  // Chart data
  const chartData = {
    labels: ['Completed', 'Remaining'],
    datasets: [
      {
        data: [calculateCompletionPercentage(), 100 - calculateCompletionPercentage()],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: true,
        labels: {
          font: {
            size: 16, 
          },
          
        },
      },
    },
  };
  return (
    <div className='facio-container'>
      <div className='icon-con'>
        <div>
      <h1>Facio</h1>
      <p>Track your daily performance</p>
      </div>
      <img className='todo-icon' src='/assets/facioImg.png' alt='to do icon'/>
      </div>
      
      {Object.entries(groupedTodos).map(([date, dateTodos]) => (
        <div className='todoUpdate-container' key={date}>
          <h3>{date === 'No Date' ? 'No Date' : new Date(date).toDateString()}</h3>
          <div className='todo-div'>
          <ul>
            {dateTodos.map((todo, index) => (
              <li key={index} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                <div className='todocontent'>
                <input type="radio" checked={todo.completed} onChange={() => toggleCompleted(index)} />
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
                    <div className='textTime'>
                    <span className='texttodo'>{todo.text}</span>
                    <span>{todo.time}</span>
                    </div>
                    
                    </div>
                  
                  
                )}
                </div> 
                <div className='erbtn'>
                    <button onClick={() => toggleEdit(index)}>Edit</button>
                    <button onClick={() => removeTodo(index)}>Remove</button>
                    </div>   
              </li>
            ))}

          </ul>
          </div>

          <div className='track-section'>
<h3>Task Completed</h3>
<div className='chart-con'>
<Pie data={chartData} options={chartOptions}  />
</div>
</div>

        </div>
      ))}

{/* Track Section */}


      <div className='input-container'>
        <div className='input-area' >
        <input rows={7} type="text" placeholder="Enter activity" value={newTodo} onChange={handleInputChange} />
        <input type="date" value={newDate} onChange={handleDateChange} />
        <input type="time" value={newTime} onChange={handleTimeChange} />
        </div>
        
      </div>
      <button className='addbtn' onClick={addTodo}>Add</button>
    </div>
  );
};

export default TodoList;
