export async function sauvegarder(cle, donnees) {
    localStorage.setItem(cle, JSON.stringify(donnees));
}

export async function charger(cle) {
    const donneesJSON = localStorage.getItem(cle);
    if (donneesJSON === null) {
        return null;
    }
    return JSON.parse(donneesJSON);
}