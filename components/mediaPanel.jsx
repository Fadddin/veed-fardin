"use client";

import {
  Stack,
  Group,
  Text,
  ActionIcon,
  Slider,
  Switch,
  Box,
  UnstyledButton,
  Badge,
} from "@mantine/core";

import {
  IconSettings,
  IconAdjustments,
  IconVolume,
  IconStar,
  IconEye,
  IconBackground,
  IconPalette,
  IconScissors,
  IconWaveSawTool,
  IconBorderRadius,
  IconDroplet,
  IconRotate,
  IconLink,
  IconReplace,
  IconTrash,
  IconBolt,
  IconCheck,
  IconPlus,
} from "@tabler/icons-react";

export default function MediaPanel() {
  return (
    <Stack gap="xl" style={{ fontSize: "10px", padding: "1px" }}>
      <Group gap="md">
        <UnstyledButton className="tool-button">
          <Group gap="xs">
            <IconSettings size={20} />
            <Text>Animations</Text>
          </Group>
        </UnstyledButton>

        <UnstyledButton className="tool-button">
          <Group gap="xs">
            <IconAdjustments size={20} />
            <Text>Adjust</Text>
          </Group>
        </UnstyledButton>
      </Group>

      <Box className="speed-container">
        <Text mb="md">Speed</Text>
        <Group gap="xs">
          <button className="speed-button">0.5x</button>
          <button className="speed-button active">1x</button>
          <button className="speed-button">1.5x</button>
          <button className="speed-button">2x</button>
          <button className="speed-button">Custom</button>
        </Group>
      </Box>

      <Group align="center" gap="md" className="fade-audio-container">
        <ActionIcon size="lg" variant="light" radius="xl">
          <IconVolume size={20} />
        </ActionIcon>
        <Slider defaultValue={60} style={{ flex: 1 }} />
        <Text>100%</Text>
      </Group>

      <Group justify="apart" className="round-corners-container">
        <Group gap="xs">
          <IconWaveSawTool size={20} />
          <Text>Fade Audio In/Out</Text>
        </Group>
        <Switch />
      </Group>

      <Box mt="md">
        <Group gap="xs" mb="md">
          <Text fw={600} size="lg">Magic Tools</Text>
          <IconStar size={16} color="#5c5cff" />
        </Group>

        {/* Tool Cards */}
        {[
          {
            icon: <IconStar size={20} color="#5c5cff" />,
            title: "Clean Audio",
            desc: "Remove background noise",
            action: true,
          },
          {
            icon: <IconEye size={20} color="#5c5cff" />,
            title: "Eye Contact",
            desc: "Always look at the camera",
            action: true,
          },
          {
            icon: <IconBackground size={20} color="#5c5cff" />,
            title: "Remove Background",
            desc: "Auto-erase background video",
            action: true,
          },
          {
            icon: <IconPalette size={20} color="#5c5cff" />,
            title: "Green Screen",
            desc: "Remove a color from your video",
            action: false,
          },
          {
            icon: <IconScissors size={20} color="#5c5cff" />,
            title: "Magic Cut",
            desc: "Remove ums, ahs and bad takes",
            action: false,
            badge: true,
          },
          {
            icon: <IconWaveSawTool size={20} color="#5c5cff" />,
            title: "Remove Silences",
            desc: "Cut out dead air & awkward pauses",
            action: "check",
          },
        ].map((tool, index) => (
          <div className="tool-card" key={index}>
            <div className="tool-icon">{tool.icon}</div>
            <div className="tool-content">
              <Text fw={500}>{tool.title}</Text>
              <Text size="xs" color="dimmed">{tool.desc}</Text>
            </div>
            {tool.action && (
              <div className="tool-action">
                <ActionIcon variant="filled" color="orange" radius="xl">
                  <IconBolt size={16} />
                </ActionIcon>
              </div>
            )}
            {tool.action === "check" && (
              <div className="tool-action">
                <ActionIcon variant="subtle" color="blue" radius="xl">
                  <IconCheck size={16} />
                </ActionIcon>
              </div>
            )}
            {tool.badge && (
              <Badge color="blue" variant="light" size="sm">BETA</Badge>
            )}
          </div>
        ))}
      </Box>

      <Group justify="apart" className="round-corners-container">
        <Group gap="xs">
          <IconBorderRadius size={20} />
          <Text>Round Corners</Text>
        </Group>
        <Switch />
      </Group>

      <Box className="box-container">
        <Group justify="apart" mb="xs">
          <Group gap="xs">
            <IconDroplet size={20} />
            <Text>Opacity</Text>
          </Group>
        </Group>
        <Slider defaultValue={100} />
      </Box>

      <Group justify="apart" className="rotation-container">
        <Group gap="xs">
          <IconRotate size={20} />
          <Text>Rotation</Text>
        </Group>
        <Text>0°</Text>
      </Group>

      <UnstyledButton className="action-button">
        <Group gap="xs">
          <IconLink size={20} />
          <Text>Detach Audio</Text>
        </Group>
      </UnstyledButton>

      <Group justify="apart">
        <UnstyledButton className="action-button">
          <Group gap="xs">
            <IconReplace size={20} />
            <Text>Replace Video</Text>
            <ActionIcon variant="subtle">
              <IconTrash size={20} />
            </ActionIcon>
          </Group>
        </UnstyledButton>
      </Group>

      {/* Global styles */}
      <style jsx global>{`
        .tool-button {
          display: flex;
          align-items: center;
          background-color: #eaf4ff;
          border-radius: 8px;
          padding: 8px 16px;
          border: none;
          cursor: pointer;
          font-size: 10px;
          font-weight: 500;
          color: #187bff;
        }

        .tool-card {
          display: flex;
          align-items: center;
          padding: 16px;
          border-radius: 8px;
          background-color: #f8f9fe;
          margin-bottom: 12px;
        }

        .tool-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background-color: #e8eaff;
          margin-right: 16px;
        }

        .tool-content {
          flex: 1;
        }

        .tool-action {
          margin-left: 8px;
        }

        .box-container,
        .speed-container,
        .fade-audio-container,
        .round-corners-container,
        .rotation-container {
          padding: 16px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
        }

        .action-button {
          padding: 12px 16px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          transition: all 0.2s ease;
          width: 100%;
          text-align: left;
        }

        .action-button:hover {
          background-color: #f0f0f0;
          border-color: #d0d0d0;
        }

        .speed-button {
          padding: 8px 12px;
          border-radius: 20px;
          background-color: #f0f0f0;
          border: 1px solid #e0e0e0;
          font-size: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .speed-button.active {
          background-color: #e0e6ff;
          color: #5c5cff;
          border-color: #5c5cff;
        }
      `}</style>
    </Stack>
  );
}
