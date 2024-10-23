

// document.addEventListener('DOMContentLoaded', () => {
const movieContainer = document.getElementById('scroll-area'); // 부모 요소
const modal = document.getElementById('movie-modal');
const modalContainer = document.getElementById('modal-container');

function showModal() {
    modal.style.display = 'block';

    // // 모달이 열릴 때마다 동적으로 closeBtn을 찾고, 이벤트 리스너를 추가
    // 작동하지 않아서 아래에 이벤트 위임으로 처리함
    // const closeBtn = modalContainer.querySelector('.closeBtn');
    // console.log(closeBtn);
    // console.log(modal);

    //  if (closeBtn) {
    //      closeBtn.onclick = function () {
    //          modal.style.display = 'none';
    //      };
    //  }
}

movieContainer.addEventListener('click', function (event) {
    const card = event.target.closest('.movie-card'); // 클릭한 요소가 .movie-card인지 확인

    if (card) {

        let movieId = card.dataset.id;  // movie-card의 data-id 값을 가져옴
        console.log("Clicked Movie ID:", movieId);

        // 이 movieId를 이용해 영화 상세 데이터를 가져올 수 있음
        getMovieDetails(movieId);
        showModal();
    }
});

// 모달창 닫기 버튼 클릭
modalContainer.addEventListener('click', function (event) {

    // 클릭한 요소가 .closeBtn 클래스를 가진 경우에만 처리
    if (event.target.classList.contains('closeBtn')) {
        modal.style.display = 'none';
    }

    // 북마크 버튼 클릭시
    if (event.target.classList.contains('book-mark-heart')) {
        const currentSrc = event.target.getAttribute('src');
        if (currentSrc === './assets/heart1.png') {
            // 북마크 OFF
            event.target.setAttribute('src', './assets/heart2.png'); // 북마크가 추가된 이미지로 변경
            saveBookmark();
        } else {
            // 북마크 ON
            event.target.setAttribute('src', './assets/heart1.png'); // 북마크가 제거된 이미지로 변경
            deleteBookmark();
        }
    }

});

// 모달 외부 클릭 시 닫기
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// 북마크 저장
function saveBookmark() {
    let bookMarkMovieList = [];

    if (JSON.parse(localStorage.getItem('book-mark')) !== null){
        bookMarkMovieList = JSON.parse(localStorage.getItem('book-mark'))
    }

    const modalHeader = modalContainer.querySelector('.modal-header');
    const id = modalHeader.dataset.id;
    const title = modalHeader.dataset.title;
    const src = modalHeader.dataset.src;
    const score = modalHeader.dataset.score;

    bookMarkMovieList.push({
        id: id,
        title: title,
        src: src,
        score: score,
    });

    localStorage.setItem('book-mark', JSON.stringify(bookMarkMovieList));
}

// 북마크 삭제
function deleteBookmark() {
    let bookMarkMovieList = JSON.parse(localStorage.getItem('book-mark'));

    const modalHeader = modalContainer.querySelector('.modal-header');
    const id = modalHeader.dataset.id;

    bookMarkMovieList = bookMarkMovieList.filter(movie => movie.id !== id);
    localStorage.setItem('book-mark', JSON.stringify(bookMarkMovieList));
}

// });