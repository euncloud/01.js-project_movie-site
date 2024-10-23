const scrollArea = document.querySelector('.scroll-area');
const scrollLeftButton = document.getElementById('scroll-left');
const scrollRightButton = document.getElementById('scroll-right');

scrollLeftButton.addEventListener('click', () => {
  scrollArea.scrollBy({
    left: -1000, // 스크롤할 거리 (왼쪽으로 100px)
    behavior: 'smooth' // 부드러운 스크롤
  });
});

scrollRightButton.addEventListener('click', () => {
  scrollArea.scrollBy({
    left: 1000, // 스크롤할 거리 (오른쪽으로 100px)
    behavior: 'smooth' // 부드러운 스크롤
  });
});

const eunflix = document.getElementById('eunflix-title');

eunflix.addEventListener('click', function(){
  location.reload();
});