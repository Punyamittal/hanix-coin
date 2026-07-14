import {
  SOCIAL_IMAGE_ALT,
  SOCIAL_IMAGE_SIZE,
  createSocialShareImage,
} from "@/lib/social-share-image";

export const alt = SOCIAL_IMAGE_ALT;
export const size = SOCIAL_IMAGE_SIZE;
export const contentType = "image/png";

export default async function TwitterImage() {
  return createSocialShareImage();
}
