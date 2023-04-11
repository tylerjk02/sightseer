# Sightseer

In-Depth Info Directory for Countries/Cities.

*e.g.*

- Country Name, Both Common and Official
- Country Flag and Coat of Arms
- Wikipedia Summaries

A full list of data we provide can be found below.

## Current Version

### 0.3.3

- Nature route added, featuring summary country flora and fauna
- Styling improved for cities routes

## Previous Versions

### 0.3.2

- Cities now have an independent route. This is composed into three sections, 'Cities', 'Towns', and 'Villages'.
- Folklore now extended with more detail if available. Fixing many 'single sentence' pages
- Photo route tailored to show more landscape/nature images and less map/flag images
- Travel route returns a limit of 10 cities (Previously it returned 30, with the lower 20 usually having no travel info)

### 0.3.1

- Cities now stream to travel pages, improving navigation speed
- Preloading disabled for travel pages, fixing 500 error

### 0.3

- Photos route now available via county pages. Displays country images
- Country celebrities now available via culture pages
- Country folklore summary now available via culture pages
- Toggles added for celebrities and recipes on culture pages
- Refactoring of culture pages
- Style changes

### 0.2.9

- Added toggle to hide news images
- Fixes to news route styling
- Culture route info now streams to the page, greatly increasing navigation speed
- News routes temporarily halted due to faulty API

### 0.2.8

- News route now available via country pages. Displays local news.
- Small changes

### 0.2.7

- Travel page now streams hotels and accommodations, greatly increasing navigation speed
- Country page now streams most info, increasing navigation speed
- Style changes

### 0.2.6

- Added recipes (ingredients, instructions and servings) related to given country (if applicable). Can be found in culture route
- Small changes

### 0.2.5

- History routes extended with more info
- Culture now has its own route, allowing more info and quicker country route loading
- Better style consistency

### 0.2.4

- Culture summary added to country routes
- Check added for wiki summary disambiguation

### 0.2.3

- Redesign and complete refactoring of country-page css
- 'Most populous cities' removed from countries page. (City info will be put in its own page, eventually)
- Small fixes

### 0.2.2

- Added culinary tradition to country routes
- Error handling for country driving side
- Style changes

### 0.2.1

- AI Generated Travel Info Chunk for every './cityName/travel' route
- Styles fixed to 'known-for' tabs on wide screens

### 0.2

- Images added to city travels routes
- 'Known-for' tags added to city travel routes
- Improvements to site for phone-based users
- Error fixes

### 0.1.9

- Fixed duplicate history blips
- Fixed name conflicts on traceback
- Style changes

### 0.1.8

- History routes added
- Webcams on country route removed (causing many errors)
- Style changes

### 0.1.7

- Travel route info no longer limited to only hotels
- Proper error handling for travel routes (whoops)
- Styling for travel routes

### 0.1.6

- Travel routes reopened
- Hotel data now displayed for cities (making it not ugly is a WIP)
- Other small fixes...

### 0.1.5

- Great improvements to routing
- Simply country data now fetched via Alpha3, fixing many problems. (eg. 'georgia' linking to 'south georgia island')
- Ghost continent route 'antarctic' fixed.
- Travel and history routes halted for time being

### 0.1.4

- Added country history page
- Country page load speed greatly improved
- *WIP* Travel page added to country routes

### 0.1.3

- Fixed styling on homepage
- Error catching for country data route

### 0.1.2

- SCSS added to better organize styling
- Improvement to routing speed
- Mobile support improved
- No longer pulling images from Unsplash

### 0.1.1

- Mobile Support
- Webcams Added
- Style Fixes

### 0.1

- Cities added
- Changes to Wiki article fetching
- Fixes to routing

### 0.0.5 --> 0.0.9

- Better stability
- More info added to country routes
- Troublesome folder removed

### 0.0.4

- More country info
- Pulling images from Unsplash

### 0.0.2 --> 0.0.3

- First deployment
- Much more info added to countries

### 0.0.1

- Homepage added
- Countries split by region
- Country list added

## Data we provide

### Country Data

- Country name, common and official
- Country area size (sq km)
- Country capital info
- Country border info
- Country language info
- Country currency info
- Country domain info
- Country cuisine info
- Country culture info
- Country travel advisories
- Country summary from Wikipedia
- Country UN status
- Country independence status
- Country landlocked status
- Country driving-side
- Country recipes
- Country photos
- Country folklore summary
- Country celebrities
- Country flora & fauna
- Country news

### City Data

- Most populous cities in given country
- Summary from Wikipedia on given city
- City coordinates
- City population
- City imagery
- Hotels and other accommodations in a city

### Travel Data

- Advisory data
- Hotels in a given city
- Accommodations in a given city
- 'Known-for' tags of given city

### History Data

- History summary
- History blips of given country

### Culture Data

- Culture Summary
- Local cuisine culture
- Recipes relating to given country
