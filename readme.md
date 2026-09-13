Terra Verde — Botanical Skincare Website

A single-page website for a fictional small-batch skincare brand, built with plain HTML, CSS, and JavaScript. No frameworks, no build tools, no backend — just open the file in a browser and it works.

What's in here
index.html — the whole site (structure, styling, and behaviour all in one file)

That's it. Everything is self-contained, so there's nothing to install and nothing to configure.

How to run it

Just double-click index.html, or drag it into any browser. If you'd rather serve it properly (some browsers are picky about local files), run this from the project folder:

python3 -m http.server 8000

Then open http://localhost:8000 in the browser.

What the site actually does

It's not just a static page — a few things on it are genuinely interactive:

Product filters — sort the six products by skin concern (clarifying, glow, calming, nourishing).
"Find your ritual" quiz — answer three quick questions and it recommends one of the six products based on your answers.
Testimonial carousel — slides between customer quotes, auto-plays, and supports swiping on touch screens.
FAQ accordion — click a question, the answer expands underneath.
Newsletter form — checks that the typed email actually looks like an email before showing a success message.
Responsive nav — turns into a hamburger menu on small screens, and highlights whichever section you're currently scrolled to.
Design notes

The colour palette (eucalyptus green, peach, ivory, pistachio, and clay) was the starting point for the whole design — it's used consistently as CSS variables, so if you ever want to reskin the site, changing five colour values at the top of the stylesheet is enough to change the whole look.

Fonts are Fraunces (headings) and Work Sans (everything else), loaded from Google Fonts.

A note on the JavaScript

The JavaScript is written in a deliberately plain style — regular function declarations, for loops instead of .map()/.forEach() chains, and a comment block above every section explaining what it does. It's meant to be readable by someone who's still learning JavaScript, not just by someone who already knows it.

Content

All product names, prices, testimonials, and FAQ answers are placeholder content written for this project — Terra Verde isn't a real company.

License

Do whatever user want with this — it's a personal/learning project, not licensed for commercial resale as-is (the copy and branding are made up, but not trademarked or anything serious).