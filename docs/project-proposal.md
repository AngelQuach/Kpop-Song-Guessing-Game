# Project Proposal: KPOP Song Guessing Game

## Overview
This project aims to create a web application where K-pop lovers can guess songs based on audio clips.

## Scope & Plan
### MVP
- Play song clips and let users guess.
- Clip length varies with difficulty level (easy - 5 sec, medium - 3 sec, hard - 2 sec, extreme - 1 sec).
- Users enter their guesses for the Song Name & Singer.
- Implement a basic scoring system:
    - Each game has 10 songs for guessing; each correct song name/singer is 5 pts, totaling 100 pts.
    - Users get three hints for each singer:
          - Number of members (-1pt)
          - Debut year (-1.5pt)
          - Most famous song (-2pt)
    - If the user guesses right after all hints are given, they can get 0.5pt.
    - Users have three chances to guess each song's name/singer.
    - No pt deducted for wrong guesses.
    - Bonus pts for correct guesses in one shot.
    - Implement a record system: TBD
          - Score record board and Time record board etc.

### Current Scope
- Singers: 4th Generation Girl Groups/Female Soloists.
- Language: English.

## User Flow
### Without Logging In
- Users can view the front page.
- Cannot participate in quizzes or create new ones.
- Limited Access: only able to see the first few trending quizzes.
- Access to **About Page** and **Connect Page**.

### After Logging In / Registering
- Full access to quiz attempts and quiz creation.
- Earn pts based on quiz performance.
- Successful guesses reveal 5-second video clips of the relevant section.
- Competitive ranking system:
    - Monthly leaderboard for top performers.
    - Earn titles, decorations, and additional pts.

### Redemption System
- Users can redeem earned pts for:
    - Decorations
    - Titles
    - Rename options
 
## Technology Stack
- **UI Design:** Figma
- **Frontend:** React + Tailwind CSS
- **Backend:** NextJS
- **Database:** Firebase
- **APIs:** YouTube API (for embedding relevant content)

## Development Tools
- **Version Control:** Git repository on GitHub.
- **Development Environment:** IDE setup with TypeScript, NextJS, and Tailwind.

## Next Steps
- Define quiz creation flow.
- Implement an authentication & authorization system.
- Build leaderboard mechanics.
- Integrate YouTube API for video clips.
