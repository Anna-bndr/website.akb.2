Die Chroniken des Übernatürlichen – API-Version

Weltuhr, Tag-/Nacht-Status und Mondphase verwenden Open-Meteo: https://open-meteo.com/en/docs
Endpoint: https://api.open-meteo.com/v1/forecast
Parameter: current=is_day, daily=moon_phase,sunrise,sunset, timezone=..., latitude=..., longitude=...
Alle 5 Minuten erfolgt ein neuer Abruf für 8 Städte. Zwischen den Abrufen laufen die Uhren lokal weiter, ausgehend von der API-Zeit. Die Mondphase ist ein Tageswert, kein sekundengenauer Livewert.

Keine API-Schlüssel nötig. Eine Internetverbindung ist erforderlich. Bei file:// kann je nach Browser die Netzwerkanfrage blockiert werden; in diesem Fall die Website über einen lokalen HTTP-Server öffnen (z.B. python3 -m http.server 8000).

Die übrigen Seiten und Bilder sind unverändert.
