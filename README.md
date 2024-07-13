# BoolFlix

## Descrizione del Progetto

In questo progetto, replicheremo la logica di molti siti di streaming di film e serie TV utilizzando l'API di The Movie Database (TMDb). Questo ci permetterà di cercare e visualizzare film e serie TV basati su una query fornita dall'utente.

## Prerequisiti

1. Registrarsi su [The Movie Database](https://www.themoviedb.org) per ottenere una API_KEY.
2. La chiave API può essere richiesta cliccando sul proprio utente, poi impostazioni, API e cliccando su "Richiedi una nuova API key". La chiave sarà visibile in Impostazioni / API.

## Struttura del Progetto

Il progetto sarà suddiviso nelle seguenti milestone:

### Milestone 0: Progettare la Struttura del Global State

Progettare la struttura del global state seguendo gli esercizi precedenti.

### Milestone 1: Layout Base

Creare un layout base con una search bar (una input e un button) per cercare film.

- **Input:** Campo per scrivere il nome del film.
- **Button:** Bottone per effettuare la ricerca.
- **Risultati:** Visualizzare titolo, titolo originale, lingua e voto per ogni film trovato.

### Milestone 2: Gestione delle Lingue e Serie TV

1. Trasformare la stringa statica della lingua in una bandiera della nazione corrispondente.
2. Espandere la ricerca anche alle serie TV con valori simili.

### Milestone 3: Aggiungere le Copertine e Gestire i Voti

1. Aggiungere la copertina del film o della serie TV ai risultati.
2. Trasformare il voto da decimale (1-10) in un numero intero (1-5) e visualizzare stelle piene e vuote.

### Milestone 4: Creare una WebApp Completa

1. Creare un layout completo simile a Netflix:
    - Header con logo e search bar.
    - Risultati sotto forma di "card" con l'immagine di copertina.
    - Informazioni aggiuntive su hover, inclusa una overview.

### Consigli

- Seguire le milestone in ordine.
- Non preoccuparsi dell'interfaccia grafica fino alla milestone 4.
- Affrontare prima il caso base minimo.
- Evitare codice ripetuto, utilizzare funzioni.
- Scrivere codice chiaro e riutilizzabile.

### Risorse Utili

- [TMDb API Documentation](https://developers.themoviedb.org/3)
- [List of ISO 639-1 Codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)

## Milestone Opzionali

### Milestone 5: Aggiungere Cast e Generi

1. Richiedere all'API gli attori e i generi del film o serie TV.
2. Visualizzare i primi 5 attori con Nome e Cognome e i generi associati.

### Milestone 6: Filtrare per Generi

1. Creare una lista di generi richiedendoli all'API.
2. Creare filtri per mostrare/nascondere le schede basate sui generi.

## Licenza

Distribuito sotto la licenza MIT. Vedere `LICENSE` per maggiori dettagli.
