import laptopImage from '../assets/laptop.png'
import desktopImage from '../assets/desktop.png'
import mobileImage from '../assets/mobile.png'
import tabletImage from '../assets/tablet.png'

const deviceAssets = {
  laptop: laptopImage,
  desktop: desktopImage,
  mobile: mobileImage,
  tablet: tabletImage,
}

const sizeClasses = {
  laptop: 'w-full max-w-[270px] sm:max-w-[293px]',
  desktop: 'w-full max-w-[213px] sm:max-w-[225px]',
  mobile: 'w-full max-w-[105px] sm:max-w-[114px]',
  tablet: 'w-full max-w-[186px] sm:max-w-[198px]',
}

export default function DeviceArtwork({ type }) {
  const source = deviceAssets[type]

  if (!source) return null

  return (
    <img
      src={source}
      alt=""
      aria-hidden="true"
      className={`max-h-[218px] select-none object-contain drop-shadow-[0_14px_26px_rgba(15,23,42,.12)] ${sizeClasses[type]}`}
      draggable={false}
      loading="lazy"
      decoding="async"
    />
  )
}
