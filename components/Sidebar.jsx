import {
    IconSearch,
    IconSettings,
    IconBrandHipchat,
    IconPlus,
    IconMusic,
    IconTextCaption,
    IconTypography,
    IconBox,
    IconMicrophone,
    IconVideo,
    IconAdjustmentsHorizontal,
    IconContrast,
    IconHelp,
  } from '@tabler/icons-react';
  
  import { Box, Stack, Tooltip, ActionIcon } from '@mantine/core';
  import styles from './Sidebar.module.css';
  import { useState } from 'react';
  
  const navItems = [
    { label: 'Search', icon: <IconSearch size={20} /> },
    { label: 'Settings', icon: <IconSettings size={20} /> },
    { label: 'Brand Kits', icon: <IconBrandHipchat size={20} /> },
    { label: 'Media', icon: <IconPlus size={20} /> },
    { label: 'Audio', icon: <IconMusic size={20} /> },
    { label: 'Subtitles', icon: <IconTextCaption size={20} /> },
    { label: 'Text', icon: <IconTypography size={20} /> },
    { label: 'Elements', icon: <IconBox size={20} /> },
    { label: 'Record', icon: <IconMicrophone size={20} /> },
    { label: 'Transitions', icon: <IconVideo size={20} /> },
    { label: 'Filters', icon: <IconContrast size={20} /> },
  ];
  
  export default function Sidebar() {
    // const [active, setActive] = useState('Media');
  
    return (
      <Box p="md" className={styles.sidebar} style={{ width: 80 }}>
        <Stack justify="space-between" className={styles.stack}>
          <Stack gap="md">
            {navItems.map((item) => (
              <Tooltip label={item.label} position="right" key={item.label}>
                <div className={styles.navItem}>
                  <ActionIcon
                    // onClick={() => setActive(item.label)}
                    className={styles.iconButton}
                    variant="subtle"
                    size="xl"
                  >
                    {item.icon}
                  </ActionIcon>
                  <span className={styles.label}>{item.label}</span>
                </div>
              </Tooltip>
            ))}
          </Stack>
  
          <div className={styles.footer}>
            <Tooltip label="Help" position="right">
              <ActionIcon variant="subtle" size="xl">
                <IconHelp size={20} />
              </ActionIcon>
            </Tooltip>
          </div>
        </Stack>
      </Box>
    );
  }
  