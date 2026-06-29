---
name: Serene Voyage
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#574048'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#8b7079'
  outline-variant: '#debec8'
  surface-tint: '#b4136e'
  primary: '#b00c6a'
  on-primary: '#ffffff'
  primary-container: '#d13184'
  on-primary-container: '#fffbfa'
  inverse-primary: '#ffb0cd'
  secondary: '#5e5697'
  on-secondary: '#ffffff'
  secondary-container: '#bfb6fe'
  on-secondary-container: '#4c4484'
  tertiary: '#874661'
  on-tertiary: '#ffffff'
  tertiary-container: '#a45e7a'
  on-tertiary-container: '#fffaf9'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd9e5'
  primary-fixed-dim: '#ffb0cd'
  on-primary-fixed: '#3e0022'
  on-primary-fixed-variant: '#8c0053'
  secondary-fixed: '#e5deff'
  secondary-fixed-dim: '#c7bfff'
  on-secondary-fixed: '#1a0f50'
  on-secondary-fixed-variant: '#463e7d'
  tertiary-fixed: '#ffd9e4'
  tertiary-fixed-dim: '#ffb0cd'
  on-tertiary-fixed: '#3a0620'
  on-tertiary-fixed-variant: '#6f324c'
  background: '#fcf9f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  display-lg:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-md:
    fontFamily: Manrope
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Work Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Work Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Work Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  call-to-action:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '700'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style
The design system is crafted to evoke a sense of deep trust, cultural reverence, and seamless global mobility. It targets a diverse demographic of travelers, from families seeking spiritual fulfillment through Hajj and Umrah to corporate travelers requiring precision and reliability.

The visual direction is **Corporate / Modern** with a focus on **Tonal Layering**. By utilizing high-end photography of sacred sites and global landmarks, the UI acts as a refined window into the traveler's journey. The aesthetic avoids clutter, opting for generous whitespace and structured information architecture to reduce the cognitive load often associated with travel booking. The emotional response should be one of "assured peace"—knowing that every detail of the journey is handled by professionals.

## Colors
The palette is derived directly from the heritage of the business card while modernizing the execution for digital accessibility. 

- **Primary Pink (#D13184):** Used for high-contrast "Book Now" actions, active states, and primary brand markers. It provides a vibrant, energetic contrast against deep backgrounds.
- **Deep Navy (#3E3675):** The foundation of trust. This color is used for headers, navigation backgrounds, and primary text to ground the design.
- **Tints & Grays:** A range of cool grays (from #F8F9FA to #6C757D) ensures the interface feels airy and modern. 
- **Functional Colors:** Success (Green), Warning (Amber), and Error (Red) are used sparingly to guide the user through booking flows without distracting from the brand aesthetic.

## Typography
The typography strategy pairs **Manrope** for headings with **Work Sans** for body and UI elements. 

- **Manrope** provides a geometric, modern precision that feels contemporary and high-tech, suitable for a global agency.
- **Work Sans** is highly legible at small sizes, making it ideal for flight schedules, pricing tables, and itinerary details. 
- **Scale:** On mobile devices, large display headers scale down to prevent horizontal scrolling and maintain readability.
- **Emphasis:** Important booking details (dates, prices) should utilize the Medium or Semibold weight of Work Sans to stand out within dense information environments.

## Layout & Spacing
This design system employs a **Fluid Grid** model to accommodate the various types of travel content.

- **Grid:** A 12-column grid is used for desktop (1440px), transitioning to an 8-column grid for tablets (768px), and a 4-column grid for mobile (375px).
- **Rhythm:** An 8px base unit governs all spatial relationships. 
- **Travel Context:** Content-heavy pages (like Umrah packages) use "Safe Margins" of 64px on desktop to ensure text remains readable and doesn't stretch across the entire screen. 
- **Reflow:** On mobile, complex flight tables reflow into vertical cards to maintain touch-target accessibility.

## Elevation & Depth
Hierarchy is established through **Tonal Layering** and **Soft Ambient Shadows**.

- **Surfaces:** The background is pure white (#FFFFFF). Cards and input containers use a subtle off-white (#F8F9FA) with a 1px border (#E9ECEF) to define boundaries without heavy shadows.
- **Interactive Depth:** Only primary action buttons and active travel package cards receive a shadow. These shadows are highly diffused (24px blur), low opacity (10%), and slightly tinted with the Deep Navy (#3E3675) to create a sophisticated "lifted" effect.
- **Glassmorphism:** Navigation bars may use a backdrop blur (20px) with a semi-transparent white fill (80% opacity) to maintain a sense of space as users scroll through scenic destination images.

## Shapes
The shape language is **Rounded (0.5rem)**, striking a balance between professional rigidity and approachable softness.

- **Standard Elements:** Buttons, input fields, and small chips use a 0.5rem (8px) radius.
- **Container Elements:** Large cards (Package displays, Blog posts) use 1rem (16px) for a modern, "app-like" feel.
- **Icons:** Should be encased in circular or heavily rounded backgrounds to mimic the circular "Globe" motif from the business card.

## Components
- **Buttons:** 
    - *Primary (Book Now):* Solid #D13184 background with white text. High contrast is mandatory.
    - *Secondary (View Details):* Outline #3E3675 with 1.5px border width.
- **Travel Chips:** Used for "Hajj", "Umrah", or "International". Light #F4A3C1 backgrounds with #D13184 text for high visibility.
- **Package Cards:** Large containers featuring a 16:9 image, price badge in the top right, and clear Title/Duration text.
- **Input Fields:** Clean, minimal styling with a focus on clear labels and error states. Active states should use a 2px border of #3E3675.
- **Itinerary List:** Uses "Step" indicators with vertical lines connecting each day of the tour to visualize the journey's progress.
- **Flight Row:** A horizontal component for desktop showing Airline Logo, Times, Duration, and Price in a single line, converting to a condensed card on mobile.