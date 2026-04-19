import React, { useState } from 'react';
import { 
  useFloating, 
  offset, 
  flip, 
  shift, 
  useHover, 
  useInteractions,
  autoUpdate
} from '@floating-ui/react';

export const Tooltip = ({ children, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(10), flip(), shift()], // Espaciado y auto-posicionamiento
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  return (
    <>
      {/* El clonamos el hijo para pasarle las referencias y eventos */}
      {React.cloneElement(children, {
        ref: refs.setReference,
        ...getReferenceProps(),
      })}
      
      {isOpen && (
        <div
          ref={refs.setFloating}
          style={{
            ...floatingStyles,
            backgroundColor: '#333',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '4px',
            fontSize: '12px',
            zIndex: 1000,
          }}
          {...getFloatingProps()}
        >
          {content}
        </div>
      )}
    </>
  );
};
