import { StrapiLinkType } from '../elements';
import { IStrapiImage } from '../simple/strapiImage.types';

export interface IHeroSection {
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
