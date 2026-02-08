import { ImageProps } from 'next/image';

export interface IImageFormat {
  url: string;
  width: number;
  height: number;
}

export interface IImageFormats {
  thumbnail?: IImageFormat;
  small?: IImageFormat;
  medium?: IImageFormat;
  large?: IImageFormat;
}

export interface IImageProps extends ImageProps {
  name?: string;
  fill?: boolean;
  caption?: string | null;
  formats?: IImageFormats;
  /** Disable opacity transition to avoid compositing glitches (e.g. inside Zoom) */
  disableTransition?: boolean;
}
