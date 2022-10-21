# Locales

## Gestion des langues

Ce module permet d'ajouter la gestion des langues au sein d'un composant Thelia développé avec React.

## Mise en place

### Contexte

Il est nécessaire d'englober votre module par le contexte Provider exporté dans ce package.

```js
<LocaleProvider locales={locales/*liste des locales*/}>
    <App/>
</LocaleProvider>
```

Ce contexte prend en paramètre un tableau de langue permettant de configurer les langues disponibles. Voici le format
attendu pour chaque élément du tableau :

```ts
type Locale = {
    id: number;
    title: string; //Français
    code: string; //fr
    locale: string; //fr-FR
    active: boolean; //true, pour la valeur initial 
};
```

Ces informations peuvent être récupérées depuis la loop Thelia `lang`.

```
{$locales=[]}
{loop type="lang" name="get-locales"}
    {$locales[] = [
        'id' => $ID,
        'title' => $TITLE,
        'code' => $CODE,
        'locale' => $LOCALE,
        'active' => $IS_DEFAULT
    ]}
{/loop}
```

### Sélecteur

Le composant `<LocaleSwitch />` exporté dans ce package permet d'ajouter un sélecteur de langue à l'endroit choisi. Les
langues disponibles seront celles configurées dans le contexte à l'étape précédente, il prend un paramètre l'url à
laquelle se trouvent les images des drapeaux des pays dans Thelia.

### Récupération de la valeur

La valeur actuellement sélectionné depuis le contexte peut être récupéré de ctte façon :

```js
    import {LocaleContext} from "@thelia/locales"
/*...*/
const {currentLocale} = useContext(LocaleContext);
```

### TODO

- Meilleure gestion des assets (image et styles)