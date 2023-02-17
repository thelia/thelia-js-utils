const getLocale = () =>
  document.documentElement.lang ||
  (navigator.languages && navigator.languages[0]) ||
  navigator.language ||
  "en";

export const locale = getLocale();

export const messages: Record<string, { [key: string]: string }> = {
  fr: {
    BlocksEditor__CREATE_A_NEW_THELIA_BLOCKS:
      "Création d'un nouveau Thelia Blocks",
    BlocksEditor__EDIT_A_THELIA_BLOCKS: "Edition d'un Thelia Blocks",
    BlocksEditor__BACK_TO_BLOCKS_LIST: "Retour à la liste des Thelia Blocks",
    BlocksEditor__LOADING: "Chargement de Thelia Blocks...",
    BlocksEditor__UNSAVED_LEAVE:
      "Les modifications que vous avez apportées ne seront peut-être pas enregistrées.",

    BlocksList__EXISTING_THELIA_BLOCKS: "Thelia Blocks existants",
    BlocksList__NO_THELIA_BLOCKS:
      "Vous n'avez pas encore créé de Thelia Blocks",
    BlocksList__ERROR_LOADING_THELIA_BLOCKS:
      "Erreur lors du chargement des Thelia Blocks",

    GroupTitle__BLOCK_NAME: "Nom de votre Thelia Blocks",
    GroupTitle__BLOCK_NAME_PLACEHOLDER:
      "Indiquez le nom de votre Thelia Blocks",
    GroupTitle__BLOCK_NAME_INFO:
      "Ce nom sera utilisé dans le titre de votre Thelia Blocks",

    GroupLocale__BLOCK_LOCALE: "Langue",
    GroupLocale__BLOCK_LOCALE_INFO:
      "Sélectionnez la langue de votre Thelia Blocks",

    AddBlocks__COLUMNS_NUMBER: "Choisissez le nombre de colonnes",
    AddBlocks__DROP_CONTENT:
      "Glissez-déposez le type de contenu souhaité depuis le menu de droite",
    AddBlocks__ADD_CONTENT: "Ajouter du contenu",
    AddBlocks__SELECT_CONTENT: "Choisissez le contenu souhaité",

    BlocksContent__EMPTY_BLOCK:
      "Vous n'avez pas encore de contenu dans votre Thelia Blocks. Pour commencer, sélectionnez un type de contenu depuis le menu latéral droit.",

    PreviewModal__TITLE: "Aperçu de votre Thelia Blocks",

    HTMLWarningModal__DESCRIPTION:
      "Ici un petit message pour informer sur l'utilisation de HTML directement dans le back-office. Ce message apparait en pop-in à chaque fois que l'utilisateur ajoute un bloc de HTML.",

    Toast__BLOCK_MUST_HAVE_A_NAME:
      "Vous devez indiquer un nom pour votre Thelia Blocks",
    Toast__NO_BLOCKS_TO_DISPLAY:
      "Vous ne pouvez pas prévisualiser un Thelia Blocks sans contenu",
    Toast__BLOCK_SAVED: "Votre Thelia Blocks a été enregistré avec succès",
    Toast__BLOCK_NOT_SAVED:
      "Une erreur est survenue lors de l'enregistrement de votre Thelia Blocks",
    Toast__BLOCK_DELETED: "Ce Thelia Blocks a été supprimé avec succès",
    Toast__BLOCK_NOT_DELETED:
      "Une erreur est survenue lors de la suppression de ce Thelia Blocks",
    Toast__ITEM_BLOCK_GROUP_DELETED:
      "Ce contenu lié a été supprimé avec succès",
    Toast__ITEM_BLOCK_GROUP_NOT_DELETED:
      "Une erreur est survenue lors de la suppression de ce contenu lié",
    Toast__ITEM_BLOCK_GROUP_LINKED: "Ce contenu a été lié avec succès",
    Toast__ITEM_BLOCK_GROUP_UNLINKED: "Ce contenu a été délié avec succès",
    Toast__TOOLBAR_PREVIEW_ERROR:
      "Une erreur est survenue lors de la prévisualisation de votre Thelia Blocks",

    BlockButton__TEXT: "Texte du bouton",
    BlockButton__TEXT_PLACEHOLDER: "Indiquez le texte du bouton",
    BlockButton__URL: "URL du bouton",
    BlockButton__URL_PLACEHOLDER: "Indiquez le lien du bouton",
    BlockButton__TYPE: "Type de bouton",

    BlockProduct__ADD_PRODUCT: "Ajouter un produit",
    BlockProduct__PRODUCT_LOADING: "Chargement du produit...",

    BlockCategory__ADD_CATEGORY: "Ajouter un catégorie",
    BlockCategory__CATEGORY_LOADING: "Chargement du catégorie...",

    BlockSeparator__STYLE: "Style du séparateur",
    BlockSeparator__SIZE: "Taille du séparateur",

    BlockHTML__HTML_PLACEHOLDER: "Indiquez votre code HTML",

    BlockText__TEXT_PLACEHOLDER: "Votre texte ici",
    BlockText__TEXT_LINK_MODAL_TITLE: "Sélectionnez un élément à insérer",
    BlockText__TEXT_INSERT_LINK: "Insérer un lien",
    BlockText__SEARCH_INFO:
      "Préfixez votre recherche par un # pour faire une recherche par référence",
    BlockText__LINK_LABEL: "Titre de votre lien",
    BlockText__LINK_LABEL_PLACEHOLDER: "Indiquez le titre de votre lien",
    BlockText__LINK_URL: "URL de votre lien",
    BlockText__LINK_URL_PLACEHOLDER: "Indiquez le lien de votre lien",

    BlockTitle__TEXT_PLACEHOLDER: "Votre titre ici",
    BlockTitle__LEVEL: "Niveau du titre",

    BlockVideo__TITLE: "Ajouter une vidéo depuis YouTube",
    BlockVideo__URL: "URL de la vidéo",
    BlockVideo__URL_PLACEHOLDER: "Indiquez l'URL de la vidéo",

    BlockAccordion__TITLE: "Titre de l'accordéon",
    BlockAccordion__TITLE_PLACEHOLDER: "Indiquez le titre de l'accordéon",
    BlockAccordion__ADD: "Ajouter un accordéon",

    LinkBlockToItem__LINK_GROUP: "Lier un groupe",
    LinkBlockToItem__LINK_GROUP_PLACEHOLDER: "Indiquez le nom du groupe",
    LinkBlockToItem__UNLINK_GROUP: "Délier ce groupe",

    BlockTable__ROWS: "Lignes",
    BlockTable__ROW: "Ligne",
    BlockTable__HEADER: "Entêtes",
    BlockTable__OPTIONS_TEXT: "Texte",
    BlockTable__OPTIONS_LINK: "Liens",
    BlockTable__SELECT_TYPE_LABEL: "Type de champs",
    BlockTable__FIELD_LABEL_LABEL: "Libellé",
    BlockTable__FIELD_LABEL_LINK: "Liens",
    BlockTable__FIELD_TITLE_LAYOUT: "Structure du tableau",
    BlockTable__FIELD_LABEL_LAYOUT_COL:
      "Selectionner le nombre de colonne que vous souhaitez.",
    BlockTable__FIELD_LABEL_LAYOUT_ROW:
      "Selectionner le nombre de ligne que vous souhaitez.",

    CREATE: "Créer",
    CONTENTS: "Contenus",
    BACK: "Retour",
    UNSUPPORTED_BLOCK: "Ce block n'est pas supporté par Thelia Blocks",
    UP: "Monter",
    DOWN: "Descendre",
    DELETE: "Supprimer",
    SELECT: "Sélectionnez",
    FOLD: "Replier",
    UNFOLD: "Déplier",
    SAVE: "Enregistrer",
    SAVING: "Enregistrement...",
    LOADING: "Chargement...",
    PREVIEW: "Prévisualiser",
    COLUMN: "Colonne",
    PRODUCT_SHEET: "Fiche produit",
    CATEGORY_SHEET: "Fiche catégorie",
    NO_RESULTS: "Aucun résultat",
    FOR: "pour",
    SEARCH: "Rechercher",
    SEARCH_BY: "Référence, nom, ...",
    SEARCH_BY_INFO:
      "Préfixez votre recherche par un # pour faire une recherche par référence",
    DO_NOT_SHOW_AGAIN: "Ne plus afficher ce message",
    I_UNDERSTOOD: "J'ai compris",
    SPACE: "Espace",
    BORDER: "Bordure",
    INSERT_LINK: "Insérer un lien",
    PRODUCTS: "Produits",
    FOLDERS: "Dossiers",
    CATEGORIES: "Catégories",
    LEVEL: "Niveau",
    NEUTRAL: "Neutre",
    DND_INFO: "Faites glisser l'élément pour le déplacer",
    ACCORDION: "Accordéon",
    ID: "ID",
    NAME: "Nom",
    TYPE: "Type",
    LINKED_CONTENTS: "contenus liés",
    NO_LINKED_CONTENTS: "Aucun contenu lié",
    LINKED_CONTENTS_LIST: "Liste des contenus liés",
    ACCESS_LINKED_CONTENT: "Accéder à ce contenu",
    EDIT_LINKED_CONTENT: "Modifier ce contenu",
    DELETE_LINKED_CONTENT: "Supprimer ce contenu lié",
    AVAILABLE_LOCALES: "Langues disponibles",
    ACTIONS: "Actions",
    TITLE: "Titre",
    NO_TITLE: "Aucun titre",
    DUPLICATE_BLOCK: "Dupliquer ce Thelia Blocks",
    COPY_SHORTCODE: "Copier le shortcode",
    COPY_ERROR: "Une erreur est survenue lors de la copie du shortcode",
    COPY_SUCCESS: "copié avec succès",
    DELETE_BLOCK: "Supprimer ce Thelia Blocks",
    EDIT_BLOCK: "Editer ce Thelia Blocks",
    OTHER: "autre",
    LINK: "Lier",
    UNLINK: "Délier",
    INSERT: "Insérer",
    PRIMARY: "Primaire",
    SECONDARY: "Secondaire",
    TERTIARY: "Tertiaire",
    BOLD: "Gras",
    ITALIC: "Italique",
    UNDERLINE: "Souligné",
    ALIGN_LEFT: "Aligné à gauche",
    ALIGN_CENTER: "Aligné au centre",
    ALIGN_RIGHT: "Aligné à droite",
    ORDERED_LIST: "Liste ordonnée",
    UNORDERED_LIST: "Liste non ordonnée",
    URL: "Lien",
    CONTENT_GROUP: "Contenu du groupe",
  },
  en: {
    BlocksEditor__CREATE_A_NEW_THELIA_BLOCKS: "Creation of a new Thelia Blocks",
    BlocksEditor__EDIT_A_THELIA_BLOCKS: "Edition of a Thelia Blocks",
    BlocksEditor__BACK_TO_BLOCKS_LIST: "Back to BlocksList",
    BlocksEditor__LOADING: "Thelia Blocks loading...",
    BlocksEditor__UNSAVED_LEAVE: "You have unfinished changes!",

    BlocksList__EXISTING_THELIA_BLOCKS: "Existing Thelia Blocks",
    BlocksList__NO_THELIA_BLOCKS: "You haven't created any Thelia Blocks yet",
    BlocksList__ERROR_LOADING_THELIA_BLOCKS:
      "Error while loading Thelia Blocks",

    GroupTitle__BLOCK_NAME: "Name of your Thelia Blocks",
    GroupTitle__BLOCK_NAME_PLACEHOLDER: "Enter the name of your Thelia Blocks",
    GroupTitle__BLOCK_NAME_INFO:
      "This name will be used in the title of your Thelia Blocks",

    GroupLocale__BLOCK_LOCALE: "Language",
    GroupLocale__BLOCK_LOCALE_INFO: "Select the language of your Thelia Blocks",

    AddBlocks__COLUMNS_NUMBER: "Choose the number of columns",
    AddBlocks__DROP_CONTENT:
      "Drop the type of content you want from the right menu",
    AddBlocks__ADD_CONTENT: "Add content",
    AddBlocks__SELECT_CONTENT: "Select the content you want",

    BlocksContent__EMPTY_BLOCK:
      "You don't have any content in your Thelia Blocks. To start, select a type of content from the right menu.",

    PreviewModal__TITLE: "Preview of your Thelia Blocks",

    HTMLWarningModal__DESCRIPTION:
      "Here is a little message to inform you about the use of HTML directly in the back-office. This message appears in a pop-in every time you add a block of HTML.",

    Toast__BLOCK_MUST_HAVE_A_NAME:
      "You must enter a name for your Thelia Blocks",
    Toast__NO_BLOCKS_TO_DISPLAY:
      "You can't preview a Thelia Blocks without content",
    Toast__BLOCK_SAVED: "Your Thelia Blocks has been saved successfully",
    Toast__BLOCK_NOT_SAVED: "An error occurred while saving your Thelia Blocks",
    Toast__BLOCK_DELETED: "This Thelia Blocks has been deleted successfully",
    Toast__BLOCK_NOT_DELETED:
      "An error occurred while deleting this Thelia Blocks",
    Toast__ITEM_BLOCK_GROUP_DELETED:
      "This content linked has been deleted successfully",
    Toast__ITEM_BLOCK_GROUP_NOT_DELETED:
      "An error occurred while deleting this linked content",
    Toast__ITEM_BLOCK_GROUP_LINKED: "This content has been linked successfully",
    Toast__ITEM_BLOCK_GROUP_UNLINKED:
      "This content has been unlinked successfully",
    Toast__TOOLBAR_PREVIEW_ERROR:
      "An error occurred while previewing your Thelia Blocks",

    BlockButton__TEXT: "Text of the button",
    BlockButton__TEXT_PLACEHOLDER: "Enter the text of the button",
    BlockButton__URL: "URL of the button",
    BlockButton__URL_PLACEHOLDER: "Enter the URL of the button",
    BlockButton__TYPE: "Type of the button",

    BlockProduct__ADD_PRODUCT: "Add a product",
    BlockProduct__PRODUCT_LOADING: "Loading product...",

    BlockCategory__ADD_CATEGORY: "Add a category",
    BlockCategory__CATEGORY_LOADING: "Loading category...",

    BlockSeparator__STYLE: "Style of the separator",
    BlockSeparator__SIZE: "Size of the separator",

    BlockHTML__HTML_PLACEHOLDER: "Enter the HTML code",

    BlockText__TEXT_PLACEHOLDER: "Your text here",
    BlockText__TEXT_LINK_MODAL_TITLE: "Select an element to insert",
    BlockText__TEXT_INSERT_LINK: "Insert a link",
    BlockText__SEARCH_INFO: "Prefix your search by a # to search by reference",
    BlockText__LINK_LABEL: "Label of the link",
    BlockText__LINK_LABEL_PLACEHOLDER: "Enter the label of the link",
    BlockText__LINK_URL: "URL of the link",
    BlockText__LINK_URL_PLACEHOLDER: "Enter the URL of the link",

    BlockTitle__TEXT_PLACEHOLDER: "Your title here",
    BlockTitle__LEVEL: "Title level",

    BlockVideo__TITLE: "Add a video from YouTube",
    BlockVideo__URL: "URL of the video",
    BlockVideo__URL_PLACEHOLDER: "Enter the URL of the video",

    BlockAccordion__TITLE: "Title of the accordion",
    BlockAccordion__TITLE_PLACEHOLDER: "Enter the title of the accordion",
    BlockAccordion__ADD: "Add an accordion",

    LinkBlockToItem__LINK_GROUP: "Link a group",
    LinkBlockToItem__LINK_GROUP_PLACEHOLDER: "Enter the name of the group",
    LinkBlockToItem__UNLINK_GROUP: "Unlink this group",

    BlockTable__ROWS: "Rows",
    BlockTable__ROW: "Row",
    BlockTable__HEADER: "Headers",
    BlockTable__OPTIONS_TEXT: "Text",
    BlockTable__OPTIONS_LINK: "Link",
    BlockTable__SELECT_TYPE_LABEL: "Field type",
    BlockTable__FIELD_LABEL_LABEL: "Label",
    BlockTable__FIELD_LABEL_LINK: "Link",
    BlockTable__FIELD_TITLE_LAYOUT: "Table structure",
    BlockTable__FIELD_LABEL_LAYOUT_COL: "Select the number of columns you want",
    BlockTable__FIELD_LABEL_LAYOUT_ROW: "Select the number of lines you want.",

    CREATE: "Create",
    CONTENTS: "Contents",
    BACK: "Back",
    UNSUPPORTED_BLOCK: "This block is not supported by Thelia Blocks",
    UP: "Up",
    DOWN: "Down",
    DELETE: "Delete",
    SELECT: "Select",
    FOLD: "Fold",
    UNFOLD: "Unfold",
    SAVE: "Save",
    SAVING: "Saving...",
    LOADING: "Loading...",
    PREVIEW: "Preview",
    COLUMN: "Column",
    PRODUCT_SHEET: "Product sheet",
    CATEGORY_SHEET: "Category sheet",
    NO_RESULTS: "No results",
    FOR: "for",
    SEARCH: "Search",
    SEARCH_BY: "Reference, name, ...",
    SEARCH_BY_INFO: "Prefix your search by a # to search by reference",
    DO_NOT_SHOW_AGAIN: "Do not show this message again",
    I_UNDERSTOOD: "I understood",
    SPACE: "Space",
    BORDER: "Border",
    INSERT_LINK: "Insert a link",
    PRODUCTS: "Products",
    FOLDERS: "Folders",
    CATEGORIES: "Categories",
    LEVEL: "Level",
    NEUTRAL: "Neutral",
    DND_INFO: "Drag and drop the element to move",
    ACCORDION: "Accordion",
    ID: "ID",
    NAME: "Name",
    TYPE: "Type",
    LINKED_CONTENTS: "linked contents",
    NO_LINKED_CONTENTS: "No linked contents",
    LINKED_CONTENTS_LIST: "Linked contents list",
    ACCESS_LINKED_CONTENT: "Access to this content",
    EDIT_LINKED_CONTENT: "Edit this content",
    DELETE_LINKED_CONTENT: "Delete this linked content",
    AVAILABLE_LOCALES: "Available locales",
    ACTIONS: "Actions",
    TITLE: "Title",
    NO_TITLE: "No title",
    DUPLICATE_BLOCK: "Duplicate this Thelia Blocks",
    COPY_SHORTCODE: "Copy the shortcode",
    COPY_ERROR: "An error occurred while copying the shortcode",
    COPY_SUCCESS: "copied successfully",
    DELETE_BLOCK: "Delete this Thelia Blocks",
    EDIT_BLOCK: "Edit this Thelia Blocks",
    OTHER: "other",
    LINK: "Link",
    UNLINK: "Unlink",
    INSERT: "Insert",
    PRIMARY: "Primary",
    SECONDARY: "Secondary",
    TERTIARY: "Tertiary",
    BOLD: "Bold",
    ITALIC: "Italic",
    UNDERLINE: "Underline",
    ALIGN_LEFT: "Align left",
    ALIGN_CENTER: "Align center",
    ALIGN_RIGHT: "Align right",
    ORDERED_LIST: "Ordered list",
    UNORDERED_LIST: "Unordered list",
    URL: "Link",
    CONTENT_GROUP: "Content group",
  },
  es: {
    BlocksEditor__CREATE_A_NEW_THELIA_BLOCKS:
      "Creación de un nuevo Thelia Blocks",
    BlocksEditor__EDIT_A_THELIA_BLOCKS: "Edición de un Thelia Blocks",
    BlocksEditor__LOADING: "Cargando Thelia Blocks...",

    BlocksList__EXISTING_THELIA_BLOCKS: "Thelia Blocks existentes",
    BlocksList__NO_THELIA_BLOCKS: "No has creado ningún Thelia Blocks todavía",
    BlocksList__ERROR_LOADING_THELIA_BLOCKS: "Error al cargar Thelia Blocks",

    GroupTitle__BLOCK_NAME: "Nombre de tu Thelia Blocks",
    GroupTitle__BLOCK_NAME_PLACEHOLDER:
      "Introduce el nombre de tu Thelia Blocks",
    GroupTitle__BLOCK_NAME_INFO:
      "Este nombre se utilizará en el título de tu Thelia Blocks",

    GroupLocale__BLOCK_LOCALE: "Idioma",
    GroupLocale__BLOCK_LOCALE_INFO: "Selecciona el idioma de tu Thelia Blocks",

    AddBlocks__COLUMNS_NUMBER: "Elige el número de columnas",
    AddBlocks__DROP_CONTENT:
      "Solta el tipo de contenido que quieres desde el menú derecho",
    AddBlocks__ADD_CONTENT: "Añade contenido",
    AddBlocks__SELECT_CONTENT: "Elige el contenido que quieres",

    BlocksContent__EMPTY_BLOCK:
      "No tienes ningún contenido en tu Thelia Blocks. Para comenzar, selecciona un tipo de contenido desde el menú derecho.",

    PreviewModal__TITLE: "Vista previa de tu Thelia Blocks",

    HTMLWarningModal__DESCRIPTION:
      "Aquí hay un pequeño mensaje para informarte sobre el uso de HTML directamente en el back-office. Este mensaje aparece en un pop-in cada vez que añades un bloque de HTML.",

    Toast__BLOCK_MUST_HAVE_A_NAME:
      "Debes introducir un nombre para tu Thelia Blocks",
    Toast__NO_BLOCKS_TO_DISPLAY:
      "No puedes previsualizar un Thelia Blocks sin contenido",
    Toast__BLOCK_SAVED: "Tu Thelia Blocks ha sido guardado con éxito",
    Toast__BLOCK_NOT_SAVED: "Ha ocurrido un error al guardar tu Thelia Blocks",
    Toast__BLOCK_DELETED: "Este Thelia Blocks ha sido eliminado con éxito",
    Toast__BLOCK_NOT_DELETED:
      "Ha ocurrido un error al eliminar este Thelia Blocks",
    Toast__ITEM_BLOCK_GROUP_DELETED:
      "Este contenido vinculado ha sido eliminado con éxito",
    Toast__ITEM_BLOCK_GROUP_NOT_DELETED:
      "Ha ocurrido un error al eliminar este contenido vinculado",
    Toast__ITEM_BLOCK_GROUP_LINKED:
      "Este contenido ha sido vinculado con éxito",
    Toast__ITEM_BLOCK_GROUP_UNLINKED:
      "Este contenido ha sido desvinculado con éxito",
    Toast__TOOLBAR_PREVIEW_ERROR:
      "Ha ocurrido un error al cargar la vista previa",

    BlockButton__TEXT: "Texto del botón",
    BlockButton__TEXT_PLACEHOLDER: "Introduce el texto del botón",
    BlockButton__URL: "URL del botón",
    BlockButton__URL_PLACEHOLDER: "Introduce la URL del botón",
    BlockButton__TYPE: "Tipo de botón",

    BlockProduct__ADD_PRODUCT: "Añade un producto",
    BlockProduct__PRODUCT_LOADING: "Cargando producto...",

    BlockCategory__ADD_CATEGORY: "Añade un categoría",
    BlockCategory__CATEGORY_LOADING: "Cargando categoría...",

    BlockSeparator__STYLE: "Estilo del separador",
    BlockSeparator__SIZE: "Tamaño del separador",

    BlockHTML__HTML_PLACEHOLDER: "Introduce el código HTML",

    BlockText__TEXT_PLACEHOLDER: "Tu texto aquí",
    BlockText__TEXT_LINK_MODAL_TITLE: "Elige un elemento para insertar",
    BlockText__TEXT_INSERT_LINK: "Insertar un enlace",
    BlockText__SEARCH_INFO:
      "Prefijate tu búsqueda con un # para buscar por referencia",
    BlockText__LINK_LABEL: "Label del enlace",
    BlockText__LINK_LABEL_PLACEHOLDER: "Introduce el label del enlace",
    BlockText__LINK_URL: "URL del enlace",
    BlockText__LINK_URL_PLACEHOLDER: "Introduce la URL del enlace",

    BlockTitle__TEXT_PLACEHOLDER: "Tu título aquí",
    BlockTitle__LEVEL: "Nivel de título",

    BlockVideo__TITLE: "Añade un vídeo de YouTube",
    BlockVideo__URL: "URL del vídeo",
    BlockVideo__URL_PLACEHOLDER: "Introduce la URL del vídeo",

    BlockAccordion__TITLE: "Título del acordeón",
    BlockAccordion__TITLE_PLACEHOLDER: "Introduce el título del acordeón",
    BlockAccordion__ADD: "Añade un acordeón",

    LinkBlockToItem__LINK_GROUP: "Vincula un grupo",
    LinkBlockToItem__LINK_GROUP_PLACEHOLDER: "Elige un grupo",
    LinkBlockToItem__UNLINK_GROUP: "Desvincula este grupo",

    BlockTable__ROWS: "Líneas",
    BlockTable__ROW: "Línea",
    BlockTable__HEADER: "Cabeceras",
    BlockTable__OPTIONS_TEXT: "Texto",
    BlockTable__OPTIONS_LINK: "Enlaces",
    BlockTable__SELECT_TYPE_LABEL: "Tipo de campo",
    BlockTable__FIELD_LABEL_LABEL: "Redacción",
    BlockTable__FIELD_LABEL_LINK: "Enlaces",
    BlockTable__FIELD_TITLE_LAYOUT: "Estructura de la tabla",
    BlockTable__FIELD_LABEL_LAYOUT_COL:
      "Seleccione el número de columnas que desea",
    BlockTable__FIELD_LABEL_LAYOUT_ROW:
      "Seleccione el número de filas que desea",

    CREATE: "Crear",
    CONTENTS: "Contenidos",
    BACK: "Atrás",
    UNSUPPORTED_BLOCK: "Este bloque no es soportado por Thelia Blocks",
    UP: "Arriba",
    DOWN: "Abajo",
    DELETE: "Eliminar",
    SELECT: "Seleccionar",
    FOLD: "Plegar",
    UNFOLD: "Desplegar",
    SAVE: "Guardar",
    SAVING: "Guardando...",
    LOADING: "Cargando...",
    PREVIEW: "Vista previa",
    COLUMN: "Columna",
    PRODUCT_SHEET: "Hoja de producto",
    CATEGORY_SHEET: "Hoja de categoría",
    NO_RESULTS: "No hay resultados",
    FOR: "para",
    SEARCH: "Buscar",
    SEARCH_BY: "Referencia, nombre, ...",
    SEARCH_BY_INFO: "Prefijate tu búsqueda con un # para buscar por referencia",
    DO_NOT_SHOW_AGAIN: "No volver a mostrar este mensaje",
    I_UNDERSTOOD: "Entiendo",
    SPACE: "Espacio",
    BORDER: "Borde",
    INSERT_LINK: "Insertar un enlace",
    PRODUCTS: "Productos",
    FOLDERS: "Carpetas",
    CATEGORIES: "Categorías",
    LEVEL: "Nivel",
    NEUTRAL: "Neutral",
    DND_INFO: "Arrastra y suelta el elemento para mover",
    ACCORDION: "Accordion",
    ID: "ID",
    NAME: "Nombre",
    TYPE: "Tipo",
    LINKED_CONTENTS: "contenidos vinculados",
    NO_LINKED_CONTENTS: "No hay contenidos vinculados",
    NO_LINKED_CONTENTS_INFO: "No hay contenidos vinculados a este elemento",
    LINKED_CONTENTS_LIST: "Lista de contenidos vinculados",
    ACCESS_LINKED_CONTENT: "Acceder al contenido",
    EDIT_LINKED_CONTENT: "Editar contenido vinculado",
    DELETE_LINKED_CONTENT: "Eliminar contenido vinculado",
    AVAILABLE_LOCALES: "Idiomas disponibles",
    ACTIONS: "Acciones",
    TITLE: "Título",
    NO_TITLE: "Sin título",
    DUPLICATE_BLOCK: "Duplicar este Thelia Blocks",
    COPY_SHORTCODE: "Copiar código",
    COPY_ERROR: "Error al copiar el código",
    COPY_SUCCESS: "copiado con éxito",
    DELETE_BLOCK: "Eliminar este Thelia Blocks",
    EDIT_BLOCK: "Editar este Thelia Blocks",
    OTHER: "otro",
    LINK: "Enlace",
    UNLINK: "Desvincular",
    INSERT: "Insertar",
    PRIMARY: "Primario",
    SECONDARY: "Secundario",
    TERTIARY: "Terciario",
    BOLD: "Negrita",
    ITALIC: "Cursiva",
    UNDERLINE: "Subrayado",
    ALIGN_LEFT: "Alinear a la izquierda",
    ALIGN_CENTER: "Alinear al centro",
    ALIGN_RIGHT: "Alinear a la derecha",
    ORDERED_LIST: "Lista ordenada",
    UNORDERED_LIST: "Lista desordenada",
    URL: "Enlace",
    CONTENT_GROUP: "Contenido del grupo",
  },
  it: {
    BlocksEditor__CREATE_A_NEW_THELIA_BLOCKS:
      "Creazione di un nuovo Thelia Blocks",
    BlocksEditor__EDIT_A_THELIA_BLOCKS: "Modifica di un Thelia Blocks",
    BlocksEditor__LOADING: "Thelia Blocks caricamento...",

    BlocksList__EXISTING_THELIA_BLOCKS: "Thelia Blocks esistenti",
    BlocksList__NO_THELIA_BLOCKS: "Non hai ancora creato nessun Thelia Blocks",
    BlocksList__ERROR_LOADING_THELIA_BLOCKS:
      "Errore nel caricamento dei Thelia Blocks",

    GroupTitle__BLOCK_NAME: "Nome del tuo Thelia Blocks",
    GroupTitle__BLOCK_NAME_PLACEHOLDER:
      "Inserisci il nome del tuo Thelia Blocks",
    GroupTitle__BLOCK_NAME_INFO:
      "Questo nome verrà utilizzato nel titolo del tuo Thelia Blocks",

    GroupLocale__BLOCK_LOCALE: "Lingua",
    GroupLocale__BLOCK_LOCALE_INFO: "Seleziona la lingua del tuo Thelia Blocks",

    AddBlocks__COLUMNS_NUMBER: "Scegli il numero di colonne",
    AddBlocks__DROP_CONTENT:
      "Rilascia il tipo di contenuto che vuoi dal menu a destra",
    AddBlocks__ADD_CONTENT: "Aggiungi contenuto",
    AddBlocks__SELECT_CONTENT: "Scegli il contenuto che vuoi",

    BlocksContent__EMPTY_BLOCK:
      "Non hai nessun contenuto nel tuo Thelia Blocks. Per iniziare, seleziona un tipo di contenuto dal menu a destra.",

    PreviewModal__TITLE: "Anteprima del tuo Thelia Blocks",

    HTMLWarningModal__DESCRIPTION:
      "Qui c'è un piccolo messaggio per informarti sull'uso di HTML direttamente nel back-office. Questo messaggio compare in un pop-in ogni volta che aggiungi un blocco di HTML.",

    Toast__BLOCK_MUST_HAVE_A_NAME:
      "Devi inserire un nome per il tuo Thelia Blocks",
    Toast__NO_BLOCKS_TO_DISPLAY:
      "Non puoi visualizzare un Thelia Blocks senza contenuto",
    Toast__BLOCK_SAVED: "Il tuo Thelia Blocks è stato salvato con successo",
    Toast__BLOCK_NOT_SAVED:
      "Si è verificato un errore durante il salvataggio del tuo Thelia Blocks",
    Toast__BLOCK_DELETED: "Questo Thelia Blocks è stato eliminato con successo",
    Toast__BLOCK_NOT_DELETED:
      "Si è verificato un errore durante l'eliminazione di questo Thelia Blocks",
    Toast__ITEM_BLOCK_GROUP_DELETED:
      "Questo contenuto vincolato è stato eliminato con successo",
    Toast__ITEM_BLOCK_GROUP_NOT_DELETED:
      "Si è verificato un errore durante l'eliminazione di questo contenuto vincolato",
    Toast__ITEM_BLOCK_GROUP_LINKED:
      "Questo contenuto è stato vincolato con successo",
    Toast__ITEM_BLOCK_GROUP_UNLINKED:
      "Questo contenuto è stato scollegato con successo",
    Toast__TOOLBAR_PREVIEW_ERROR:
      "Si è verificato un errore durante la visualizzazione dell'anteprima",

    BlockButton__TEXT: "Testo del bottone",
    BlockButton__TEXT_PLACEHOLDER: "Inserisci il testo del bottone",
    BlockButton__URL: "URL del bottone",
    BlockButton__URL_PLACEHOLDER: "Inserisci l'URL del bottone",
    BlockButton__TYPE: "Tipo di bottone",

    BlockProduct__ADD_PRODUCT: "Aggiungi un prodotto",
    BlockProduct__PRODUCT_LOADING: "Caricamento del prodotto...",

    BlockCategory__ADD_CATEGORY: "Aggiungi un categoria",
    BlockCategory__CATEGORY_LOADING: "Caricamento del categoria...",

    BlockSeparator__STYLE: "Stile del separatore",
    BlockSeparator__SIZE: "Dimensione del separatore",

    BlockHTML__HTML_PLACEHOLDER: "Inserisci il codice HTML",

    BlockText__TEXT_PLACEHOLDER: "Il tuo testo qui",
    BlockText__TEXT_LINK_MODAL_TITLE: "Scegli un elemento da inserire",
    BlockText__TEXT_INSERT_LINK: "Inserisci un link",
    BlockText__SEARCH_INFO:
      "Prefissa la tua ricerca con un # per cercare per riferimento",
    BlockText__LINK_LABEL: "Label del link",
    BlockText__LINK_LABEL_PLACEHOLDER: "Inserisci il label del link",
    BlockText__LINK_URL: "URL del link",
    BlockText__LINK_URL_PLACEHOLDER: "Inserisci l'URL del link",

    BlockTitle__TEXT_PLACEHOLDER: "Il tuo titolo qui",
    BlockTitle__LEVEL: "Livello del titolo",

    BlockVideo__TITLE: "Aggiungi un video di YouTube",
    BlockVideo__URL: "URL del video",
    BlockVideo__URL_PLACEHOLDER: "Inserisci l'URL del video",

    BlockAccordion__TITLE: "titolo dell'accordion",
    BlockAccordion__TITLE_PLACEHOLDER: "Inserisci il titolo dell'accordion",
    BlockAccordion__ADD: "Aggiungi un accordion",

    LinkBlockToItem__LINK_GROUP: "Vincola un gruppo",
    LinkBlockToItem__LINK_GROUP_PLACEHOLDER: "Scegli un gruppo",
    LinkBlockToItem__UNLINK_GROUP: "Scollega questo gruppo",

    BlockTable__ROWS: "Linee",
    BlockTable__ROW: "Linea",
    BlockTable__HEADER: "Intestazioni",
    BlockTable__OPTIONS_TEXT: "Testo",
    BlockTable__OPTIONS_LINK: "Collegamenti",
    BlockTable__SELECT_TYPE_LABEL: "Tipo di campo",
    BlockTable__FIELD_LABEL_LABEL: "Formulazione",
    BlockTable__FIELD_LABEL_LINK: "Collegamenti",
    BlockTable__FIELD_TITLE_LAYOUT: "Struttura della tabella",
    BlockTable__FIELD_LABEL_LAYOUT_COL:
      "Selezionare il numero di colonne desiderato",
    BlockTable__FIELD_LABEL_LAYOUT_ROW:
      "Selezionare il numero di righe desiderato",

    CREATE: "Crea",
    CONTENTS: "Contenuti",
    BACK: "Indietro",
    UNSUPPORTED_BLOCK: "Questo blocco non è supportato da Thelia Blocks",
    UP: "Su",
    DOWN: "Giù",
    DELETE: "Elimina",
    SELECT: "Seleziona",
    FOLD: "Apri",
    UNFOLD: "Chiudi",
    SAVE: "Salva",
    SAVING: "Salvataggio...",
    LOADING: "Caricamento...",
    PREVIEW: "Anteprima",
    COLUMN: "Colonna",
    PRODUCT_SHEET: "Foglio di prodotto",
    CATEGORY_SHEET: "Foglio di categoria",
    NO_RESULTS: "Nessun risultato",
    FOR: "per",
    SEARCH: "Cerca",
    SEARCH_BY: "Riferimento, nome, ...",
    SEARCH_BY_INFO:
      "Prefissa la tua ricerca con un # per cercare per riferimento",
    DO_NOT_SHOW_AGAIN: "Non mostrare più questo messaggio",
    I_UNDERSTOOD: "Ho capito",
    SPACE: "Spazio",
    BORDER: "Bordo",
    INSERT_LINK: "Inserisci un link",
    PRODUCTS: "Prodotti",
    FOLDERS: "Cartelle",
    CATEGORIES: "Categorie",
    LEVEL: "Livello",
    NEUTRAL: "Neutro",
    DND_INFO: "Trascina e rilascia l'elemento per spostarlo",
    ACCORDION: "Accordion",
    ID: "ID",
    NAME: "Nome",
    TYPE: "Tipo",
    LINKED_CONTENTS: "contenuti vincolati",
    NO_LINKED_CONTENTS: "Non ci sono contenuti vincolati",
    LINKED_CONTENTS_LIST: "Lista dei contenuti vincolati",
    ACCESS_LINKED_CONTENT: "Accedi al contenuto",
    EDIT_LINKED_CONTENT: "Modifica il contenuto",
    DELETE_LINKED_CONTENT: "Elimina il contenuto vincolato",
    AVAILABLE_LOCALES: "Lingue disponibili",
    ACTIONS: "Azioni",
    TITLE: "Titolo",
    NO_TITLE: "Nessun titolo",
    DUPLICATE_BLOCK: "Duplica questo Thelia Blocks",
    COPY_SHORTCODE: "Copia il shortcode",
    COPY_ERROR: "Si è verificato un errore durante la copia del shortcode",
    COPY_SUCCESS: "copiato con successo",
    DELETE_BLOCK: "Elimina questo Thelia Blocks",
    EDIT_BLOCK: "Modifica questo Thelia Blocks",
    OTHER: "altro",
    LINK: "Link",
    UNLINK: "Scollega",
    INSERT: "Inserisci",
    PRIMARY: "Primario",
    SECONDARY: "Secondario",
    TERTIARY: "Terziario",
    BOLD: "Grassetto",
    ITALIC: "Corsivo",
    UNDERLINE: "Sottolineato",
    ALIGN_LEFT: "Allinea a sinistra",
    ALIGN_CENTER: "Allinea al centro",
    ALIGN_RIGHT: "Allinea a destra",
    ORDERED_LIST: "Elenco ordinato",
    UNORDERED_LIST: "Elenco non ordinato",
    URL: "Link",
    CONTENT_GROUP: "Contenuto del gruppo",
  },
};
