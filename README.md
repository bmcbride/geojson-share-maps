geojson-share-maps
===========

A responsive web mapping application for viewing GeoJSON files.

### URL Parameters:

| Parameter     | Options                 | Default       | Description                                              | Required |
| ------------- | ----------------------- | ------------- | -------------------------------------------------------- | -------- |
| _src_         | Web accessible GeoJSON  | NA            | URL to GeoJSON source                                    | True     |
| _title_       | Any string              | GeoJSON Data  | Navbar, app title                                        | False    |
| _logo_        | Any accessible URL      | NA            | URL to a custom navbar logo                              | False    |
| _title_field_ | Any valid property      | First property| Field used for marker/sidebar title                      | False    |
| _fields_      | Any valid properties    | All           | Comma separated list of specific properties to show      | False    |
| _attribution_ | Any string              | NA            | Source attribution added to text in bottom right of map  | False    |
| _cluster_     | true / false            | True          | Should markers be clustered?                             | False    |

### Screenshots:

![Screenshot](http://bmcbride.github.io/geojson-share-maps/screenshot.png)
