# Weather Companion

Build a complete, polished, fully functional Weather Application based on the Task-05 requirements shown in the reference image.

The application must fetch REAL weather data from a weather API based on:

The user's current location, if they allow browser location access.

A location/city entered manually by the user.

This must be a real working weather application, NOT a static UI mockup.

TECHNOLOGY

Use:

React

TypeScript

Tailwind CSS

Component-based architecture

Lucide React icons

Open-Meteo Weather API

Open-Meteo Geocoding API

Browser Geolocation API

Use Open-Meteo because it does not require an API key.

Do NOT use:

Fake weather data

Hardcoded weather values

A backend

Supabase

Authentication

Fake API responses

All weather information displayed in the UI must come from the actual API response.

API REQUIREMENTS

Use the Open-Meteo APIs.

For city/location search, use the Open-Meteo Geocoding API.

For weather data, use the Open-Meteo Forecast API.

The application should first convert a searched location into:

Latitude

Longitude

Location name

Country

Country code

Timezone

Then use latitude and longitude to retrieve weather information.

Fetch at least:

Current weather:

Temperature

Apparent/feels-like temperature

Weather condition

Weather code

Humidity

Wind speed

Wind direction

Precipitation

Day/night status

Hourly forecast:

Temperature

Weather condition

Precipitation probability

Daily forecast:

Maximum temperature

Minimum temperature

Weather condition

Precipitation probability

Sunrise

Sunset

Use appropriate Open-Meteo weather codes and convert them into human-readable weather conditions.

For example:

0 → Clear sky

1, 2, 3 → Mainly clear / partly cloudy / overcast

45, 48 → Fog

51, 53, 55 → Drizzle

61, 63, 65 → Rain

71, 73, 75 → Snow

80, 81, 82 → Rain showers

95 → Thunderstorm

96, 99 → Thunderstorm with hail

Create a reusable weather-code utility rather than repeating this logic throughout the components.

LOCATION DETECTION

When the application loads:

Show a friendly welcome state.

Provide:

Use My Location

button.

When clicked:

Request browser geolocation permission.

Obtain latitude and longitude.

Fetch weather for that location.

Display the detected location.

Show a loading state while fetching.

If the user denies location permission:

Do NOT crash.

Show a friendly message.

Tell the user they can search for a city manually.

Example:

Location access was not available. Search for a city to see its weather.

Do not repeatedly request permission.

SEARCH

Create a prominent search bar.

Placeholder:

Search for a city...

Example:

Search:
Bengaluru

The user should be able to press:

Enter

Search button

to search.

When a city is entered:

Call the Geocoding API.

Find the best matching location.

Retrieve latitude and longitude.

Fetch weather.

Update the entire UI.

Also show useful location information in search results when appropriate:

Bengaluru, Karnataka, India

If multiple locations match, provide a small selection list.

Do not simply use the typed city name as the location without resolving it through the API.

SEARCH VALIDATION

Handle:

Empty search:
Please enter a city name.

Unknown city:
Location not found. Try another city.

API failure:
Unable to fetch weather right now. Please try again.

Network failure:
Check your internet connection and try again.

Never display undefined, null, NaN, or broken API values.

OVERALL UI

Create a premium, modern weather dashboard.

Design direction:

Dark navy background

Blue/cyan/purple gradient accents

Glassmorphism cards

Soft glowing effects

Subtle weather-inspired background

Clean white typography

Rounded cards

Soft shadows

Minimal borders

Smooth transitions

The interface should feel like a modern weather application, not a basic college assignment.

Do not overuse gradients or animations.

HEADER

Create a clean header.

Left:

WEATHER

Small subtitle:

Live weather, wherever you are.

Right:

Use My Location button

Theme toggle if appropriate

Keep the header responsive.

SEARCH SECTION

Place a large search bar near the top.

Include:

Search icon

Text input

Search button

Use My Location button

Example:

🔍 Search for a city...

Search

📍 Use My Location

On mobile, stack the controls appropriately.

CURRENT LOCATION

After weather data is loaded, prominently display:

Bengaluru

Karnataka, India

Also show:

Local time: 12:48 PM

Use the timezone returned by the API.

Do not use the browser's timezone if the searched location is elsewhere.

MAIN WEATHER CARD

Create a large hero weather card.

Display:

Location name

Current weather icon

28°

Partly Cloudy

Then:

Feels like 30°

Use the actual API data.

Temperature should be displayed in a very large font.

Use weather-specific icons based on the weather code.

Use Lucide icons or appropriate CSS/icon representations.

Do NOT use random emoji as the main weather icon.

WEATHER DETAILS

Below or beside the main temperature, create detail cards.

Include:

Humidity

68%

Wind

14 km/h

Precipitation

0 mm

Feels Like

30°

