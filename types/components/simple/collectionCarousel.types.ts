export interface ICollectionCarousel {
  data: any[];
  title?: string;
  slideClass?: string;
  className?: string;
  fill?: string;
  titleClass?: string;
  format: 'standart' | 'mini';
  autoplay?: boolean;
  autoScroll?: boolean;
  loop?: boolean;
}
