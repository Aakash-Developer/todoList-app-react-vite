import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const Store = (set) => ({
  tasks: [],
  draggedTask: null,
  addTasks: (title, state) => set((store) => ({ tasks: [...store.tasks, { title, state }] }), false, "addTasks"),
  deleteTask: (title) => set((store) => ({ tasks: store.tasks.filter((task) => task.title !== title) })),
  setDraggedTask: (title) => set({ draggedTask: title }),
  moveTask: (title, state) => set((store) => ({ tasks: store.tasks.map((task) => (task.title === title ? { title, state } : task)) })),
});

export const useStore = create(persist(devtools(Store), { name: "store" }));
