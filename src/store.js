import { reactive } from "vue";

export const store = reactive({
    API_URL: "https://api.themoviedb.org/3/search/tv?api_key=923fd129639cf98cbea32d9013dacbfd&language=it_IT",
    searchInput: '',
    films: []
})