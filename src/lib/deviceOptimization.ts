/**
 * Device Optimization Utility
 * Detects device capabilities and provides optimization flags for mobile/low-end devices
 */

'use client';

import { useEffect, useState } from 'react';

// ============================================
// Types
// ============================================

export interface DeviceCapabilities {
  isMobile: boolean;
  isTablet: boolean;
  isLowEnd: boolean;
  canUseWebGL: boolean;
  canUseCanvas: boolean;
  maxParticles: number;
  animationQuality: 'high' | 'medium' | 'low' | 'none';
  deviceMemory: number;
  hardwareConcurrency: number;
  gpu: string;
  screenWidth: number;
  screenHeight: number;
  prefersReducedMotion: boolean;
}

// ============================================
// Detection Functions
// ============================================

/**
 * Detects device capabilities synchronously
 * Safe to call from server and client
 */
export function detectDeviceCapabilities(): DeviceCapabilities {
  // Check if in browser
  if (typeof window === 'undefined') {
    return {
      isMobile: false,
      isTablet: false,
      isLowEnd: false,
      canUseWebGL: false,
      canUseCanvas: false,
      maxParticles: 300,
      animationQuality: 'high',
      deviceMemory: 8,
      hardwareConcurrency: 4,
      gpu: 'unknown',
      screenWidth: 1920,
      screenHeight: 1080,
      prefersReducedMotion: false,
    };
  }

  try {
    const ua = navigator.userAgent;
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) &&
      window.innerWidth < 768;
    const isTablet =
      /iPad|Android(?!.*Mobi)/i.test(ua) && window.innerWidth >= 768 && window.innerWidth < 1024;

    // Get device memory (available in Chrome)
    const deviceMemory = (navigator as any).deviceMemory || 4;
    const hardwareConcurrency = navigator.hardwareConcurrency || 2;

    // Check low-end devices
    const isLowEnd =
      deviceMemory <= 2 || hardwareConcurrency <= 2 || window.innerWidth < 640;

    // GPU detection
    let canUseWebGL = false;
    let gpu = 'unknown';
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      canUseWebGL = !!gl;
      if (gl) {
        gpu = (gl as any).getParameter((gl as any).UNMASKED_RENDERER_WEBGL) || 'unknown';
      }
    } catch (e) {
      canUseWebGL = false;
    }

    // Canvas support
    let canUseCanvas = false;
    try {
      const canvas = document.createElement('canvas');
      canUseCanvas = !!canvas.getContext('2d');
    } catch (e) {
      canUseCanvas = false;
    }

    // Check prefers reduced motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Determine animation quality
    let animationQuality: 'high' | 'medium' | 'low' | 'none' = 'high';
    if (prefersReducedMotion) {
      animationQuality = 'none';
    } else if (isLowEnd) {
      animationQuality = 'none';
    } else if (isMobile && deviceMemory <= 4) {
      animationQuality = 'low';
    } else if (isMobile) {
      animationQuality = 'medium';
    }

    // Particle count based on device
    let maxParticles = 300;
    if (animationQuality === 'none') {
      maxParticles = 0;
    } else if (animationQuality === 'low') {
      maxParticles = 30;
    } else if (animationQuality === 'medium') {
      maxParticles = 60;
    }

    return {
      isMobile,
      isTablet,
      isLowEnd,
      canUseWebGL,
      canUseCanvas,
      maxParticles,
      animationQuality,
      deviceMemory,
      hardwareConcurrency,
      gpu,
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      prefersReducedMotion,
    };
  } catch (e) {
    console.error('Error detecting device capabilities:', e);
    return {
      isMobile: false,
      isTablet: false,
      isLowEnd: false,
      canUseWebGL: false,
      canUseCanvas: false,
      maxParticles: 300,
      animationQuality: 'high',
      deviceMemory: 8,
      hardwareConcurrency: 4,
      gpu: 'unknown',
      screenWidth: 1920,
      screenHeight: 1080,
      prefersReducedMotion: false,
    };
  }
}

// ============================================
// React Hook
// ============================================

/**
 * React hook for device capabilities
 * Updates on resize/mount
 */
export function useDeviceCapabilities() {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>(() =>
    detectDeviceCapabilities()
  );

  useEffect(() => {
    // Get initial capabilities
    setCapabilities(detectDeviceCapabilities());

    // Update on resize
    const handleResize = () => {
      setCapabilities(detectDeviceCapabilities());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return capabilities;
}

// ============================================
// Utility Functions
// ============================================

/**
 * Check if animations should be enabled on current device
 */
export function shouldEnableAnimations(): boolean {
  const caps = detectDeviceCapabilities();
  return caps.animationQuality !== 'none';
}

/**
 * Check if heavy 3D animations should be disabled
 */
export function shouldDisable3DAnimations(): boolean {
  const caps = detectDeviceCapabilities();
  return caps.isMobile || caps.animationQuality === 'none' || caps.animationQuality === 'low';
}

/**
 * Check if canvas animations should be disabled
 */
export function shouldDisableCanvasAnimations(): boolean {
  const caps = detectDeviceCapabilities();
  return caps.isMobile || caps.animationQuality === 'none';
}

/**
 * Get optimized animation duration based on device
 */
export function getOptimizedAnimationDuration(baseDuration: number): number {
  const caps = detectDeviceCapabilities();
  if (caps.animationQuality === 'low') {
    return baseDuration * 1.5; // Slower animations on low-end
  }
  if (caps.animationQuality === 'medium') {
    return baseDuration * 1.2; // Slightly slower on mobile
  }
  return baseDuration;
}
