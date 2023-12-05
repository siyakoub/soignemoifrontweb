const baseUrl: string = 'http://soigne-moi-app.fr:2000/api/session'

export async function getAllSession(): Promise<Session[]> {
    const response = await fetch(baseUrl + '/sessions', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 404) {
        throw new Error("Aucune session trouvé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération des sessions...")
    }
    const data = await response.json();
    return data["sessions"] as Session[];
}

export async function getSessionById(session_id: number) : Promise<Session> {
    const response = await fetch(baseUrl + `/sessions/${session_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 404) {
        throw new Error("Aucune session trouvé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération de la session...")
    }
    const data = await response.json();
    return data['Session'] as Session;
}

export async function getAllSessionByUser(email: string) : Promise<Session[]> {
    const response = await fetch(baseUrl + `/sessions/${email}` , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 404) {
        throw new Error("Aucune session trouvé pour cette utilisateur...")
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération des sessions...")
    }
    const data = await response.json();
    return data["Sessions"] as Session[];
}

export async function createSession(sessionRegister: SessionRegister): Promise<any> {
    const response = await fetch(baseUrl + '/sessions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sessionRegister)
    });
    if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la création de la session...")
    }
    const data = await response.json();
    return data;
}

export async function getSessionByToken(token: string): Promise<Session> {
    const response = await fetch(baseUrl + '/sessions/bytoken', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        }
    });
    if (response.status == 404) {
        throw new Error("Aucune session trouvé à partir de ce token...")
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération de la session...")
    }
    const data = await response.json();
    return data["Session"] as Session;
}

export async function deleteSessionById(session_id: string): Promise<any> {
    const response = await fetch(baseUrl + `/sessions/${session_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 404) {
        throw new Error("Aucune session trouvé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la suppression de la session...")
    }
}

export interface Session {
    dateHeureDebut: string,
    dateHeureFin: string,
    email: string,
    sessionID: number,
    token: string
}

export interface SessionRegister {
    emailUser: string
}
