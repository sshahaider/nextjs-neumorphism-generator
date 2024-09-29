"use client";

import react, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const useClickOutside = ({ callback }) => {
  const targetRef = useRef();
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (targetRef.current && !targetRef.current.contains(event.target)) {
        callback(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [callback]);

  useEffect(() => {
    callback(false);
  }, [pathname]);

  return targetRef;
};

export default useClickOutside;
