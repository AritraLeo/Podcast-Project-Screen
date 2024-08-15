import axios from 'axios';

export const getProjects = async (userEmail) => {
    try {
        const response = await axios.get(`/api/projects/${userEmail}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
};


export const createProject = async (projectData) => {
    try {
        const response = await axios.post('/api/projects/create', projectData);
        return response.data;
    } catch (error) {
        console.error('Error creating project:', error);
        throw error;
    }
};

export const addLinkToProject = async (projectId, upload) => {
    try {
        const response = await axios.post('/api/projects/add-link', {
            user_email: localStorage.getItem('user_email'),
            projectId,
            ...upload,
        });
        return response.data;
    } catch (error) {
        console.error('Error adding link to project:', error);
        throw error;
    }
};


export const getProjectDetails = async (projectId) => {
    try {
        const response = await axios.get(`/api/projects/project/${projectId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching project details:', error);
        return null;
    }
};



export const getUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

export const setUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
};

// export const getProjects = () => {
//     return JSON.parse(localStorage.getItem('projects')) || [];
// };

export const removeUser = () => {
    try {
        localStorage.removeItem('user_email');
        localStorage.removeItem('username');
        // Add any other user-related keys you want to remove from local storage
    } catch (error) {
        console.error('Error removing user from local storage:', error);
    }
};


export const setProjects = (projects) => {
    localStorage.setItem('projects', JSON.stringify(projects));
};



