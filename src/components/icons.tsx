import type { SVGProps } from 'react';

export function ShopWaveLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 6.5C3 6.5 4.5 8 6 8s3-1.5 3-1.5S10.5 8 12 8s3-1.5 3-1.5S16.5 8 18 8s3-1.5 3-1.5" />
      <path d="M3 11.5C3 11.5 4.5 13 6 13s3-1.5 3-1.5S10.5 13 12 13s3-1.5 3-1.5S16.5 13 18 13s3-1.5 3-1.5" />
      <path d="M3 16.5C3 16.5 4.5 18 6 18s3-1.5 3-1.5S10.5 18 12 18s3-1.5 3-1.5S16.5 18 18 18s3-1.5 3-1.5" />
    </svg>
  );
}
