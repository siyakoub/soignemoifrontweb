const baseUrl: string = 'http://127.0.0.1:5000/api/medecin';

export async function getAllMedecin(): Promise<Medecin[]> {
    const response = await fetch(baseUrl + '/medecins', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 404) {
        throw new Error("Aucun médecin trouvé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération des médecins...")
    }
    const data = await response.json();
    return data["medecins"] as Medecin[];
}

export async function getAllMedecinActif(): Promise<Medecin[]> {
    const response = await fetch(baseUrl + '/medecins/actif', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 404) {
        throw new Error("Aucun médecin trouvé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération des médecins actifs...")
    }
    const data = await response.json();
    return data["medecins"] as Medecin[];
}

export async function getAllMedecinInactif(): Promise<Medecin[]> {
    const response = await fetch(baseUrl + '/medecins/inactif', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 404) {
        throw new Error("Aucun médecin trouvé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération des utilisateurs inactifs...");
    }
    const data = await response.json();
    return data["medecins"] as Medecin[];
}

export async function getMedecinById(medecin_id: number): Promise<Medecin> {
    const response = await fetch(baseUrl + `/medecins/${medecin_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 404) {
        throw new Error("Aucun médecin avec cet id trouvé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération du médecin...")
    }
    const data = await response.json();
    return data['medecin'] as Medecin;
}

export async function getMedecinByUserId(user_id: number): Promise<Medecin> {
    const response = await fetch(baseUrl + `/medecins/${user_id}/byUser`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 404) {
        throw new Error("Aucun médecin enregistré pour cette utilisateur id...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération du médecin...")
    }
    const data = await response.json();
    return data['medecin'] as Medecin;
}

export async function getMedecinByEmail(email: string): Promise<Medecin> {
    const response = await fetch(baseUrl + `/medecins/${email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 404) {
        throw new Error("Aucun médecin trouvé avec cette e-mail...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération du médecin...");
    }
    const data = await response.json();
    return data['medecin'] as Medecin;
}

export async function createMedecin(newMedecin: MedecinRegister): Promise<Medecin> {
    const response = await fetch(baseUrl + '/medecins/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMedecin)
    });
    if (response.status == 404) {
        throw new Error("Problème survenue lors de l'enregistrement du médecin...")
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la création du médecin...")
    }
    const data = await response.json();
    return data['medecin'] as Medecin;
}

export async function updateMedecin(email: string, updatedMedecin: UpdateMedecin): Promise<Medecin> {
    const response = await fetch(baseUrl + `/medecins/${email}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedMedecin)
    });
    if (response.status == 404) {
        throw new Error("Problème survenue lors de la mise a jour du médecin...")
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la mise à jour du médecin...")
    }
    const data = await response.json();
    return data['medecin'] as Medecin;
}

export async function desactivateMedecin(email: string): Promise<any> {
    const response = await fetch(baseUrl + `/medecins/${email}/desactivate`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 404) {
        throw new Error("Aucun médecin trouvé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la désactivation du compte médecin...")
    }
    const data = await response.json();
    return data;
}

export async function deleteMedecin(email: string): Promise<any> {
    const response = await fetch(baseUrl + `/medecins/${email}/delete`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 404) {
        throw new Error("Aucun médecin trouvé...")
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la suppression du compte médecin...")
    }
    const data = await response.json();
    return data;
}

export interface UpdateMedecin {
    matricule: number,
    limitCustomer: number,
    speciality: string
}

export interface Medecin {
    actif: number,
    address: string,
    city: string,
    email: string,
    firstName: string,
    limitCustomer: number,
    matricule: number,
    medecin_id: number,
    name: string,
    password: string,
    speciality: string,
    userType: string,
    user_id: string,
    zipCode: string
}

export interface MedecinRegister {
    name: string,
    firstName: string,
    address: string,
    zipCode: number,
    city: string,
    email: string,
    password: string,
    userType: string,
    matricule: number,
    limiteClient: number,
    speciality: string
}
