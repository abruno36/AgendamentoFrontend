"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function Home() {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <div className="grid place-items-center h-screen">
      <div>

        <div className="flex justify-center">
          {currentTheme === 'light' ? (
            <button
              className=" hover:bg-white bg-gray-100 w-28 rounded-md border-purple-400 border-2 p-4"
              onClick={() => setTheme('dark')}
            >
              <div style={{ backgroundColor: '#b9b9be' }}>
                <Image src="/sun_icon.svg" alt="logo" height={50} width={50} />
              </div>
            </button>
          ) : (
             <button
              className=" hover:bg-black w-28 rounded-md border-purple-400 border-2 p-4"
              onClick={() => setTheme('light')}
            >
              {' '}
              <Image src="/moon_icon.svg" alt="logo" height="50" width="50" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}


