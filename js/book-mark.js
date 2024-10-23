const bookmarkIcon = document.getElementById('book-mark');

bookmarkIcon.addEventListener('click', function(event){
    getBookMarkList();
});


// localStorage에서 데이터 받아오기
function getBookMarkList() {
    let movieHtml = ' ';
    const movieContainer = document.getElementById('scroll-area');
    const bookMarkArray = JSON.parse(localStorage.getItem('book-mark'));
    const bookMarkTitle = document.getElementById('movie-container-title');

    if (bookMarkArray !== null) {
        for (const movieDetail of bookMarkArray) {
            movieHtml += `<div class="movie-card" data-id="${movieDetail.id}">
                            <img class="movie-poster" src="${movieDetail.src}" alt="영화 포스터">
                            <h2 class="movie-title" id="movie-title">${movieDetail.title}</h2>
                            <p class="movie-score" id="movie-score">평점 ${movieDetail.score}</p>
                            </div>`;
        }
    }
    movieContainer.innerHTML = movieHtml;
    bookMarkTitle.textContent = "북마크";
}
