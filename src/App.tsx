import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import Controls from './components/Controls';
import Laptop from './components/Laptop';
import Square from './components/Square';

function App() {
  // Set up the state
  const [currentTarget, setCurrentTarget] = useState<string | void>();
  const [shapes, setShapes] = useState<string[]>([]);

  const targetUpdateHandler = (id: string) => {
    // Update the target square when a square is clicked on by the user
    setCurrentTarget(id);
  };

  const clearCurrentTargetHandler = () => {
    // Clear the target square
    setCurrentTarget();
  };

  const addShapeHandler = () => {
    // Generate a new Id
    const newShapeId = uuidv4();

    // Update the shapes array with the new square
    setShapes([newShapeId, ...shapes]);
  };

  const removeShapeHandler = () => {
    // Make a copy of the current shapes array
    const newShapesArr = shapes;

    // Get the Id of the current square
    const indexOfCurrentTarget = newShapesArr.indexOf(currentTarget!);

    // Remove the square from the shapes array
    newShapesArr.splice(indexOfCurrentTarget, 1);

    // Update the shapes array
    setShapes([...newShapesArr]);

    // Clear the target square as it has now been removed
    setCurrentTarget();
  };

  return (
    <>
      <Controls
        addShapeHandler={addShapeHandler}
        removeShapeHandler={removeShapeHandler}
        removeButtonDisabled={currentTarget ? false : true}
      />
      <div className="App">
        <div className="editor" onDoubleClick={clearCurrentTargetHandler}>
          {shapes.map((shapeId: string) => (
            <Square
              key={shapeId}
              targetUpdateHandler={targetUpdateHandler}
              id={shapeId}
              selected={currentTarget === shapeId ? true : false}
            />
          ))}
        </div>
        <div className="laptop-container">
          <Laptop />
        </div>
      </div>
    </>
  );
}

export default App;
