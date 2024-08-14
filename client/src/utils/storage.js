import axios from 'axios';

export const getProjects = async (userEmail) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/projects`, { params: { user_email: userEmail } });
        return response.data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
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

export const setProjects = (projects) => {
    localStorage.setItem('projects', JSON.stringify(projects));
};



