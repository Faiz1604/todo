import React, { useState, useEffect, useMemo } from 'react';
import './../style/todo.css';
import { useNavigate } from 'react-router-dom';

// AddTaskModal component
function AddTaskModal({ isOpen, onClose, onAddTask }) {
  const [taskText, setTaskText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleAddTask = () => {
    if (taskText.trim() !== '' && dueDate !== '') {
      onAddTask({
        text: taskText,
        dueDate,
        priority,
        completed: false,
      });
      setTaskText('');
      setDueDate('');
      setPriority('medium');
      onClose();
    } else {
      alert('Task and Due Date fields cannot be empty.');
    }
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <h2 className="modal-title">Add Task</h2>
        <input
          type="text"
          placeholder="Task"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          className="modal-input"
          required
        />
        <input
          type="date"
          placeholder="Due Date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="modal-input"
          required
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="modal-select"
        >
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
        <button onClick={handleAddTask} className="modal-button">
          Add Task
        </button>
        <button onClick={onClose} className="modal-button">
          Close
        </button>
      </div>
    </div>
  );
}

// Todo component
function Todo() {
  const [tasks, setTasks] = useState([]);
  const [editedTaskText, setEditedTaskText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('default');
  const navigate = useNavigate();

  const loggedUser = localStorage.getItem('loggedUser');

  useEffect(() => {
    // Load tasks from local storage based on the logged-in user's username
    const storedTasks = JSON.parse(localStorage.getItem(loggedUser)) || [];
    setTasks(storedTasks);
  }, [loggedUser]);

  const saveTasksToLocalStorage = (tasks) => {
    // Save tasks to local storage for the logged-in user
    localStorage.setItem(loggedUser, JSON.stringify(tasks));
  };

  const addTask = (newTask) => {
    const updatedTasks = [...tasks, { id: Date.now(), ...newTask }];
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const editTask = (taskId, newText) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, text: newText } : task
    );
    setTasks(updatedTasks);
    setEditingTaskId(null);
    setEditedTaskText('');
    saveTasksToLocalStorage(updatedTasks);
  };

  const toggleCompleted = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const statusMatch =
        filterStatus === 'all' ||
        (filterStatus === 'completed' && task.completed) ||
        (filterStatus === 'active' && !task.completed);
      const priorityMatch =
        filterPriority === 'all' || filterPriority === task.priority;
      return statusMatch && priorityMatch;
    });
  }, [tasks, filterStatus, filterPriority]);

  const toggleSortOrder = () => {
    if (sortOrder === 'default') {
      setSortOrder('dueDate');
    } else if (sortOrder === 'dueDate') {
      setSortOrder('priority');
    } else {
      setSortOrder('default');
    }
  };

  const handleChange = (e) => {
    setEditedTaskText(e.target.value);
  };

  const saveEditedTask = () => {
    if (editedTaskText.trim() !== '') {
      editTask(editingTaskId, editedTaskText);
    } else {
      alert('Task text cannot be empty.');
    }
  };

  const cancelEditing = () => {
    setEditingTaskId(null);
    setEditedTaskText('');
  };

  const logOut = () => {
    localStorage.removeItem('loggedUser');
    navigate('/');
  };

  // Function to sort tasks based on the current sortOrder
  const sortedTasks = useMemo(() => {
    let sorted = [...filteredTasks];
    if (sortOrder === 'dueDate') {
      sorted = sorted.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else if (sortOrder === 'priority') {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      sorted = sorted.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }
    return sorted;
  }, [filteredTasks, sortOrder]);

  return (
    <div className="todo-container">
      <h1 className="todo-title">Todo List</h1>

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTask={addTask}
      />

      <div className="filters">
        <div className="filter-container">
          <label>Status:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="active">Active</option>
          </select>
        </div>
        <div className="filter-container">
          <label>Priority:</label>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="filter-select"
          >
            <option value="all">All</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>
        <div className="filter-container">
          <label>Sort By:</label>
          <select
            value={sortOrder}
            onChange={() => toggleSortOrder()}
            className="filter-select"
          >
            <option value="default">Default</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
          </select>
        </div>
        <div className="filter-container">
          <button id="logout-btn" onClick={logOut}>
            Logout
          </button>
        </div>
      </div>

      <div className="scrollable-box">
        <ol className="task-list">
          {sortedTasks.map((task) => (
            <li
              key={task.id}
              className={`task ${task.completed ? 'completed' : ''}`}
            >
              {editingTaskId === task.id ? (
                <>
                  <input
                    type="text"
                    value={editedTaskText}
                    onChange={handleChange}
                    className="edit-input"
                  />
                  <button onClick={saveEditedTask} className="save-button">
                    Save
                  </button>
                  <button onClick={cancelEditing} className="cancel-button">
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span
                    onClick={() => toggleCompleted(task.id)}
                    className={`task-text priority-${task.priority}`}
                  >
                    {task.text} - Due Date: {task.dueDate}
                  </span>
                  <button
                    onClick={() => setEditingTaskId(task.id)}
                    className="edit-button"
                  >
                    &#x270E;
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="delete-button"
                  >
                    &#128465;
                  </button>
                </>
              )}
            </li>
          ))}
        </ol>
      </div>
      <button onClick={() => setIsModalOpen(true)} className="add-button">
        Add Task
      </button>
    </div>
  );
}

export default Todo;
