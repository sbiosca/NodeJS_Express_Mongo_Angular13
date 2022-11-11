export interface Profile {
    username: string;
    bio: string;
    email: string,
    image: string;
    following: Profile[];
    followers: Profile[];
  }
  