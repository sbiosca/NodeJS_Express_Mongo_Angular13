import { Profile } from "./profile.model";

export interface User {
    id: Profile,
    email: string;
    password: string;
    token: string;
    username: string;
    bio: string;
    image: string;
  }
  