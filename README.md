Micro frontend is like breaking a big web app into smaller pieces. Each small part (called a micro frontend) can be built and deployed separately.
In our case:
The Main App is like the main container.
The Music Library is a separate app that the main app loads when needed.

We used Module Federation from Webpack, but here via Vite plugin to connect them. So the main app pulls the music library from a URL dynamically at runtime.

In this project, we don't use any real login system. We just made a simple mock setup:
There are two buttons: Login as Admin and Login as User.
If it's admin we show extra features like Add Song, Delete Song.
If it's user can only view and group the songs.
So basically, the UI changes depending on the role, even though there's no backend 

To run both:
Open both folders separately in terminal and run:
npm install
npm run dev
Make sure both are running on different ports and then open main-app in browser

I used Vercel to deploy both apps.
Pushed code to GitHub.
Logged into Vercel with GitHub.
Imported both repositories seperetly
Added remote url in main-app
Now main-app loads music-library dynamically using module federation.
