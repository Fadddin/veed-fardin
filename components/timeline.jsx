"use client";

import { useRef } from "react";
import { Box, Group, ActionIcon, Text, Slider } from "@mantine/core";
import {
  IconPlayerPlay,
  IconPlayerPause,
  IconPlayerSkipBack,
  IconPlayerSkipForward,
  IconZoomIn,
  IconZoomOut,
  IconSettings,
} from "@tabler/icons-react";
import { useMediaStore } from "@/store/media-store";

export default function Timeline({ duration, currentTime, setCurrentTime, isPlaying, togglePlayback }) {
  const timelineRef = useRef(null);
  const { mediaItems, selectedMedia } = useMediaStore();

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const milliseconds = Math.floor((time % 1) * 10);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds}`;
  };

  return (
    <Box p="xs">
      <Group justify="space-between">
        <Group>
          <ActionIcon variant="subtle" onClick={() => setCurrentTime(0)}>
            <IconPlayerSkipBack size={18} />
          </ActionIcon>

          <ActionIcon variant="subtle" onClick={togglePlayback}>
            {isPlaying ? <IconPlayerPause size={18} /> : <IconPlayerPlay size={18} />}
          </ActionIcon>

          <ActionIcon variant="subtle">
            <IconPlayerSkipForward size={18} />
          </ActionIcon>

          <Text size="sm">
            {formatTime(currentTime)} / {selectedMedia ? formatTime(selectedMedia.endTime) : formatTime(duration)}
          </Text>
        </Group>

        <Group>
          <ActionIcon variant="subtle">
            <IconZoomIn size={18} />
          </ActionIcon>

          <ActionIcon variant="subtle">
            <IconZoomOut size={18} />
          </ActionIcon>

          <ActionIcon variant="subtle">
            <IconSettings size={18} />
          </ActionIcon>
        </Group>
      </Group>

      <Box mt="xs" ref={timelineRef}>
        <Slider
          value={(currentTime / duration) * 100}
          onChange={(value) => setCurrentTime((value / 100) * duration)}
          size="sm"
          label={null}
          styles={{
            track: { cursor: "pointer" },
            thumb: { cursor: "grab" },
          }}
        />

        <Box
          style={{
            position: "relative",
            height: "30px",
            marginTop: "4px",
            background: "#f5f5f5",
            borderRadius: "4px",
          }}
        >
          {mediaItems.map((item) => (
            <Box
              key={item.id}
              style={{
                position: "absolute",
                left: `${(item.startTime / duration) * 100}%`,
                width: `${((item.endTime - item.startTime) / duration) * 100}%`,
                height: "20px",
                top: "5px",
                background: item.type === "video" ? "#3b82f6" : "#10b981",
                borderRadius: "4px",
                opacity: 0.8,
              }}
            />
          ))}
        </Box>

        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "4px",
          }}
        >
          {[0, 10, 20, 30, 40, 50, 60].map((sec) => (
            <Text key={sec} size="xs" c="dimmed">
              {sec}s
            </Text>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
