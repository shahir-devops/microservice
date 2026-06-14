# TODO

## Phase 1 — Planning & Understanding (done)
- [x] Inspected existing frontend pages (EditProfile/Cart/Orders/Notifications/HelpCenter/Reviews) — currently scaffold JSON dumps.
- [x] Inspected backend microservices — currently mostly stubs returning mock data.
- [x] Inspected DB baseline schema — needs extensions for profile (phone/image), richer cart/order items, address fields, order-linked reviews, notification metadata.

## Phase 2 — Implement “Excellent UI” + Profile improvements (approved)
- [x] Update DB schema: add `username`, `phone_number`, `image_url` to `profiles`.
- [x] Update seed data for `profiles`.
- [x] Update profile service: implement profile GET/UPDATE/DELETE endpoints backed by MySQL.
- [x] Update frontend API client for profile update/delete.
- [x] Update EditProfile UI: attractive form for username/details (username, display name, phone, image) + update/delete.
- [x] Update Profile UI: attractive display of user details.

## Phase 3 — Cart + Orders + Notifications (in progress)
- [x] (DB) Add order_items + richer cart/order linking.

- [ ] Implement cart service endpoints: GET cart, upsert items, remove/update qty.
- [ ] Implement “Buy Now”: create order + order_items + notification entry (full cart = b).
- [ ] Update Orders UI: list previous orders with items.
- [ ] Update Notifications UI: show new offers.

## Phase 4 — Address, HelpCenter, Reviews (in progress)
- [x] (DB) Extend addresses fields (street/pincode/landmark/location) + reviews linkage.
- [x] Implement address service endpoints.
- [x] HelpCenter UI: add contact form + backend storage.
- [x] Reviews UI: show order-related reviews.
- [ ] Implement reviews endpoints and DB relations.


