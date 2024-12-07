import { StrapiLinkType } from '../elements';

export type TMenu = {
  pages: {
    title: string;
    data: StrapiLinkType[];
  };
  collections: {
    title: string;
    data: any[];
  };
  categories: {
    title: string;
    data: any[];
  };
  sessionLinks: StrapiLinkType[];
  authLink: StrapiLinkType;
};
