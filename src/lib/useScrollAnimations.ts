/**
 * GSAP Scroll Animations Hook
 * Modern scroll-triggered animations
 */

'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ============================================
// Types
// ============================================

interface ScrollAnimationOptions {
  trigger?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  toggleActions?: string;
}

// ============================================
// Hooks
// ============================================

/**
 * Fade up animation on scroll
 */
export function useFadeUp(options: ScrollAnimationOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: options.start || 'top 85%',
            end: options.end || 'top 20%',
            toggleActions: options.toggleActions || 'play none none reverse',
            ...options,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [options]);

  return ref;
}

/**
 * Stagger children animation on scroll
 */
export function useStaggerChildren(
  selector: string,
  options: ScrollAnimationOptions = {}
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      const children = ref.current?.querySelectorAll(selector);
      if (!children?.length) return;

      gsap.fromTo(
        children,
        {
          opacity: 0,
          y: 40,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ref.current,
            start: options.start || 'top 80%',
            toggleActions: options.toggleActions || 'play none none reverse',
            ...options,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [selector, options]);

  return ref;
}

/**
 * Parallax effect on scroll
 */
export function useParallax(speed: number = 0.5) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        y: () => -ScrollTrigger.maxScroll(window) * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: 'max',
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, [speed]);

  return ref;
}

/**
 * Scale up animation on scroll
 */
export function useScaleUp(options: ScrollAnimationOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: ref.current,
            start: options.start || 'top 85%',
            toggleActions: options.toggleActions || 'play none none reverse',
            ...options,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [options]);

  return ref;
}

/**
 * Slide in from left/right animation
 */
export function useSlideIn(
  direction: 'left' | 'right' = 'left',
  options: ScrollAnimationOptions = {}
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const xValue = direction === 'left' ? -100 : 100;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        {
          opacity: 0,
          x: xValue,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: options.start || 'top 85%',
            toggleActions: options.toggleActions || 'play none none reverse',
            ...options,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [direction, options]);

  return ref;
}

/**
 * Text reveal animation (character by character)
 */
export function useTextReveal(options: ScrollAnimationOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      // Split text into spans
      const text = ref.current?.textContent || '';
      if (ref.current) {
        ref.current.innerHTML = text
          .split('')
          .map((char) => `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
          .join('');
      }

      const chars = ref.current?.querySelectorAll('span');
      if (!chars?.length) return;

      gsap.fromTo(
        chars,
        {
          opacity: 0,
          y: 20,
          rotateX: -90,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.5,
          stagger: 0.02,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ref.current,
            start: options.start || 'top 85%',
            toggleActions: options.toggleActions || 'play none none reverse',
            ...options,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [options]);

  return ref;
}

/**
 * Counter animation on scroll
 */
export function useCounter(
  endValue: number,
  options: ScrollAnimationOptions = {}
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      const obj = { value: 0 };
      
      gsap.to(obj, {
        value: endValue,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: options.start || 'top 85%',
          toggleActions: options.toggleActions || 'play none none reverse',
          ...options,
        },
        onUpdate: () => {
          if (ref.current) {
            ref.current.textContent = Math.round(obj.value).toLocaleString('tr-TR');
          }
        },
      });
    });

    return () => ctx.revert();
  }, [endValue, options]);

  return ref;
}

/**
 * Horizontal scroll section
 */
export function useHorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !wrapperRef.current) return;

    const ctx = gsap.context(() => {
      const sections = wrapperRef.current?.children;
      if (!sections?.length) return;

      gsap.to(wrapperRef.current, {
        x: () => -(wrapperRef.current!.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${wrapperRef.current!.scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return { containerRef, wrapperRef };
}

/**
 * Rotate on scroll
 */
export function useRotateOnScroll(rotation: number = 360) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        rotation,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, [rotation]);

  return ref;
}

// ============================================
// Utility: Initialize all scroll triggers
// ============================================

export function refreshScrollTrigger() {
  ScrollTrigger.refresh();
}
