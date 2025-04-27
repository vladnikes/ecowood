document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('leaves-toggle');
  const leavesContainer = document.querySelector('.leaves-container');

  toggleButton.addEventListener('click', () => {
    leavesContainer.classList.toggle('leaves-hidden');
    toggleButton.classList.toggle('leaves-off');
  });
});