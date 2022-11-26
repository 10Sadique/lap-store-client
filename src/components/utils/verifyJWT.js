const verifyJWT = async (email) => {
    const res = await fetch(`http://localhost:5000/jwt?email=${email}`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    const data = await res.json();
    localStorage.setItem('accessToken', data.accessToken);
};

export default verifyJWT;