Wind Direction

NE

Weather Condition

Partly Cloudy

All values must come from the API.

Use clean icons for each metric.

UNIT TOGGLE

Add a temperature unit toggle:

°C | °F

Default:

°C

When the user selects °F:

Convert displayed temperatures to Fahrenheit.

Update current temperature.

Update feels-like temperature.

Update hourly temperatures.

Update daily high/low temperatures.

Do not make another API request just to convert units.

Use accurate conversion:

°F = (°C × 9/5) + 32

Clearly display the selected unit.

HOURLY FORECAST

Create:

Hourly Forecast

Display approximately the next 12 hours.

Each hourly card should show:

Time

Weather icon

Temperature

Precipitation probability

Example:

10 AM
☀
28°
10%

11 AM
🌤
29°
15%

12 PM
☀
30°
10%

Use horizontally scrollable cards on mobile.

Do not hardcode these values.

Retrieve them from the API.

DAILY FORECAST

Create:

7-Day Forecast

Display the next 7 days.

Each row/card should show:

Day

Weather icon

Weather condition

Low temperature

High temperature

Precipitation probability

Example:

Monday
Partly Cloudy
24° / 31°
20%

Tuesday
Rain
23° / 28°
65%

Use actual API data.

The current day should be clearly identified as:

Today

SUNRISE / SUNSET

Create a beautiful card displaying:

🌅 Sunrise
6:02 AM

🌇 Sunset
6:41 PM

Use actual API values.

Use the location's timezone.

WIND INFORMATION

Create a dedicated wind section.

Display:

Wind Speed

Wind Direction

Wind Degree

Use a visual compass-style indicator if practical.

The wind arrow should rotate based on the actual wind direction.

WEATHER CONDITION BACKGROUND

Subtly adapt the visual appearance based on current weather.

Examples:

Clear:

Bright blue gradient glow

Cloudy:

Soft blue/gray atmosphere

Rain:

Blue rainy atmosphere

Thunderstorm:

Darker dramatic atmosphere

Snow:

Cool light atmosphere

Do not make the background too strong or reduce text readability.

LOADING STATE

Whenever weather data is being fetched:

Show a polished loading state.

Example:

Fetching weather...

Use skeleton cards or a subtle spinner.

Do not freeze the interface.

Disable duplicate search requests while the current request is processing when appropriate.

ERROR STATE

Create a beautiful error card.

Example:

Weather unavailable

We couldn't retrieve weather data for this location.

Button:

Try Again

Handle errors gracefully.

Do not show raw API errors to the user.

EMPTY / INITIAL STATE

Before a location is selected, show:

What's the weather like?

Search for a city or use your current location to get live weather information.

Show:

Search bar

Use My Location button

Attractive weather illustration/icon

Do not display fake weather data in the initial state.

RECENT SEARCHES

Add a small:

Recent Searches

section.

Store the last 5 searched locations using localStorage.

Each item should display:

City
Country

Clicking a recent location should fetch its weather again.

Allow the user to remove a recent search.

Do not store unnecessary information.

FAVORITE LOCATION

Allow the user to mark the current location as a favorite using a star button.

Store favorites in localStorage.

Create:

Favorite Locations

Users should be able to click a favorite to load its weather.

Allow removing favorites.

Keep the implementation simple and reliable.

REFRESH WEATHER

Add a small refresh button near the current weather.

When clicked:

Fetch fresh weather data for the current location.

Show a subtle loading state.

Update the last updated time.

Display:

Updated just now

or

Updated 2 minutes ago

Calculate this dynamically.

WEATHER DATA LAST UPDATED

Show:

Last updated: [time]

Use the user's local UI time or appropriate location time.

Update the relative text dynamically.

RESPONSIVE DESIGN

The application must work perfectly on:

Desktop

Laptop

Tablet

Mobile

Desktop:

Large hero weather card

Detail cards arranged in a grid

Hourly cards horizontally aligned

7-day forecast clearly visible

Tablet:

Adapt grids

Maintain readable spacing

Mobile:

Single-column layout

Search controls stack

Temperature remains prominent

Weather detail cards use 2-column grid where appropriate

Hourly forecast horizontally scrolls

Daily forecast becomes compact

No horizontal page overflow

Test for approximately:

1440px
1024px
768px
390px
360px

ACCESSIBILITY

Implement:

Semantic HTML

Accessible form controls

Proper labels

Keyboard navigation

Visible focus states

Accessible buttons

ARIA labels for icon-only buttons

Good color contrast

The search input must be keyboard accessible.

Pressing Enter should perform the search.

ANIMATIONS

Use subtle animations:

Page entrance

Weather card appearance

Search results

Forecast cards

Button hover

Loading spinner

Weather background transitions

Do not overuse animations.

Respect:

