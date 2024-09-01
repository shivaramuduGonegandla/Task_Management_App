import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm'; // Ensure this import is correct based on your file structure

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = () => {
        axios
            .get('http://localhost:8080/api/tasks')
            .then((response) => setTasks(response.data))
            .catch((error) => {
                console.error('Error fetching tasks', error);
                setError('Could not load tasks. Please try again later.');
            });
    };

    const deleteTask = (id) => {
        axios
            .delete(`http://localhost:8080/api/tasks/${id}`)
            .then(() => {
                fetchTasks(); // Refresh the task list after deletion
            })
            .catch((error) => console.error('Error deleting task', error));
    };

    const editTask = (task) => {
        setEditingTask(task);
    };

    const handleCancelEdit = () => {
        setEditingTask(null);
    };

    return (
        <div>
            <h2>Task List</h2>
            {error ? (
                <p className="error">{error}</p>
            ) : (
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id}>
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                            <p>Completed: {task.completed ? 'Yes' : 'No'}</p>
                            <button onClick={() => editTask(task)}>Edit</button><br /> <br />
                            <button onClick={() => deleteTask(task.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
            {editingTask && (
                <TaskForm
                    task={editingTask}
                    onTaskUpdated={fetchTasks}
                    onCancel={handleCancelEdit}
                />
            )}
        </div>
    );
};

export default TaskList;
