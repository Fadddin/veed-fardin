"use client";

import { useState, useEffect } from "react";

export function useResizable(
  ref,
  options = { initialSize: { width: 200, height: 200 } }
) {
  const [isResizing, setIsResizing] = useState(false);
  const [size, setSize] = useState(options.initialSize);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [startSize, setStartSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseDown = (e) => {
      const target = e.target;
      if (target.style.cursor !== "nwse-resize") return;

      setIsResizing(true);
      setStartPos({ x: e.clientX, y: e.clientY });
      setStartSize({ width: size.width, height: size.height });

      e.preventDefault();
    };

    const handleMouseMove = (e) => {
      if (!isResizing) return;

      const dx = e.clientX - startPos.x;
      const dy = e.clientY - startPos.y;

      setSize({
        width: Math.max(50, startSize.width + dx),
        height: Math.max(50, startSize.height + dy),
      });

      e.preventDefault();
    };

    const handleMouseUp = (e) => {
      if (!isResizing) return;

      setIsResizing(false);

      if (options.onResizeEnd) {
        options.onResizeEnd(size.width, size.height);
      }

      e.preventDefault();
    };

    const resizeHandle = element.querySelector('[style*="cursor: nwse-resize"]');
    if (resizeHandle) {
      resizeHandle.addEventListener("mousedown", handleMouseDown);
    } else {
      element.addEventListener("mousedown", handleMouseDown);
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      if (resizeHandle) {
        resizeHandle.removeEventListener("mousedown", handleMouseDown);
      } else {
        element.removeEventListener("mousedown", handleMouseDown);
      }

      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [ref, isResizing, size, startPos, startSize, options]);

  return { isResizing, size };
}
