import React from 'react';

export const TechIcon = ({ name, className = "w-5 h-5", size = 20 }) => {
  const norm = (name || '').toLowerCase().replace(/[\s.\-_]/g, '');

  // High-fidelity official SVGs
  switch (true) {
    case norm.includes('react'):
      return (
        <svg width={size} height={size} viewBox="-11.5 -10.23174 23 20.46348" fill="none" className={className}>
          <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
          <g stroke="#61DAFB" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
          </g>
        </svg>
      );

    case norm.includes('next'):
      return (
        <svg width={size} height={size} viewBox="0 0 180 180" fill="none" className={className}>
          <mask id="mask0_next" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180" style={{ maskType: 'alpha' }}>
            <circle cx="90" cy="90" r="90" fill="black"/>
          </mask>
          <g mask="url(#mask0_next)">
            <circle cx="90" cy="90" r="90" fill="#000" stroke="#fff" strokeWidth="6"/>
            <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="#fff"/>
            <rect x="115" y="54" width="12" height="72" fill="#fff"/>
          </g>
        </svg>
      );

    case norm.includes('typescript') || norm === 'ts':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="4" fill="#3178C6"/>
          <path d="M1.5 0h21A1.5 1.5 0 0 1 24 1.5v21a1.5 1.5 0 0 1-1.5 1.5h-21A1.5 1.5 0 0 1 0 22.5v-21A1.5 1.5 0 0 1 1.5 0z" fill="#3178C6"/>
          <path d="M12.984 15.688c.28.468.69.836 1.233 1.103.542.267 1.15.4 1.826.4.636 0 1.205-.125 1.708-.375.503-.25.89-.597 1.16-1.042.27-.444.405-.953.405-1.527 0-.52-.108-.962-.323-1.328-.216-.366-.54-.68-.973-.941-.433-.262-1.012-.516-1.737-.763-.695-.246-1.222-.486-1.58-.72-.358-.235-.618-.5-.78-.795-.163-.296-.244-.648-.244-1.057 0-.462.12-.876.36-1.242.24-.366.58-.654 1.02-.864.44-.21.96-.315 1.56-.315.61 0 1.15.114 1.62.342.47.228.84.552 1.11.972.27.42.42.9.45 1.44h-2.1c-.04-.336-.17-.61-.39-.822-.22-.212-.54-.318-.96-.318-.4 0-.72.096-.96.288-.24.192-.36.456-.36.792 0 .288.08.528.24.72.16.192.4.366.72.522.32.156.77.342 1.35.558.74.27 1.33.558 1.77.864.44.306.77.672.99 1.098.22.426.33.93.33 1.512 0 .6-.14 1.14-.42 1.62-.28.48-.68.864-1.2 1.152-.52.288-1.15.432-1.89.432-.78 0-1.47-.156-2.07-.468-.6-.312-1.07-.756-1.41-1.332l1.65-1.032zM4 9.072h7.62v2.016H8.976v9.84H6.648v-9.84H4V9.072z" fill="#fff"/>
        </svg>
      );

    case norm.includes('node'):
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M12 2L2 7.773v11.547L12 25l10-5.68V7.773L12 2zm-.9 3.535l7.9 4.56v9.12l-7.9 4.56-7.9-4.56v-9.12l7.9-4.56z" fill="#5FA04E"/>
        </svg>
      );

    case norm.includes('docker'):
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#2496ED" className={className}>
          <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.136a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m-2.928 0h2.12a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186h-2.12A.185.185 0 002 9.006v1.888c0 .102.082.185.185.185M23.79 11.75c-.328-.21-.86-.33-1.62-.33-.35 0-.74.03-1.15.09a4.87 4.87 0 00-3.95-1.99c-.19 0-.38.01-.56.03a.58.58 0 00-.51.58v4.21c0 .28-.11.55-.3.75-.41.44-.99.71-1.63.71H1.5c-.28 0-.5.22-.5.5 0 3.31 3.58 6 8 6 4.97 0 9.17-3.34 9.91-7.79.91.24 1.76.2 2.37-.09.61-.29.98-.82 1.09-1.5.07-.46-.07-.88-.58-1.16z"/>
        </svg>
      );

    case norm.includes('postgres'):
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.85.63-3.55 1.69-4.9L9.5 13.5v2h5v-2l3.81-6.4C19.37 8.45 20 10.15 20 12c0 4.41-3.59 8-8 8z" fill="#4169E1"/>
        </svg>
      );

    case norm.includes('redis'):
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#DC382D" className={className}>
          <path d="M21.57 6.42l-9.08-4.24a1.14 1.14 0 00-.98 0L2.43 6.42A1.14 1.14 0 001.9 7.45v8.78a1.14 1.14 0 00.53 1.03l9.08 4.24c.31.14.67.14.98 0l9.08-4.24a1.14 1.14 0 00.53-1.03V7.45a1.14 1.14 0 00-.53-1.03zM12 4.16l7.08 3.3L12 10.76 4.92 7.46 12 4.16z"/>
        </svg>
      );

    case norm.includes('laravel'):
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#FF2D20" className={className}>
          <path d="M8.5 2.5l5.5 3.2v6.4L8.5 8.9V2.5zm7 4.1l5.5 3.2v6.4l-5.5-3.2V6.6zM3 5.7l5.5 3.2v6.4L3 12.1V5.7zm11 6.5l5.5 3.2v6.4l-5.5-3.2v-6.4zM8.5 8.9l5.5 3.2v6.4L8.5 15.3V8.9zm-5.5 3.2l5.5 3.2v6.4L3 18.5v-6.4z"/>
        </svg>
      );

    case norm.includes('aws'):
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#FF9900" className={className}>
          <path d="M18.75 14.5c-2.34 1.74-5.73 2.67-8.68 2.67-4.14 0-7.88-1.55-10.7-4.14-.22-.2-.04-.5.22-.38 3.03 1.45 6.64 2.33 10.48 2.33 2.61 0 5.48-.65 8.1-1.95.4-.2.77.29.58.62v-.01c.01-.26.01-.52 0-.78v.63-.34zm1.18-1.28c-.28-.36-1.85-.43-2.55-.35-.21.03-.25-.15-.05-.28 1.25-.87 3.3-.62 3.53-.34.24.28-.06 2.33-1.24 3.29-.18.15-.35.07-.27-.12.28-.65.86-1.83.58-2.2z"/>
        </svg>
      );

    case norm.includes('git'):
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#F05032" className={className}>
          <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.657 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.61-.406V8.814c-.223-.09-.428-.227-.61-.406-.543-.541-.678-1.342-.404-2.004L7.545 3.612 0 11.157c-.603.604-.603 1.582 0 2.188l10.48 10.479c.604.604 1.582.604 2.186 0l10.88-10.88c.603-.604.603-1.582 0-2.188z"/>
        </svg>
      );

    case norm.includes('linux') || norm.includes('bash'):
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#FCC624" className={className}>
          <path d="M12.003 0c-2.315 0-4.27 1.45-4.805 3.513-.393 1.514-.27 3.327.35 4.962.62 1.636 1.69 3.033 3.06 3.963 1.37.93 2.97 1.37 4.54 1.25 1.57-.12 3.01-.78 4.09-1.88 1.08-1.1 1.74-2.54 1.86-4.11.12-1.57-.32-3.17-1.25-4.54-.93-1.37-2.33-2.44-3.96-3.06C14.258.468 13.13 0 12.003 0z" fill="#fff"/>
          <path d="M12 2C8 2 6 5 6 9c0 3 1 5 1 8 0 3 2 5 5 5s5-2 5-5c0-3 1-5 1-8 0-4-2-7-6-7z" fill="#FCC624"/>
        </svg>
      );

    case norm.includes('tailwind'):
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#38B2AC" className={className}>
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.335 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.335 13.382 8.975 12 6.001 12z"/>
        </svg>
      );

    case norm.includes('c++') || norm.includes('cpp'):
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#00599C" className={className}>
          <path d="M22.394 6.003L13.606.928a3.21 3.21 0 00-3.212 0L1.606 6.003A3.21 3.21 0 000 8.785v10.151a3.21 3.21 0 001.606 2.782l8.788 5.075a3.21 3.21 0 003.212 0l8.788-5.075A3.21 3.21 0 0024 18.936V8.785a3.21 3.21 0 00-1.606-2.782zm-9.394 13.5v-3h-2v3H8v-2h3v-2H9v-2h2v-2h2v2h2v2h-2v2h3v2h-3z"/>
        </svg>
      );

    case norm.includes('mongo'):
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#47A248" className={className}>
          <path d="M12 0C11.5 2 7 8 7 14c0 3.5 2.5 7 5 10 2.5-3 5-6.5 5-10 0-6-4.5-12-5-14zm0 21c-1.5-2-3-4-3-7 0-3 1.5-6 3-8 1.5 2 3 5 3 8 0 3-1.5 5-3 7z"/>
        </svg>
      );

    case norm.includes('supabase'):
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M11.996 0L1.758 13.297h9.096L9.61 24l12.632-15.342h-9.351L11.996 0z" fill="#3ECF8E"/>
        </svg>
      );

    case norm.includes('bull') || norm.includes('queue'):
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#E24A4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M4 6h16M4 12h16M4 18h7" />
          <path d="M17 15l3 3-3 3" />
        </svg>
      );

    case norm.includes('timescale'):
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#FDB515" className={className}>
          <path d="M12 2a10 10 0 1010 10A10.011 10.011 0 0012 2zm1 14.59L8.71 12.3a1 1 0 111.41-1.41L12 12.76l4.29-4.3a1 1 0 111.42 1.42z" />
        </svg>
      );

    case norm.includes('vector') || norm.includes('gemini') || norm.includes('llm'):
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );

    case norm.includes('express'):
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm5.34 16.5l-3.32-4.98 3.06-4.52h-2.12l-2.02 3.12-2-3.12H8.84l3.08 4.54-3.34 4.96h2.12l2.28-3.52 2.24 3.52z"/>
        </svg>
      );

    case norm.includes('vite'):
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M21.578 3.868L12.44 20.21a.5.5 0 01-.88 0L2.422 3.868a.5.5 0 01.44-.746h18.276a.5.5 0 01.44.746z" fill="#646CFF"/>
          <path d="M15.5 2.5L9 15l-2-4" stroke="#FFD62E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );

    case norm.includes('chrome'):
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="12" cy="12" r="10" stroke="#4285F4" strokeWidth="2"/>
          <circle cx="12" cy="12" r="4" fill="#4285F4"/>
          <path d="M12 2a10 10 0 018.66 5H12" stroke="#EA4335" strokeWidth="2"/>
          <path d="M20.66 7a10 10 0 01-5 13.66L12 12" stroke="#FBBC05" strokeWidth="2"/>
          <path d="M15.66 20.66A10 10 0 013.34 12H12" stroke="#34A853" strokeWidth="2"/>
        </svg>
      );

    default:
      // Minimalist circuit / systems node glyph
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3m0 14v3M2 12h3m14 0h3m-3.5-6.5l-2.1 2.1m-8.8 8.8l-2.1 2.1m0-13l2.1 2.1m8.8 8.8l2.1 2.1" />
        </svg>
      );
  }
};

export const GithubIcon = ({ className = "w-4 h-4", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const LinkedinIcon = ({ className = "w-4 h-4", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

