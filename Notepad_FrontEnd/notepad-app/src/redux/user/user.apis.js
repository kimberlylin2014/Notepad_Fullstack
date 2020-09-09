
export const fetchRegisterUser = async(fetch, payload) => {
    try {
        const response = await fetch('http://localhost:3000/register',
        {
            method: "POST",
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify(payload)
        });

        if(!response.ok) {
            return null;
        }
        const userData = await response.json();
        return userData;
    } catch (error) {
        console.log(error)
    }
}

export const fetchSignInUser = async (fetch, payload) => {
    try {
        const response = await  fetch('http://localhost:3000/signin', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        });
        if(!response.ok) {
            return null;
        }
        const userData = await response.json();
        return userData;
    } catch (error) {
        console.log(error)
    }
} 