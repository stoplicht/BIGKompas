BIGKompas projectstructuur

Open index.html in je browser om de website lokaal te bekijken.

Bestanden:
- index.html: homepage
- tijdlijn.html: filterbare tijdlijn
- kennisbank.html: startpagina kennisbank
- bronnen.html: bronnenbank
- contact.html: demo-contactpagina
- css/styles.css: alle styling
- js/script.js: menu, formulieren en tijdlijnfilter
- data/timeline.json: tijdlijnitems die automatisch worden ingeladen
- images/: plaats hier logo/beelden
- documents/Kamerstukken/: plaats hier documenten/PDF's

Let op: sommige browsers blokkeren het laden van JSON via file://. Werkt de tijdlijn lokaal niet, start dan een lokale server in deze map:
python -m http.server 8000
Open daarna http://localhost:8000
