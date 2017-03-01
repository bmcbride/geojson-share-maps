geojson-share-maps
===========

A responsive web mapping utility for viewing and sharing [GeoJSON](http://geojson.org/) files. Designed to be an incredibly simple and lightweight tool for quickly standing up a basic mapping application without having to write any code. Maps can be shared, embedded, and added to your mobile homescreen. Use [geojson.io](http://geojson.io/) or any other modern mapping tool to generate your GeoJSON, place it on a web server, push it to [GitHub](https://github.com/), or save it as a [Gist](https://gist.github.com/) and quickly wrap it up as a responsive web app.

### Features:

- Fullscreen mobile-friendly map template with responsive navbar and modal popups
- Built on the incredibly popular [Bootstrap](http://getbootstrap.com/) and [Leaflet/Mapbox](http://leafletjs.com/) frameworks
- Configure everything via URL parameters (no coding necessary)!
- Define GeoJSON source, app title, logo, display fields/properties & data attribution
- Completely client-side, can be hosted for free on [GitHub Pages](https://pages.github.com/)
- Supports GeoJSON feature styling via [simplestyle-spec](https://github.com/mapbox/simplestyle-spec/)
- Sidebar with basic filtering and sorting via [List.js](http://www.listjs.com/)

### Examples:

- [DC WiFi Social](http://bmcbride.github.io/geojson-share-maps/?src=https://raw.githubusercontent.com/benbalter/dc-wifi-social/master/bars.geojson&fields=name,address&title=DC%20WiFi%20Social&title_field=name&attribution=https://github.com/benbalter/dc-wifi-social) A GitHub based collaborative list of DC locations that serve up both Internet and Alcohol from [Ben Balter](https://github.com/benbalter/dc-wifi-social)
- [US States](http://bmcbride.github.io/geojson-share-maps/?src=https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_1_states_provinces_shp.geojson&logo=https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/320px-Flag_of_the_United_States.svg.png&fields=name,name_alt,adm1_code,region,wikipedia&title=US%20States&attribution=States%20courtesy%20of%20geojson.xyz) Natural Earth _admin 1 states provinces shp_ data from [http://geojson.xyz/](http://geojson.xyz/)
- [Football Clubs of Europe](http://bmcbride.github.io/geojson-share-maps/?src=https://web.fulcrumapp.com/shares/82982e4c55707a34.geojson&fields=name,full_name,ground,league,city,state_province,country,photo&title=Football%20Clubs%20of%20Europe&title_field=name&attribution=Courtesy%20of%20Coleman%20McCormick&cluster=true) A Fulcrum mapping project from [Coleman McCormick](https://github.com/colemanm/)
- [NYC Coffee Shops](http://bmcbride.github.io/geojson-share-maps/?src=http://api.tiles.mapbox.com/v3/mapbox.o11ipb8h/markers.geojson&fields=name,description&title=NYC%20Coffee%20Shops&title_field=name&attribution=Courtesy%20of%20Mapbox&cluster=false) via [Mapbox](https://www.mapbox.com/blog/open-web-geojson/)
- [Baseball Parks](http://bmcbride.github.io/geojson-share-maps/?src=https://raw.githubusercontent.com/cageyjames/GeoJSON-Ballparks/master/ballparks.geojson&fields=Class,League,Team,Ballpark&title=GeoJSON%20Ballparks&title_field=Ballpark&cluster=false&attribution=https://github.com/cageyjames/GeoJSON-Ballparks) A GeoJSON Ballpark mapping project from [James Fee](https://github.com/cageyjames/GeoJSON-Ballparks)

### URL Parameters:

| Parameter     | Options                 | Default       | Description                                              | Required |
| ------------- | ----------------------- | ------------- | -------------------------------------------------------- | -------- |
| _src_         | Web accessible GeoJSON  | NA            | URL to GeoJSON source                                    | True     |
| _title_       | Any string              | GeoJSON Data  | navbar, app title                                        | False    |
| _logo_        | Any accessible URL      | NA            | URL to a custom navbar logo                              | False    |
| _title_field_ | Any valid property      | First property| Field used for marker/sidebar title                      | False    |
| _fields_      | Any valid properties    | All           | Comma separated list of specific properties to show      | False    |
| _attribution_ | Any string              | NA            | Source attribution added to text in bottom right of map  | False    |
| _cluster_     | true / false            | True          | Should markers be clustered?                             | False    |


### Screenshots:

Desktop Points

![Desktop 1](http://bmcbride.github.io/geojson-share-maps/screenshots/desktop-1.png)

Desktop Polygons

![Desktop 2](http://bmcbride.github.io/geojson-share-maps/screenshots/desktop-2.png)

Mobile Map

![Mobile 1](http://bmcbride.github.io/geojson-share-maps/screenshots/mobile-1.png)

Mobile Sidebar

![Mobile 2](http://bmcbride.github.io/geojson-share-maps/screenshots/mobile-2.png)

Mobile Popup

![Mobile 3](http://bmcbride.github.io/geojson-share-maps/screenshots/mobile-3.png)
