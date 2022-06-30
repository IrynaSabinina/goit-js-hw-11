import axios from 'axios';

export function fetchPtotos(keyWord, page, perPage) {
  const imageType = 'photo';
  const orientation = 'horizontal';
  const safesearch = 'true';
  const API_KEY = '28362853-f4179f2b0382cbb2305a6e9dc';
  const BASE_URL = 'https://pixabay.com/api/';
  let requestUrl = `${BASE_URL}?key=${API_KEY}&q=${keyWord}&image_type=${imageType}&page=${page}&per_page=${perPage}`;
  console.log(requestUrl);
  return fetch(requestUrl).then(response => {
    console.log(response);
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

//   return requestUrl;
///////////////acsiys
async function getUser() {
  try {
    const response = await axios.get('/user?ID=12345');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

////
