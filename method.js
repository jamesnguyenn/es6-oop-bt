export const checkID = (id, foodLists) => {
  const food = foodLists.find((food) => food.maMonAn === id);
  return food;
};

export const showToastError = (message) => {
  const toast = ` 
  <div class="toast-message"><span class="toast-message-body">Error: ${message}</span></div>`;
  document.body.insertAdjacentHTML("afterbegin", toast);
  setTimeout(() => {
    $(".toast-message").remove();
  }, 2000);
};

export const setLocalStorage = (key, lists) => {
  localStorage.setItem(key, JSON.stringify(lists));
};

export const setEmptyInput = (...array) => {
  for (let i of array) {
    i.value = "";
  }
};
