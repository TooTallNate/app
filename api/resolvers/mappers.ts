import { UserSettingsDocument } from "../models/UserSettings";

export interface PostPigActivityResultMapper {
  success: Boolean;
  defaults?: UserSettingsDocument;
}
