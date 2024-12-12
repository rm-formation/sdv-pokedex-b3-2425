export default class DAO {
    static async sauvegarder(cle, donnees) {
        localStorage.setItem(cle, JSON.stringify(donnees));
    }

    static async charger(cle) {
        const donneesJSON = localStorage.getItem(cle);
        if (donneesJSON === null) {
            return null;
        }
        return JSON.parse(donneesJSON);
    }
}