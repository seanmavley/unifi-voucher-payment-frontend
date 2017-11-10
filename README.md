# Unifi Voucher Payment Frontend

A typical use case of the Mazzuma API in making mobile money payments. 

To see this repository in action, visit [Enjoy WiFi, Today]('https://enjoywifi.today') and follow the "Buy Bundle" link.

This repository is complementary to the @seanmavley/unifi-voucher-payment-server repository. They both work in tandem to accept Mobile Money payments from Airtel, Tigo and MTN networks in Ghana, responding with a generated voucher code in the end.

See the @seanmavley/unifi-voucher-payment-server for more details of the outworkings of the API.

Mazzuma's Mobile Money Payments API is in use for the mobile payments. Node-UnifiAPI ( @delian/node-unifiapi ) handles the generation of voucher codes, in connection with our self-managed Unifi Controller for AlwaysOn WiFi.

## How it works

 - A form collects user information
 - Details are submitted to an API endpoint (see implementation at @seanmavley/unifi-voucher-payment-server)
 - API then queries Mazzuma API, and waits for response
 - Frontend polls a callback endpoint for updates. If found, proceeds to display generated voucher.
 
## Run Locally

 - Git clone this repository
 - Run `npm install` in porject root
 - `ng serve -o` to view application in the browser. (Remember to point the `API_ENDPOINT` const in `purchase.service.ts` to the API endpoint running locally (Default port for server is `3012` on localhost)
 
## Contributing

PR and Issues are welcome to open. Will appreciate any hints on how to improve the implementation.

## Tests
Not yet.
 
# License

See LICENSE
