export const getUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

export const setUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
};

export const getProjects = () => {
    return JSON.parse(localStorage.getItem('projects')) || [];
};

export const setProjects = (projects) => {
    localStorage.setItem('projects', JSON.stringify(projects));
};



