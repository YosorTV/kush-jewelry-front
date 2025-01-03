import { postStrapiWishlist } from '../api/wishlist';
interface IAddToWishlist {
  productId: number;
  userId: number;
  access_token: string;
  locale: string;
}

export default async function addToWishlist(props: IAddToWishlist) {
  const res = await postStrapiWishlist(props);

  return res;
}
