import useDrag from '../hooks/useDrag';

type props = {
  id: string;
  targetUpdateHandler: Function;
  selected: boolean;
};
const Square = ({ id, selected, targetUpdateHandler }: props) => {
  // Use the custom hook that enables components to be draggable
  useDrag(id);

  return (
    <div
      id={id}
      className="square"
      onMouseDown={() => targetUpdateHandler(id)}
      style={{
        border: selected ? '2px solid #1e8fff' : 'none',
      }}
    ></div>
  );
};

export default Square;
