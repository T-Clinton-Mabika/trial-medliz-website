/*
 * =========================== EMAILJS ===========================
 * - Central host for keys used to utilise the emailjs service for feedback and contact on the static site.
 */

/*
 * =========================== SERVICE IDS ===========================
 * - General Contact: Id used for the contact us feature on the site and routed through emailjs.
 * - Course: Id used for the feedback option for courses on the site and routing through emailjs.
 * - Article: Id used for article feedback option and routed through emailjs service.
 */

export const EMAILJS_SERVICE_IDS = {
  generalContact: "service_dxvyr5b",
  course: "service_dxvyr5b",
  article: "service_3k9xh7h",
} as const;

/*
 * =========================== PUBLIC KEYS ===========================
 * - General Contact: Public key needed to use the emailjs service for contact us feature.
 * - Course: Public key need to use the emailjs service for the feedback feature under courses section.
 * - Article: Public key need to use the emailjs service for the feedback feature under articles section.
 */

export const EMAILJS_PUBLIC_KEYS = {
  generalContact: "VLV1PicG50RX7Zug7",
  course: "VLV1PicG50RX7Zug7",
  article: "SrTcJ2_VA55t8_KM1",
} as const;

/*
 * =========================== TEMPLATES KEYS ===========================
 * - General Contact: Id for the emailjs template used for the contact us feature.
 * - Course: Id for the emailjs template for the feedback feature under courses section.
 * - Article: Id for the emailjs template for the feedback feature under articles section.
 */

export const EMAILJS_TEMPLATE_KEYS = {
  generalContact: "template_t2y0hni",
  course: "template_4ugh2d8",
  article: "template_pmg67ch",
} as const;
