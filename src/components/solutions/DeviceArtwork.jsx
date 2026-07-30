import laptopImage from '../../assets/laptop.png'
import desktopImage from '../../assets/desktop.png'
import mobileImage from '../../assets/mobile.png'
import tabletImage from '../../assets/tablet.png'

const deviceAssets = {
  laptop: laptopImage,
  desktop: desktopImage,
  mobile: mobileImage,
  tablet: tabletImage,
}


const sizeClasses = {
  laptop: 'w-full max-w-[380px] sm:max-w-[420px] lg:max-w-[460px]',
  desktop: 'w-full max-w-[150px] sm:max-w-[165px]',
  mobile: 'w-full max-w-[88px] sm:max-w-[96px]',
  tablet: 'w-full max-w-[145px] sm:max-w-[155px]',
}

export default function DeviceArtwork({ type }) {
  return (
    <img
      src={deviceAssets[type]}
      alt=""
      aria-hidden="true"
      className={`select-none object-contain drop-shadow-[0_14px_26px_rgba(15,23,42,.12)] ${sizeClasses[type]}`}
      draggable="false"
    />
  )
}
