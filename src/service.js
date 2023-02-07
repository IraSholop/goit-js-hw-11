import axios from "axios";
export default class PostApiService {
    constructor() {
      this.searchQuery = '';
      this.page = 1;
    }
  
    async fetchPost() {
      const url = 'https://pixabay.com/api/';
      const key = '33448519-e193b87cc925871b53ed09026';
        try {
        const response = await axios.get(`${url}?key=${key}&q=${this.searchQuery}&page=${this.page}&per_page=40&image_type=photo&orientation=horizontal&safesearch=true`);
        this.incrementPage();
        return response.data;
      } catch (error) {
        console.error(error);
      }
    }
  
    incrementPage() {
      this.page += 1;
    }
  
    resetPage() {
      this.page = 1;
    }
  
    get query() {
      return this.searchQuery;
    }
  
    set query(newQuery) {
      this.searchQuery = newQuery;
    }
  }
  