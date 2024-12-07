import { Session } from 'next-auth';
import { StrapiLinkType } from '../elements';

export interface IUserSession {
  cta: StrapiLinkType;
  session: Session | null;
  sessionLinks: StrapiLinkType[];
  signOutTitle: string;
  locale: string;
}
