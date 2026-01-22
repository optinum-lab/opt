/**
 * Unified Scroll Manager
 * Consolidates multiple scroll listeners into a single event listener
 * to improve performance by reducing event firing frequency
 */

'use client';

type ScrollCallback = (scrollY: number) => void;

class ScrollManager {
  private listeners: Map<string, ScrollCallback> = new Map();
  private scrollY = 0;
  private isListening = false;
  private throttleTime = 16; // ~60fps
  private lastThrottleTime = 0;

  /**
   * Register a scroll callback
   * @param id Unique identifier for the callback
   * @param callback Function to call with scroll position
   * @returns Unsubscribe function
   */
  register(id: string, callback: ScrollCallback): () => void {
    this.listeners.set(id, callback);
    this.startListening();

    // Return unsubscribe function
    return () => {
      this.listeners.delete(id);
      if (this.listeners.size === 0) {
        this.stopListening();
      }
    };
  }

  /**
   * Start listening to scroll events (only called once)
   */
  private startListening() {
    if (this.isListening) return;
    if (typeof window === 'undefined') return;

    this.isListening = true;
    this.scrollY = window.scrollY || 0;
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  }

  /**
   * Stop listening to scroll events
   */
  private stopListening() {
    if (!this.isListening) return;
    this.isListening = false;
    window.removeEventListener('scroll', this.handleScroll);
  }

  /**
   * Handle scroll event with throttling
   */
  private handleScroll = () => {
    const now = performance.now();
    if (now - this.lastThrottleTime < this.throttleTime) {
      return;
    }

    this.lastThrottleTime = now;
    this.scrollY = window.scrollY || 0;

    // Notify all listeners
    this.listeners.forEach((callback) => {
      try {
        callback(this.scrollY);
      } catch (error) {
        console.error('Error in scroll callback:', error);
      }
    });
  };

  /**
   * Get current scroll position
   */
  getScrollY(): number {
    if (typeof window === 'undefined') return 0;
    return this.scrollY;
  }

  /**
   * Get number of active listeners
   */
  getListenerCount(): number {
    return this.listeners.size;
  }

  /**
   * Clear all listeners
   */
  clear(): void {
    this.listeners.clear();
    this.stopListening();
  }
}

// Singleton instance
export const scrollManager = new ScrollManager();

// ============================================
// React Hook
// ============================================

import { useEffect, useRef } from 'react';

/**
 * React hook for scroll position
 * Uses the singleton scroll manager to avoid duplicate listeners
 */
export function useScrollPosition(callback: (scrollY: number) => void): void {
  const idRef = useRef<string>('');

  useEffect(() => {
    // Generate unique ID for this component instance
    if (!idRef.current) {
      idRef.current = `scroll-callback-${Math.random().toString(36).substring(7)}`;
    }

    // Register callback with scroll manager
    const unsubscribe = scrollManager.register(idRef.current, callback);

    return unsubscribe;
  }, [callback]);
}

/**
 * React hook to get current scroll position
 * Updates on every scroll event
 */
export function useScrollY(): number {
  const [scrollY, setScrollY] = useScrollPosition((y) => setScrollY(y));

  return scrollY;
}
