// Addresses for the images in client/public/images. vite.config.ts lists those
// files when the site builds, each with a short hash of its contents.
export type ImageIndex = Record<string, string>;

declare const __IMAGES__: ImageIndex;
const builtIndex: ImageIndex = typeof __IMAGES__ === "undefined" ? {} : __IMAGES__;

const fileName = (src: string) => src.replace(/^\/images\//, "");

/**
 * The image's address with ?v=<hash of the file>. It changes whenever the file
 * does, so browsers can keep images for a year (public/_headers).
 */
export function imageUrl(src: string, index: ImageIndex = builtIndex) {
  const version = index[fileName(src)];
  return version ? `${src}?v=${version}` : src;
}

/**
 * A srcset of the image and its smaller copies, saved beside it as
 * name-<width>.webp, so phones download a size close to what they show.
 */
export function imageSrcSet(src: string, width: number, index: ImageIndex = builtIndex) {
  const stem = fileName(src).replace(/\.webp$/, "");
  const smaller = Object.keys(index)
    .filter((name) => name.startsWith(`${stem}-`) && name.endsWith(".webp"))
    .map((name) => ({ name, width: Number(name.slice(stem.length + 1, -".webp".length)) }))
    .filter((copy) => Number.isInteger(copy.width) && copy.width < width);
  if (!smaller.length) return undefined;
  return [...smaller.map((copy) => `${imageUrl(`/images/${copy.name}`, index)} ${copy.width}w`), `${imageUrl(src, index)} ${width}w`].join(", ");
}

// How wide each image is shown, for the browser to pick from the srcset. Kept
// here so the hero's preload tag (vite.config.ts) asks for the same file.
export const imageSizes = {
  heroScreen: "(min-width: 1024px) 512px, (min-width: 640px) calc(100vw - 96px), calc(100vw - 48px)",
  heroPhone: "(min-width: 640px) 150px, 24vw",
  workWide: "(min-width: 1024px) 540px, (min-width: 640px) calc(100vw - 128px), calc(100vw - 80px)",
  workHalf: "(min-width: 1024px) 262px, (min-width: 640px) calc(50vw - 72px), calc(50vw - 46px)",
  workPhone: "(min-width: 640px) 180px, 34vw",
  logo: "36px",
};
