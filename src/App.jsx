import { useReducer, useEffect, useState } from 'react' 
import './App.css' 
import Todo from './components/Todo' 
// import ParticlesBackground from './components/ParticlesBackground'
import AnimatedLines from './components/AnimatedLines';

const initialState = {
    todos: [],
    inputValue: '',
} 

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_TODOS':
            return { ...state, todos: action.payload } 
        case 'ADD_TODO':
            return { ...state, todos: [...state.todos, action.payload] } 
        case 'DELETE_TODO':
            return { ...state, todos: state.todos.filter(todo => todo.id !== action.payload) } 
        case 'TOGGLE_TODO':
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo
                ),
            } 
        case 'UPDATE_TODO':
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload.id ? { ...todo, task: action.payload.newTask } : todo
                ),
            } 
        case 'SET_INPUT_VALUE':
            return { ...state, inputValue: action.payload } 
        case 'CLEAR_INPUT':
            return { ...state, inputValue: '' } 
        default:
            return state 
    }
} 

function App() {
    const [state, dispatch] = useReducer(reducer, initialState) 
    const { todos, inputValue } = state 

    useEffect(() => {
        fetch('http://localhost:8080/todos')
            .then(res => res.json())
            .then(res => dispatch({ type: 'SET_TODOS', payload: res })) 
    }, []) 

    const doSubmit = (event) => {
        event.preventDefault() 
        const trimmedValue = inputValue.trim() 
        if (trimmedValue === '') {
            alert('fill') 
            return 
        }

        const newTask = {
            id: crypto.randomUUID(),
            task: trimmedValue,
            time: new Date().toLocaleTimeString(),
            isDone: false,
        } 

        fetch('http://localhost:8080/todos', {
            method: 'POST',
            body: JSON.stringify(newTask),
        })
            .then(res => res.json())
            .then(res => {
                dispatch({ type: 'ADD_TODO', payload: res }) 
            }) 
    } 

    const toggleTaskCompletion = (id) => {
        const task = todos.find(todo => todo.id === id) 
        const updatedTask = { ...task, isDone: !task.isDone } 

        fetch(`http://localhost:8080/todos/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedTask),
        })
            .then(() => {
                dispatch({ type: 'TOGGLE_TODO', payload: id }) 
            }) 
    } 

    const deleteTask = (id) => {
        fetch(`http://localhost:8080/todos/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                dispatch({ type: 'DELETE_TODO', payload: id }) 
            }) 
    } 

    const changeTask = (id) => {
        const newTitle = prompt('Change') 
        if (newTitle) {
            const updatedTask = { task: newTitle } 

            fetch(`http://localhost:8080/todos/${id}`, {
                method: 'PATCH',
                body: JSON.stringify(updatedTask),
            })
                .then(() => {
                    dispatch({ type: 'UPDATE_TODO', payload: { id, newTask: newTitle } }) 
                }) 
        }
    } 

    return (
        <>
            <div className="app">
                {/* <ParticlesBackground />
                {console.log(window.particlesJS)} */}
                <AnimatedLines />
                <header>
                    <h1>Todo App</h1>
                </header>
                <main>
                    <center>
                        <form onSubmit={doSubmit}>
                            <input
                                className="inp"
                                type="text"
                                name="title"
                                value={inputValue}
                                onChange={(e) => dispatch({ type: 'SET_INPUT_VALUE', payload: e.target.value })}
                                aria-label="Task input"
                            />
                            <button className="btn" type="submit">Add Task</button>
                        </form>
                    </center>

                    <section className="container">
                        {todos.map(task => (
                            <Todo
                                key={task.id}
                                task={task}
                                onDelete={deleteTask}
                                onChange={changeTask}
                                onToggle={toggleTaskCompletion}
                            />
                        ))}
                    </section>
                </main>
            </div>
        </>
    ) 
}

export default App 
