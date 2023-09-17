import { useState } from "react";
import { useStore } from "../store";
import Tasks from "./Tasks";
import "./column.css";
import classNames from "classnames";

export default function Column({ state }) {
  const [task, setTask] = useState("");
  const [show, setShow] = useState(false);
  const [drop, setDrop] = useState(false);

  const tasks = useStore((store) => store.tasks.filter((task) => task.state === state));
  const addTasks = useStore((store) => store.addTasks);
  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const draggedTask = useStore((store) => store.draggedTask);
  const moveTask = useStore((store) => store.moveTask);

  return (
    <div
      className={classNames("column", { drop: drop })}
      onDragOver={(e) => {
        e.preventDefault();
        setDrop(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setDrop(false);
      }}
      onDrop={(e) => {
        e.preventDefault();

        moveTask(draggedTask, state);
        setDraggedTask(null);
        setDrop(false);
      }}>
      <div className="titlewrapper">
        <p>{state}</p>
        <button onClick={() => setShow(true)}>Add</button>
      </div>
      {tasks?.map((task) => (
        <Tasks title={task.title} key={task.title} />
      ))}
      {show && (
        <div className="Model">
          <div className="modelContent">
            <input onChange={(e) => setTask(e.target.value)} value={task} placeholder="Write Task..." />
            <button
              onClick={() => {
                addTasks(task, state);
                setTask("");
                setShow(false);
              }}>
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
