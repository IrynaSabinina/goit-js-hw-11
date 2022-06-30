class EventsApi {
  static BASE_URL = 'https://pixabay.com/api/';
  static API_KEY = '28362853-f4179f2b0382cbb2305a6e9dc';

  static IMAGE_TYPE = 'photo';

  #page = 0;
  #keyword;

  constructor(keyword = '') {
    this.#keyword = keyword;
  }
  async fetchPhoto() {
    // const parametrs = new URLSearchParams({
    //   //   size: 100,
    //   //   page: this.#page,
    //   key: EventsApi.API_KEY,
    //   q: this.#keyword,
    //   image_type: 'photo',
    // });
    const resultSearch = await fetch(
      `${BASE_URL}?key=${API_KEY}&q=${this.#keyword}&image_type=${IMAGE_TYPE}`
    );
    return resultSearch.ok
      ? resultSearch.json()
      : Promise.reject(resultSearch.statusText);
  }
}
