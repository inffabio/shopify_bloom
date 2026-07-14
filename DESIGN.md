---
name: Blossom Bloom Creations
description: A warm, floral-artisan storefront for beautifully personalized drinkware.
colors:
  atelier-mocha: "#8B6F5C"
  atelier-mocha-hover: "#6B5F4C"
  clay-taupe: "#A08577"
  petal-mauve: "#B79A8D"
  cocoa-ink: "#5F5149"
  espresso: "#4E2E1F"
  rose-coral: "#BC5254"
  rose-coral-hover: "#A24E50"
  blush-peach: "#F5D5C8"
  soft-pink: "#F8C8DC"
  forest-accent: "#1F4D3A"
  bg-home-rose: "#BFA6A0"
  bg-collection-lavender: "#DED9E2"
  bg-product-violet: "#C0B9DD"
  bg-cart-blue: "#80A1D4"
  bg-page-teal: "#75C9C8"
  bg-404-lilac: "#E7E4F1"
  surface-cream: "#F7F4EA"
  surface-white: "#FFFFFF"
  surface-warm-white: "#FFFBF9"
typography:
  display:
    fontFamily: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif"
    fontSize: "clamp(2rem, 5vw, 3rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "normal"
  headline:
    fontFamily: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif"
    fontSize: "clamp(1.5rem, 3vw, 2.25rem)"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "normal"
  body:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  label:
    fontFamily: "'Avenir Next', Avenir, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.08em"
rounded:
  card: "8px"
  frame: "12px"
  panel: "16px"
  soft: "24px"
  pill: "9999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "48px"
components:
  button-primary:
    backgroundColor: "{colors.rose-coral}"
    textColor: "{colors.surface-white}"
    rounded: "{rounded.pill}"
    padding: "12px 32px"
  button-primary-hover:
    backgroundColor: "{colors.rose-coral-hover}"
  button-secondary:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.atelier-mocha}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
  card-product:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.atelier-mocha}"
    rounded: "{rounded.card}"
    padding: "16px"
  nav-link:
    textColor: "{colors.atelier-mocha}"
    typography: "{typography.label}"
---

# Design System: Blossom Bloom Creations

## 1. Overview

**Creative North Star: "The Blooming Atelier"**

Blossom Bloom is a small maker's studio rendered on screen: taupe-and-rose ink laid over soft, bloom-tinted rooms, everything touched by diffuse light and finished by hand. The mood is calm, elegant, and heartfelt, the feeling of choosing a gift you know will be treasured. Warmth is carried by color, typography, and generous air, never by volume; nothing shouts, nothing pressures. The storefront should read like a curated boutique, where the beauty of the pieces is itself the reason to stay.

The system rests on two moves. First, a signature per-page pastel background: the home glows dusty rose, collections settle into lavender, products into soft violet, the cart into gentle blue, content pages into teal. Each page feels like walking into a different, sunlit room. Second, a consistent warm-neutral ink (`atelier-mocha`, `#8B6F5C`) and a single rose-coral action color (`rose-coral`, `#BC5254`) that tie those rooms together so the store never feels scattered. Serif headings supply the artisan, editorial calm; a spaced uppercase sans handles navigation with quiet confidence.

This system explicitly rejects the bargain-bin storefront (no clearance banners, countdown urgency, or cluttered promos), the cold mass-produced print-on-demand look, sterile all-gray tech-minimalism with no warmth, and the anonymous default Shopify template. If it could be any custom-mug shop, it has failed.

**Key Characteristics:**
- Warm taupe-and-rose neutrals over soft pastel, bloom-tinted page backgrounds.
- A single rose-coral accent reserved for actions and prices.
- Serif for editorial calm; spaced uppercase sans for navigation.
- Soft, diffuse, brown-tinted shadows; lifted but never hard.
- Boutique curation over uniform catalog grids.

## 2. Colors

A warm-neutral core (mocha, taupe, cocoa) grounds a rotating cast of gentle pastels, with one rose-coral accent doing all the persuading.

### Primary
- **Rose Coral** (`#BC5254`): the single action color. Every primary button (Shop Now, Add to Cart, Checkout), product price, and key link hover. Deepens to **Rose Coral Hover** (`#A24E50`) on interaction. Its scarcity is what makes it read as "the thing to press."

