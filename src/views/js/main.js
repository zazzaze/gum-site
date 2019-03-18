const open = document.querySelector('.open__reg'),
      close = document.querySelector('.close__block'),
      form = document.querySelector('.form');

open.addEventListener('click', () => {
  form.style.display = 'block';
});

close.addEventListener('click', () => {
  form.style.display = 'none';
})