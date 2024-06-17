import type { IProject } from "$lib/interfaces/types";
import { writable } from "svelte/store";

export const project = writable<IProject>();

if (globalThis?.localStorage) {
  console.log("reading localstorage");
  let _project: IProject = {
    name: "Test",
    templates: [],
    nodes: [],
    edges: [],
  };

  const saved = localStorage.getItem("project");
  if (saved) {
    console.log(saved);
    try {
      // @ts-ignore
      _project = JSON.parse(saved);
    } catch (e) {
      console.warn(e);
      localStorage.removeItem("project");
    }
  }

  project.set(_project);
}

project.subscribe((p) => {
  if (!p) return;
  console.time("saving project");
  globalThis.localStorage?.setItem("project", JSON.stringify(p));
  console.log(p);
  console.timeEnd("saving project");
});
