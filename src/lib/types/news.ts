import { Base } from "./response";

export interface News extends Base {
  titleImage: string;
  titleImageUrl: string;
  titleIDN: string;
  contentIDN: string;
  titleENG: string;
  contentENG: string;
}
