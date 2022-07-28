const getLocale = () => document.documentElement.lang || (navigator.languages && navigator.languages[0]) || navigator.language || 'en'

export const locale = getLocale()

export const messages: Record<string, { [key: string]: string}> = {
  fr: {
    BlockImage__DOWNLOAD: "Télécharger une image",
    BlockImage__OR_DROP: "ou glisser-déposer une image",
    BlockImage__UPLOAD: "Sélectionnez une image depuis votre médiathèque",
    BlockImage__TITLE: "Titre de l'image",
    BlockImage__LINK: "Lien de l'image",
    BlockImage__LINK_PLACEHOLDER: "Lien au clic sur l'image",
    BlockImage__LIBRARY_MODAL_TITLE: "Rechercher une image",
    BlockImage__LIBRARY_MODAL_SEARCH: "Rechercher dans la médiathèque",
    BlockImage__LIBRARY_MODAL_CATEGORY_FILTER: "Filtrer par catégorie",

    REPLACE: "Remplacer",
    REPLACE_IMAGE: "Remplacer l'image",
    OPTIONAL: "Optionnel",
    CANCEL: "Annuler",
    DELETE: "Supprimer",
    SEARCH_BY: "Référence, nom, ...",
  },
  en: {
    BlockImage__DOWNLOAD: "Download an image",
    BlockImage__OR_DROP: "or drop an image",
    BlockImage__UPLOAD: "Select an image from your library",
    BlockImage__TITLE: "Image title",
    BlockImage__LINK: "Image link",
    BlockImage__LINK_PLACEHOLDER: "Link on click on image",
    BlockImage__LIBRARY_MODAL_TITLE: "Search an image",
    BlockImage__LIBRARY_MODAL_SEARCH: "Search in the library",
    BlockImage__LIBRARY_MODAL_CATEGORY_FILTER: "Filter by category",

    REPLACE: "Replace",
    REPLACE_IMAGE: "Replace image",
    OPTIONAL: "Optional",
    CANCEL: "Cancel",
    DELETE: "Delete",
    SEARCH_BY: "Reference, name, ...",
  },
  es: {
    BlockImage__DOWNLOAD: "Descargar una imagen",
    BlockImage__OR_DROP: "o arrastrar una imagen",
    BlockImage__UPLOAD: "Seleccionar una imagen de tu biblioteca",
    BlockImage__TITLE: "Título de la imagen",
    BlockImage__LINK: "Enlace de la imagen",
    BlockImage__LINK_PLACEHOLDER: "Enlace al hacer clic en la imagen",
    BlockImage__LIBRARY_MODAL_TITLE: "Buscar una imagen",
    BlockImage__LIBRARY_MODAL_SEARCH: "Buscar en la biblioteca",
    BlockImage__LIBRARY_MODAL_CATEGORY_FILTER: "Filtrar por categoría",

    REPLACE: "Reemplazar",
    REPLACE_IMAGE: "Reemplazar imagen",
    OPTIONAL: "Opcional",
    CANCEL: "Cancelar",
    DELETE: "Eliminar",
    SEARCH_BY: "Referencia, nombre, ...",
  },
  it: {
    BlockImage__DOWNLOAD: "Scarica un immagine",
    BlockImage__OR_DROP: "o trascina un immagine",
    BlockImage__UPLOAD: "Seleziona un immagine dalla tua libreria",
    BlockImage__TITLE: "Titolo dell immagine",
    BlockImage__LINK: "Link dell immagine",
    BlockImage__LINK_PLACEHOLDER: "Link al click sull immagine",
    BlockImage__LIBRARY_MODAL_TITLE: "Cerca un immagine",
    BlockImage__LIBRARY_MODAL_SEARCH: "Cerca nella libreria",
    BlockImage__LIBRARY_MODAL_CATEGORY_FILTER: "Filtra per categoria",

    REPLACE: "Sostituisci",
    REPLACE_IMAGE: "Sostituisci immagine",
    OPTIONAL: "Opzionale",
    CANCEL: "Annulla", 
    DELETE: "Elimina",
    SEARCH_BY: "Riferimento, nome, ...",
  }
}