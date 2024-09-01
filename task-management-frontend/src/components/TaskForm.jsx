import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskForm({ task, onTaskUpdated, onCancel }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setCompleted(task.completed);
        }
    }, [task]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedTask = { title, description, completed };

        if (task) {
            // Update existing task
            axios.put(`http://localhost:8080/api/tasks/${task.id}`, updatedTask)
                .then(response => {
                    onTaskUpdated(); // Refresh the task list after updating
                    onCancel(); // Hide the form after updating
                })
                .catch(error => console.error('Error updating task', error));
        } else {
            // Create new task (if this part is needed for the form to handle both creation and update)
            axios.post('http://localhost:8080/api/tasks', updatedTask)
                .then(response => {
                    setTitle('');
                    setDescription('');
                    setCompleted(false);
                    onTaskUpdated(); // Refresh the task list after creating
                })
                .catch(error => console.error('Error creating task', error));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{task ? 'Edit Task' : 'Create New Task'}</h2>
            <label>Title:
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </label>
            <br />
            <label>Description:
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
            </label>
            <br />
            <label>Completed:
                <input type="checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)} />
            </label>
            <br />
            <button type="submit">{task ? 'Update Task' : 'Add Task'}</button>
            {task && <button type="button" onClick={onCancel}>Cancel</button>}
        </form>
    );
}

export default TaskForm;