### Secondary
- **Atelier Mocha** (`#8B6F5C`): the workhorse ink. Headings, product titles, navigation, icons, badges, hairline borders (usually at low opacity). Darkens to **Atelier Mocha Hover** (`#6B5F4C`) for interactive text.
- **Clay Taupe** (`#A08577`): softer secondary text, testimonial body, supporting product copy.
- **Petal Mauve** (`#B79A8D`): the only place small uppercase labels live ("Mini cart", "Shopping bag").

### Tertiary
- **Blush Peach** (`#F5D5C8`): faint card borders and empty-image placeholders, used at ~30% opacity.
- **Soft Pink** (`#F8C8DC`): testimonial stars and avatar wells; the tender floral touch.
- **Forest Accent** (`#1F4D3A`): reserved for the cart-count badge and the active product dot; the one cool note.
- **Espresso** (`#4E2E1F`): footer ground only, the deep anchor at the base of every page.

### Neutral
- **Cocoa Ink** (`#5F5149`): the site-wide body text color set on `<body>`.
- **Surface Cream** (`#F7F4EA`): the neutral panel/backing for carousels and default pages.
- **Surface White** (`#FFFFFF`) / **Warm White** (`#FFFBF9`): card and drawer surfaces, often at 60% opacity with a light backdrop blur.
- **Page pastels** (per template): Home Rose (`#BFA6A0`), Collection Lavender (`#DED9E2`), Product Violet (`#C0B9DD`), Cart Blue (`#80A1D4`), Page Teal (`#75C9C8`), 404 Lilac (`#E7E4F1`).

### Named Rules
**The One Accent Rule.** Rose Coral (`#BC5254`) means "act." It is for primary buttons, prices, and their hovers, nothing else. Do not tint headings, borders, or backgrounds with it; its rarity is the point.

**The Room-Per-Page Rule.** Each template owns one pastel background from the set above. The palette rotates by page but the ink (mocha) and accent (coral) never do, so the store feels like connected rooms, not different websites.

## 3. Typography

**Display Font:** system serif (`ui-serif, Georgia, Cambria, "Times New Roman", Times, serif`)
**Body Font:** system sans (`ui-sans-serif, system-ui, sans-serif`)
**Label/Nav Font:** Avenir Next (`"Avenir Next", Avenir, "Helvetica Neue", Arial, sans-serif`), via the `.font-menu-urban` utility
**Accent Display (rare):** Lilita One (`cursive`) for playful image-overlay text only

**Character:** A calm, editorial serif carries every heading and product title, lending the artisan, gift-worthy feel. Navigation switches to a spaced, uppercase humanist sans for quiet structure. The pairing contrasts on a real axis (serif vs. sans), never two similar sans families. Note: no web font is currently loaded, so the serif renders as the platform's Georgia-family face; if a branded serif is desired, load it and update the `display`/`headline` stacks.

### Hierarchy
- **Display** (serif, 400, `clamp(2rem, 5vw, 3rem)`, 1.1): hero and page titles.
- **Headline** (serif, 400, `clamp(1.5rem, 3vw, 2.25rem)`, 1.2): section titles (testimonials, featured products, collection heading).
- **Title** (serif, 400-600, ~1.125rem): product-card names.
- **Body** (sans, 400, 1rem, 1.7): descriptions and prose; keep line length 65-75ch.
- **Label** (Avenir, 600, 0.95rem, uppercase, `letter-spacing: 0.08em`): navigation links and small section eyebrows.

### Named Rules
**The Serif-Heads Rule.** All headings are serif. Navigation and micro-labels are the spaced uppercase sans. Never swap them; the contrast is what makes the store feel considered rather than templated.

## 4. Elevation

Soft and lifted. Depth comes from large-blur, low-opacity shadows tinted with the brand brown rather than neutral black, so cards seem to float in warm light. Frosted surfaces (`bg-white/60` with `backdrop-blur-sm`) appear on testimonials and cart panels. Surfaces are gently raised at rest and lift further on hover.

