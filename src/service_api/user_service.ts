const baseUrl : string = 'http://34.38.134.11:5000/api/user';

export async function getAllUsers(): Promise<User[]> {
    const response = await fetch(baseUrl + '/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 404) {
        throw new Error("Aucun Utilisateur trouvé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération des utilisateurs...")
    }
    const data = await response.json();
    return data['users'] as User[];
}

export async function getAllUsersInactif(): Promise<User[]> {
    const response = await fetch(baseUrl + '/users/inactif', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if(response.status == 404) {
        throw new Error("Aucun Utilisateur trouvé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération des uilisateurs...")
    }
    const data = await response.json()
    return data['users'] as User[];
}

export async function getAllUsersActif(): Promise<User[]> {
    const response = await fetch(baseUrl + '/users/actif', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 404) {
        throw new Error("Aucun utilisateur trouvé...")
    }else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération des utilisateurs...")
    }
    const data = await response.json();
    return data['users'] as User[];
}

export async function getUserById(user_id: number): Promise<User> {
    const response = await fetch(baseUrl + `/users/${user_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 404) {
        throw new Error("Aucun utilisateur trouvé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération de l'utilisateur...")
    }
    const data = await response.json()
    return data['user'] as User;
}

export async function getUserByEmail(email: string): Promise<User> {
    const response = await fetch(baseUrl + `/users/${email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 404) {
        throw new Error("Aucun utilisateur trouvé...");
    }else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération de l'utilisateur...")
    }
    const data = await response.json();
    return data['user'] as User;
}

export async function getUserByToken(token: string): Promise<User> {
    const response = await fetch(baseUrl + `/users/getByToken`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        }
    });
    if (response.status == 404) {
        throw new Error("Aucun utilisateur trouvé...")
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération de l'utilisateur...")
    }
    const data = await response.json();
    return data['utilisateur'] as User;
}

export async function createUser(user: UserRegister): Promise<User> {
    const response = await fetch(baseUrl + '/users/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    if (response.status == 404) {
        throw new Error("Utilisateur non trouvé...");
    }else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la création de l'utilisateur...");
    }
    const data = await response.json();
    return data['user'] as User;
}

export async function updateUser(email: string, userUpdate: UserRegister): Promise<User> {
    const response = await fetch(baseUrl + `/user/${email}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userUpdate)
    });
    if (response.status == 404) {
        throw new Error("Aucun utilisateur trouvé...");
    }else if(!response.ok) {
        throw new Error("Une erreur est survenue lors de la mise à jour de l'utilisateur...")
    }
    const data = await response.json();
    return data['user'] as User;
}

export async function desactivateUser(email: string): Promise<any> {
    const response = await fetch(baseUrl + `/users/${email}/desactivate`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 404) {
        throw new Error("Aucun utilisateur trouvé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la désactivation de l'utilisateur...")
    }
    const data = await response.json();
    return data;
}

export async function deleteUser(email: string): Promise<any> {
    const response = await fetch(baseUrl + `/users/${email}/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 404) {
        throw new Error("Aucun utilisateur trouvé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la suppression de l'utilisateur...")
    }
    const data = await response.json();
    return data;
}

export async function loginUser(loginUser: LoginUser): Promise<any> {
    const response = await fetch(baseUrl + '/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginUser)
    });
    if (response.status == 404) {
        throw new Error("Aucun utilisateur trouvé, email ou mot de passe invalide...")
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la connexion utilisateur...")
    }
    return await response.json();
}

export async function logoutUser(token: string): Promise<any> {
    const response = await fetch(baseUrl + '/users/logout', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        }
    });
    if (response.status == 404) {
        throw new Error("Aucun utilisateur connecté trouvé avec ce token...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la déconnexion de l'utilisateur...");
    }
    const data = await response.json();
    return data;
}


export interface User {
    actif: number,
    address: string,
    city: string,
    email: string,
    firstName:string,
    name: string,
    password: string,
    userType: string,
    user_id : number,
    zipCode: number
}

export interface LoginUser {
    email: string,
    password: string,
    userType: string
}

export interface UserRegister {
    name: string,
    firstName: string,
    address: string,
    zipCode: string,
    city: string,
    email: string,
    password: string,
    userType: string
}