prefers-reduced-motion

COMPONENT STRUCTURE

Organize the application using reusable components.

Suggested structure:

components/

Header

SearchBar

LocationButton

CurrentWeather

WeatherDetails

HourlyForecast

HourlyCard

DailyForecast

DailyForecastCard

SunriseSunset

WindCard

RecentSearches

FavoriteLocations

WeatherError

WeatherLoading

EmptyWeatherState

UnitToggle

lib/

weatherApi

weatherCodes

weatherUtils

types/

weather.ts

Keep API logic separate from UI components.

TYPESCRIPT

Create proper TypeScript types/interfaces for:

Location

CurrentWeather

HourlyWeather

DailyWeather

WeatherResponse

RecentLocation

FavoriteLocation

Do not use any unless absolutely unavoidable.

API ERROR HANDLING

Handle:

No internet

API unavailable

Invalid location

Empty search

Browser geolocation denied

Browser geolocation unavailable

API timeout

Unexpected API response

Show user-friendly messages.

Never expose raw technical errors in the UI.

LOCAL STORAGE

Use localStorage for:

Temperature unit

Recent searches

Favorite locations

Last selected location if appropriate

When refreshing the page, restore the last selected location if possible and fetch fresh weather data.

Never rely on stale weather data as the current weather.

PERFORMANCE

Avoid unnecessary API requests.

For example:

Don't request weather repeatedly on every keystroke.

Only search when the user presses Enter or clicks Search.

Avoid duplicate requests.

Clean up asynchronous operations where appropriate.

Keep the application responsive.

FOOTER

Create a minimal footer:

Live Weather Dashboard

Powered by Open-Meteo

Do not add fake company information.

Include:

© 2026 Weather App

IMPORTANT API IMPLEMENTATION DETAILS

Use the Open-Meteo Geocoding API to convert city names into coordinates.

Then use the Open-Meteo Forecast API to fetch:

Current:

temperature_2m

relative_humidity_2m

apparent_temperature

precipitation

weather_code

wind_speed_10m

wind_direction_10m

Hourly:

temperature_2m

weather_code

precipitation_probability

Daily:

weather_code

temperature_2m_max

temperature_2m_min

precipitation_probability_max

sunrise

sunset

Request an appropriate timezone such as:

timezone=auto

and enough forecast data for:

Current weather

Next 12 hours

Next 7 days

Make sure API query parameters are correctly URL encoded.

WEATHER CODE UTILITY

Create a utility that maps weather codes to:

Condition name

Icon

Appropriate visual category

For example:

Clear Sky
Partly Cloudy
Cloudy
Fog
Drizzle
Rain
Heavy Rain
Snow
Rain Shower
Thunderstorm

Use this utility everywhere in the application so weather conditions remain consistent.

SECURITY

Because Open-Meteo does not require an API key:

Do not create fake API keys.

Do not put secrets in the frontend.

Do not create unnecessary environment variables.

FINAL UI POLISH

The final application should have this general flow:

HEADER

↓
SEARCH / LOCATION

↓
CURRENT LOCATION

↓
MAIN WEATHER CARD

↓
WEATHER DETAILS

↓
HOURLY FORECAST

↓
7-DAY FORECAST

↓
SUNRISE / SUNSET + WIND

↓
RECENT / FAVORITE LOCATIONS

↓
FOOTER

Make the current weather the primary visual focus.

FINAL TESTING

Before considering the project complete, test all of these:

Application loads without errors.

Initial empty state appears.

Search for a valid city.

Search for an invalid city.

Press Enter to search.

Click Search button.

Use browser location.

Handle denied location permission.

Current temperature displays correctly.

Weather condition displays correctly.

Weather icon matches weather code.

Humidity displays.

Wind speed displays.

Wind direction displays.

Feels-like temperature displays.

Hourly forecast displays.

7-day forecast displays.

Sunrise displays.

Sunset displays.

Celsius/Fahrenheit toggle works.

Recent searches work.

Favorites work.

Refresh button fetches new data.

Loading state works.

Error state works.

Mobile layout works.

Desktop layout works.

No horizontal overflow.

No fake/hardcoded weather values.

No TypeScript errors.

No runtime errors.

No console errors.

API failures are handled gracefully.

Browser refresh works correctly.

Weather data uses the selected location's timezone.

IMPORTANT:

Do not stop after creating the visual design.

Implement the COMPLETE WORKING WEATHER APPLICATION with real Open-Meteo API integration, location search, geolocation, current weather, hourly forecast, 7-day forecast, weather details, unit conversion, recent searches, favorites, loading/error states, responsive design, and polished UI.

The final result should look like a professional modern weather application suitable for submitting as a frontend development task.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/6be152fb-cc40-4925-804c-8797d2676d7e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
