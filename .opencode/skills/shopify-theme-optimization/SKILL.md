---
name: shopify-theme-optimization
description: 'Create and improve Shopify themes. Use when asked to build theme sections, review Liquid design quality, optimize Liquid/JS/CSS performance, reduce duplication, and extract reusable snippets from templates, sections, and snippets.'
---

# Shopify Theme Optimization

Use this skill for Shopify theme work focused on creation, design analysis, code optimization, and reuse through snippets.

## When to Use
- User asks to create or refactor Shopify theme code
- User asks for Liquid design review or UX consistency checks
- User reports duplicated code across sections/templates
- User asks for performance improvements in Liquid, CSS, or JS assets
- User asks to move reusable blocks into snippets

## Inputs
- Target files or folders, for example:
  - sections/*.liquid
  - templates/*.liquid
  - snippets/*.liquid
  - assets/*.js
- Optional focus:
  - design consistency
  - performance
  - maintainability
  - snippet extraction

## Output Contract
Return results in this order:
1. Findings by severity with exact file references
2. Refactor plan (small, safe steps)
3. Applied changes summary
4. Validation results (theme lint/errors, behavior checks)

## Procedure
1. Discover relevant files
- Start from sections, templates, snippets, and related assets.
- Identify repeated markup, repeated inline styles, and repeated Liquid conditions.

2. Design analysis for Liquid themes
- Check semantic structure and content hierarchy.
- Check consistency of spacing, typography, and component states.
- Confirm mobile behavior and readability.
- Keep existing design language unless user requests redesign.

3. Performance and maintainability audit
- Reduce duplicated loops/conditions.
- Avoid heavy inline CSS/JS when reusable classes/assets are possible.
- Keep Liquid logic simple and predictable.
- Prefer section settings and schema controls over hardcoded values.

4. Snippet extraction strategy
- Extract only patterns used in 2+ places or likely to repeat.
- Create focused snippet APIs using render parameters.
- Replace duplicated blocks with render calls.

5. Implement safely
- Apply minimal diffs.
- Preserve behavior and schema compatibility.
- Keep JS in assets files (no large inline script in Liquid).
- Follow project conventions from copilot-instructions.

6. Validate
- Run error checks for modified files.
- Verify render parameter names and defaults.
- Recheck for Liquid syntax issues and missing settings.

## Snippet Conventions
- Naming:
  - snippet-card-*.liquid for card UI parts
  - snippet-icon-*.liquid for icons
  - snippet-text-overlay.liquid for carousel text overlays
- Parameter style:
  - Use explicit named params in render calls
  - Provide fallbacks in snippet when param is blank

## Review Checklist
- No duplicated UI block left in 2+ files without reason
- Snippet parameters documented by naming clarity
- No broken schema ids or references
- No regressions in responsive layout
- No new Liquid errors

## Notes
- Prefer Tailwind utility classes already present in project.
- Keep Liquid templates focused on markup and data binding.
- In cart template, do not use jQuery.
