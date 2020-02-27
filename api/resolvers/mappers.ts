import { UserSettingsDocument } from "../models/user-settings";

export interface PostPigActivityResultMapper {
  success: Boolean;
  defaults?: UserSettingsDocument;
}
