/**
 * CanIGrillToday.com - The Definitive Grilling Weather Authority
 *
 * A scientifically rigorous (yet entertainingly presented) weather analysis
 * system for determining optimal grilling conditions.
 *
 * @author The Grill Masters of the Internet
 * @version 1.0.0
 */

// =============================================================================
// Configuration & Constants
// =============================================================================

const CONFIG = {
    // API Endpoints
    GEOCODING_API: 'https://geocoding-api.open-meteo.com/v1/search',
    WEATHER_API: 'https://api.open-meteo.com/v1/forecast',
    ZIP_GEOCODING_API: 'https://api.zippopotam.us/us',

    // Grillability Index Thresholds
    THRESHOLDS: {
        EXCELLENT: 80,
        GOOD: 60,
        MARGINAL: 40,
    },

    // Weighting factors for the Grillability Index™
    WEIGHTS: {
        TEMPERATURE: 0.35,
        WIND: 0.25,
        PRECIPITATION: 0.30,
        HUMIDITY: 0.10,
    },

    // Temperature ranges (°F) for grilling comfort
    TEMP: {
        IDEAL_MIN: 60,
        IDEAL_MAX: 85,
        ACCEPTABLE_MIN: 45,
        ACCEPTABLE_MAX: 95,
        ABSOLUTE_MIN: 32,
        ABSOLUTE_MAX: 105,
    },

    // Wind speed thresholds (mph)
    WIND: {
        IDEAL_MAX: 8,
        ACCEPTABLE_MAX: 15,
        DANGEROUS_MAX: 25,
    },

    // Precipitation probability thresholds (%)
    PRECIP: {
        IDEAL_MAX: 10,
        ACCEPTABLE_MAX: 30,
        HIGH_RISK: 50,
    },

    // Humidity thresholds (%)
    HUMIDITY: {
        IDEAL_MIN: 30,
        IDEAL_MAX: 60,
        ACCEPTABLE_MIN: 20,
        ACCEPTABLE_MAX: 80,
    },
};

// =============================================================================
// Witty Commentary Database
// =============================================================================

