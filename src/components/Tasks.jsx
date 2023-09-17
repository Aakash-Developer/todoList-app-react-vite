import classNames from "classnames";
import "./Tasks.css";
import { useStore } from "../store";

export default function Tasks({ title }) {
  const task = useStore((store) => store.tasks.find((task) => task.title === title));
  const deleteTask = useStore((store) => store.deleteTask);
  const setDraggedTask = useStore((store) => store.setDraggedTask);

  return (
    <div className="task" draggable onDragStart={() => setDraggedTask(task.title)}>
      <div>{task.title}</div>
      <div className="bottomwrapper">
        <div>
          <button className="deleteButton" onClick={() => deleteTask(task.title)}>
            X
          </button>
        </div>
        <div className={classNames("status", task.state)}>{task.state}</div>
      </div>
    </div>
  );
}
