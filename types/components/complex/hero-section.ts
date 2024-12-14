import { StrapiLinkType } from '../elements';
import { IStrapiImage } from '../simple/strapiImage.types';

export interface IHeroSection {
  device: string;
  data: {
    id: number;
    __component: string;
    title: string;
    description: string;
    image: IStrapiImage;
    sub_image: Record<string, IStrapiImage> | null;
    link: StrapiLinkType | null;
  };
}