### Shadow Vocabulary
- **Card rest** (`box-shadow: 0 1px 2px rgba(0,0,0,0.05)` / `shadow-sm`): product cards at rest.
- **Card hover** (`shadow-lg`): product cards on hover, a clear but soft lift.
- **Framed image** (`box-shadow: 0 18px 40px -24px rgba(95,81,73,0.35)`): white-matted image frames.
- **Floating panel** (`box-shadow: 0 32px 90px -30px rgba(15,23,42,0.28)`): the product carousel shell.
- **Overlay/drawer** (`box-shadow: 0 28px 80px -40px rgba(139,111,92,0.6)` and `0 20px 80px -20px rgba(0,0,0,0.45)`): mini-cart dropdown and slide-in drawer.
- **Footer lift** (`box-shadow: 0 -18px 40px -28px rgba(0,0,0,0.18)`): the upward shadow separating the espresso footer.

### Named Rules
**The Warm-Shadow Rule.** Shadows are tinted with the brand brown (`rgba(95,81,73,...)` / `rgba(139,111,92,...)`), never pure gray-black, and always large-blur and low-opacity. A tight, dark, gray shadow reads as a 2014 app and is prohibited.

## 5. Components

### Buttons
- **Shape:** pill by default (`border-radius: 9999px`); the product add-to-cart uses a soft `rounded-lg` (8px).
- **Primary:** Rose Coral (`#BC5254`) fill, white text, `padding: 12px 32px` (hero) or `12px 24px` (cart/product).
- **Hover / Focus:** background deepens to Rose Coral Hover (`#A24E50`) with a `transition-colors`. Ensure a visible `:focus-visible` ring (currently missing).
- **Secondary / Ghost:** white fill, Atelier Mocha text, hairline `#8B6F5C`/20 border, pill shape, hover to a warm off-white (`#FDF6F1`). Used for "View cart."

### Cards / Containers
- **Corner Style:** `rounded-lg` (8px) for product cards; `rounded-xl`/`rounded-2xl` for image frames and panels; `rounded-3xl` for the carousel shell and mini-cart dropdown.
- **Background:** white or `bg-white/60` with `backdrop-blur-sm` for frosted testimonial/cart surfaces.
- **Shadow Strategy:** see Elevation, `shadow-sm` at rest lifting to `shadow-lg` on hover.
- **Border:** faint Blush Peach (`#F5D5C8`/30) hairline.
- **Internal Padding:** 16px (`p-4`) to 24px (`p-6`).

### Navigation
- **Style:** `.font-menu-urban`, uppercase, `letter-spacing: 0.08em`, semibold, Atelier Mocha text, hovering to `#6B5F4C`. Desktop mini-cart is a rounded dropdown; mobile is a slide-in drawer with a warm gradient header (`from-#FFF8F3 to-#FFEDEC`) and a Petal Mauve uppercase label.

### Signature: Per-Page Pastel Stage + Mini Cart
The storefront's signature is the rotating pastel page background (set in `layout/theme.liquid` per `template.name`) paired with the frosted, warm-gradient mini-cart. Together they make each page feel like a distinct, sunlit room while keeping checkout inviting rather than transactional.

## 6. Do's and Don'ts

### Do:
- **Do** reserve Rose Coral (`#BC5254`) for actions and prices only (The One Accent Rule).
- **Do** keep the per-page pastel background system and hold the mocha ink + coral accent constant across all rooms.
- **Do** set headings in the serif and navigation/labels in the spaced uppercase Avenir sans.
- **Do** use large-blur, low-opacity, brown-tinted shadows for a soft, lifted feel.
- **Do** verify contrast: Clay Taupe (`#A08577`) and Cocoa Ink (`#5F5149`) body text must clear 4.5:1 against their pastel/white backgrounds; darken toward mocha if borderline.
- **Do** add a visible `:focus-visible` state to every button and link.

### Don't:
- **Don't** be bargain- or discount-driven: no clearance banners, countdown timers, or cluttered promo stacks.
- **Don't** look corporate or mass-produced, like a generic print-on-demand supplier.
- **Don't** drift cold or tech-minimal: no sterile all-gray SaaS surfaces with no warmth.
- **Don't** ship the anonymous default Shopify template look; if it could be any custom-mug shop, redo it.
- **Don't** use tight, dark, gray-black shadows (The Warm-Shadow Rule).
- **Don't** tint headings, borders, or backgrounds with the coral accent, or let it appear on more than a small fraction of any screen.
- **Don't** pair the serif with a second similar serif; the serif/sans contrast is the system.
