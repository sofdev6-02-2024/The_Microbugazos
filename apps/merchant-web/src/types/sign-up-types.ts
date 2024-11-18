import { UserCredential } from "@firebase/auth";
import User from "@/entities/sign-up/UserSession";

type messageType = "success" | "error";
type userEmail = string | null;
type tempUser = {
  userCredential: UserCredential | null;
  formData: User | null;
};

export type { messageType, userEmail, tempUser }
