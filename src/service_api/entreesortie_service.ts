const baseUrl: string = 'https://api.soigne-moi-app.fr/api/entreesortie';

export async function getAllEntreeSortie(): Promise<EntreesSorties[]> {
    const response = await fetch(baseUrl + '/entreessorties', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 404) {
        throw new Error("Aucune Entrée Sortie trouvé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération des entrées sorties...")
    }
    const data = await response.json();
    return data['EntreesSorties'] as EntreesSorties[];
}

export async function getEntreeSortieById(entreesortie_id: number) : Promise<EntreesSorties> {
    const response = await fetch(baseUrl + `/entreessorties/${entreesortie_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 404) {
        throw new Error("Aucune Entrée Sortie trouvé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération de l'Entrée Sortie...")
    }
    const data = await response.json();
    return data['EntreeSortie'] as EntreesSorties
}

export async function getAllEntreesSortiesByUser(user_id: number) : Promise<EntreesSorties[]> {
    const response = await fetch(baseUrl + `/entreessorties/${user_id}/byuser`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 404) {
        throw new Error("Aucune Entrée Sortie trouvé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération des Entrées Sorties...")
    }
    const data = await response.json();
    return data["EntreesSorties"] as EntreesSorties[];
}

export async function getAllEntreeSortieBySejour(sejour_id: number): Promise<EntreesSorties[]> {
    const response = await fetch(baseUrl + `/entreessorties/${sejour_id}/bysejour`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 404) {
        throw new Error("Aucune Entrée Sortie trouvé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération des Entrées Sorties...")
    }
    const data = await response.json();
    return data['EntreesSorties'] as EntreesSorties[];
}

export async function createEntreeSortie(entreesSortiesRegister: EntreesSortiesRegister) : Promise<any> {
    const response = await fetch(baseUrl + `/entreessorties`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(entreesSortiesRegister)
    });
    if (response.status == 404) {
        throw new Error("Problème lors de la création de l'Entrée Sortie...");
    }else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la création de l'Entrée Sortie...")
    }
    const data = await response.json();
    return data;
}

export async function updateEntreeSortie(entreesortie_id: number, updateEntreeSortie: UpdatedEntreeSortie): Promise<EntreesSorties> {
    const response = await fetch(baseUrl + `/entreessorties/${entreesortie_id}/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateEntreeSortie)
    });
    if (response.status == 404) {
        throw new Error("Aucune Entrée Sortie trouvé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la mise à jour de l'Entrée Sortie...")
    }
    const data = await response.json();
    return data['EntreeSortie'] as EntreesSorties;
}

export async function deleteEntreeSorite(entreessorties_id: number): Promise<any> {
    const response = await fetch(baseUrl + `/entreessorties/${entreessorties_id}/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 404) {
        throw new Error("Aucune entrée sortie trouvé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la suppression de l'entrée sortie...")
    }
    const data = await response.json();
    return data;
}

export interface UpdatedEntreeSortie {
    dateDebut: string,
    dateFin: string
}

export interface EntreesSorties {
    dateEntre: string,
    dateSortie: string,
    entresortie_id: string,
    sejour_id: string,
    user_id: string
}

export interface EntreesSortiesRegister{
    user_email: string,
    sejour_id: number,
    DateDebut: string,
    DateFin: string
}
