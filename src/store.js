import { reactive } from "vue";

const loadFromLocalStorage = () => {
  const data = localStorage.getItem('myList')
  if(data) {
    return JSON.parse(data)
  }
  return []
}

export const store = reactive({
  API_URL_MOVIES:
    "https://api.themoviedb.org/3/search/movie?api_key=923fd129639cf98cbea32d9013dacbfd&language=it-IT",
  API_URL_SERIES:
    "https://api.themoviedb.org/3/search/tv?api_key=923fd129639cf98cbea32d9013dacbfd&language=it-IT",
  imgBaseUrl: "http://image.tmdb.org/t/p/w300/",
  imgBaseUrl_bg: "http://image.tmdb.org/t/p/w1280/",
  searchInput: "",
  showCards: true,
  films: [],
  series: [],
  popularMovies: [],
  popularSeries: [],
  api_key: "923fd129639cf98cbea32d9013dacbfd",
  myList: loadFromLocalStorage(),

  addToMyList(item) {
    let exists = false;
    this.myList.forEach((el) => {
      if (el.id === item.id) {
        exists = true
      }
    });
    if (!exists) {
      this.myList.push(item)
      localStorage.setItem('myList', JSON.stringify(this.myList))
    }
  },
  removeFromMyList(item) {
    this.myList = this.myList.filter(el => el.id !== item.id)
    localStorage.setItem('myList', JSON.stringify(this.myList))
  }
})
