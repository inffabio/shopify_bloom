# BloomTheme Copilot Instructions

## Frontend Styling
- Always use Tailwind utility classes for layout and styling changes.
- Avoid adding inline `<style>` blocks in Liquid templates unless explicitly requested.
- Reuse existing Tailwind tokens/utilities from the project before introducing new custom styles.

## JavaScript Organization
- Place any new JavaScript code in separate files inside `assets/`.
- Do not add inline `<script>` logic directly in Liquid templates, except minimal bootstrapping needed to load/import asset files.
- When updating existing inline JavaScript, prefer moving it to `assets/*.js` and reference it from Liquid.

## jQuery Usage
- Use jQuery library for DOM manipulation and event handling.
- Ensure jQuery is properly loaded via CDN or bundled before using in scripts.
- Prefer jQuery selectors and methods for consistency across the project.
- Avoid mixing vanilla JS and jQuery in the same code block; stick to jQuery when it is available.
- When adding new JavaScript functionality, check for existing jQuery code that can be extended or reused to maintain consistency.
- Ensure that any new jQuery code is compatible with the version of jQuery used in the project and does not introduce conflicts with existing scripts.
- When modifying existing jQuery code, ensure that changes do not break existing functionality and that any new features are properly integrated with the current codebase.
- Always test new jQuery code in the context of the Shopify theme to ensure it works correctly with the Liquid templates and does not cause any performance issues or conflicts with other scripts.
- When adding new jQuery code, consider the impact on page load times and optimize selectors and event handlers to minimize performance overhead.
- Ensure that any new jQuery code follows best practices for readability and maintainability, such as using descriptive variable names and organizing code into functions where appropriate.
- Document any new jQuery code with comments explaining its purpose and how it integrates with the existing codebase, especially if it interacts with specific Liquid templates or Shopify features.
- When updating existing jQuery code, ensure that any changes are backward compatible and do not disrupt the user experience or functionality of the theme.
- Always validate and test jQuery code across different browsers and devices to ensure consistent behavior and performance for all users.
- When adding new jQuery code, consider the accessibility implications and ensure that it does not interfere with screen readers or keyboard navigation, especially for interactive elements like forms and buttons.
- Do not use jquery in Cart template, as it is not loaded there. Use vanilla JS instead for any necessary interactions in the cart page.
- When working on the cart template, ensure that any JavaScript code is optimized for performance and does not rely on jQuery, as it is not available in that context. Use vanilla JavaScript to handle any necessary interactions or dynamic behavior on the cart page, and ensure that it is compatible with the existing Liquid templates and Shopify features used in the cart template.

## Shopify Theme Conventions
- Keep Liquid templates focused on markup and data binding.
- Ensure add-to-cart and product/cart interactions follow Shopify form conventions.
