geojson-share-maps
===========

A responsive web mapping application for viewing GeoJSON files.

### URL Parameters:

| Parameter     | Options                 | Default       | Description                                              | Required |
| ------------- | ----------------------- | ------------- | -------------------------------------------------------- | -------- |
| _src_         | Web accessible GeoJSON  | NA            | URL to GeoJSON source                                    | True     |
| _title_       | Any string              | GeoJSON Data  | Navbar, app title                                        | False    |
| _logo_        | Any accessible URL      |               | URL to a custom navbar logo                              | False    |
| _title_field_ | Any valid field label   | Fulcrum Id    | Field used for marker/sidebar title, use the field label | False    |
| _fields_      | Any valid field labels  | All           | Comma separated list of specific fields to show          | False    |
| _cluster_     | true / false            | True          | Should markers be clustered?                             | False    |

### Screenshots:

![Screenshot](http://bmcbride.github.io/geojson-share-maps/screenshot.png)
