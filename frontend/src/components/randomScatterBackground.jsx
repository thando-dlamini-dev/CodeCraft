import React from 'react';
import * as Icons from 'lucide-react';

const iconNames = [
  'Code',
  'Terminal',
  'Laptop',
  'Bug',
  'Database',
  'Server',
  'Cpu',
  'Keyboard',
  'FileCode',
  'GitBranch',
  'HardDrive',
  'MousePointer',
  'Network',
  'Cloud',
  'Settings',
];

const randomOffset = () => (Math.random() - 0.5) * 5; // -2.5% to 2.5%

const ScatterIcons = ({ activeTheme, density = 20, children, extraStyling }) => {
  const iconsToRender = [];

  const columns = Math.ceil(Math.sqrt(density));
  const rows = Math.ceil(density / columns);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const name = iconNames[Math.floor(Math.random() * iconNames.length)];
      const Icon = Icons[name];
      const top = (row * (100 / rows)) + randomOffset();
      const left = (col * (100 / columns)) + randomOffset();
      const rotate = Math.floor(Math.random() * 360);

      iconsToRender.push(
        <div
          key={`${row}-${col}`}
          className={`absolute text-white opacity-70 z-20`}
          style={{
            top: `${top}%`,
            left: `${left}%`,
            transform: `rotate(${rotate}deg)`,
          }}
        >
          {Icon && <Icon size={28} />}
        </div>
      );
    }
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Scattered Icons */}
      {iconsToRender}

      {/* Custom Content */}
      <div className={`absolute min-h-screen inset-0 w-full ${extraStyling} ${activeTheme.accentDark} z-10`}>
        {children}
      </div>
    </div>
  );
};

export default ScatterIcons;