const COMMENTARY = {
    temperature: {
        freezing: [
            "Unless you're training for Antarctic expeditions, maybe stay inside.",
            "Your burgers will freeze faster than they cook. Bold strategy.",
            "Frostbite is not a seasoning, despite what that one guy on Reddit claims.",
            "The only thing getting grilled today is your decision-making skills.",
        ],
        cold: [
            "Technically possible, but your neighbors will judge you.",
            "Hope you have a good winter coat and questionable judgment.",
            "The grill might be the warmest thing in your backyard.",
            "Real grill masters don't let a little hypothermia stop them.",
        ],
        cool: [
            "A light jacket and determination are your best seasonings today.",
            "Not ideal, but your dedication is admirable.",
            "The meat won't know it's chilly. You will.",
            "Perfect weather for building character while grilling.",
        ],
        perfect: [
            "The grilling gods have smiled upon you today.",
            "This is literally what grills were invented for.",
            "If you don't grill today, you're basically committing a crime against summer.",
            "Peak grilling conditions. No excuses. Get out there.",
        ],
        warm: [
            "Stay hydrated. The grill isn't the only thing that's hot.",
            "Pro tip: The beer is for you, not the grill.",
            "Excellent grilling weather, if you don't mind becoming one with the heat.",
            "Sun's out, buns out. (Burger buns, obviously.)",
        ],
        hot: [
            "You'll be competing with the sun for which can cook you faster.",
            "Consider: you're already being grilled. Do you need more of that?",
            "The meat will cook. The question is, will you survive?",
            "Grilling in this heat is a power move. Respect.",
        ],
        extreme: [
            "At this temperature, just leave the meat outside. It'll cook itself.",
            "This isn't grilling weather, this is survival weather.",
            "Even the grill is asking for a break.",
            "The fire department is already on standby for different reasons.",
        ],
    },

    wind: {
        calm: [
            "Smoke will go straight up like it's supposed to. How civilized.",
            "Perfect smoke conditions. Your neighbors will smell your success.",
            "The wind has decided to let you cook in peace.",
            "No wind means no excuses for uneven cooking.",
        ],
        light: [
            "A gentle breeze to carry your culinary prowess across the neighborhood.",
            "Just enough wind to make you feel like a rugged outdoor chef.",
            "Your flames might dance a little. They're just excited.",
            "Manageable wind. Your spatula skills will not be tested.",
        ],
        moderate: [
            "You'll need to guard your grill like a hawk guards its prey.",
            "The wind is trying to redistribute your heat. Don't let it win.",
            "Position yourself strategically. This is chess, not checkers.",
            "Your paper plates are now projectiles. Plan accordingly.",
        ],
        strong: [
            "Hope you like the taste of whatever's blowing around your yard.",
            "Your grill cover is now in the neighbor's pool. Classic.",
            "This is less 'grilling' and more 'competitive fire management'.",
            "The wind is personally challenging you. Accept the duel.",
        ],
        dangerous: [
            "Your grill will achieve liftoff before your burgers do.",
            "This isn't grilling weather, this is 'hold onto your hat' weather.",
            "Fire + extreme wind = fire department on speed dial.",
            "The only thing getting smoked today is your confidence.",
        ],
    },

    precipitation: {
        none: [
            "Dry as a perfectly seared steak. Perfect.",
            "Not a cloud of concern in sight.",
            "The sky has agreed to cooperate with your grilling ambitions.",
            "Zero percent chance of rain-related excuses.",
        ],
        slight: [
            "Maybe bring an umbrella. For the grill, not you.",
            "A light drizzle adds character, right? Right?",
            "The forecast says 'probably fine' which is basically a guarantee.",
            "Your grill can handle a few drops. Can you?",
        ],
        moderate: [
            "You might end up with some unintentionally steamed vegetables.",
            "Consider this an opportunity for covered grill mastery.",
            "Rain adds moisture! ...To everything you didn't want moist.",
            "The forecast is playing roulette with your dinner plans.",
        ],
        high: [
            "Your grill is about to become a very expensive hot tub.",
            "This is 'eat inside' weather pretending to be 'maybe' weather.",
            "The only grilling happening today is your patience.",
            "Noah didn't grill on the ark. There's a lesson there.",
        ],
        certain: [
            "Unless your grill is a submarine, we have a problem.",
            "Today's forecast: 100% chance of indoor cooking.",
            "The sky is crying. Probably about your cancelled BBQ.",
            "Rain check. Literally.",
        ],
    },

    humidity: {
        dry: [
            "Your meat will dry out faster. Baste accordingly.",
            "Desert conditions mean vigilant moisture management.",
            "The air is thirsty. So is your brisket.",
            "Low humidity = drink more water. And beer. Mostly beer.",
        ],
        comfortable: [
            "The air is cooperating beautifully with your grilling endeavors.",
            "Goldilocks humidity: not too dry, not too sticky.",
            "Perfect moisture levels for both you and your meat.",
            "The atmosphere is chef's kiss right now.",
        ],
        humid: [
            "You'll marinate in your own sweat while the meat marinates in yours.",
            "The air is thick enough to grill on its own.",
            "Bring a towel. Maybe two.",
            "Your grill will work fine. Your comfort is another story.",
        ],
        tropical: [
            "Congratulations, you're now cooking in a sauna.",
            "The humidity is so high, your meat might drown.",
            "Sweat is just your body's way of adding seasoning.",
            "Florida Man energy required for this grilling session.",
        ],
    },

    verdict: {
        yes: [
            "Fire it up, Grill Master! The universe has aligned.",
            "The weather gods have blessed your carnivorous ambitions.",
            "It's grilling time! Don't disappoint the forecast.",
            "Conditions are optimal. Failure is not the weather's fault.",
            "Get thee to the grill! This is not a drill!",
        ],
        maybe: [
            "Proceed with cautious optimism and backup plans.",
            "The weather is on the fence. Be the deciding vote.",
            "Grillable, but pack your resilience.",
            "Not perfect, but true grill masters adapt.",
            "The conditions say 'maybe.' Your determination says 'yes.'",
        ],
        no: [
            "Today is not the day. The weather has spoken.",
            "Sometimes the bravest choice is to stay inside.",
            "Your indoor oven is feeling neglected anyway.",
            "Live to grill another day, friend.",
            "The grill will wait. It understands.",
        ],
    },
};

// =============================================================================
// Tips Database
// =============================================================================

const TIPS_DATABASE = {
    temperature: {
        cold: [
            { icon: '🧥', title: 'Layer Up', text: 'Dress warmly and consider a beanie. Your commitment is admirable, not your fashion sense.' },
            { icon: '⏱️', title: 'Preheat Longer', text: 'Cold weather means your grill needs extra time to reach optimal temperature.' },
            { icon: '🚪', title: 'Lid Management', text: 'Keep that lid closed! Every peek costs you precious heat in cold conditions.' },
        ],
        hot: [
            { icon: '💧', title: 'Stay Hydrated', text: 'Drink water between beers. Your kidneys will thank you.' },
            { icon: '🌳', title: 'Seek Shade', text: 'Position yourself where you can escape the sun while monitoring the grill.' },
            { icon: '⚡', title: 'Quick Cooks', text: 'Consider faster-cooking items to minimize your heat exposure time.' },
        ],
    },
    wind: {
        moderate: [
            { icon: '🛡️', title: 'Wind Block', text: 'Position your grill behind a wind break if possible. Your flames will thank you.' },
            { icon: '🔥', title: 'Monitor Heat', text: 'Wind can cause hot spots. Rotate your food more frequently.' },
            { icon: '📍', title: 'Secure Items', text: 'Weight down anything that can fly away. Napkins are not frisbees.' },
        ],
        strong: [
            { icon: '⚠️', title: 'Safety First', text: 'Consider postponing. Grilling in high winds can be dangerous.' },
            { icon: '🧯', title: 'Fire Ready', text: 'Keep a fire extinguisher closer than usual. Better safe than sorry.' },
        ],
    },
    precipitation: {
        possible: [
            { icon: '⛱️', title: 'Cover Strategy', text: 'Set up a canopy or umbrella over your grilling station (not too close to flames!).' },
            { icon: '🏃', title: 'Quick Protocol', text: 'Have everything prepped so you can execute quickly if weather turns.' },
            { icon: '📦', title: 'Dry Storage', text: 'Keep charcoal and tools in a dry spot. Wet charcoal is sad charcoal.' },
        ],
    },
    general: [
        { icon: '🌡️', title: 'Use a Thermometer', text: 'Internal temperature is the only honest indicator of doneness.' },
        { icon: '😴', title: 'Rest Your Meat', text: 'Let it rest for 5-10 minutes. Patience is the secret ingredient.' },
        { icon: '🧹', title: 'Clean Grates', text: 'A clean grill is a happy grill. And it prevents last week\'s burger from haunting this week\'s.' },
    ],
};

