class ApiService {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async get(endpoint, isAuthorized = false) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.getToken(isAuthorized),
                },
            });

            this.checkIsUnauthorized(response);

            return await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async post(endpoint, data, isAuthorized = false) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.getToken(isAuthorized),
                },
                body: JSON.stringify(data),
            });

            this.checkIsUnauthorized(response);

            return await response.json();
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    async put(endpoint, data, isAuthorized = false) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.getToken(isAuthorized),
                },
                body: JSON.stringify(data),
            });
            
            this.checkIsUnauthorized(response);

            return await response.json();
        } catch (error) {
            console.error('Error updating data:', error);
        }
    }

    async delete(endpoint, isAuthorized = false) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.getToken(isAuthorized),
                }
            });

            this.checkIsUnauthorized(response);
            
            return await response.json();
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    }

    checkIsUnauthorized(response) {
        if (response.status == 401) {
            this.clearToken();
            window.location = '/';
        }
    }

    setToken(token)
    {
        localStorage.setItem("access_token", token.accessToken);
        localStorage.setItem("expires_in", Date.now() + token.expiresIn * 1000);
    }

    clearToken()
    {
        localStorage.removeItem("access_token");
        localStorage.removeItem("expires_in");
    }

    getToken(isAuthorized)
    {
        if (!isAuthorized) {
            return '';
        } 

        const token = localStorage.getItem("access_token");

        if (!this.validToken()) {
            window.location = '/';
        }

        return token;
    }

    validToken()
    {
        const date = new Date(Number(localStorage.getItem("expires_in")));      

        if (new Date() > date) {
            return false;
        }

        return true;
    }
}

const apiService = new ApiService(config.apiUrl);
