import { reactive } from "vue";

const loadFromLocalStorage = () => {
  const data = localStorage.getItem("myList")
  if (data) {
    return JSON.parse(data)
  }
  return [];
};

export const store = reactive({
  API_URL_MOVIES:
    "https://api.themoviedb.org/3/search/movie?api_key=923fd129639cf98cbea32d9013dacbfd&language=it-IT",
  API_URL_SERIES:
    "https://api.themoviedb.org/3/search/tv?api_key=923fd129639cf98cbea32d9013dacbfd&language=it-IT",
  api_key: "923fd129639cf98cbea32d9013dacbfd",
  imgBaseUrl: "http://image.tmdb.org/t/p/w300/",
  imgBaseUrl_bg: "http://image.tmdb.org/t/p/w1280/",

  searchInput: "",
  showCards: true,
  isIntoList: false,
  showModal: false,

  films: [],
  series: [],

  popularMovies: [],
  popularSeries: [],

  upcomingMovies: [],
  upcomingSeries: [],

  trendingMovies: [],
  trendingSeries: [],

  topRatedMovies: [],
  topRatedSeries: [],

  myList: loadFromLocalStorage(),

  addToMyList(item) {
    let exists = false
    this.myList.forEach((el) => {
      if (el.id === item.id) {
        exists = true
      }
    });
    if (!exists) {
      this.myList.unshift(item)
      // invocare una funzione per una modale che avverte di aver aggiunto un elemento alla mia lista
      localStorage.setItem("myList", JSON.stringify(this.myList))
    }
  },
  removeFromMyList(item) {
    // invocare una funzione per una modale che chiede se si è sicuri di togliere l'elemento dalla lista
    this.myList = this.myList.filter((el) => el.id !== item.id)
    localStorage.setItem("myList", JSON.stringify(this.myList))
  },

  getRandomNumberPage(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
  },
});
