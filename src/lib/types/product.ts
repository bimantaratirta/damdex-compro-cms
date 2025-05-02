import { Base } from "./response";

export interface ProductAdvantage extends Base {
  product: string;
  productId: string;
  heroImageUrl: string;
  heroImage: string;
  titleIDN: string;
  descriptionIDN: string;
  titleENG: string;
  descriptionENG: string;
}

export interface Product extends Base {
  heroImage: string;
  heroImageUrl: string;
  titleIDN: string;
  descriptionIDN: string;
  titleENG: string;
  descriptionENG: string;
  productAdvantage: ProductAdvantage[];
}
