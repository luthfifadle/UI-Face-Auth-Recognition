import axios from 'axios';

const getCsrfToken = async () => {
    const response = await axios.get('http://localhost:8000/api/csrf-token', {
        withCredentials: true,
    });
    return response.data.csrfToken;
};

export default getCsrfToken;