// =============================================================================
// DOM Elements
// =============================================================================

const DOM = {
    // Input elements
    zipInput: document.getElementById('zipInput'),
    submitBtn: document.getElementById('submitBtn'),
    btnLoader: document.getElementById('btnLoader'),

    // Sections
    heroSection: document.getElementById('heroSection'),
    loadingSection: document.getElementById('loadingSection'),
    resultsSection: document.getElementById('resultsSection'),
    errorSection: document.getElementById('errorSection'),

    // Loading steps
    steps: [
        document.getElementById('step1'),
        document.getElementById('step2'),
        document.getElementById('step3'),
        document.getElementById('step4'),
    ],

    // Verdict elements
    verdictCard: document.getElementById('verdictCard'),
    locationName: document.getElementById('locationName'),
    verdictIcon: document.getElementById('verdictIcon'),
    verdictAnswer: document.getElementById('verdictAnswer'),
    verdictSubtitle: document.getElementById('verdictSubtitle'),
    scoreBar: document.getElementById('scoreBar'),
    scoreValue: document.getElementById('scoreValue'),

    // Metric elements
    tempValue: document.getElementById('tempValue'),
    tempFeelsLike: document.getElementById('tempFeelsLike'),
    tempBar: document.getElementById('tempBar'),
    tempLabel: document.getElementById('tempLabel'),
    tempCommentary: document.getElementById('tempCommentary'),

    windValue: document.getElementById('windValue'),
    windDirection: document.getElementById('windDirection'),
    windBar: document.getElementById('windBar'),
    windLabel: document.getElementById('windLabel'),
    windCommentary: document.getElementById('windCommentary'),

    rainValue: document.getElementById('rainValue'),
    rainType: document.getElementById('rainType'),
    rainBar: document.getElementById('rainBar'),
    rainLabel: document.getElementById('rainLabel'),
    rainCommentary: document.getElementById('rainCommentary'),

    humidityValue: document.getElementById('humidityValue'),
    dewPoint: document.getElementById('dewPoint'),
    humidityBar: document.getElementById('humidityBar'),
    humidityLabel: document.getElementById('humidityLabel'),
    humidityCommentary: document.getElementById('humidityCommentary'),

    // Science section
    calculationBreakdown: document.getElementById('calculationBreakdown'),

    // Forecast
    hourlyForecast: document.getElementById('hourlyForecast'),

    // Tips
    tipsGrid: document.getElementById('tipsGrid'),

    // Error
    errorMessage: document.getElementById('errorMessage'),

    // Buttons
    tryAgainBtn: document.getElementById('tryAgainBtn'),
    errorTryAgainBtn: document.getElementById('errorTryAgainBtn'),

    // Smoke container
    smokeContainer: document.getElementById('smokeContainer'),
};

// =============================================================================
// State Management
// =============================================================================

let state = {
    isLoading: false,
    weatherData: null,
    location: null,
    grillabilityIndex: null,
    scores: null,
};

// =============================================================================
// Utility Functions
// =============================================================================

/**
 * Get a random item from an array
 */
function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Convert Celsius to Fahrenheit
 */
function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

/**
 * Convert km/h to mph
 */
function kmhToMph(kmh) {
    return kmh * 0.621371;
}

/**
 * Clamp a value between min and max
 */
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

/**
 * Get wind direction name from degrees
 */
function getWindDirection(degrees) {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
                        'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
}

/**
 * Delay function for animations
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Validate ZIP code format
 */
function isValidZip(zip) {
    return /^\d{5}$/.test(zip);
}

// =============================================================================
// Smoke Particle Animation
// =============================================================================

