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
- **Knowledge Base**: In-depth guides on temperature, wind, precipitation, humidity
- **Entertaining Commentary**: Because grilling should be fun

## Site Structure

```
├── index.html              # Main weather checker app
├── about.html              # About page with methodology
├── knowledge/
│   ├── index.html          # Knowledge hub landing page
│   ├── temperature.html    # Temperature grilling guide
│   ├── wind.html           # Wind grilling guide
│   ├── precipitation.html  # Precipitation grilling guide
│   ├── humidity.html       # Humidity grilling guide
│   └── tips.html           # 50+ pro grilling tips
├── styles.css              # All styling
├── app.js                  # Weather app logic
└── sitemap.xml             # SEO sitemap
```

## Quick Start

### Preview Locally

Simply open `index.html` in a modern web browser. No build process required!

```bash
# Option 1: Open directly
open index.html

# Option 2: Use Python's built-in server
python -m http.server 8000
# Then visit http://localhost:8000

# Option 3: Use Node's http-server (if installed)
npx http-server -p 8000

# Option 4: Use PHP's built-in server
php -S localhost:8000
```

## Hosting on GitHub Pages (Free)

GitHub Pages provides free hosting for static websites directly from your repository.

### Method 1: Deploy from Main Branch

1. **Push your code to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/canigrilltoday.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages** (in the left sidebar)
   - Under "Source", select **Deploy from a branch**
   - Choose **main** branch and **/ (root)** folder
   - Click **Save**

3. **Access your site**
   - Your site will be live at: `https://YOUR_USERNAME.github.io/canigrilltoday/`
   - It may take 1-2 minutes for the first deployment

### Method 2: Deploy from gh-pages Branch

If you want to keep deployment separate from your main code:

```bash
# Create and switch to gh-pages branch
git checkout -b gh-pages

# Push to GitHub
git push -u origin gh-pages

# Then in GitHub Settings → Pages, select gh-pages branch
```

### Custom Domain (Optional)

1. In your repository, create a file called `CNAME` with your domain:
   ```
   canigrilltoday.com
   ```

2. Configure your domain's DNS:
   - Add an `A` record pointing to GitHub's IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - Or add a `CNAME` record pointing to `YOUR_USERNAME.github.io`

3. In GitHub Settings → Pages, enter your custom domain and enable HTTPS

## Alternative Free Hosting Options

### Netlify

1. Go to [netlify.com](https://netlify.com) and sign up
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. Deploy settings: Leave defaults (no build command needed)
5. Your site will be live at `https://random-name.netlify.app`

```bash
# Or use Netlify CLI
npm install -g netlify-cli
netlify deploy --prod --dir=.
```

### Vercel

1. Go to [vercel.com](https://vercel.com) and sign up
2. Click "Add New Project"
3. Import your GitHub repository
4. Framework preset: "Other"
5. Deploy!

```bash
# Or use Vercel CLI
npm install -g vercel
vercel --prod
```

### Cloudflare Pages

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Connect your GitHub account
3. Select your repository
4. Build settings: Leave empty (static site)
5. Deploy!

### Surge.sh

```bash
# Install Surge
npm install -g surge

# Deploy (from project directory)
surge . canigrilltoday.surge.sh
```

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

- Pure HTML5, CSS3, JavaScript (no frameworks, no build step)
- [Open-Meteo API](https://open-meteo.com/) for weather data (free, no API key required)
- [Zippopotam.us](https://zippopotam.us/) for ZIP code geocoding
- CSS Custom Properties for theming
- Responsive design for all devices

## Configuration

### Buy Me a Coffee

Update the Buy Me a Coffee links throughout the site with your actual username:

```bash
# Find and replace in all files
grep -r "buymeacoffee.com/canigrilltoday" --include="*.html"
# Then update to your actual Buy Me a Coffee URL
```

### Analytics (Optional)

Add your analytics script before the closing `</body>` tag in each HTML file:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR_GA_ID');
</script>
```

## Legal Disclaimer

This website provides weather-based grilling recommendations for entertainment purposes. We are not responsible for: overcooked steaks, undercooked chicken, neighbor complaints about smoke, existential crises caused by not grilling, or any decisions made based on our highly scientific algorithms. Always use common sense and check your local fire regulations.

## Contributing

Found a bug? Have a suggestion? Feel free to open an issue or submit a pull request.

## License

Made with 🔥 and questionable meteorological expertise.
