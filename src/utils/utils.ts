


export interface TouchInfo {
    touch: boolean;
    mouse: boolean;
    position: { top: number; left: number };
    direction: 'up' | 'down' | 'left' | 'right' | null;
    isFirst: boolean;
    isFinal: boolean;
    duration: number;
    startX: number;
    startY: number;
    distance: { x: number; y: number };
    offset: { x: number; y: number };
    delta: { x: number; y: number };
}
  
export function useWatchTouch(
    el: HTMLElement,
    onStart: (info: TouchInfo) => void,
    onMove: (info: TouchInfo) => void,
    onEnd: (info: TouchInfo) => void
  ) {
    let startX: number, startY: number, lastX: number, lastY: number, startTime: number, lastMoveTime: number;
  let isTouch: boolean;

  function getDirection(x: number, y: number): TouchInfo['direction'] {
    const diffX = x - startX;
    const diffY = y - startY;
    const absDiffX = Math.abs(diffX);
    const absDiffY = Math.abs(diffY);

    if (absDiffX > absDiffY) {
      return diffX > 0 ? 'right' : 'left';
    } else if (absDiffY > absDiffX) {
      return diffY > 0 ? 'down' : 'up';
    }
    return null;
  }

  function createTouchInfo(
    event: MouseEvent | Touch,
    isFirst: boolean,
    isFinal: boolean
  ): TouchInfo {
    const currentTime = Date.now();
    const duration = currentTime - startTime;
    const currentX = 'clientX' in event ? event.clientX : event.pageX;
    const currentY = 'clientY' in event ? event.clientY : event.pageY;

    const timeDelta = currentTime - lastMoveTime;
    const velocityX = timeDelta > 0 ? (currentX - lastX) / timeDelta : 0;
    const velocityY = timeDelta > 0 ? (currentY - lastY) / timeDelta : 0;

    const info: TouchInfo = {
      touch: isTouch,
      mouse: !isTouch,
      position: { top: currentY, left: currentX },
      direction: getDirection(currentX, currentY),
      isFirst,
      isFinal,
      duration,
      distance: { x: currentX - startX, y: currentY - startY },
      offset: { x: currentX - startX, y: currentY - startY },
      delta: { x: currentX - lastX, y: currentY - lastY },
      startX,
      startY,
      velocityX,
      velocityY
    };

    lastX = currentX;
    lastY = currentY;
    lastMoveTime = currentTime;

    return info;
  }

  function handleStart(event: MouseEvent | TouchEvent) {
    isTouch = event.type.startsWith('touch');
    const touchEvent = isTouch ? (event as TouchEvent).touches[0] : (event as MouseEvent);
    startX = lastX = touchEvent.clientX;
    startY = lastY = touchEvent.clientY;
    startTime = lastMoveTime = Date.now();

    const info = createTouchInfo(touchEvent, true, false);
    onStart(info);

    if (isTouch) {
      document.addEventListener('touchmove', handleMove);
      document.addEventListener('touchend', handleEnd);
    } else {
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleEnd);
    }
  }

  function handleMove(event: MouseEvent | TouchEvent) {
    event.preventDefault();
    const touchEvent = isTouch ? (event as TouchEvent).touches[0] : (event as MouseEvent);
    const info = createTouchInfo(touchEvent, false, false);
    onMove(info);
  }

  function handleEnd(event: MouseEvent | TouchEvent) {
    const touchEvent = isTouch ? (event as TouchEvent).changedTouches[0] : (event as MouseEvent);
    const info = createTouchInfo(touchEvent, false, true);
    onEnd(info);

    if (isTouch) {
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleEnd);
    } else {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
    }
  }

  el.addEventListener('mousedown', handleStart);
  el.addEventListener('touchstart', handleStart);

  return () => {
    el.removeEventListener('mousedown', handleStart);
    el.removeEventListener('touchstart', handleStart);
  };
}


export function scaleConvert(
    value: number,
    originalScale: [number, number],
    newScale: [number, number]
  ): number {
    const [originalMin, originalMax] = originalScale;
    const [newMin, newMax] = newScale;
  
    // First, normalize the value on a 0-1 scale
    const normalized = (value - originalMin) / (originalMax - originalMin);
    
    // Then, scale it to the new range
    const newValue = normalized * (newMax - newMin) + newMin;
    
    return newValue;
  }