function createSmokeParticles() {
    const particles = ['💨', '🌫️', '☁️'];

    setInterval(() => {
        if (!DOM.resultsSection.classList.contains('active')) return;

        const particle = document.createElement('div');
        particle.className = 'smoke-particle';
        particle.textContent = getRandomItem(particles);
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 2}s`;
        particle.style.animationDuration = `${6 + Math.random() * 4}s`;

        DOM.smokeContainer.appendChild(particle);

        setTimeout(() => particle.remove(), 10000);
    }, 2000);
}

// =============================================================================
// API Functions
// =============================================================================

/**
 * Get coordinates from ZIP code using Zippopotam.us API
 */
async function getCoordinatesFromZip(zip) {
    const response = await fetch(`${CONFIG.ZIP_GEOCODING_API}/${zip}`);

    if (!response.ok) {
        throw new Error('Invalid ZIP code. Please enter a valid US ZIP code.');
    }

    const data = await response.json();
    const place = data.places[0];

    return {
        lat: parseFloat(place.latitude),
        lon: parseFloat(place.longitude),
        city: place['place name'],
        state: place['state abbreviation'],
    };
}

/**
 * Fetch weather data from Open-Meteo API
 */
async function fetchWeatherData(lat, lon) {
    const params = new URLSearchParams({
        latitude: lat,
        longitude: lon,
        current: [
            'temperature_2m',
            'relative_humidity_2m',
            'apparent_temperature',
            'precipitation',
            'rain',
            'weather_code',
            'wind_speed_10m',
            'wind_direction_10m',
            'wind_gusts_10m',
        ].join(','),
        hourly: [
            'temperature_2m',
            'precipitation_probability',
            'precipitation',
            'weather_code',
            'wind_speed_10m',
        ].join(','),
        daily: [
            'precipitation_probability_max',
            'precipitation_sum',
        ].join(','),
        temperature_unit: 'fahrenheit',
        wind_speed_unit: 'mph',
        precipitation_unit: 'inch',
        timezone: 'auto',
        forecast_days: 1,
    });

    const response = await fetch(`${CONFIG.WEATHER_API}?${params}`);

    if (!response.ok) {
        throw new Error('Failed to fetch weather data. Please try again.');
    }

    return response.json();
}

// =============================================================================
// Scoring Functions (The Science™)
// =============================================================================

/**
 * Calculate temperature score (0-100)
 *
 * The temperature scoring uses a piecewise linear function that penalizes
 * temperatures outside the ideal grilling range while remaining lenient
 * for acceptable conditions.
 */
function calculateTemperatureScore(temp) {
    const { IDEAL_MIN, IDEAL_MAX, ACCEPTABLE_MIN, ACCEPTABLE_MAX, ABSOLUTE_MIN, ABSOLUTE_MAX } = CONFIG.TEMP;

    // Perfect range: 100 points
    if (temp >= IDEAL_MIN && temp <= IDEAL_MAX) {
        return 100;
    }

    // Above ideal range
    if (temp > IDEAL_MAX) {
        if (temp <= ACCEPTABLE_MAX) {
            // Gradual decline: 100 -> 60
            return 100 - ((temp - IDEAL_MAX) / (ACCEPTABLE_MAX - IDEAL_MAX)) * 40;
        }
        if (temp <= ABSOLUTE_MAX) {
            // Steeper decline: 60 -> 20
            return 60 - ((temp - ACCEPTABLE_MAX) / (ABSOLUTE_MAX - ACCEPTABLE_MAX)) * 40;
        }
        return 10; // Dangerously hot
    }

    // Below ideal range
    if (temp >= ACCEPTABLE_MIN) {
        // Gradual decline: 100 -> 60
        return 100 - ((IDEAL_MIN - temp) / (IDEAL_MIN - ACCEPTABLE_MIN)) * 40;
    }
    if (temp >= ABSOLUTE_MIN) {
        // Steeper decline: 60 -> 20
        return 60 - ((ACCEPTABLE_MIN - temp) / (ACCEPTABLE_MIN - ABSOLUTE_MIN)) * 40;
    }

    return 10; // Dangerously cold
}

/**
 * Calculate wind score (0-100)
 *
 * Wind significantly impacts grilling safety and heat management.
 * Higher winds receive increasingly severe penalties.
 */
function calculateWindScore(windSpeed, gustSpeed) {
    const { IDEAL_MAX, ACCEPTABLE_MAX, DANGEROUS_MAX } = CONFIG.WIND;

    // Use the higher of sustained wind or gusts (gusts weighted at 70%)
    const effectiveWind = Math.max(windSpeed, gustSpeed * 0.7);

    if (effectiveWind <= IDEAL_MAX) {
        return 100;
    }

    if (effectiveWind <= ACCEPTABLE_MAX) {
        // Gradual decline: 100 -> 50
        return 100 - ((effectiveWind - IDEAL_MAX) / (ACCEPTABLE_MAX - IDEAL_MAX)) * 50;
    }

    if (effectiveWind <= DANGEROUS_MAX) {
        // Steeper decline: 50 -> 10
        return 50 - ((effectiveWind - ACCEPTABLE_MAX) / (DANGEROUS_MAX - ACCEPTABLE_MAX)) * 40;
    }

    return 5; // Dangerous winds
}

/**
 * Calculate precipitation score (0-100)
 *
 * Precipitation probability and current conditions are both factored in.
 * Any active precipitation severely impacts the score.
 */
function calculatePrecipitationScore(probability, currentPrecip) {
    const { IDEAL_MAX, ACCEPTABLE_MAX, HIGH_RISK } = CONFIG.PRECIP;

    // Current precipitation penalty
    let currentPenalty = 0;
    if (currentPrecip > 0) {
        currentPenalty = Math.min(currentPrecip * 50, 60); // Max 60 point penalty
    }

    // Probability score
    let probabilityScore;
    if (probability <= IDEAL_MAX) {
        probabilityScore = 100;
    } else if (probability <= ACCEPTABLE_MAX) {
        probabilityScore = 100 - ((probability - IDEAL_MAX) / (ACCEPTABLE_MAX - IDEAL_MAX)) * 30;
    } else if (probability <= HIGH_RISK) {
        probabilityScore = 70 - ((probability - ACCEPTABLE_MAX) / (HIGH_RISK - ACCEPTABLE_MAX)) * 30;
    } else {
        probabilityScore = 40 - ((probability - HIGH_RISK) / (100 - HIGH_RISK)) * 35;
    }

    return Math.max(0, probabilityScore - currentPenalty);
}

/**
 * Calculate humidity score (0-100)
 *
 * Humidity affects comfort but has less impact on grilling itself.
 * Extreme humidity receives moderate penalties.
 */
function calculateHumidityScore(humidity) {
    const { IDEAL_MIN, IDEAL_MAX, ACCEPTABLE_MIN, ACCEPTABLE_MAX } = CONFIG.HUMIDITY;

    if (humidity >= IDEAL_MIN && humidity <= IDEAL_MAX) {
        return 100;
    }

    if (humidity > IDEAL_MAX) {
        if (humidity <= ACCEPTABLE_MAX) {
            return 100 - ((humidity - IDEAL_MAX) / (ACCEPTABLE_MAX - IDEAL_MAX)) * 30;
        }
        return 70 - ((humidity - ACCEPTABLE_MAX) / (100 - ACCEPTABLE_MAX)) * 40;
    }

    if (humidity >= ACCEPTABLE_MIN) {
        return 100 - ((IDEAL_MIN - humidity) / (IDEAL_MIN - ACCEPTABLE_MIN)) * 30;
    }

    return 70 - ((ACCEPTABLE_MIN - humidity) / ACCEPTABLE_MIN) * 30;
}

/**
 * Calculate the final Grillability Index™
 *
 * This weighted composite score represents our best scientific estimate
 * of grilling conditions based on the four primary factors.
 */
function calculateGrillabilityIndex(scores) {
    const { TEMPERATURE, WIND, PRECIPITATION, HUMIDITY } = CONFIG.WEIGHTS;

    const weightedScore =
        (scores.temperature * TEMPERATURE) +
        (scores.wind * WIND) +
        (scores.precipitation * PRECIPITATION) +
        (scores.humidity * HUMIDITY);

    return Math.round(weightedScore);
}

/**
 * Determine the verdict based on the Grillability Index
 */
function getVerdict(index) {
    if (index >= CONFIG.THRESHOLDS.EXCELLENT) {
        return 'yes';
    }
    if (index >= CONFIG.THRESHOLDS.MARGINAL) {
        return 'maybe';
    }
    return 'no';
}

// =============================================================================
// Commentary Functions
// =============================================================================

function getTemperatureCategory(temp) {
    if (temp < 32) return 'freezing';
    if (temp < 45) return 'cold';
    if (temp < 60) return 'cool';
    if (temp <= 85) return 'perfect';
    if (temp <= 95) return 'warm';
    if (temp <= 105) return 'hot';
    return 'extreme';
}

function getWindCategory(wind) {
    if (wind <= 5) return 'calm';
    if (wind <= 10) return 'light';
    if (wind <= 18) return 'moderate';
    if (wind <= 25) return 'strong';
    return 'dangerous';
}

function getPrecipCategory(probability) {
    if (probability <= 10) return 'none';
    if (probability <= 25) return 'slight';
    if (probability <= 50) return 'moderate';
    if (probability <= 75) return 'high';
    return 'certain';
}

function getHumidityCategory(humidity) {
    if (humidity < 30) return 'dry';
    if (humidity <= 60) return 'comfortable';
    if (humidity <= 80) return 'humid';
    return 'tropical';
}

function getScoreLabel(score) {
    if (score >= 90) return { text: 'Optimal', class: 'good' };
    if (score >= 70) return { text: 'Good', class: 'good' };
    if (score >= 50) return { text: 'Moderate', class: 'moderate' };
    if (score >= 30) return { text: 'Poor', class: 'poor' };
    return { text: 'Severe', class: 'poor' };
}

// =============================================================================
// Tips Generation
// =============================================================================

function generateTips(weather, scores) {
    const tips = [];

    // Temperature-based tips
    const tempCategory = getTemperatureCategory(weather.current.temperature_2m);
    if (['freezing', 'cold', 'cool'].includes(tempCategory)) {
        tips.push(...(TIPS_DATABASE.temperature.cold || []));
    } else if (['hot', 'extreme'].includes(tempCategory)) {
        tips.push(...(TIPS_DATABASE.temperature.hot || []));
    }

    // Wind-based tips
    const windCategory = getWindCategory(weather.current.wind_speed_10m);
    if (windCategory === 'moderate') {
        tips.push(...(TIPS_DATABASE.wind.moderate || []));
    } else if (['strong', 'dangerous'].includes(windCategory)) {
        tips.push(...(TIPS_DATABASE.wind.strong || []));
    }

    // Precipitation-based tips
    const precipProb = weather.daily?.precipitation_probability_max?.[0] || 0;
    if (precipProb > 20) {
        tips.push(...(TIPS_DATABASE.precipitation.possible || []));
    }

    // Always add some general tips
    tips.push(...TIPS_DATABASE.general);

    // Return unique tips (max 6)
    const uniqueTips = tips.filter((tip, index, self) =>
        index === self.findIndex(t => t.title === tip.title)
    );

    return uniqueTips.slice(0, 6);
}

// =============================================================================
// UI Update Functions
// =============================================================================

function showSection(sectionName) {
    // Hide all sections
    DOM.heroSection.classList.remove('active');
    DOM.heroSection.style.display = 'none';
    DOM.loadingSection.classList.remove('active');
    DOM.resultsSection.classList.remove('active');
    DOM.errorSection.classList.remove('active');

    // Show requested section
    switch (sectionName) {
        case 'hero':
            DOM.heroSection.style.display = 'block';
            break;
        case 'loading':
            DOM.loadingSection.classList.add('active');
            break;
        case 'results':
            DOM.resultsSection.classList.add('active');
            break;
        case 'error':
            DOM.errorSection.classList.add('active');
            break;
    }
}

async function animateLoadingSteps() {
    for (let i = 0; i < DOM.steps.length; i++) {
        DOM.steps[i].classList.add('active');
        await delay(600);
        DOM.steps[i].classList.remove('active');
        DOM.steps[i].classList.add('complete');
    }
}

function updateVerdictCard(verdict, index, location) {
    // Set card class
    DOM.verdictCard.className = `verdict-card ${verdict}`;

    // Update location
    DOM.locationName.textContent = `${location.city}, ${location.state}`;

    // Update verdict display
    const icons = { yes: '🔥', maybe: '🤔', no: '❄️' };
    const answers = { yes: 'YES', maybe: 'MAYBE', no: 'NO' };

    DOM.verdictIcon.textContent = icons[verdict];
    DOM.verdictAnswer.textContent = answers[verdict];
    DOM.verdictSubtitle.textContent = getRandomItem(COMMENTARY.verdict[verdict]);

    // Animate score bar
    setTimeout(() => {
        DOM.scoreBar.style.width = `${index}%`;
    }, 300);
    DOM.scoreValue.textContent = `${index}/100`;
}

function updateMetricCard(element, value, detail, score, commentary) {
    const { tempValue, tempFeelsLike, tempBar, tempLabel, tempCommentary,
            windValue, windDirection, windBar, windLabel, windCommentary,
            rainValue, rainType, rainBar, rainLabel, rainCommentary,
            humidityValue, dewPoint, humidityBar, humidityLabel, humidityCommentary } = DOM;

    const scoreInfo = getScoreLabel(score);

    // Determine which metric we're updating based on element
    if (element === 'temp') {
        tempValue.textContent = value;
        tempFeelsLike.textContent = detail;
        tempBar.className = `analysis-bar ${scoreInfo.class}`;
        setTimeout(() => { tempBar.style.width = `${score}%`; }, 100);
        tempLabel.textContent = scoreInfo.text;
        tempLabel.className = `analysis-label ${scoreInfo.class}`;
        tempCommentary.textContent = commentary;
    } else if (element === 'wind') {
        windValue.textContent = value;
        windDirection.textContent = detail;
        windBar.className = `analysis-bar ${scoreInfo.class}`;
        setTimeout(() => { windBar.style.width = `${score}%`; }, 200);
        windLabel.textContent = scoreInfo.text;
        windLabel.className = `analysis-label ${scoreInfo.class}`;
        windCommentary.textContent = commentary;
    } else if (element === 'rain') {
        rainValue.textContent = value;
        rainType.textContent = detail;
        rainBar.className = `analysis-bar ${scoreInfo.class}`;
        setTimeout(() => { rainBar.style.width = `${score}%`; }, 300);
        rainLabel.textContent = scoreInfo.text;
        rainLabel.className = `analysis-label ${scoreInfo.class}`;
        rainCommentary.textContent = commentary;
    } else if (element === 'humidity') {
        humidityValue.textContent = value;
        dewPoint.textContent = detail;
        humidityBar.className = `analysis-bar ${scoreInfo.class}`;
        setTimeout(() => { humidityBar.style.width = `${score}%`; }, 400);
        humidityLabel.textContent = scoreInfo.text;
        humidityLabel.className = `analysis-label ${scoreInfo.class}`;
        humidityCommentary.textContent = commentary;
    }
}

function updateCalculationBreakdown(scores, index) {
    const breakdown = `
        <div class="calc-item">
            <span class="calc-label">Temperature Score</span>
            <span class="calc-value">${Math.round(scores.temperature)} × 0.35 = ${Math.round(scores.temperature * 0.35)}</span>
        </div>
        <div class="calc-item">
            <span class="calc-label">Wind Score</span>
            <span class="calc-value">${Math.round(scores.wind)} × 0.25 = ${Math.round(scores.wind * 0.25)}</span>
        </div>
        <div class="calc-item">
            <span class="calc-label">Precipitation Score</span>
            <span class="calc-value">${Math.round(scores.precipitation)} × 0.30 = ${Math.round(scores.precipitation * 0.30)}</span>
        </div>
        <div class="calc-item">
            <span class="calc-label">Humidity Score</span>
            <span class="calc-value">${Math.round(scores.humidity)} × 0.10 = ${Math.round(scores.humidity * 0.10)}</span>
        </div>
    `;
    DOM.calculationBreakdown.innerHTML = breakdown;
}

function updateHourlyForecast(weather) {
    const hourly = weather.hourly;
    const currentHour = new Date().getHours();

    let forecastHTML = '';

    // Show next 12 hours
    for (let i = 0; i < 12; i++) {
        const hourIndex = currentHour + i;
        if (hourIndex >= 24) break;

        const temp = Math.round(hourly.temperature_2m[hourIndex]);
        const precip = hourly.precipitation_probability[hourIndex];
        const wind = hourly.wind_speed_10m[hourIndex];
        const weatherCode = hourly.weather_code[hourIndex];

        // Calculate hour's grillability
        const hourScore = calculateTemperatureScore(temp) * 0.4 +
                         calculateWindScore(wind, wind * 1.3) * 0.3 +
                         calculatePrecipitationScore(precip, 0) * 0.3;

        const hourClass = hourScore >= 70 ? 'optimal' : hourScore >= 45 ? 'okay' : 'poor';
        const icon = getWeatherIcon(weatherCode);

        const displayHour = hourIndex === currentHour ? 'Now' :
                           `${hourIndex % 12 || 12}${hourIndex < 12 ? 'am' : 'pm'}`;

        forecastHTML += `
            <div class="hour-block ${hourClass}">
                <span class="hour-time">${displayHour}</span>
                <span class="hour-icon">${icon}</span>
                <span class="hour-temp">${temp}°</span>
                <span class="hour-score">${Math.round(hourScore)}%</span>
            </div>
        `;
    }

    DOM.hourlyForecast.innerHTML = forecastHTML;
}

function getWeatherIcon(code) {
    // WMO Weather interpretation codes
    const icons = {
        0: '☀️',   // Clear sky
        1: '🌤️',   // Mainly clear
        2: '⛅',   // Partly cloudy
        3: '☁️',   // Overcast
        45: '🌫️',  // Fog
        48: '🌫️',  // Depositing rime fog
        51: '🌦️',  // Light drizzle
        53: '🌦️',  // Moderate drizzle
        55: '🌧️',  // Dense drizzle
        61: '🌧️',  // Slight rain
        63: '🌧️',  // Moderate rain
        65: '🌧️',  // Heavy rain
        71: '🌨️',  // Slight snow
        73: '🌨️',  // Moderate snow
        75: '❄️',  // Heavy snow
        80: '🌦️',  // Slight rain showers
        81: '🌧️',  // Moderate rain showers
        82: '⛈️',  // Violent rain showers
        95: '⛈️',  // Thunderstorm
        96: '⛈️',  // Thunderstorm with hail
        99: '⛈️',  // Thunderstorm with heavy hail
    };
    return icons[code] || '🌤️';
}

function updateTips(tips) {
    let tipsHTML = '';

    tips.forEach(tip => {
        tipsHTML += `
            <div class="tip-card">
                <span class="tip-icon">${tip.icon}</span>
                <div class="tip-content">
                    <h4>${tip.title}</h4>
                    <p>${tip.text}</p>
                </div>
            </div>
        `;
    });

    DOM.tipsGrid.innerHTML = tipsHTML;
}

function showError(message) {
    DOM.errorMessage.textContent = message;
    showSection('error');
}

function resetLoadingSteps() {
    DOM.steps.forEach(step => {
        step.classList.remove('active', 'complete');
    });
}

// =============================================================================
// Main Application Logic
// =============================================================================

async function analyzeGrillingConditions(zip) {
    try {
        state.isLoading = true;
        DOM.submitBtn.classList.add('loading');
        DOM.submitBtn.disabled = true;

        // Show loading section
        resetLoadingSteps();
        showSection('loading');

        // Start loading animation
        const loadingAnimation = animateLoadingSteps();

        // Fetch location data
        const location = await getCoordinatesFromZip(zip);
        state.location = location;

        // Fetch weather data
        const weather = await fetchWeatherData(location.lat, location.lon);
        state.weatherData = weather;

        // Wait for loading animation to complete
        await loadingAnimation;
        await delay(300);

        // Calculate scores
        const current = weather.current;
        const precipProb = weather.daily?.precipitation_probability_max?.[0] || 0;

        const scores = {
            temperature: calculateTemperatureScore(current.temperature_2m),
            wind: calculateWindScore(current.wind_speed_10m, current.wind_gusts_10m || current.wind_speed_10m * 1.3),
            precipitation: calculatePrecipitationScore(precipProb, current.precipitation || 0),
            humidity: calculateHumidityScore(current.relative_humidity_2m),
        };
        state.scores = scores;

        // Calculate final index
        const grillabilityIndex = calculateGrillabilityIndex(scores);
        state.grillabilityIndex = grillabilityIndex;

        // Determine verdict
        const verdict = getVerdict(grillabilityIndex);

        // Update UI
        showSection('results');

        // Update verdict card
        updateVerdictCard(verdict, grillabilityIndex, location);

        // Update metric cards with commentary
        const tempCategory = getTemperatureCategory(current.temperature_2m);
        const windCategory = getWindCategory(current.wind_speed_10m);
        const precipCategory = getPrecipCategory(precipProb);
        const humidityCategory = getHumidityCategory(current.relative_humidity_2m);

        updateMetricCard(
            'temp',
            `${Math.round(current.temperature_2m)}°F`,
            `Feels like ${Math.round(current.apparent_temperature)}°F`,
            scores.temperature,
            getRandomItem(COMMENTARY.temperature[tempCategory])
        );

        updateMetricCard(
            'wind',
            `${Math.round(current.wind_speed_10m)} mph`,
            `Direction: ${getWindDirection(current.wind_direction_10m)} | Gusts: ${Math.round(current.wind_gusts_10m || current.wind_speed_10m * 1.3)} mph`,
            scores.wind,
            getRandomItem(COMMENTARY.wind[windCategory])
        );

        updateMetricCard(
            'rain',
            `${precipProb}%`,
            current.precipitation > 0 ? `Currently: ${current.precipitation}" precipitation` : 'Currently: Dry',
            scores.precipitation,
            getRandomItem(COMMENTARY.precipitation[precipCategory])
        );

        updateMetricCard(
            'humidity',
            `${current.relative_humidity_2m}%`,
            `Dew Point: ${Math.round(current.temperature_2m - ((100 - current.relative_humidity_2m) / 5))}°F`,
            scores.humidity,
            getRandomItem(COMMENTARY.humidity[humidityCategory])
        );

        // Update calculation breakdown
        updateCalculationBreakdown(scores, grillabilityIndex);

        // Update hourly forecast
        updateHourlyForecast(weather);

        // Generate and update tips
        const tips = generateTips(weather, scores);
        updateTips(tips);

    } catch (error) {
        console.error('Error analyzing grilling conditions:', error);
        showError(error.message || 'An unexpected error occurred. Please try again.');
    } finally {
        state.isLoading = false;
        DOM.submitBtn.classList.remove('loading');
        DOM.submitBtn.disabled = false;
    }
}

