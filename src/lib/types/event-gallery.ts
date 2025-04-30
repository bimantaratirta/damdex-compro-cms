import { Base } from "./response";

export interface EventGallery extends Base {
  heroImage: string;
  heroImageUrl: string;
  eventDate: Date;
  titleIDN: string;
  eventVenueIDN: string;
  eventThemeIDN: string;
  eventDescriptionIDN: string;
  titleENG: string;
  eventVenueENG: string;
  eventThemeENG: string;
  eventDescriptionENG: string;
}
