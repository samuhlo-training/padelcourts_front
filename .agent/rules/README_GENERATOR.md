# 📄 README GENERATION PROTOCOL (Brutalist Edition)

**ROLE:** Technical Documentation Architect.
**STYLE:** Brutalist, Monospaced, High-Contrast, Minimal.
**OUTPUT:** A `README.md` file that looks like a system blueprint.

---

## 📐 1. DESIGN RULES (NON-NEGOTIABLE)

1.  **Typography:**
    - Main Titles MUST be wrapped in `<code>` tags to enforce monospace font.
    - Example: `# <code>PROJECT_NAME</code>` (Not `# Project Name`).
2.  **Numbering System:**
    - Sections must be numbered with a zero-pad prefix: `00`, `01`, `02`, `03`.
    - Separator is double underscore: `__`.
    - Example: `### 01 __ ARCHITECTURE`
3.  **Visual Structure:**
    - Use HTML `<div align="center">` for the Header and Footer.
    - Use Markdown Tables for technical specs (Stack, Decisions).
    - **NO EMOJIS** in prose. Only in specific UI sections if strictly necessary.
4.  **Badges:**
    - Style: `for-the-badge`.
    - Color consistency: Match the framework brand colors.

---

## 📝 2. CONTENT GUIDELINES

- **Abstract:** No storytelling. Define the Problem and the Solution. (Subject + Verb + Tech).
- **Architecture:** Do not list files. List *decisions*.
- **Snippets:** Only show code that contains "Dark Magic" (complex logic, hooks, shaders). Do not show basic setups.

---

## 📠 3. THE MASTER TEMPLATE

You **MUST** use this exact structure. Fill in the bracketed `[ ... ]` sections based on the project code you are analyzing.

```markdown
<div align="center">
  <br />
  <br />
  
  # <code>[PROJECT_CODENAME_UPPERCASE]</code>
  
  **[SHORT_DESCRIPTION_MINIMALIST]**
  <br />

  [INSERT_BADGES_HERE]


  <br />
  <br />
</div>

---

### 00 __ PREVIEW

![Hero Preview]([LINK_TO_IMAGE_OR_PLACEHOLDER])

> **ABSTRACT:** [Technical summary of the solution. Direct. No fluff. Max 2 lines.]
>
> <br />
>
> **ORIGIN:** [Optional: Based on Course/Tutorial Name]([URL]) by [Author].
> *Adapted with [Brief mention of your unique changes].*
>
> <br />
>
> **DEMO:** [LINK_TEXT]([LINK_URL])

---

### 01 __ ARCHITECTURE & DECISIONS

| COMPONENT | TECH | NOTE |
| :--- | :--- | :--- |
| **Core** | `[Framework]` | [Specific pattern used, e.g., Script Setup] |
| **State** | `[Lib/Method]` | [e.g., Pinia / Composables] |
| **Motion** | `[Lib/Native]` | [e.g., GSAP / CSS Transitions] |
| **Styles** | `[Lib/Method]` | [e.g., Tailwind / BEM] |

<br>

### 02 __ INSTALLATION

*Run local environment:*

```bash
# 1. Clone
git clone [REPO_URL]

# 2. Install dependencies
pnpm install

# 3. Ignite
pnpm dev
```

### 03 __ KEY FEATURES
[Brief list of technical highlights]

A. THE HOOK (Or Main Logic)
[Explanation of the most complex function]

TypeScript
// [BRUTALIST SNIPPET]
[INSERT_RELEVANT_CODE_BLOCK]
```

<div align="center">
<br />

<code>DESIGNED & CODED BY <a href='https://github.com/samuhlo'>samuhlo</a></code>

<small>Lugo, Galicia</small>

</div>