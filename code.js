# js-simon
// Массив с кнопками
const buttons = document.querySelectorAll('.button');

// Массив для хранения последовательности
let sequence = [];

// Функция для генерации следующего числа в последовательности
function generateNextSequenceItem() {
  const randomButton = Math.floor(Math.random() * 4);
  sequence.push(randomButton);
}

// Функция для воспроизведения последовательности
async function playSequence() {
  for (const button of sequence) {
    await flashButton(button);
    await sleep(1000);
    turnOffButton(button);
    await sleep(500);
  }
}

// Функция для зажигания кнопки
function flashButton(button) {
  return new Promise((resolve) => {
    buttons[button].classList.add('active');
    setTimeout(() => {
      resolve();
    }, 500);
  });
}

// Функция для выключения кнопки
function turnOffButton(button) {
  buttons[button].classList.remove('active');
}

// Функция для обработки нажатия кнопки
function handleButtonClick(button) {
  if (button === sequence[0]) {
    sequence.shift();
    if (sequence.length === 0) {
      generateNextSequenceItem();
      setTimeout(() => {
        playSequence();
      }, 500);
    }
  } else {
    // Обработка неправильного нажатия
  }
}

// Функция для задержки выполнения
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

// Добавляем обработчики событий для каждой кнопки
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', () => {
    handleButtonClick(i);
  });
}

// Запуск игры
generateNextSequenceItem();
playSequence();
