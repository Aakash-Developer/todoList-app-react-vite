import { useState } from "react";
import { useStore } from "../store";
import Tasks from "./Tasks";
import "./column.css";

export default function Column({ state }) {
  const [task, setTask] = useState("");
  const [show, setShow] = useState(false);

  const tasks = useStore((store) => store.tasks.filter((task) => task.state === state));
  const addTasks = useStore((store) => store.addTasks);

  console.log(tasks);

  return (
    <div className="column">
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
