# Udit Kumar — Portfolio

A static personal portfolio site. No framework, no backend, no paid services —
just HTML, CSS and vanilla JavaScript, ready to publish on GitHub Pages for free.

```
index.html
assets/
  css/style.css
  js/script.js
  images/
    favicon.svg
    og-image.png
.nojekyll
README.md
```

---

## 1. Before you publish — fill in your details

Three things in `index.html` are placeholders. Search for them and replace them.

| Find | Replace with | Where |
| --- | --- | --- |
| `uditdeveloper499@gmail.com` | your real email address | Contact section — appears **twice**, in `href="mailto:..."` and in the visible text |
| `href="#" data-placeholder="true"` | your LinkedIn and X profile URLs | Contact section — or delete the whole `<li>` if you don't use that platform |
| `https://uditdeveloper.github.io/` | your published site URL | `<link rel="canonical">`, `og:url`, and the JSON-LD block in `<head>` |

The contact form reads the email address straight from the Email card, so once
you change it there the form sends to the right place automatically.

**Adding another project:** in the Projects section, copy the whole
`<article class="project tilt">` block, change the title, description, tags and
the two links, then delete the dashed "Next project goes here" card.

---

## 2. Test it on your computer

Double-clicking `index.html` works for a quick look. To test it properly (the
way a browser serves it live), open a terminal in the project folder and run:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000` in your browser. Press `Ctrl + C` to stop.

---

## 3. Publish on GitHub Pages

### Option A — upload through the website (no commands)

1. Go to [github.com/new](https://github.com/new) and create a repository.
   - Name it **`uditdeveloper.github.io`** if you want the site at your main
     address (`https://uditdeveloper.github.io`).
   - Name it anything else, e.g. **`portfolio`**, if you want it at a
     sub-path (`https://uditdeveloper.github.io/portfolio/`).
   - Set it to **Public**. Don't tick "Add a README".
2. On the new empty repository page, click **uploading an existing file**.
3. Drag in `index.html`, `README.md`, `.nojekyll` **and the whole `assets`
   folder**. Wait for every file to finish uploading — you should see
   `assets/css/style.css`, `assets/js/script.js` and the two image files listed.
4. Type a message like `Add portfolio site` and click **Commit changes**.
5. Go to **Settings → Pages**. Under *Build and deployment*:
   - Source: **Deploy from a branch**
   - Branch: **main**, folder: **/ (root)** → click **Save**.
6. Wait 1–2 minutes, then reload that page. Your live URL appears at the top.
7. Paste that URL back into `index.html` where it says
   `https://uditdeveloper.github.io/` (see step 1), and commit again.

### Option B — using Git on your computer

```bash
cd path/to/this/folder

git init
git add .
git commit -m "Add portfolio site"
git branch -M main
git remote add origin https://github.com/uditdeveloper/portfolio.git
git push -u origin main
```

Then do steps 5–7 from Option A.

### Updating the site later

```bash
git add .
git commit -m "Update projects section"
git push
```

GitHub rebuilds the page automatically, usually within a minute.

---

## 4. If something looks wrong after publishing

| Problem | Cause | Fix |
| --- | --- | --- |
| Page loads but has no styling | The `assets` folder wasn't uploaded, or only its files were | Re-upload keeping the folder structure: `assets/css/style.css`, not `style.css` |
| 404 on the site URL | Pages is still building, or the branch is wrong | Wait 2 minutes, then check Settings → Pages shows branch `main`, folder `/ (root)` |
| Styles work locally but not live | A capital letter in a filename | GitHub Pages is case-sensitive. Everything here is lowercase — keep it that way |
| Changes don't show | Browser cache | Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac) |

---

## 5. What's built in

- **Responsive** across desktop, tablet and mobile, with a slide-down mobile menu.
- **3D hero scene** built entirely in CSS transforms — no images, no libraries,
  nothing to pay for. It tilts toward your cursor on desktop.
- **Scroll animations** via `IntersectionObserver`, plus an active-section
  indicator in the navbar.
- **Accessibility**: skip link, keyboard focus rings, `aria-expanded` on the
  menu, labelled form fields with inline error messages, and `Esc` to close
  the menu.
- **Reduced motion**: every animation is disabled automatically for visitors
  who have "reduce motion" turned on in their system settings.
- **SEO**: title, meta description, Open Graph and Twitter cards, canonical
  URL, and `Person` structured data.
- **Contact form** opens the visitor's email app with the message pre-filled —
  so there's no server, no form service and no monthly cost.

### Want a real contact form instead?

The mailto approach works everywhere but depends on the visitor having an email
app set up. If you'd rather receive submissions directly, Formspree and Web3Forms
both have free tiers that work on a static site: you point the `<form>` at their
URL and remove the `e.preventDefault()` handler in `script.js`.

---

## Credits

Fonts: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) and
[Inter](https://fonts.google.com/specimen/Inter), both free via Google Fonts.
Everything else is hand-written CSS and JavaScript.
