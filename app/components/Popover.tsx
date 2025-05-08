'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

const Popover = ({ children, content }: { children: React.ReactNode, content: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [popoverStyle, setPopoverStyle] = useState<React.CSSProperties>({});
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const toggleVisibility = () => {
    setIsVisible(v => {
      const next = !v;
      if (next && triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setPopoverStyle({
          position: 'absolute',
          top: rect.bottom + window.scrollY + 4, // 4px gap
          left: rect.left + window.scrollX,
          zIndex: 1000
        });
      }
      return next;
    });
  };

  // Focus management and Escape key
  useEffect(() => {
    if (isVisible && popoverRef.current) {
      popoverRef.current.focus();
    }
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible && triggerRef.current) {
      triggerRef.current.focus();
    }
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsVisible(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <span className="relative inline-block">
      <button
        ref={triggerRef}
        onClick={toggleVisibility}
        className="p-0 underline decoration-dotted text-inherit border-none background-none z-10"
        aria-haspopup="true"
        aria-expanded={isVisible}
        aria-controls="popover-content"
        type="button"
      >
        {children}
      </button>
      {isVisible && typeof window !== 'undefined' && createPortal(
        <div
          id="popover-content"
          ref={popoverRef}
          className={`absolute top-0 left-1/2 transform -translate-x-1/2 bg-fd-popover text-fd-popover-foreground border border-fd-border shadow-lg rounded-md p-4 z-10 whitespace-normal min-w-[250px] max-w-[320px] text-[13px]`}
          role="dialog"
          aria-modal="true"
          aria-label="Popover dialog"
          tabIndex={-1}
          style={popoverStyle}
          dangerouslySetInnerHTML={{ __html: content as string }} // Use dangerouslySetInnerHTML to set HTML content
        />,
        document.body
      )}
    </span>
  );
};

export default Popover;