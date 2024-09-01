import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
    return (
        <Router>
            <div className="App">
                <h1>Task Management System</h1>
                <Routes>
                    <Route path="/" element={<TaskList />} />
                    <Route path="/create" element={<TaskForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
