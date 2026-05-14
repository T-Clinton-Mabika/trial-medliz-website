/*
 * =========================== FEEDBACK ICONS ===========================
 * - Registry for all feedback icons.
 * - These icons are used to give feedback to users for situations like sending feedback.
 */

import { BiCheckDouble } from "react-icons/bi";
import { BsSendArrowUpFill } from "react-icons/bs";

export const feedbackIcons = {
  sent: BiCheckDouble,
  sending: BsSendArrowUpFill,
  failed: BiCheckDouble,
} as const;
