const PREDEFINED_SIZE_MAP = {
  small: '20px',
  medium: '35px',
  large: '63px',
  xLarge: '80px',
  xxLarge: '96px',
};

export function Checkmark({ size, color }: { size: keyof typeof PREDEFINED_SIZE_MAP, color?: string}) {
  const computedSize = PREDEFINED_SIZE_MAP[size] || size;
  const style: {[key: string]: string} = { width: computedSize, height: computedSize };
  if (color) {
    style['--checkmark-fill-color'] = color;
  }


  return (
    <svg
      className='checkmark'
      xmlns='http://www.w3.org/2000/svg'
      style={style}
      viewBox='0 0 52 52'
    >
      {/* <circle className='checkmark__circle' cx='26' cy='26' r='25' fill='none' /> */}
      <path className='checkmark__check' fill='none' d='M14.1 27.2l7.1 7.2 16.7-16.8' />
    </svg>
  );
}