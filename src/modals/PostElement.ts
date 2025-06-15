/**
 *  This the Post element class
 */

import type { CommentElement } from "./CommentElement";
import type { UserElement } from "./UserElement";

export type PostElement = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type PostFullElement = PostElement & {
  userName: string | null;
  email: string | null;
  user: UserElement | null;
  comments: CommentElement[] | null;
}
