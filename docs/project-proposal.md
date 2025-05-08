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


## Platform Features
### Redemption System
#### Overview
The **Redemption System** allows users to exchange earned points for various customization and recognition rewards. 

This system enhances engagement by giving players incentives to participate in quizzes, compete, and maintain their standing on the leaderboard.

#### Point-Based Rewards
- **Decorations:**
    - Users can unlock custom profile decorations, such as badges, borders, and themed backgrounds.
    - Seasonal and limited-time decoration sets may be introduced based on events.
- **Titles & Achievements:**
    - Players earn titles based on quiz performance, leaderboard status, and special accomplishments.
    - Titles can be displayed alongside usernames in profiles, leaderboards, and game sessions.
- **Rename Options:**
    - Limited-edition name styling (such as animated effects or color gradients) may be available through high-tier rewards.

#### Progression System
- **Tiered Rewards System:**
    - Rewards are categorized into standard, rare, and legendary tiers based on difficulty and accumulated points.
- **Milestone Bonuses:**
    - Players who reach certain point thresholds unlock milestone rewards, encouraging continued engagement.
- **Limited-Time Redemption Events:**
    - Special redemption items may be available for a limited time, creating excitement and exclusivity.

---

### Creative Workshop System
#### Overview
The **Creative Workshop** system enables users to explore, interact with, and engage with quizzes created by others. 

It fosters a collaborative and innovative environment where creators can showcase their work while players can discover new challenges.

#### Features
- **Quiz Gallery & Search Filters:**
  Users can browse quizzes through categories such as *trending*, *most played*, *newly created*, or *recommended based on play history*.
- **Quiz Publishing:**
  Users can publish the quizzes they create, making them available to others.
- **Bookmarking & Saving for Later:**
  Users can save quizzes they want to revisit.
- **Featured & Creator Spotlights:**
  Outstanding quizzes and top creators can be showcased to boost visibility and engagement.

---

### User Networking System
#### Overview
The **User Networking System** enhances social engagement by allowing users to customize their profiles, connect with others, and invite new users to join the platform.

#### Features
- **User Profiles & Customization:**
  Users can personalize their profiles with display names, profile pictures, bio descriptions, and optionally show their most recent quiz participation.
- **Follow & Social Interaction:**
  Users can follow other creators and receive updates on new quizzes or leaderboard achievements.
- **Direct Invitations & Group Formation:**
  Users can invite others to join the platform, fostering organic growth.
- **Achievement Badges & Social Recognition:**
  Players can earn badges based on quiz participation, rankings, and creative contributions.


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


## Quiz Creation Flow

### Overview
This flow outlines the quiz creation process for this song-guessing game, where users craft quizzes by either letting players guess a song and singer from a music clip or by interpreting lyrics. 

The process is designed as a user-friendly, multi-step wizard that includes autosave and intuitive feedback, ensuring creators can seamlessly build engaging quizzes.

### Step 1: Accessing the Creation Tool
- **Entry Point:**
  Registered users can start quiz creation by clicking a prominently placed button (positioned on the side panel or another accessible area).
- **Pre-condition:**
  Ensure that the creation button is visible only to logged-in users.

### Step 2: Selecting Play Mode & Difficulty Level
- **Play Modes:**
    - **Music Clip Mode:** Players listen to a clip and guess the singer and song.
    - **Lyrics Mode:** Players read a lyric line (with optional visual snippet selection) and guess the song.
- **Difficulty Levels:**
  Users choose from:
    - **Easy:** 5-7 questions.
    - **Medium:** 8-10 questions.
    - **Hard:** 11-15 questions.
    - **Underworld:** 16+ questions *(consider imposing a maximum question count for balance)*.
- **UI Guidance:**
  A progress bar or step indicator displays the current stage and the required number of questions for the selected level.

### Step 3: Input Options for Questions
When adding questions, users are presented with a modal window offering three input methods:
- **File Upload:**
  Upload a Word or PDF document containing questions and potentially embedded video links.
- **Paste from Clipboard:**
  Paste questions and links directly into a text field.
- **Manual Entry:**
  Manually add questions with dynamic prompts to search for songs and videos.

**Pre-condition:**
  The system maintains a database of available songs, videos, and lyrics for smart suggestions.

### Step 4: Selecting Media and Clipping Options
For each manual question entry:
- **Song & Video Selection:**
    - When a song is selected, if its snippet isn't automatically defined, the interface will display scrollable lyrics.
    - **Intelligent Suggestion:**
      The system may suggest clipping points based on the song structure, with markers to indicate ideal snippet lengths.

**Pre-condition:**
- The database must store a comprehensive list of songs and associated videos.
- The lyrics for each song are stored for selection, and their lengths are tracked to clipping recommendations.

### Step 5: Customizing Questions and Hints
- **Review Mode:**
  After inputting a question, users can preview how the question appears to players. This includes:
    - Display of the selected clip or lyric snippet.
    - An option to fine-tune the hint details (e.g. additional textual hints or visual cues).
    - A preview of the video clip that will play when a correct guess is made.
- **Navitation:**
  Users can reorder questions or duplicate existing ones for efficiency.
- **Dynamic Autosave:**
  User progress is autosaved throughout the process to prevent data loss.

### Step 6: Completing the Quiz
- **Finalizing Questions:**
  Once the minimum number of questions is met, the system notifies the user with an option to add more questions or to finish.
- **Quiz Metadata:**
  Users are then prompted to:
    - Give the quiz a title.
    - Write a brief description.
    - Set the quiz's access level.
    
    **Access Control Options:**
    - **Public:** Any registered user can access and participate.
    - **Private-anyone:** Anyone with the link can join and pick a temporary name (up to 6 participants).
    - **Private-register:** Link recipients must log in to participate.

**Pre-condition:**
- Ensure access control logic is implemented and tested.
- A workshop where users can share their quizzes is implemented and tested.

### Finalization
Once all steps are complete and the user reviews the final configuration, they can publish the quiz for the selected access level. 

The system then makes the quiz available based on the chosen public or private setting.

 
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
- (DONE) Define quiz creation flow.
- Implement an authentication & authorization system.
- Build leaderboard mechanics.
- Integrate YouTube API for video clips.


## Additional Enhancement
**Quiz Creation Flow:**
- **Step-by-Step Wizard:**  
  A multi-step wizard guides the user, with each stage clearly indicated by a progress bar.
- **Real-Time Feedback:**  
  Dynamic messaging informs creators if their input meets criteria (e.g., acceptable question numbers, proper media clipping).
- **Autosave & Drafting:**  
  The quiz creation process automatically saves drafts, letting users pause and resume seamlessly.
- **Preview Mode:**  
  Before publishing, provide a “preview” mode that allows creators to experience the quiz as a player would.  
- **Error Handling:**  
  Clear error messages and prompts are displayed when required inputs or conditions are missing.
