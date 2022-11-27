const verifyJWT = async (email) => {
    const res = await fetch(
        `https://lap-store-server.vercel.app/jwt?email=${email}`,
        {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        }
    );
    const data = await res.json();
    localStorage.setItem('accessToken', data.accessToken);
};

export default verifyJWT;
