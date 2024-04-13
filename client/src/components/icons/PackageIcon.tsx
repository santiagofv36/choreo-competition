import React from 'react';

export default function PackageIcon({
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 27 27" {...props} fill="none">
      <path
        d="M7.375 10.5315L13.1167 13.8573L18.815 10.5532"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.1172 19.7506V13.8464"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.7736 7.31409L8.30696 9.24242C7.52696 9.67576 6.87695 10.7699 6.87695 11.6691V15.3416C6.87695 16.2408 7.51613 17.3349 8.30696 17.7683L11.7736 19.6966C12.5103 20.1083 13.7236 20.1083 14.4711 19.6966L17.9378 17.7683C18.7178 17.3349 19.3678 16.2408 19.3678 15.3416V11.6583C19.3678 10.7591 18.7286 9.66492 17.9378 9.23159L14.4711 7.30326C13.7236 6.89159 12.5103 6.89159 11.7736 7.31409Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.9505 16.75C23.9505 20.9425 20.5597 24.3333 16.3672 24.3333L17.5047 22.4375"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.2832 10.2501C2.2832 6.05758 5.67404 2.66675 9.86654 2.66675L8.72905 4.56258"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
