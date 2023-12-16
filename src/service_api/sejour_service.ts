const baseUrl : string = 'http://127.0.0.1:5000/api/sejour';

export async function getAllSejour(): Promise<Sejour[]> {
    const response = await fetch(baseUrl + '/sejours', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 404) {
        throw new Error("Aucun séjour trouvé...")
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération des séjours...")
    }
    const data = await response.json();
    return data["Sejours"] as Sejour[];
}

export async function getSejourById(sejour_id: number) : Promise<Sejour> {
    const response = await fetch(baseUrl + `/sejours/${sejour_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 404) {
        throw new Error("Aucun séjour trouvé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération du séjour...")
    }
    const data = await response.json();
    return data['Sejour'] as Sejour;
}

export async function getAllSejourByUser(user_id: number): Promise<Sejour[]> {
    const response = await fetch(baseUrl + `/sejours/${user_id}/byuser`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status === 404) {
        throw Error("Aucun séjoue trouvé pour cette utilisateur...");
    } else if (!response.ok) {
        throw Error("Une erreur est survenue lors de la récupération des séjours de l'utilisateur...")
    }
    const data = await response.json();
    return data['Sejours'] as Sejour[];
}

export async function getAllSejourByMedecin(medecin_id: number): Promise<Sejour[]> {
    const response = await fetch(baseUrl + `/sejours/${medecin_id}/formedecin`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 404) {
        throw new Error("Aucun séjour trouvé pour ce médecin...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération des sejours...")
    }
    const data = await response.json();
    return data['Sejours'] as Sejour[];
}

export async function createSejour(newSejour: SejourRegister): Promise<any> {
    const response = await fetch(baseUrl + '/sejours', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSejour)
    });
    if (response.status == 404) {
        throw new Error("un Problème est survenue lors de la création du séjour...")
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la création du séjour...")
    }
    const data = await response.json();
    return data;
}

export async function updateSejour(sejour_id: number, updateSejour: UpdateSejour): Promise<Sejour> {
    const response = await fetch(baseUrl + `/sejour/${sejour_id}/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateSejour)
    });
    if (response.status == 404) {
        throw new Error("Aucun séjour trouvé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la mise à jour du séjour...");
    }
    const data = await response.json();
    return data['Sejour'] as Sejour;
}

export async function deleteSejour(sejour_id: number): Promise<any> {
    const response = await fetch(baseUrl + `/sejours/${sejour_id}/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 404) {
        throw new Error("Aucun séjour trouvé...");
    } else if (response.ok) {
        throw new Error("Une erreur est survenue lors de la suppression du séjour...")
    }
    const data = await response.json();
    return data;
}

export interface UpdateSejour {
    date_debut: string,
    date_fin: string,
    motif: string,
    speciality: string
}

export interface SejourRegister{
    user_email: string,
    medecin_email: string,
    date_debut: string,
    date_fin: string,
    motif: string,
    speciality: string
}

export interface Sejour {
    dateDebut: string,
    dateFin: string,
    medecin_id: string,
    motif: string,
    sejour_id: string,
    speciality: string,
    user_id: string
}
