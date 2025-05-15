'use client';

import React from 'react';
import Popover from './Popover';
import { glossaryDefinitions } from '@/content/glossary-definitions';

type GlossaryProps = {
  children: string;
  term?: string
};

const Glossary = ({ children, term }: GlossaryProps) => {
  term = term || children.trim();
  const definition = glossaryDefinitions[term];
  const definitionString = definition || 'No definition found.';
  return (
    <Popover content={definitionString}>
      <span style={{ textDecoration: 'underline dotted', cursor: 'help' }} className={definition ? '' : 'border-2 border-red-500'}>{term}</span>
    </Popover>
  );
};

export default Glossary; 