TODO:

UI:

- Create AuthButton (DONE)
- Add admin dashboard / create stadium form (DONE)
- Add UI for editing a Stadium in admin panel
- Add ability to search/filter Stadium in admin panel
- Add round length tabs before on homescreen e.g. 10 / 20 / 40 teams

- Add finished modal for when user has finished game (DONE):

  - if user is logged in, add button to take to full match summary (DONE)
  - if user is not logged it, add button to play again or return home (DONE)

- Add custom login page with multiple providers (DONE)

- Add Head for each page (DONE / PARTIAL: Try to load instantly)

- Add cookie policy (DONE)
- Update cookie policy to include Google provider

Backend:

- TRPC router for Stadium (used to create and delete Stadiums) (DONE)
- TRPC router for Match (used to create Matches when user completes game) (DONE)
- TRPC add edit endpoint for Stadium
- TRPC add abilty to take certain amount of Stadium

- NextAuth add more login providers

Game logic:

- When user skips, add skipped team to incorrectTeams (DONE)
- When user gets answer correct, add to correctTeams (DONE)
- Stop timer when it reaches zero (DONE)

Admin:

- Add more teams to DB
