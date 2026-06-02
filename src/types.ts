/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'en' | 'mr';

export interface BilingualText {
  en: string;
  mr: string;
}

export interface SareeCategory {
  id: string;
  title: BilingualText;
  description: BilingualText;
  image: string;
  benefits: BilingualText[];
  subproducts: { name: BilingualText; priceRange: string; icon: string }[];
}

export interface Review {
  id: string;
  name: BilingualText;
  location: BilingualText;
  rating: number;
  text: BilingualText;
  avatar: string;
  date: string;
}

export interface TimelineEvent {
  year: string;
  title: BilingualText;
  description: BilingualText;
}

export interface FAQItem {
  question: BilingualText;
  answer: BilingualText;
}
