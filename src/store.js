import { reactive } from "vue";

export const store = reactive({
  API_URL_MOVIES:
    "https://api.themoviedb.org/3/search/movie?api_key=923fd129639cf98cbea32d9013dacbfd&language=it_IT",
  API_URL_SERIES:
    "https://api.themoviedb.org/3/search/tv?api_key=923fd129639cf98cbea32d9013dacbfd&language=it_IT",
  imgBaseUrl: "http://image.tmdb.org/t/p/w300/",
  imgBaseUrl_bg: "http://image.tmdb.org/t/p/w1280/",
  searchInput: "",
  showCards: true,
  films: [],
  series: [],
  api_key: "923fd129639cf98cbea32d9013dacbfd",
  myList: [],
  addToMyList(item) {
    let exists = false;
    this.myList.forEach((el) => {
      if (el.id === item.id) {
        exists = true
      }
    });
    if (!exists) {
      this.myList.push(item)
    }
  }
})
