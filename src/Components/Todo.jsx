import React, { useState, useRef, useEffect } from 'react'
import TodoForm from './TodoForm'
import { RiCloseCircleLine } from 'react-icons/ri'
import { TiEdit } from 'react-icons/ti'

function Todo(props) {

    const [edit, setEdit] = useState({
        id: null,
        value: ''
    })

    const submitEditHanler = (value) => {
        props.editTodo(edit.id, value)
        setEdit({
            id: null,
            value: ''
        })
    }
    if (edit.id) {
        return <TodoForm edit={edit} onSubmit={submitEditHanler} />
    }

    return props.todos.map((todo, index) => (
        <div className={todo.isComplete ? 'todo-row complete' : 'todo-row'} key={todo.id}>
            <div key={todo.id} onClick={() => { props.completeTodo(todo.id) }}>  {todo.text} </div>
            <div className='icons'>
                <RiCloseCircleLine onClick={() => { props.deleteTodo(todo.id) }} className='delete-icon' />
                <TiEdit onClick={() => { setEdit({ id: todo.id, value: todo.text }) }} className='edit-icon' />
            </div>
        </div>
    ))
}

export default Todo