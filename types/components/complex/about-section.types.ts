import { BlocksContent } from '@strapi/blocks-react-renderer';
import { IStrapiImage } from '@/types/components/simple';

export interface IAboutSection {
  title: string;
  content?: BlocksContent;
  cover: IStrapiImage;
  subImage?: IStrapiImage;
}
