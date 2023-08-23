import { useRef, useEffect } from 'react';

const useDrag = (id: string): void => {
  // Set up references for the DOM elements

  const isClicked = useRef<boolean>(false);

  const coordinates = useRef<{
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  }>({
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
  });

  useEffect(() => {
    const target = document.getElementById(id);

    if (!target) throw new Error('Element with this ID does not exist!');

    const container = target.parentElement;

    if (!target) throw new Error('Target element must have a parent!');

    const mouseDownHandler = (e: MouseEvent) => {
      isClicked.current = true;

      // Get the coordinates of where the mouse down occurred
      coordinates.current.startX = e.clientX;
      coordinates.current.startY = e.clientY;
    };

    const mouseUpHandler = (e: MouseEvent) => {
      isClicked.current = false;

      // Store the last position of the square
      coordinates.current.endX = target.offsetLeft;
      coordinates.current.endY = target.offsetTop;
    };

    const mouseMoveHandler = (e: MouseEvent) => {
      // Check if the current value is true, if it is not escape the function
      if (!isClicked.current) return;

      // Calculate the new position based on the starting and end coordinates
      const newX =
        e.clientX - coordinates.current.startX + coordinates.current.endX;
      const newY =
        e.clientY - coordinates.current.startY + coordinates.current.endY;

      // Update the top and left posistions of the square
      target.style.left = `${newX}px`;
      target.style.top = `${newY}px`;
    };

    // Add an event listeners
    target.addEventListener('mousedown', mouseDownHandler);
    target.addEventListener('mouseup', mouseUpHandler);
    container!.addEventListener('mousemove', mouseMoveHandler);
    container!.addEventListener('mouseleave', mouseUpHandler);

    // Clean up function which removes the event listeners
    const cleanUpHandler = () => {
      target.removeEventListener('mousedown', mouseDownHandler);
      target.removeEventListener('mouseup', mouseUpHandler);
      container!.removeEventListener('mousemove', mouseMoveHandler);
      container!.removeEventListener('mouseleave', mouseUpHandler);
    };

    // Run the cleanUpHandler function that removes the event listener
    return cleanUpHandler;
  }, []);
};

export default useDrag;
