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

export const updateLink = async (projectId, linkId, linkData) => {
    try {
        const response = await axios.put('/api/projects/update-link', {
            user_email: localStorage.getItem('user_email'),
            projectId,
            linkId,
            ...linkData,
        });
        return response.data;
    } catch (error) {
        console.error('Error updating link:', error);
        throw error;
    }
};

export const deleteLink = async (projectId, linkId) => {
    try {
        const response = await axios.delete('/api/projects/delete-link', {
            data: {
                user_email: localStorage.getItem('user_email'),
                projectId,
                linkId,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting link:', error);
        throw error;
    }
};

export const updateWidgetConfig = async (projectId, widgetConfig) => {
    try {
        const response = await axios.put('/api/projects/widget-config', {
            user_email: localStorage.getItem('user_email'),
            projectId,
            widgetConfig,
        });
        return response.data;
    } catch (error) {
        console.error('Error updating widget config:', error);
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

// File upload functions
export const uploadBotIcon = async (file) => {
    try {
        const formData = new FormData();
        formData.append('botIcon', file);

        const response = await axios.post('/api/upload/bot-icon', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading bot icon:', error);
        throw error;
    }
};

export const deleteBotIcon = async (fileUrl) => {
    try {
        const response = await axios.delete('/api/upload/bot-icon', {
            data: { fileUrl }
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting bot icon:', error);
        throw error;
    }
};

// User management functions
export const createOrUpdateUser = async (userData) => {
    try {
        const response = await axios.post('/api/users/create-or-update', userData);
        return response.data;
    } catch (error) {
        console.error('Error creating/updating user:', error);
        throw error;
    }
};

export const getUserByEmail = async (email) => {
    try {
        const response = await axios.get(`/api/users/${email}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
};

export const updateUsername = async (email, username) => {
    try {
        const response = await axios.put('/api/users/update-username', {
            email,
            username,
        });
        return response.data;
    } catch (error) {
        console.error('Error updating username:', error);
        throw error;
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



