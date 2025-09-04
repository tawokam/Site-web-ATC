// Fonction pour charger et appliquer les traductions
async function changeLanguage(lang) {
    try {
        console.log('Tentative de chargement de la langue:', lang);

        // CHEMIN CORRIGÉ : ../lang/ depuis le dossier js/
        const response = await fetch(`../solutech/assets/lang/${lang}.json`);

        if (!response.ok) {
            throw new Error(`Fichier non trouvé: ${response.status} ${response.statusText}`);
        }

        const translations = await response.json();
        console.log('Traductions chargées:', translations);

        // Appliquer les traductions
        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            if (translations[key]) {
                element.textContent = translations[key];
            } else {
                console.warn('Traduction manquante pour la clé:', key);
            }
        });

       // const ElementChangeLang = localStorage.getItem('ElementChangeLang') || 'langue';
        // Changer l'attribut lang de la page
        document.documentElement.lang = lang;//document.getElementById(ElementChangeLang).value;

        console.log('Langue changée avec succès:', lang);
    } catch (error) {
        console.error('Erreur détaillée:', error);
        alert(`Erreur de chargement de la langue ${lang}. Vérifiez la console pour plus de détails.`);
    }
}

// Gestionnaire pour le sélecteur de langue
//document.getElementById('langue').addEventListener('change',
function langues(para = "langue") {
    const selectedLang = document.getElementById(`${para}`).value;
    console.log('Langue sélectionnée:', selectedLang);

    // Sauvegarder la préférence
    localStorage.setItem('preferredLang', selectedLang);
   // localStorage.setItem('ElementChangeLang', para);
    // Appliquer la nouvelle langue
    changeLanguage(selectedLang);
}

// Charger la langue au démarrage
document.addEventListener('DOMContentLoaded', function () {
    const savedLang = localStorage.getItem('preferredLang') || 'fr';

    // Définir la valeur du select
    const langueSelect = document.getElementById('langue');
    if (langueSelect) {
        langueSelect.value = savedLang;
    }

    const langueSelectMobil = document.getElementById('langueMobile');
    if (langueSelectMobil) {
        langueSelectMobil.value = savedLang;
    }

    // Charger les traductions de la langue sauvegardée
    changeLanguage(savedLang);
});