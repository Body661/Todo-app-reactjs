import React, { useState } from 'react'
import Todo from './Todo'
import TodoForm from './TodoForm'


const getSavedTodos = () => {
    if (localStorage.getItem('todos') !== null) {
        return JSON.parse(localStorage.getItem('todos'))
    } else {
        return []
    }
}


function TodoList() {
    const [todos, setTodos] = useState(getSavedTodos)

    const saveTodos = () => localStorage.setItem('todos', JSON.stringify(todos))
    saveTodos()

    const addTodo = (todo) => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return
        }

        const newTodos = [todo, ...todos]
        setTodos(newTodos)
    }

    const completeTodo = (id) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete
            }
            return todo
        })
        setTodos(updatedTodos)
    }

    const deleteTodo = (id) => {
        const removeArr = todos.filter((todo) => todo.id !== id)
        setTodos(removeArr)
    }

    const editTodo = (id, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return
        }

        setTodos(prev => prev.map(item => (item.id === id ? newValue : item)))
    }

    return (
        <React.Fragment>
            <h1>What's the plan for today</h1>
            <TodoForm onSubmit={addTodo} />
            <Todo todos={todos} completeTodo={completeTodo} deleteTodo={deleteTodo} editTodo={editTodo} />
        </React.Fragment>
    )
}

export default TodoList