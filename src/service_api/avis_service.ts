const baseUrl : string = 'http://104.199.34.146:5000/api/avis'

export async function getAllAvis(): Promise<Avis[]> {
    const response = await fetch(baseUrl + '/avis', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 404) {
        throw new Error("Aucun avis trouvé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération des avis...")
    }
    const data = await response.json();
    return data['Avis'] as Avis[];
}

export async function getAvisById(avis_id: number) : Promise<Avis> {
    const response = await fetch(baseUrl + `/avis/${avis_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 404) {
        throw new Error("Aucun avis trouvé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération de l'avis...")
    }
    const data = await response.json();
    return data['Avis'] as Avis;
}

export async function getAllAvisByUser(user_id: number) : Promise<Avis[]> {
    const response = await fetch(baseUrl + `/avis/${user_id}/byuser`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 404) {
        throw new Error("Aucun avis trouvé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la recupération des avis...")
    }
    const data = await response.json();
    return data['Avis'] as Avis[];
}

export async function getAllAvisbyMedecin(medecin_id: number): Promise<Avis[]> {
    const response = await fetch(baseUrl + `/avis/${medecin_id}/onmedecin`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 404) {
        throw new Error("Aucun avis trouvé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération des avis...");
    }
    const data = await response.json();
    return data['Avis'] as Avis[];
}

export async function createAvis(newAvis: AvisRegister) : Promise<any> {
    const response = await fetch(baseUrl + '/avis', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAvis)
    });
    if (response.status == 404) {
        throw new Error("Un Problème est survenue lors de la création de l'avis...")
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la création de l'avis...")
    }
    const data = await response.json();
    return data;
}

export async function updateAvis(avis_id: number, updateAvis: AvisUpdate): Promise<Avis> {
    const response = await fetch(baseUrl + `/avis/${avis_id}/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 404) {
        throw new Error("Aucun avis trouvé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la mise à jour de l'avis...")
    }
    const data= await response.json();
    return data['Avis'] as Avis;
}

export async function deleteAvis(avis_id: number): Promise<any> {
    const response = await fetch(baseUrl + `/avis/${avis_id}/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 404) {
        throw new Error("Aucun avis trouvé...")
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la suppresion de l'avis...")
    }
    const data = await response.json();
    return data;
}

export interface AvisRegister{
    user_email: string,
    medecin_email: string,
    note: string,
    date_avis: string,
    description_avis: string
}

export interface AvisUpdate {

}

export interface Avis {
    avis_id: number,
    dateAvis: string,
    descriptionAvis: string,
    libelle: string,
    medecin_id: number,
    note: number,
    user_id: number
}
