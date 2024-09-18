import { useState, useEffect } from 'react'
import "../styles/Home.css";


function Home() {

    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem("todos");
        if (savedTodos) {
            //string back to Js obj
            return JSON.parse(savedTodos);
        } else {
            return [];
        }
    });
    const [todo, setTodo] = useState("");

    //editing 
    //default false if we have editing action turns to true
    const [isEditing, setIsEditing] = useState(false);

    //set object state for track which object has editing
    const [currentTodo, setCurrentTodo] = useState({});

    //function editing
    //tf is spread operator
    function handleEditInputChange(event) {
        setCurrentTodo({
            ...currentTodo,
            text: event.target.value
        })
        console.log("Current Todo", currentTodo);
    }


    //fetching data in storage 
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos])
    //update localStorage

    function handleInputChange(event) {
        //capture the current input when an events (onchange, oninput) occurs.
        setTodo(event.target.value);
    }


    function handleFormSubmit(event) {
        event.preventDefault();

        if (todo !== "") {
            setTodos([
                ...todos,
                {
                    id: todos.length + 1,
                    text: todo.trim(),
                },
            ]);
            setTodo("");
        }
    }

    function handleDeleteClick(id) {
        const removeItem = todos.filter((todo) => {
            return todo.id !== id
        })

        setTodos(removeItem)
    }

    function handleEditClick(todo) {
        setIsEditing(true);
        setCurrentTodo({...todo})
    }


    function handleUpdateTodo(id, updatedTodo ) {
        const updatedItem = todos.map((todo) => {
            return todo.id === id ? updatedTodo : todo;
        });

        setIsEditing(false);
        setTodos(updatedItem);
    }

    function handleEditFormSubmit(event) {
        event.preventDefault();

        handleUpdateTodo(currentTodo.id, currentTodo);
    }


    console.log(todos)

    return (
        <div className="to-do-list">
            <h1>To-Do List</h1>
            {/* <div className="box-main">
             School
            </div> */}
            {isEditing ? (
                <form onSubmit={handleEditFormSubmit}>
                    <h2>Edit</h2>
                    <label htmlFor='editTodo'>Edit: todo: </label>
                    <input
                        type='text'
                        name='editTodo'
                        placeholder='Edit todo'
                        value={currentTodo.text}
                        onChange={handleEditInputChange}
                    />
                    <button type="submit">Update</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </form>
            ) : (
                <form onSubmit={handleFormSubmit}>
                    <input
                        type='text'
                        name='todo'
                        placeholder='Add Item...'
                        value={todo}
                        onChange={handleInputChange}
                    />
                    <button type='submit'>Add</button>
                </form>
            )}

            <div className="show-items">
                {todos.map((todo) => (
                    //return value
                    <li key={todo.id}>{todo.text}
                        <button onClick={() => handleEditClick(todo)}>Edit</button>
                        <button onClick={() => handleDeleteClick(todo.id)}>X</button>
                    </li>
                ))}
            </div>
        </div>
    )


}

export default Home
