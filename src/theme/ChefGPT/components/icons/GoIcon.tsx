// Fork of https://github.com/radix-ui/icons/blob/94b3fcf4e972566b34cb3b3a36296f70a2558dfa/packages/radix-icons/src/Cross1Icon.tsx
import * as React from 'react';
import { forwardRef } from 'react';
import type { SVGAttributes } from 'react';

export interface IconProps extends SVGAttributes<SVGElement> {
  children?: never;
  color?: string;
}

export const GoIcon = forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', ...props }, forwardedRef) => {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={forwardedRef}
      >
        <path
          d="M7 11L12 6L17 11M12 18V7"  
          stroke="currentColor" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round"
          fill={color}
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </svg>
    );
  }
);

export default GoIcon;