const baseUrl: string = 'http://34.38.134.11:5000/api/prescription';

export async function getAllPrescription(): Promise<Prescription[]> {
    const response = await fetch(baseUrl + '/prescriptions', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 404) {
        throw new Error("Aucune prescription trouvé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération des prescriptions...")
    }
    const data = await response.json();
    return data['Prescriptions'] as Prescription[];
}

export async function getPrescriptionById(prescription_id: number) : Promise<Prescription> {
    const response = await fetch(baseUrl + `/prescriptions/${prescription_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 404) {
        throw new Error("Aucune prescription trouvé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération de la prescription");
    }
    const data = await response.json();
    return data['Prescription'] as Prescription;
}

export async function getAllPrescriptionByUser(user_id: number): Promise<Prescription[]> {
    const response = await fetch(baseUrl + `/prescriptions/${user_id}/byuser`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 404) {
        throw new Error("Aucune prescription trouvé...");
    }else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération des prescription...")
    }
    const data = await response.json();
    return data['Prescriptions'] as Prescription[];
}

export async function getAllPrescriptionByMedecin(medecin_id: number) : Promise<Prescription[]> {
    const response = await fetch(baseUrl + `/prescriptions/${medecin_id}/bymedecin`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 404) {
        throw new Error("Aucune prescription trouvé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération des prescriptions...")
    }
    const data = await response.json();
    return data['Prescriptions'] as Prescription[];
}

export async function createPrescription(newPrescription: PrescriptionRegister): Promise<any> {
    const response = await fetch(baseUrl + `/prescriptions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPrescription)
    });
    if (response.status == 404) {
        throw new Error("Problème survenue lors de la création de la prescription...");
    }else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la création de la prescription...")
    }
    const data = await response.json();
    return data;
}

export async function updatePrescription(prescription_id: number, updatePrescription: UpdatedPrescription): Promise<Prescription> {
    const response = await fetch(baseUrl + `/prescriptions/${prescription_id}/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatePrescription)
    });
    if (response.status == 404) {
        throw new Error("Aucune prescription trouvé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la mise à jour de la prescription...")
    }
    const data = await response.json();
    return data["Prescription"] as Prescription;
}

export async function deletePrescription(prescription_id: number) : Promise<any> {
    const response = await fetch(baseUrl + `/prescriptions/${prescription_id}/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 404) {
        throw new Error("Aucune prescription trouvé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la suppression de la prescription...")
    }
    const data = await response.json();
    return data;
}

export interface UpdatedPrescription {
    liste: string,
    date_debut: string,
    date_fin: string
}

export interface PrescriptionRegister {
    medecin_email: string,
    user_email: string,
    liste: string,
    dateDebut: string,
    dateFin: string
}

export  interface Prescription {
    dateDebutTraitement: string,
    dateFinTraitement: string,
    listeMedicamentAndPodologie: string,
    medecin_id: number,
    prescription_id: number,
    user_id: number
}
