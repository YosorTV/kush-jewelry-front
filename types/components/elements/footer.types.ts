import { Session } from 'next-auth';
import { StrapiLinkType } from './link.types';

export type FooterProps = {
  data: any;
  locale: string;
  session: Session;
  sessionLinks: StrapiLinkType[];
};
