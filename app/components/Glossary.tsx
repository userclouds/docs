import React from 'react';
import Popover from './Popover';
import { glossaryDefinitions } from './glossary-definitions';

type GlossaryProps = {
  children: string;
};

const Glossary = ({ children }: GlossaryProps) => {
  const term = children.trim();
  console.log(term);
  const definition = glossaryDefinitions[term] || 'No definition found.';
  return (
    <Popover content={definition}>
      <span style={{ textDecoration: 'underline dotted', cursor: 'help' }}>{term}</span>
    </Popover>
  );
};

export default Glossary; 