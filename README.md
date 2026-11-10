# Elden Ring Bosses

Elden Ring Bosses is a school project built with Vue 3 and Vuetify. It helps players explore bosses from Elden Ring, view their information, save favorites, and track completed encounters on an interactive map.

**Live application:**  
https://294-projet-elden-ring-malyvol.vercel.app/

---

## 1. Project presentation

### Concept

Elden Ring contains many bosses spread across different regions. This application brings boss information together in one place, with a catalog inspired by a Pokédex.

The project is intended for Elden Ring players who want to explore bosses, find information about them, and track encounters.

### API choice

The application uses the [Divtec Elden Ring API](https://apis.divtec.me/api/elden-ring/docs#/bosses/get_api_elden_ring_bosses). It provides information such as boss names, descriptions, locations, health points, and drops.

I chose this API because its boss data fits the main goal of the project: creating a catalog of Elden Ring bosses.

### Main features

- Browse a list of bosses loaded from the API.
- View boss cards with images and information.
- Search bosses by name.
- Filter bosses by region.
- Sort bosses alphabetically.
- Navigate through the catalog using pagination.
- Open a detail page for each boss.
- Add and remove bosses from favorites.
- Save favorites in the browser using `localStorage`.
- Explore boss markers on an interactive map.
- View boss information by hovering over a marker.
- Mark encounters as defeated and save their status locally.


---

## 2. Learning journey

### Resources used

- [Vue 3 documentation](https://vuejs.org/guide/introduction.html)
- [Vuetify documentation](https://vuetifyjs.com/en/components/all/)
- [Pinia documentation](https://pinia.vuejs.org/)
- [Vue Router documentation](https://router.vuejs.org/)
- [Axios documentation](https://axios-http.com/docs/intro)
- [Leaflet documentation](https://leafletjs.com/)
- [Divtec Elden Ring API](https://apis.divtec.me/api/elden-ring/docs#/bosses/get_api_elden_ring_bosses)

### Progress


- **Week 1:** Project setup and first API request.
- **Week 2:** Boss cards, search, and manual data corrections.
- **Week 3:** Pinia store, navigation, favorites, and local storage.
- **Week 4 and later:** Interactive map, styling, testing, and documentation.

---

## 3. Tools and methodology

### Development environment

- **IDE:** WebStorm
- **Version control:** Git and GitHub
- **Framework:** Vue 3
- **UI library:** Vuetify 3
- **State management:** Pinia
- **Navigation:** Vue Router
- **HTTP requests:** Axios
- **Interactive map:** Leaflet
- **Build tool:** Vite

### Installation

You need Node.js and npm installed on your computer.

1. Clone the repository:

```bash
git clone https://github.com/MALYVOL/294-projet-EldenRing-malyvol.git
```

2. Open the project folder:

```bash
cd 294-projet-EldenRing-malyvol
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file from `.env.example`.

In Windows Command Prompt:

```cmd
copy .env.example .env
```

The file should contain the API base URL:

```env
VITE_API_URL=https://apis.divtec.me/api/elden-ring
```

5. Start the development server:

```bash
npm run dev
```

6. Open the local address displayed in the terminal.

### Build for production

```bash
npm run build
```

### Technical choices

**API endpoint:**

```text
GET /bosses
```

The store requests the available API pages using `limit` and `page` parameters.

**Additional boss data:**

- `bossOverrides.js` contains manual corrections and local image paths for selected bosses.
- `extraBosses.js` contains bosses added locally when they are not available in the API response.
- Some unwanted duplicate entries are excluded by ID.

**Known limitations:**

- Some boss information or images may be missing or incomplete.
- A boss can appear in several locations, while its catalog card may contain general information.
- The map uses a set of prepared markers; not every encounter is necessarily represented.
- API rate limits or quotas have not been confirmed.

### Architecture

```text
src/
├── components/
│   ├── AppHeader.vue
│   ├── AppFooter.vue
│   └── BossCard.vue
├── data/
│   ├── bossOverrides.js
│   ├── extraBosses.js
│   └── markers.js
├── pages/
│   ├── index.vue
│   ├── favorites.vue
│   ├── about.vue
│   ├── map.vue
│   └── boss/
│       └── [id].vue
├── plugins/
│   └── axios.js
├── stores/
│   └── bosses.js
└── App.vue
```

### Data flow

1. `App.vue` initializes the boss store when the application starts.
2. The Pinia store requests boss data from the API using Axios.
3. The store applies exclusions and manual data where configured.
4. Pages and components display data from the store.
5. User actions update favorites or map progress, which are saved in `localStorage`.

---

## 4. Testing and validation

The following checks are part of the final validation. Update their status after testing the latest deployed version.

### Features

- [x] Bosses load from the API.
- [x] Search works without depending on letter case.
- [x] Region filter and search work together.
- [x] Alphabetical sorting works in both directions.
- [x] Pagination displays the correct bosses on each page.
- [x] A message is displayed when no results are found.
- [x] Boss detail pages open and display the correct information.
- [x] Favorites can be added and removed.
- [x] Favorites remain saved after refreshing the page.
- [x] Map markers display boss information.
- [x] Defeated markers remain saved after refreshing the page.
- [x] The application works on the deployed website.

### Loading and error states

- [x] A skeleton loader is displayed while bosses are loading.
- [x] An error message is displayed when the API request fails.
- [x] An empty favorites message is displayed when there are no favorites.

The current project uses an error message for failed API requests. A local mock fallback has not been implemented.

### Accessibility and usability

- [x] Navigation and controls can be used with a keyboard.
- [x] Focus is visible.
- [x] Icons have accessible labels.
- [x] Text and controls have sufficient contrast.
- [x] The layout remains usable on smaller screens.
- [x] No unexpected errors appear in the browser console during normal use.

---

## 5. Use of artificial intelligence

### AI tool

- **Tool:** ChatGPT
- **Model/version:** Add the model or version you used, if known.
- **Context:** Learning support, explanations, debugging, code suggestions, design ideas, and documentation assistance.

### How AI was used

AI helped me understand Vue, Pinia, API requests, component structure, routing, and `localStorage`. It also suggested code for features such as boss cards, filtering, favorites, the interactive map, and styling.

I reviewed and adapted the suggestions to my project. Examples of adaptations include correcting boss data, choosing which bosses to display, and adjusting the map and its markers.

### Personal contribution

I configured and developed the project, tested features, selected boss information and images, and made decisions about the application. I also reviewed and modified AI suggestions while learning how they work.


### What I learned with AI

AI explanations helped me understand the purpose of components, props, the Pinia store, asynchronous API requests, computed values, and local persistence.

---

## 6. Personal reflection

I actually enjoyed working on this project. It always annoyed me that I had to constantly search for information on wikis or similar sites—the interactive maps only listed the bosses’ names, with no details on their drops or general information. It’s a shame, of course, that the images in the API were low-quality and there were fewer bosses than there actually are in the game itself—not to mention the DLCs. But I found solutions to the problems. Unfortunately, I didn’t have enough time to fully finish my project; if I’d had more time, I probably would have replaced more than 70% of the images on the site, but as it is, I’m happy with the final result. There were issues with the interactive map, as well as with searching for and solving them. But in the end, everything turned out just the way I wanted it to.

### What I learned

- How to structure a Vue application using components and pages.
- How to request and display data from an API.
- How to share data between pages using Pinia.
- How to use `localStorage` for persistent user choices.
- How to integrate an interactive map with Leaflet.
- How to use Git and GitHub during development.

### Difficulties

- Handling several pages of API results.
- Dealing with missing or inconsistent boss data.
- Matching map markers with boss cards.
- Displaying map tiles correctly after deployment.
- Understanding how Vue reactivity and asynchronous requests work.

### Achievements

- Creating a searchable boss catalog.
- Building a favorites system with persistent data.
- Adding an interactive map with encounter tracking.
- Deploying the application online.

### Possible improvements

- Add more complete and accurate boss information.
- Improve missing images and map marker positions.
- Add a local fallback for API errors.

---

## 7. References and credits

- [Divtec Elden Ring API](https://apis.divtec.me/api/elden-ring/docs#/bosses/get_api_elden_ring_bosses)
- [Vue](https://vuejs.org/)
- [Vuetify](https://vuetifyjs.com/)
- [Pinia](https://pinia.vuejs.org/)
- [Axios](https://axios-http.com/)
- [Leaflet](https://leafletjs.com/)
- [Interactive map project used for map data](https://jw-ofs.github.io/elden-ring-map/)
- [Elden Ring Compass — map tiles and game data](https://github.com/EthanShoeDev/elden-ring-compass)

Elden Ring and its related assets belong to their respective owners. This is an unofficial school fan project.