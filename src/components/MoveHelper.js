import { PropTypes } from 'react';

const placeHolder = [
  [0,0 ,0],
  [0,-1,0],
  [0,0 ,0]
];

const MoveHelper = (props) => {
  let matrix = placeHolder;
  let backgroundColor = '';

  if (props.moveGrid && props.moveGrid.enabled && props.moveGrid.color){
    matrix = props.moveGrid.matrix;
    backgroundColor = props.moveGrid.color;
  }

  return (
    <div className={"move-helper " + props.className}>
      <h2>{props.title}</h2>
      <div className="content">

      { props.moveGrid.target &&
        <div className="target">
          <label>Next Level</label>
        </div>
      }

      {
        matrix.map( (row, i) => {
          let rowCSS = '';

          if (i === 0){
            rowCSS = 'top';
          }
          if (i === 2){
            rowCSS = 'bottom';
          }

          return (
            <div key={i} className="row">
              {row.map( (col, j) => {
                let style = col !== 0 ? {backgroundColor} : {};
                let text = col > 0 ? col : "";

                let colCSS = '';
                if (j === 0){
                  colCSS = ' left';
                }
                if (j === 2){
                  colCSS = ' right';
                }

                return (
                  <div key={i+":"+j} style={style}
                    className={"moves " + rowCSS + colCSS + " moves-" + col}>
                    <label>{text}</label>
                  </div>
                );
              })}
            </div>
          );
        })
      }
      </div>
    </div>
  );
};

MoveHelper.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  moveGrid: PropTypes.object.isRequired
};

export default MoveHelper;
