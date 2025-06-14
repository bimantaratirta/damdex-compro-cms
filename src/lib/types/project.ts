import { Base } from "./response";

export interface Project extends Base {
  heroImage: string;
  heroImageUrl: string;
  titleIDN: string;
  firstDescriptionIDN: string;
  secondDescriptionIDN: string;
  titleENG: string;
  firstDescriptionENG: string;
  secondDescriptionENG: string;
}
