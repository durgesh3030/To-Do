import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import ToDoList from './ToDoList';
import {v4 as uuidv4} from 'uuid';


const LOCAL_STORAGE_KEY = 'todoApp.todos';

function App() {
  const [todos, setTodos] = useState([]); //todos is an array of objects tp be updated and setTodos is a method to update the array
  console.log(todos);
  console.log(setTodos);
  const todoNameRef = useRef();


  useEffect(() => {
    setTodos(JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY) || '[]'));
  },[]); //called every time there is a refresh
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos)); //stores the todos in local storage
  },[todos]);

  function toggleToDo(id) {
    const newTodos = [...todos]; //create a copy of the array and then modify it
    const todo = newTodos.find(todo => todo.id === id); //find the todo with the id
    console.log(todo);
    todo.complete = !todo.complete; //toggle the complete property
    setTodos(newTodos); //update the state
  } 

  function handleCompleteToDo(e)
  {
    const newTodos = todos.filter(todo => !todo.complete);
    setTodos(newTodos);
  }

  function handleAddToDo(e)
  {
    const name = todoNameRef.current.value;
    if(name === '')
      return;
    console.log(name);
    setTodos( prevTodos => {
      return [...prevTodos, {id:uuidv4(), name:name, complete:false}]; //...prevTodos is the previous array of objects
    })
    todoNameRef.current.value = '';
  }
  return (
    <>
      <ToDoList todos={todos} toggleToDo={toggleToDo}/>
      <input ref={todoNameRef} type="text" /><br/>
      <button onClick={handleAddToDo}>Add Todos</button>
      <button onClick={handleCompleteToDo}>Clear Complete Todos</button>
      <div> {todos.filter(todo => !todo.complete).length} left to do</div>
    </> 
  );
}

export default App;
