import { create } from "zustand";

const Store = (set) => ({
  tasks: [{ title: "TestTask", state: "PLANNED" }],
  addTasks: (title, state) => set((store) => ({ tasks: [...store.tasks, { title, state }] })),
  deleteTask: (title) => set((store) => ({ tasks: store.tasks.filter((task) => task.title !== title) })),
});

export const useStore = create(Store);
