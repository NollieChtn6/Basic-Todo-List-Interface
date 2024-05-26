import React, { useState } from 'react';

import { TaskInterface } from '../../@types/taskData';

import AddTaskForm from '../AddTaskForm/AddTaskForm';
import Counter from '../Counter/Counter';
import TasksList from '../TasksList/TasksList';

import './App.scss';

function App() {
  const [tasks, setTasks] = useState<TaskInterface[]>([]);
  const [pendingTasks, setPendingTasks] = useState<number>(0);
  const [completedTasks, setCompletedTasks] = useState<number>(0);

  const addNewTask = (task: TaskInterface) => {
    setTasks([...tasks, task]);
    if (!task.isComplete) {
      setPendingTasks(pendingTasks + 1);
    } else {
      setCompletedTasks(completedTasks + 1);
    }
  };

  const updateTask = (taskIndex: number, updatedTask: TaskInterface): void => {
    const tasksToBeUpdated = [...tasks];
    tasksToBeUpdated[taskIndex] = updatedTask;
    setTasks(tasksToBeUpdated);

    if (tasks[taskIndex].isComplete && !updatedTask.isComplete) {
      setCompletedTasks(completedTasks - 1);
      setPendingTasks(pendingTasks + 1);
    } else if (!tasks[taskIndex].isComplete && updatedTask.isComplete) {
      setPendingTasks(pendingTasks - 1);
      setCompletedTasks(completedTasks + 1);
    }
  };

  const deleteTask = (taskIndex: number): void => {
    const updatedTasks = tasks.filter((_, index) => index !== taskIndex);
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <header className="App-header-container">
        <h1 className="App-header-title">My to-do list</h1>
        <h2 className="App-header-subtitle">
          A (very) simple to-do list interface
        </h2>
      </header>
      <div className="separator-medium" />
      <main className="main-content-container">
        <section className="add-task-form-container">
          <AddTaskForm addNewTask={addNewTask} />
        </section>
        <div className="separator-small" />
        <section className="task-list-container">
          {(pendingTasks > 0 || completedTasks > 0) && (
            <Counter
              tasks={tasks}
              pendingTasks={pendingTasks}
              completedTasks={completedTasks}
            />
          )}
          <TasksList
            tasks={tasks}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        </section>
      </main>
      <div className="separator-medium" />
      <footer className="footer-container">
        <p className="footer-content">NollieChtn6 • 2024</p>
      </footer>
    </div>
  );
}

export default App;
