import React, { useEffect, useState } from 'react';

const Todo = ({ task, onDelete, onChange, onToggle }) => {

    return (
        <div className="item">
            <div className="top-sides">
                <span 
                    className={task.isDone ? 'checked' : ''} 
                    onDoubleClick={() => onToggle(task.id)}
                >
                    {task.task}
                </span>
                <div className="buttons">
                    <button onClick={() => onDelete(task.id)} >X</button>
                    <button onClick={() => onChange(task.id)}>
                        <img src="/images/change.svg" alt="Change" />
                    </button>
                </div>
                

            </div>
            <span className="time">{task.time}</span>
        </div>
    );
};

export default Todo;
