# sprint-calendar-app

Prototype réalisé dans le cadre d'un sprint d'innovation : une application de calendrier cross-platform (web, iOS, Android) affichant des événements récupérés via une API.

## Stack

- **[Ionic](https://ionicframework.com/) + React** — composants UI et navigation
- **[Capacitor](https://capacitorjs.com/)** — packaging natif iOS/Android à partir du même code web
- **[FullCalendar](https://fullcalendar.io/)** (`@fullcalendar/react`) — affichage du calendrier (vues mois/semaine/liste)
- **Vite + TypeScript** — build et dev server
- **Vitest** / **Cypress** — tests unitaires et end-to-end
- **[Laravel](https://laravel.com/) + PostgreSQL** (dans [`server/`](server)) — API REST qui alimente le calendrier, via Docker (Sail)

## Structure

```
src/
  api/
    eventsApi.ts        # appelle l'API Laravel (server/) pour récupérer/créer des événements
  components/
    EventCalendar.tsx   # wrapper FullCalendar, charge les events par plage visible
  pages/
    Home.tsx            # page principale : calendrier + détail d'un événement au clic
```

`EventCalendar` appelle `fetchEvents(start, end)` à chaque changement de vue (mois/semaine/liste), pour ne charger que la plage de dates affichée plutôt que tous les événements d'un coup.

## Démarrer en local

```bash
npm install --legacy-peer-deps
npm run dev
```

L'app est servie sur http://localhost:5173.

> `--legacy-peer-deps` est nécessaire avec npm 10.x à cause d'un bug connu de résolution des peer dependencies sur les versions récentes de Vite/Vitest utilisées par ce starter.

## API (backend)

Le dossier [`server/`](server) contient une API Laravel + PostgreSQL, dédiée à alimenter ce calendrier. Elle tourne entièrement dans Docker (Laravel Sail) — pas besoin d'installer PHP ou Composer sur la machine.

```bash
cd server
docker compose up -d --build
docker compose exec laravel.test chmod -R ugo+rwX storage bootstrap/cache   # nécessaire une fois, cf. note ci-dessous
docker compose exec laravel.test php artisan migrate --force
docker compose exec laravel.test php artisan db:seed --force
```

L'API est servie sur http://localhost/api/events (`GET` avec `?start=&end=` en ISO 8601, `POST` pour créer un événement). Le seeder ([`database/seeders/EventSeeder.php`](server/database/seeders/EventSeeder.php)) n'insère les événements de démo que si la table est vide — sûr à relancer sur un environnement déjà peuplé.

> **Note Windows sans WSL2** : le script `vendor/bin/sail` refuse de tourner sous Git Bash, d'où l'usage direct de `docker compose`. Le conteneur PHP tourne avec un utilisateur non-root (`sail`) qui n'a par défaut pas les droits d'écriture sur `storage/` et `bootstrap/cache` montés depuis Windows — d'où le `chmod` ci-dessus, à refaire si le conteneur est reconstruit.

Côté frontend, `VITE_API_URL` (défaut : `http://localhost`) dans [`src/api/eventsApi.ts`](src/api/eventsApi.ts) pointe vers cette API.

## Builder pour mobile

```bash
npm run build
npx cap sync
npx cap open android   # ou: npx cap open ios (nécessite un Mac)
```

`capacitor.config.ts` définit l'`appId` (`ch.unil.sprintcalendar`) et le dossier web buildé (`dist`) utilisés pour générer les projets natifs.

## Tests

```bash
npm run test.unit   # Vitest
npm run test.e2e    # Cypress
```
