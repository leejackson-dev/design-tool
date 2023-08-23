type props = {
  addShapeHandler: Function;
  removeShapeHandler: Function;
  removeButtonDisabled: boolean;
};

const Controls = ({
  addShapeHandler,
  removeShapeHandler,
  removeButtonDisabled,
}: props) => {
  return (
    <>
      <div className="logo-banner">Basic Design Tool By Lee Jackson</div>
      <div className="controls">
        <button className="button" onClick={() => addShapeHandler()}>
          Add Square
        </button>
        <button
          className="button"
          onClick={() => removeShapeHandler()}
          disabled={removeButtonDisabled}
        >
          Remove Current Square
        </button>
      </div>
    </>
  );
};

export default Controls;
