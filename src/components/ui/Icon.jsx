const paths = {
  check: <path d="m5 12 4 4L19 6" />,
  shield: <path d="M12 3 5 6v5c0 4.6 3 7.7 7 10 4-2.3 7-5.4 7-10V6l-7-3Zm-3 9 2 2 4-4" />,
  laptop: <><rect x="4" y="5" width="16" height="11" rx="2" /><path d="M2 19h20" /></>,
  monitor: <><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8m-4-4v4" /></>,
  phone: <><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></>,
  tablet: <><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M11 18h2" /></>,
  leaf: <path d="M20 4C12 4 5 8 5 15c0 3 2 5 5 5 7 0 10-8 10-16ZM5 20c2-5 6-8 11-10" />,
  truck: <><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7z" /><circle cx="7" cy="18" r="2" /><circle cx="18" cy="18" r="2" /></>,
  headset: <><path d="M4 13a8 8 0 0 1 16 0v5h-4v-6h4M4 18v-5h4v6H5a1 1 0 0 1-1-1Z" /><path d="M16 19c0 2-2 3-4 3" /></>,
  arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
  arrowUp: <path d="M12 19V5m-6 6 6-6 6 6" />,
  star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.2l-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  quote: <path d="M8 11H4a5 5 0 0 1 5-5v3a2 2 0 0 0-2 2h1v6H3v-6h5Zm13 0h-4a5 5 0 0 1 5-5v3a2 2 0 0 0-2 2h1v6h-5v-6h5Z" />,
  mapPin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  phoneCall: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" />,
  facebook: <path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v6h4v-6h3l1-4h-4V9c0-.7.3-1 1-1Z" />,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" /></>,
  linkedin: <><rect x="3" y="9" width="4" height="12" /><path d="M5 6.5v.01M11 21V9h4v2c1-1.5 5-2 5 3v7h-4v-6c0-2-1-3-2-3s-3 1-3 3v6Z" /></>,
  youtube: <><path d="M21 8.5c-.2-1.4-1.1-2.4-2.5-2.6C16.5 5.5 14.2 5.5 12 5.5s-4.5 0-6.5.4C4.1 6.1 3.2 7.1 3 8.5c-.2 1.1-.3 2.3-.3 3.5s.1 2.4.3 3.5c.2 1.4 1.1 2.4 2.5 2.6 2 .4 4.3.4 6.5.4s4.5 0 6.5-.4c1.4-.2 2.3-1.2 2.5-2.6.2-1.1.3-2.3.3-3.5s-.1-2.4-.3-3.5Z" /><path d="m10 9 5 3-5 3Z" /></>,
  xSocial: <path d="M5 4h4.2l3.4 4.8L16.8 4H19l-5.4 6.2L20 20h-4.2l-3.8-5.4L7.2 20H5l6-6.8L5 4Zm3.1 2 8.8 12h1L9.1 6h-1Z" />,
}

export default function Icon({ name, className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name] ?? paths.check}
    </svg>
  )
}
