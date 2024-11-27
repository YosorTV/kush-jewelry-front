export interface StrapiLinkType {
  id?: number | string;
  url: string;
  text?: string;
  isExternal?: boolean;
}

export interface CategoryLinkType extends StrapiLinkType {
  title?: string;
  slug?: string;
  className?: string;
}

export interface CollectionLinkType extends StrapiLinkType {
  title?: string;
  slug?: string;
  className?: string;
}

export type LinkType = {
  href: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
  replace?: boolean;
  scroll?: boolean;
  prefetch?: boolean;
  onClick?: () => void;
};
