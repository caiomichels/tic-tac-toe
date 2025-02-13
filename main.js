const line = document.querySelector('.board .line');
const roundSpan = document.querySelector('span.round');
const playBtn = document.querySelector('button.play');

let board = '         ';

let pause = true;

const btnList = document.querySelectorAll('.board button');

let round = 0;

const play = () => {
  if (!pause) return;
  roundSpan.textContent = `Player ${round + 1}'s round`;
  pause = false;
  playBtn.style.opacity = '0';
  line.style.display = 'none';
  board = '         ';
  round = 0;
  updateBoardElem();
};

const horizontalCheck = (index) => {
  return (
    board[index] != ' ' &&
    board[index] == board[index + 1] &&
    board[index] == board[index + 2]
  );
};

const verticalCheck = (index) => {
  return (
    board[index] != ' ' &&
    board[index] == board[index + 3] &&
    board[index] == board[index + 6]
  );
};

const diagonalCheck = (index) => {
  return (
    board[index] != ' ' &&
    board[index] == board[index + 4 / (index || 1)] &&
    board[index] == board[index + 8 / (index || 1)]
  );
};

const check = () => {
  for (let i = 0; i < 3; i++) {
    if (horizontalCheck(i * 3))
      return {
        width: '80%',
        rotate: '0deg',
        top: `${50 + (!i ? -30 : i == 1 ? 0 : 30)}%`,
        left: '50%',
      };

    if (verticalCheck(i))
      return {
        width: '80%',
        rotate: '90deg',
        top: '50%',
        left: `${50 + (!i ? -30 : i == 1 ? 0 : 30)}%`,
      };

    if (i == 1) continue;
    if (diagonalCheck(i))
      return {
        width: '100%',
        rotate: `${i ? '135' : '45'}deg`,
        top: `50%`,
        left: '50%',
      };
  }

  return null;
};

const updateBoardElem = () => {
  Array.from(btnList).forEach((btn, index) => {
    btn.textContent = board[index];
  });
};

const replaceAt = (str, replacement, index) => {
  return (
    str.substring(0, index) +
    replacement +
    str.substring(index + replacement.length)
  );
};

const win = (winner, lineStyle) => {
  pause = true;
  playBtn.style.opacity = '1';
  line.style.display = 'initial';
  roundSpan.textContent = `Player ${winner + 1}'s win`;
  line.style.width = lineStyle.width;
  line.style.rotate = lineStyle.rotate;
  line.style.top = lineStyle.top;
  line.style.left = lineStyle.left;
};

const tie = () => {
  pause = true;
  playBtn.style.opacity = '1';
  roundSpan.textContent = `It's a tie`;
};

Array.from(btnList).forEach((btn, index) => {
  btn.addEventListener('click', () => {
    if (pause) return;

    roundChar = round ? 'O' : 'X';
    board = replaceAt(board, roundChar, index);
    updateBoardElem();

    let lineStyle = check();
    if (lineStyle) win(round, lineStyle);

    if (!board.includes(' ')) return tie();

    round = Number(!round);
    roundSpan.textContent = `Player ${round + 1}'s round`;
  });
});
