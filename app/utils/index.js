
export function initialize () {
  let gameField = Array(4).fill([]).map(arr => {
    return Array(4).fill(null);
  });

  let firstRandom = initRandom(4);
  let secondRandom = initRandom(4, firstRandom[0]);

  gameField[firstRandom[0]][firstRandom[1]] = 2;
  gameField[secondRandom[0]][secondRandom[1]] = 2;

  return gameField;
}

export function setRandom (s) {
  let arr = s.map(item => item.slice());

  let resObj = arr.reduce((obj, item, key) => {
    if (~item.indexOf(null) || ~item.indexOf(undefined)) {

      let fi = item.reduce((arr, el, key) => {
        if (!el) arr.push(key);
        return arr;
      }, []);

      obj[key] = fi;
    }

    return obj;
  }, {});

  if (!Object.keys(resObj).length) return;

  let resObjKeys = Object.keys(resObj);

  let randArrayNum = randomArray(resObjKeys);
  let randItemNum = randomTile(resObj[randArrayNum]);

  arr[randArrayNum][randItemNum] = 2; // TODO: random also can be 4

  return arr;
}

export function isGameOver (gameField) {
  let i = 0;
  let gameOver = true;
  while (i <= gameField.length) {
    for (let j = 0; j < gameField[i].length; j++) {
      if (gameField[i][j] == gameField[i][j+1]) {
        gameOver = false;
      }
    }

    if (!gameOver) break;

    i++;
    if (i >= gameField.length) break;
  }

  if (gameOver) {
    let i = 0;
    while (i <= gameField.length) {
      for (let j = 0; j < gameField.length; j++) {
        if (gameField[i][j] == gameField[i+1][j]) {
          gameOver = false;
        }
      }

      if (!gameOver) break;

      i++;
      if (i >= gameField.length-1) break;
    }
  }

  return gameOver;
}

export function horizontalShift (arr, direction) {
  let result = [];
  let shift;

  if (direction === 'left') {
    arr.forEach((item, key) => {
      shift = leftShift(arr[key]);
      result[key] = shift.result;
    });
  }
  else if (direction === 'right') {
    arr.forEach((item, key) => {
      shift = rightShift(arr[key]);
      result[key] = shift.result;
    });
  }

  return {
    result: result,
    sum: shift.sum
  };
}

export function verticalShift (st, direction) {
  let newArr = st.map(item => item.slice());

  let sum = 0;

  for (let i = 0; i < newArr.length; i++) {
    let reduceArr = newArr.reduce((arr, item) => {
      arr.push(item[i]);
      return arr;
    }, []);

    let changeArr;

    if (direction ==='top') {
      changeArr = leftShift(reduceArr);
      sum += changeArr.sum;
    }
    else if (direction === 'bottom') {
      changeArr = rightShift(reduceArr);
      sum += changeArr.sum;
    }

    let j = 0;
    while (true) {
      if (j >= changeArr.result.length) break;
      newArr[j][i] = changeArr.result[j];
      j++;
    }
  }

  return {
    result: newArr,
    sum: sum
  };
}

const leftShift = (st) => {
  let newArr = clearEmpty(st);
  let result = [];

  let sum = 0;

  if (newArr.length > 1) {
    let i = 0;
    while (i <= newArr.length) {
      if (newArr[i] == newArr[i+1]) {
        let r = newArr[i] + newArr[i+1];
        sum += r;
        result.push(r);
        i += 2;
      }

      if (newArr[i] != newArr[i+1]) {
        result.push(newArr[i]);
        i++;
      }

      if (i >= newArr.length) break;
    }
  } else {
    result.push(newArr[0]);
  }

  if (st.length > result.length) {
    let n = st.length - result.length;
    for (let i = 1; i <= n; i++) {
      result.push(null);
    }
  }

  return {
    sum: sum,
    result: result
  };
}

const rightShift = (st) => {
  let newArr = clearEmpty(st);
  let result = [];

  let sum = 0;

  if (newArr.length > 1) {
    let i = newArr.length-1;
    while (i >= 0) {
      if (newArr[i] == newArr[i-1]) {
        let r = newArr[i] + newArr[i-1];
        sum += r;
        result.unshift(r);
        i = i - 2;
      }

      if (newArr[i] != newArr[i-1]) {
        result.unshift(newArr[i]);
        i--;
      }

      if (i < 0) break;
    }
  } else {
    result.unshift(newArr[0]);
  }

  if (st.length > result.length) {
    let n = st.length - result.length;
    for (let i = 1; i <= n; i++) {
      result.unshift(null);
    }
  }

  return {
    sum: sum,
    result: result
  };
}

const clearEmpty = st => {
  return st.reduce((arr, item) => {
    if (item) arr.push(item);
    return arr;
  }, []);
}

const initRandom = (max, firstNum) => {
  let arr = [];
  for (let i = 0; i < 2; i++) {
    arr.push(initRandomNum(0, max-1, firstNum));
  }
  return arr;
}

const initRandomNum = (min, max, firstNum) => {
  if (firstNum === undefined) return getRandomNum(min, max);

  let result;
  while (1) {
    result = getRandomNum(min, max);
    if (result != firstNum) break;
  }
  return result;
}

const randomTile = arr => {
  const max = Number(arr.length-1);
  const rand = getRandomNum(0, max);
  return arr[rand];
}

const randomArray = arr => {
  const min = Number(arr[0]);
  const max = Number(arr[arr.length-1]);
  return getRandomNum(min, max);
}

const getRandomNum = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
