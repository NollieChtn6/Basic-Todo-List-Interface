import { TaskInterface } from '../../@types/taskData';

import './Counter.scss';

interface CounterProps {
  tasks: TaskInterface[];
  pendingTasks: number;
  completedTasks: number;
}

function Counter({ tasks, pendingTasks, completedTasks }: CounterProps) {
  const pendingTasksCount = tasks.filter((task) => !task.isComplete).length;
  const completedTasksCount = tasks.filter((task) => task.isComplete).length;

  const pendingTasksMessage =
    pendingTasksCount <= 1 ? 'task pending' : 'tasks pending';
  const completeTasksMessage =
    completedTasksCount <= 1 ? 'task complete' : 'tasks complete';

  const displayGreatJobMessage = () => {
    if (pendingTasks === 0) {
      return `Great job! 👍🏼`;
    }
    return '';
  };

  return (
    <div className="counter-container">
      <p className="message-tasks-pending">
        <span>{pendingTasksCount} </span>
        {pendingTasksMessage}
      </p>
      <p className="message-tasks-complete">
        <span>{completedTasksCount} </span>
        {completeTasksMessage}
      </p>
      <div className="separator-small" />
      <p className="message-great-job">{displayGreatJobMessage()}</p>
    </div>
  );
}

export default Counter;
