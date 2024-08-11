import { getProjects } from "./storage";

export const hasProjects = () => {
    const projects = getProjects();
    if (projects.length > 0) return true;

    return false;
};