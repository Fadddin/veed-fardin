"use client";

import { useState, useEffect } from "react";

export function useDraggable(ref, options = { initialPosition: { x: 0, y: 0 } }) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(options.initialPosition);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseDown = (e) => {
      if (e.target !== element && !element.contains(e.target)) return;

      // Prevent if clicking on resize handle
      if (e.target.style.cursor === "nwse-resize") return;

      setIsDragging(true);
      setStartPos({ x: e.clientX, y: e.clientY });
      setOffset({ x: position.x, y: position.y });

      e.preventDefault();
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;

      const dx = e.clientX - startPos.x;
      const dy = e.clientY - startPos.y;

      setPosition({
        x: offset.x + dx,
        y: offset.y + dy,
      });

      e.preventDefault();
    };

    const handleMouseUp = (e) => {
      if (!isDragging) return;

      setIsDragging(false);

      if (options.onDragEnd) {
        options.onDragEnd(position.x, position.y);
      }

      e.preventDefault();
    };

    element.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      element.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [ref, isDragging, position, startPos, offset, options]);

  return { isDragging, position };
}
