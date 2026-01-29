# CanIGrillToday.com

The Definitive Grilling Weather Authority - A scientifically rigorous (yet entertainingly presented) weather advisory system for determining optimal grilling conditions.

## Features

- **ZIP Code Weather Analysis**: Enter any US ZIP code to get instant grilling conditions
- **Grillability Index™**: A proprietary scoring system (0-100) based on:
  - Temperature (35% weight)
  - Wind Speed & Gusts (25% weight)
  - Precipitation Probability (30% weight)
  - Humidity (10% weight)
- **Hourly Forecast**: See the best grilling windows throughout the day
- **Expert Tips**: Context-aware recommendations based on current conditions
- **Scientific Breakdown**: Full transparency on how the score is calculated
- **Entertaining Commentary**: Because grilling should be fun

## The Science

The Grillability Index uses a weighted composite score:

```
GI = (T_score × 0.35) + (W_score × 0.25) + (P_score × 0.30) + (H_score × 0.10)
```

### Temperature Scoring
- **Ideal Range**: 60°F - 85°F (100 points)
- **Acceptable Range**: 45°F - 95°F (scaled 60-100 points)
- **Extreme Conditions**: Below 32°F or above 105°F (10 points)

### Wind Scoring
- **Calm**: 0-8 mph (100 points)
- **Moderate**: 8-15 mph (50-100 points, scaled)
- **Dangerous**: 25+ mph (5 points)

### Precipitation Scoring
- **Clear Skies**: 0-10% chance (100 points)
- **Possible Rain**: 10-30% (70-100 points)
- **High Risk**: 50%+ (40 or less)
- Active precipitation applies additional penalties

### Humidity Scoring
- **Comfortable**: 30-60% (100 points)
- **Humid/Dry**: Outside comfortable range (scaled penalties)

## Verdict Thresholds

- **YES** (80+): Optimal conditions - fire up the grill!
- **MAYBE** (40-79): Proceed with caution and backup plans
- **NO** (<40): Consider indoor cooking alternatives

## Tech Stack

- Pure HTML5, CSS3, JavaScript (no frameworks)
- [Open-Meteo API](https://open-meteo.com/) for weather data (free, no API key required)
- [Zippopotam.us](https://zippopotam.us/) for ZIP code geocoding
- CSS Custom Properties for theming
- Responsive design for all devices

## Running Locally

Simply open `index.html` in a modern web browser. No build process required!

```bash
# Or use a local server
python -m http.server 8000
# Then visit http://localhost:8000
```

## Legal Disclaimer

This website provides weather-based grilling recommendations for entertainment purposes. We are not responsible for: overcooked steaks, undercooked chicken, neighbor complaints about smoke, existential crises caused by not grilling, or any decisions made based on our highly scientific algorithms. Always use common sense and check your local fire regulations.

## License

Made with fire and questionable meteorological expertise.
