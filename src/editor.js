// dirty editor for ld35
import qs from 'qs';

let $ = window.$;
let state = {
  x: null,
  y: null,
  start: null,
  end: null,
  map: null
};
let selectedTool = null;


$(document).on('ready', () => {
  $('#x, #y').on('change', function() {
    state[this.id] = parseInt($(this).val());
    onChangeGridSize();
  });

  $('#grid-container').on('click', 'td', onClickGridCell);

  $('.tool').on('click', function(e){
    e.preventDefault();
    selectedTool = parseInt($(this).data('tiletype'));
    $('.tool').removeClass('btn-primary');
    $(this).addClass('btn-primary');
  });

  $('#export').on('click', function(e){
    e.preventDefault();
    let level = getLevelFromState(state);
    $('#export-text').val(level);
    $('#test-link').attr('href', `/#${qs.stringify({levelData: level})}`);
    $('#export-modal').modal('show');
  });

  $('#import').on('click', function(e){
    e.preventDefault();
    $('#import-modal').modal('show');
  });

  $('#process-import').on('click', function(e){
    e.preventDefault();
    let level;
    try {
      level = JSON.parse($('#import-text').val());
    } catch (e) {
      window.alert('bad json');
    }
    refreshState(level);
    refreshControlsFromState();

    $('#import-modal').modal('close');
  });

  $('#export-text').on('focus', function(){
    $(this).select();
  });
});

function refreshState(level){
  state.x = level.gridSize[0];
  state.y = level.gridSize[1];
  state.maxMoves = level.maxMoves;
  level.cells.forEach((row, j) => {
    row.forEach((cell, i) => {
      if(cell - 100 >= 0 && cell - 100 < 100){
        state.start = [i, j];
      }
      if(cell - 900 >= 0 && cell - 900 < 100){
        state.end = [i, j];
      }
    });
  });
  state.map = level.cells.map((row) => {
    return row.map((cell) => {
      if(cell - 100 >= 0 && cell - 100 < 100){
        return cell - 100;
      }
      if(cell - 900 >= 0 && cell - 900 < 100){
        return cell - 900;
      }
      return cell;
    });
  });
}

function refreshControlsFromState(){
  $('#x').val(state.x);
  $('#y').val(state.y);
  $('#maxMoves').val(state.maxMoves);
  let $grid = $('<table>');
  for(let i = 0; i < state.y; i++){
    let $row = $('<tr>');

    for(let j = 0; j < state.x; j++){
      let $td = $(`<td data-location="${j}-${i}" class="${'opt' + state.map[i][j]}" >`);
      if(state.start[0] === j && state.start[1] === i){
        $td.addClass('opt100');
      }
      if(state.end[0] === j && state.end[1] === i){
        $td.addClass('opt900');
      }
      $row.append($td);
    }
    $grid.append($row);
  }
  $('#grid-container').html($grid);
}

function getLevelFromState(state){
  let cells = state.map.map((row, j) => {
    return row.map((cell, i) => {
      if(!cell){
        return 0;
      }
      if(i === state.start[0] && j === state.start[1]){
        return cell + 100;
      }
      if(i === state.end[0] && j === state.end[1]){
        return cell + 900;
      }
      return cell;
    });
  });
  let data = {
    gridSize: [state.x, state.y],
    cells,
    maxMoves: parseInt($('#maxMoves').val()) || false
  };
  return JSON.stringify(data);
}

function onClickGridCell(){
  if(selectedTool === null){
    return;
  }
  let [x, y] = $(this).data('location').split('-').map((x) => parseInt(x));
  if(selectedTool === 100 && !state.map[y][x]){
    console.warn('map start show be of a type ');
  }
  if(selectedTool === 100 || selectedTool === 900){
    $('#grid-container td').removeClass('opt' + selectedTool);
    this.className += ' opt' + selectedTool;
    if(selectedTool === 100){
      state.start = [x, y];
    }
    else {
      state.end = [x, y];
    }
  }
  else {
    this.className = 'opt' + selectedTool;
    state.map[y][x] = selectedTool;
  }
}

function onChangeGridSize(){
  if(!state.x || !state.y){
    return;
  }
  if(!state.map){
    state.map = [];
  }
  let $grid = $('<table>');
  for(let i = 0; i < state.y; i++){
    let $row = $('<tr>');
    state.map[i] = [];
    for(let j = 0; j < state.x; j++){
      $row.append(`<td data-location="${j}-${i}">`);
      state.map[i].push(0);
    }
    $grid.append($row);
  }
  $('#grid-container').html($grid);
}