function handleSubmit() {
    const zip = DOM.zipInput.value.trim();

    if (!isValidZip(zip)) {
        DOM.zipInput.classList.add('invalid');
        DOM.zipInput.focus();
        return;
    }

    DOM.zipInput.classList.remove('invalid');
    analyzeGrillingConditions(zip);
}

function handleReset() {
    showSection('hero');
    DOM.zipInput.value = '';
    DOM.zipInput.focus();

    // Reset score bars
    DOM.scoreBar.style.width = '0%';
    DOM.tempBar.style.width = '0%';
    DOM.windBar.style.width = '0%';
    DOM.rainBar.style.width = '0%';
    DOM.humidityBar.style.width = '0%';
}

// =============================================================================
// Event Listeners
// =============================================================================

DOM.submitBtn.addEventListener('click', handleSubmit);

DOM.zipInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSubmit();
    }
});

DOM.zipInput.addEventListener('input', (e) => {
    // Only allow numbers
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 5);
    e.target.classList.remove('invalid');
});

DOM.tryAgainBtn.addEventListener('click', handleReset);
DOM.errorTryAgainBtn.addEventListener('click', handleReset);

// =============================================================================
// Initialization
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize smoke particles
    createSmokeParticles();

    // Focus on ZIP input
    DOM.zipInput.focus();

    // Show hero section
    DOM.heroSection.style.display = 'block';
});
