# Project Proposal: User Creation Flow

## Overview
This file contains descriptions of the expected user creation flow, along with Figma design screens for clarity.

## 1. User Sign-In Flow
1. User is asked to enter Email/Username and Password.
2. Search for the entered combination in the DB.
  a. If found -> next step.
  b. If not found -> error is displayed.
3. User is successfully logged in.

**Notes: **Options to reset the password and register a new account are available on the Sign-In page.

## 2. Reset Password Flow
1. User is asked to enter the email registered with their account.
2. A verification code is sent to the entered email.
3. User is asked to enter the verification code.
  a. If match -> next step.
  b. If mismatch -> User can resend the verification code (new) to the same email.
  c. If not received -> User can resend the verification code (new) to the same email.
  d. If the email address is mistyped -> User can go back to the last step and re-enter the email.
5. User is asked to enter and confirm the new password (enter the new password twice).
  a. The new password must be at least 8 characters long and contain at least one letter and one number.
  b. The two passwords must match exactly.
  c. If any of the above is not satisfied, an error is displayed on the page.
6. The password is successfully updated.

## 3. User Sign-up Flow
### 3.1 Sign-up
1. User is asked to enter their email and desired password (twice for confirmation).
  a. If an account is already associated with the entered email, a note will be displayed with the link to log in.
  b. Password follows the same logic as in section 2.5.
2. User is asked to verify they are not a robot.
3. A verification code is sent to the entered email.
  a. Verification code follows the same logic as in section 2.3.
4. The new account is successfully created.

### (Opt.) 3.2 User Customization
The user can customize their account right after sign-up or postpone customization until desired. User is also free to terminate the customization process at any time, but the changes they made will not be saved.
1. User is asked to enter a username.
  a. If the entered username already exists -> an error is displayed.
2. User is asked to choose the girl groups that they like (as many as they want).
  a. User can skip this step -> Go to step 5.
3. User is asked to choose **one** bias from all the girl groups selected.
  a. User can skip this step -> Go to step 5.
4. A confirmation dialog is displayed with the selected bias (default headshot) and the entered username.
5. User arrives at the app front page.
