
const baseUrl : string = "http://34.38.134.11:5000/api/admin"

export async function getAllAdmins(): Promise<Admin[]> {
    const response = await fetch(baseUrl + '/admins', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 404){
        throw new Error("Aucun adminstrateur trouvé...");
    }else if (!response.ok){
        throw new Error("Une erreur est survenue lors de la récupération des utilisateurs...")
    }
    const data = await response.json();
    return data as Admin[];
}

export async function getAllAdminsActif(): Promise<Admin[]> {
    const response = await fetch(baseUrl + '/admins/actif', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 404){
        throw new Error("Aucun administrateur actif trouvé...");
    }else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération des administrateur actif...")
    }
    const data = await response.json();
    return data as Admin[];
}

export async function getAllAdminInactif(): Promise<Admin[]> {
    const response = await fetch(baseUrl + '/admins/inactif', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 404) {
        throw new Error("Aucun adminstrateur inactif trouvé...")
    }else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération des administrateur inactif...")
    }
    const data = await response.json();
    return data as Admin[];
}

export async function getAdminById(id_admin: number): Promise<Admin> {
    const response = await fetch(baseUrl + `/admins/${id_admin}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 404) {
        throw new Error("Aucun administrateur avec cette id trouvé...")
    }else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération de l'administrateur...")
    }
    const data = await response.json();
    return data as Admin;
}

export async function getAdminByEmail(email: string): Promise<Admin> {
    const response = await fetch(baseUrl + `/admins/${email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 404) {
        throw new Error("Aucun administrateur avec cette email trouvé...");
    }else if(!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération de l'administrateur...")
    }
    const data = await response.json();
    return data as Admin;
}

export async function getAdminByUserId(user_id : number): Promise<Admin> {
    const response = await fetch(baseUrl + `/admins/${user_id}/byUser`, {
        method: 'GET',
        headers: {
            "Content-Type": 'application/json'
        }
    });
    if (response.status == 404) {
        throw new Error("Aucun administrateur avec cette user id trouvé...");
    }else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération de l'administrateur...")
    }
    const data = await response.json();
    return data as Admin;
}

export async function desactivateAdmin(email: string): Promise<any> {
    const response = await fetch(baseUrl + `/admins/${email}/desactivate`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 404) {
        throw new Error("Aucun administrateur n'a été trouvé...");
    }else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la suppression de l'administrateur...")
    }
    const data = await response.json();
    return data;
}

export interface admin {
    actif : number,
    address : string,
    admin_id: number,
    admin_role : string,
    city: string,
    email: string,
    firstName: string,
    name: string,
    password: string,
    userType: string,
    user_id: string,
    zipCode: number
}

export interface Admin {
    name: string,
    firstName: string,
    address: string,
    zipCode : string,
    city: string,
    email: string,
    password: string,
    userType: string,
    admin_role: string
}
