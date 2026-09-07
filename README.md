# Everything GTA VI

A fan-made, source-conscious GTA VI knowledge hub built around confirmed Rockstar Games information.

## Status labels
- **Confirmed** — explicitly stated or named by Rockstar Games.
- **Seen in Official Media** — visibly present in official Rockstar footage/screenshots, but not necessarily fully detailed by Rockstar.
- **Not Announced** — no official details yet.

## Site sections
Home, Story, Characters, World & Map, Businesses, Vehicles, Music, Media, Gallery, Gameplay, Online, Editions, Confirmed Facts, and News.

## Newsletter and optional player details
The existing popup now accepts email signup requests, gamertag + platform, or both. Neither option is required to browse. Email is sent only with explicit email-update consent. Player details are saved privately for future friend requests; nothing is published to a player directory. A footer button reopens the form.

The submission service uses a Sites-hosted Worker and D1 database. Its source is saved in the separate GTA VI Community Submissions Sites source repository. The only public route is POST /submit; there is no public read endpoint. Server-side validation, a honeypot, payload limits, and daily request limits protect collection. Review saved records through the Site settings database viewer, table `submissions`.

Email requests have `newsletter = 1` and status `pending`. They are not automatically added to MailerLite and no emails are sent. Connect a mailing provider with unsubscribe support before starting newsletter delivery.

Deployment dependency: the collection service must allow public submissions before this website change goes live. Until then, keep this change as a draft. Test player-only, email-only, combined, invalid, rejected, and failed submissions before release.

## Disclaimer
Unofficial fan project. Grand Theft Auto, GTA VI, Rockstar Games, and related marks/assets belong to their respective owners. This project is not affiliated with or endorsed by Rockstar Games or Take-Two Interactive.
