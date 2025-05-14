import { Base } from "./response";

export interface Use extends Base {
  heroImage: string;
  titleIDN: string;
  titleENG: string;
  useComposition: string[];
}

export interface UseFor extends Base {
  useComposition: string;
  useCompositionId: string;
  titleIDN: string;
  titleENG: string;
  descriptionIDN: string;
  descriptionENG: string;
}

export interface UseComposition extends Base {
  use: Use;
  useId: string;
  titleIDN: string;
  titleENG: string;
  descriptionIDN: string;
  descriptionENG: string;
  useCompositionUseFor: UseFor[];
}
