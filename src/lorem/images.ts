"use server";

import { hug, kitsune, neko, pat } from "nekonya.js";
import { shuffle } from "lodash";

export default async function () {
  const images = await Promise.all([neko(), kitsune(), pat(), hug()]);
  return shuffle(images);
}