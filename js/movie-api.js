// require('dotenv').config(); // .env 파일 로드
// top rated 영화 목록 가져오기
const TMDB_API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZWI3OWM5OTZjMjYwZDAwNTc0ZGYzMGM5ZjdiMjdjOCIsIm5iZiI6MTcyOTIyMzgyNi42MDQ2MjEsInN1YiI6IjY3MTFkOTZlOGU4NDQ2NTdiN2ZhZWZkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M9ZsqQKOI9kePRxFKR4yHMGJwSI3AE-ZfSWJB-JMbr0';
let movieData = [];

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TMDB_API_KEY}`
  }
};

async function getTopRatedMovie() {
  try {
    const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1', options);
    if (!response.ok) {
      throw new Error("API 호출 오류가 발생했습니다.");
    }
    const response2 = await response.json();
    movieData = response2.results;

    // 영화 컨테이너
    const movieContainer = document.getElementById('scroll-area');
    // 영화 카드 내용
    let movieHtml = ' ';

    movieData.forEach(movie => {
      movieHtml += `<div class="movie-card" data-id="${movie.id}">
                    <img class="movie-poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="영화 포스터">
                    <h2 class="movie-title" id="movie-title">${movie.title}</h2>
                    <p class="movie-score" id="movie-score">평점 ${movie.vote_average.toFixed(1)}</p>
                </div>`;
    });

    console.log('영화 목록 : ' + response);
    movieContainer.innerHTML = movieHtml;

  } catch (error) {
    console.log(error);
  }
}
getTopRatedMovie();

// 모달 - 영화 상세 정보 가져오기
async function getMovieDetails(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`;

  console.log(movieId);
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('영화 데이터를 가져오는 데 실패했습니다.');
    }
    const movieDetail = await response.json();
    // let movieDetailData = movieDetail.results; // 왜 여기는 results로 안받아도 데이터가 나오지?

    console.log('영화 상세 정보 : ' + movieDetail);
    console.log(movieDetail);

    // 모달 컨테이너
    const modalContainer = document.getElementById('modal-container');
    let movieDetailHtml = ' ';

    // bookmark 여부 확인
    const bookMarkArray = JSON.parse(localStorage.getItem('book-mark'));
    console.log(bookMarkArray);
    let bookMark = "./assets/heart1.png";

    if (bookMarkArray !== null) {
      if (bookMarkArray.find(movie => movie.id === movieId)) { // localstorage에 bookmark가 저장된 경우
        bookMark = "./assets/heart2.png";
      }
    }

    movieDetailHtml =
      `<div class="modal-header" data-id="${movieId}" data-title="${movieDetail.title}" data-src="https://image.tmdb.org/t/p/w500${movieDetail.poster_path}" data-score="${movieDetail.vote_average.toFixed(1)}" data-isbookMark="${bookMark}">
                        <h2 class="modal-title">${movieDetail.title}</h2>
                        <span class="closeBtn">&times;</span>
                      </div>
                      <div class="modal-content">
                        <div class="modal-content1">
                            <img class="modal-poster"" src="https://image.tmdb.org/t/p/w500${movieDetail.poster_path}">
                        </div>
                        <div class="modal-content2">`

    if (movieDetail.tagline) { movieDetailHtml += `<h4>&quot; ${movieDetail.tagline} &quot;</h4>`; }
    movieDetailHtml += `<h3>줄거리</h3>
                        <span class="span-content">${movieDetail.overview}</span><br>
                        <span class="span-title">장&nbsp;&nbsp;&nbsp;르</span><span class="span-content">`

    for (let i = 0; i < movieDetail.genres.length; i++) {
      movieDetailHtml += `#${movieDetail.genres[i].name} `
    }

    movieDetailHtml += `<br><span class="span-title">개봉일</span><span class="span-content">${movieDetail.release_date}</span><br>
                        <span class="span-title">평&nbsp;&nbsp;&nbsp;점</span><span class="span-content">${movieDetail.vote_average.toFixed(1)}</span><br>
                        <img class="book-mark-heart" id="book-mark" src="${bookMark}">
                        </div>
                        </div>`

    modalContainer.innerHTML = movieDetailHtml;

  } catch (error) {
    console.log(error);
  }
}
// 전역으로 함수 내보내기
window.getMovieDetails = getMovieDetails;


// 영화 검색 기능
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', filterMovies);

function filterMovies() {
  const searchValue = document.getElementById('search-input').value.toLowerCase(); // 검색어 입력
  const movieCards = document.querySelectorAll('.movie-card'); // 모든 영화 카드 가져오기
  let hasCard = false;

  movieCards.forEach(card => {
    const movieTitle = card.querySelector('.movie-title').textContent.toLowerCase();

    if (movieTitle && movieTitle.includes(searchValue)) {
      card.style.display = 'block'; // 검색어가 포함된 영화는 보이기
      hasCard = true;
    } else {
      card.style.display = 'none'; // 포함되지 않으면 숨기기
    }
  });
}
