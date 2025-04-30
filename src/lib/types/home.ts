import { Base } from "./response";

export interface Home extends Base {
  language: string;
  content: string;
  contentType: string;
  key: string;
  fileUrl: string;
}
