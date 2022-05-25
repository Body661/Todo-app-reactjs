import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

function TodoForm(props) {

    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    const [input, setInput] = useState('');

    const inputHandler = (event) => {
        setInput(event.target.value)
    }

    const submitHandler = (event) => {
        event.preventDefault()

        props.onSubmit({
            id: uuidv4(),
            text: input,
            isComplete: false
        })

        setInput('')
    }

    return (
        <form className="todo-form" onSubmit={submitHandler}>
            {props.edit ? (
                <>
                    <input
                        type="text"
                        placeholder="Update your item"
                        value={input}
                        className='todo-input edit'
                        onChange={inputHandler}
                        ref={inputRef}

                    />
                    <button className='todo-button edit'>Update</button>
                </>)
                : (
                    <>
                        <input
                            type="text"
                            placeholder="Add a todo"
                            value={input}
                            className="todo-input"
                            onChange={inputHandler}
                            ref={inputRef} />
                        <button className='todo-button'>Add Todo</button>
                    </>
                )}

        </form>
    );
}

export default TodoForm;
