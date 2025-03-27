"use client";

import { useEffect, useState, useRef } from "react";
import MediaPanel from "@/components/mediaPanel";
import {
  AppShell,
  Burger,
  Group,
  Text,
  Button,
  NumberInput,
  Stack,
  Box,
  Divider,
  ActionIcon,
  Modal,
  Center,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconSettings,
  IconRecordMail,
  IconArrowLeft,
  IconArrowRight,
  IconUpload,
} from "@tabler/icons-react";
import { Dropzone } from "@mantine/dropzone";
import Canvas from "@/components/canvas";
import Timeline from "@/components/timeline";
import { useMediaStore } from "@/store/media-store";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  const [opened, { toggle }] = useDisclosure();
  const [uploadModalOpened, { open: openUploadModal, close: closeUploadModal }] = useDisclosure(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(60);
  const timerRef = useRef(null);

  const {
    mediaItems,
    addMediaItem,
    updateMediaItem,
    selectedMediaId,
    selectMedia,
    selectedMedia,
  } = useMediaStore();

  const handleFileUpload = (files) => {
    files.forEach((file) => {
      const isVideo = file.type.startsWith("video/");
      const url = URL.createObjectURL(file);

      addMediaItem({
        id: `media-${Date.now()}`,
        type: isVideo ? "video" : "image",
        url,
        width: 320,
        height: 240,
        x: 100,
        y: 100,
        startTime: 0,
        endTime: isVideo ? 30 : 10,
        duration: isVideo ? 30 : 0,
        filename: file.name,
      });
    });

    closeUploadModal();
  };

  const togglePlayback = () => {
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.1;
        });
      }, 100);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, duration]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const milliseconds = Math.floor((time % 1) * 10);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds}`;
  };

  return (
    <>
    <Sidebar/>
    <AppShell
      key="app-shell"
      header={{ height: 60 }}
      navbar={{ width: 350, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding={0}
    >
      <AppShell.Header style={{marginLeft : "80px"}}>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Text fw={700}>Edit Video</Text>
          </Group>

          <Group>
            <Text size="sm" c="dimmed">Project Name</Text>
            <Text size="sm" c="dimmed">Log in to save progress</Text>

            <Group ml="xl">
              <ActionIcon variant="subtle" color="gray">
                <IconArrowLeft size={18} />
              </ActionIcon>
              <ActionIcon variant="subtle" color="gray">
                <IconArrowRight size={18} />
              </ActionIcon>
            </Group>

            <Text size="sm" c="dimmed">
              Save your project for later — sign up or log in
            </Text>

            <Button variant="filled" color="orange" radius="md">Upgrade</Button>
            <Button variant="filled" color="dark" radius="md">Done</Button>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md" style={{marginLeft : "80px", overflow: "auto", maxHeight: "calc(100vh - 60px)" }}>
        <AppShell.Section>
          <MediaPanel />
        </AppShell.Section>

        <Divider my="md" />

        {selectedMedia && (
          <>
            <AppShell.Section>
              <Stack>
                <Text fw={600} size="sm">Media Properties</Text>

                <Group>
                  <Text size="sm">Width:</Text>
                  <NumberInput
                    value={selectedMedia.width}
                    onChange={(val) => updateMediaItem(selectedMedia.id, { width: Number(val) })}
                    min={50}
                    max={1920}
                    w={100}
                  />
                </Group>

                <Group>
                  <Text size="sm">Height:</Text>
                  <NumberInput
                    value={selectedMedia.height}
                    onChange={(val) => updateMediaItem(selectedMedia.id, { height: Number(val) })}
                    min={50}
                    max={1080}
                    w={100}
                  />
                </Group>

                <Group>
                  <Text size="sm">Start Time:</Text>
                  <NumberInput
                    value={selectedMedia.startTime}
                    onChange={(val) => updateMediaItem(selectedMedia.id, { startTime: Number(val) })}
                    min={0}
                    max={duration}
                    step={0.1}
                    decimalScale={1}
                    w={100}
                  />
                </Group>

                <Group>
                  <Text size="sm">End Time:</Text>
                  <NumberInput
                    value={selectedMedia.endTime}
                    onChange={(val) => updateMediaItem(selectedMedia.id, { endTime: Number(val) })}
                    min={selectedMedia.startTime}
                    max={duration}
                    step={0.1}
                    decimalScale={1}
                    w={100}
                  />
                </Group>
              </Stack>
            </AppShell.Section>

            <Divider my="md" />
          </>
        )}

        <AppShell.Section>
          <Stack>
            <Text fw={600} size="sm">Audio</Text>
            <Group>
              <Text size="sm">Clean Audio</Text>
              <Text size="xs" c="dimmed">Remove background noise</Text>
            </Group>
          </Stack>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main bg="#f0f0f0">
        <Box style={{
          height: "calc(100vh - 240px)",
          position: "relative",
          margin: "20px",
          maxWidth: "800px",
          marginLeft: "auto",
          marginRight: "auto"
        }}>
          <Canvas isPlaying={isPlaying} currentTime={currentTime} openUploadModal={openUploadModal}/>
        </Box>

        <Box style={{ height: "60px", marginLeft : "80px", borderTop: "1px solid #e0e0e0", background: "white" }}>
          <Timeline
            duration={duration}
            currentTime={currentTime}
            setCurrentTime={setCurrentTime}
            isPlaying={isPlaying}
            togglePlayback={togglePlayback}
          />
        </Box>

        <Modal
          opened={uploadModalOpened}
          onClose={closeUploadModal}
          title="Let's make a video!"
          centered
          size="lg"
        >
          <Box p="md">
            <Dropzone
              onDrop={handleFileUpload}
              accept={["image/*", "video/*"]}
              h={200}
              style={{
                border: "1px dashed #aaa",
                borderRadius: "8px",
                background: "#f8f9fe",
              }}
            >
              <Center h="100%">
                <Stack align="center" gap="xs">
                  <ActionIcon size="xl" radius="xl" variant="light" color="blue">
                    <IconUpload size={24} />
                  </ActionIcon>
                  <Text size="md" fw={500}>Upload files</Text>
                  <Text size="xs" c="dimmed">Choose files or drag them here</Text>
                </Stack>
              </Center>
            </Dropzone>

            <Group justify="space-between" mt="xl">
              <Button variant="light" leftSection={<IconRecordMail size={18} />}>
                Start by recording
              </Button>
              <Button variant="light" leftSection={<IconSettings size={18} />}>
                Start with AI
              </Button>
            </Group>
          </Box>
        </Modal>
      </AppShell.Main>
    </AppShell>
    </>
  );
}
