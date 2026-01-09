/**
 * TypeScript Type Definitions
 * Centralized types for SecureVision
 */

// ============================================
// Component Props Types
// ============================================

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

// ============================================
// Data Types
// ============================================

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  features: string[];
  image: string;
  badge: string | null;
}

export interface Step {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ComparisonFeature {
  feature: string;
  us: boolean;
  others: boolean;
}

export interface TrustBadge {
  name: string;
  icon: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface NavLink {
  href: string;
  label: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

// ============================================
// Form Types
// ============================================

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  type: 'quote' | 'support' | 'general';
}

// ============================================
// Theme Types
// ============================================

export type Theme = 'light' | 'dark' | 'system';

// ============================================
// Icon Types
// ============================================

export type IconName =
  | 'brain'
  | 'camera'
  | 'cloud'
  | 'smartphone'
  | 'bell'
  | 'moon'
  | 'package'
  | 'tool'
  | 'shield'
  | 'shield-check'
  | 'lock'
  | 'award'
  | 'star'
  | 'check'
  | 'x'
  | 'menu'
  | 'chevron-right'
  | 'chevron-down'
  | 'arrow-right'
  | 'play'
  | 'sun'
  | 'mail'
  | 'phone'
  | 'map-pin';
