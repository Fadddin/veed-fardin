"use client";

import { useRef, useEffect } from "react";
import { Box, Center, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useMediaStore } from "@/store/media-store";
import { useDraggable } from "@/hooks/use-draggable";
import { useResizable } from "@/hooks/use-resizable";


export default function Canvas({ isPlaying, currentTime , openUploadModal}) {
  const canvasRef = useRef(null);
  const { mediaItems, selectMedia, selectedMediaId, updateMediaItem } = useMediaStore();



  const visibleMedia = mediaItems.filter(
    (item) => currentTime >= item.startTime && currentTime <= item.endTime
  );

  const handleMediaClick = (id, e) => {
    e.stopPropagation();
    selectMedia(id);
  };

  const handleCanvasClick = () => {
    selectMedia(null);
  };

  return (
    <Box
      ref={canvasRef}
      onClick={handleCanvasClick}
      style={{
        width: "100%",
        height: "100%",
        background: "#000000",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {visibleMedia.length === 0 && !isPlaying && (
        <Center style={{ height: "100%" }}>
          <Button
            variant="outline"
            color="gray"
            leftSection={<IconPlus size={16} />}
            onClick={(e) => {
              e.stopPropagation();
              openUploadModal(); 
            }}
          >
            Add media to this project
          </Button>
        </Center>
      )}

      {visibleMedia.map((item) => (
        <DraggableResizableMedia
          key={item.id}
          item={item}
          isSelected={item.id === selectedMediaId}
          onClick={(e) => handleMediaClick(item.id, e)}
          onDragEnd={(x, y) => updateMediaItem(item.id, { x, y })}
          onResizeEnd={(width, height) => updateMediaItem(item.id, { width, height })}
          isPlaying={isPlaying}
        />
      ))}
    </Box>
  );
}

function DraggableResizableMedia({
  item,
  isSelected,
  onClick,
  onDragEnd,
  onResizeEnd,
  isPlaying,
}) {
  const mediaRef = useRef(null);
  const videoRef = useRef(null);

  const { isDragging, position } = useDraggable(mediaRef, {
    initialPosition: { x: item.x, y: item.y },
    onDragEnd: (x, y) => onDragEnd(x, y),
  });

  const { size, isResizing } = useResizable(mediaRef, {
    initialSize: { width: item.width, height: item.height },
    onResizeEnd: (width, height) => onResizeEnd(width, height),
  });

  useEffect(() => {
    if (item.type === "video" && videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, item.type]);

  return (
    <Box
      ref={mediaRef}
      onClick={onClick}
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${isResizing ? size.width : item.width}px`,
        height: `${isResizing ? size.height : item.height}px`,
        border: isSelected ? "2px solid #3b82f6" : "none",
        cursor: isDragging ? "grabbing" : "grab",
        zIndex: isSelected ? 10 : 1,
        overflow: "hidden",
      }}
    >
      {item.type === "image" ? (
        <img
          src={item.url || "/placeholder.svg"}
          alt={item.filename}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      ) : (
        <video
          ref={videoRef}
          src={item.url}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
          loop
        />
      )}

      {isSelected && !isPlaying && (
        <Box
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            width: "10px",
            height: "10px",
            background: "#3b82f6",
            cursor: "nwse-resize",
          }}
        />
      )}
    </Box>
  );
}
