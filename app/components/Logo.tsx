export default function Logo({
  size = 32,
  color = "#A87722",
}: {
  size?: 32 | 88;
  color?: string;
}) {
  const sw = color === "white" || color === "#ffffff" || color === "#FFFFFF" ? "4" : "3.2";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M14 22C10 22 7 18.5 7 15C7 11.5 10 8 14 8C18.5 8 22 12.5 22 12.5" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M30 22C34 22 37 18.5 37 15C37 11.5 34 8 30 8C25.5 8 22 12.5 22 12.5" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 22C10 22 7 25.5 7 29C7 32.5 10 36 14 36C18.5 36 22 31.5 22 31.5" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M30 22C34 22 37 25.5 37 29C37 32.5 34 36 30 36C25.5 36 22 31.5 22 31.5" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18 20C16 18 16 14 18 12" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M26 20C28 18 28 14 26 12" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18 24C16 26 16 30 18 32" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M26 24C28 26 28 30 26 32" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
