import React from 'react'

function ToDo({ todo, toggleToDo }) {
    function handleToDoClick(e){
         toggleToDo(todo.id); //send the id of the todo to the toggleTodo function
    }

    return (
        <div>
            <label>
                <input type="checkbox" checked={todo.complete} onChange={handleToDoClick}/>
                {todo.name}
            </label>
            
        </div>
    )
}

export default ToDo
