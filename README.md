# GamifyLife
Gamify Life is an innovative productivity application that transforms your daily activities into an engaging adventure. Create and manage tasks in a fun and motivating way, increasing your stats and reaching new levels of productivity.

## Table of contents
<li> Features </li>
<li> User Stories + Backlog Creation </li>
<li> Diagrams </li>
<li> Source Control </li>
<li> Bug Reporting and Resolution </li>
<li> Refactoring and Code Standards </li>
<li> Code Comments </li>
<li> Design Patterns </li>
<li> AI Tools </li>

## Features 
1. Task Creation and Completion:
   - Normal Tasks: One-time tasks that need to be completed once.
   - Recurring Tasks: Tasks that repeat over a limited period, perfect for daily or weekly activities.
   - Habits: Tasks that repeat indefinitely, helping to build long-term positive habits. <br/>
   ![image](https://github.com/SoftNestSol/GamifyLife/assets/115917247/1d3ce04e-4ad5-4652-b7e8-8cf8927e7bc4)
   ![image](https://github.com/SoftNestSol/GamifyLife/assets/115917247/cabfd2f4-67f4-4c4a-9913-09c0bd588927)



2. Journey Path: A visual map where you can track your productivity journey, including tasks completed on past days. <br/>
   ![image](https://github.com/SoftNestSol/GamifyLife/assets/115917247/cea1aafa-4cba-47e3-a01e-b7d4fbc07ef3)
   ![image](https://github.com/SoftNestSol/GamifyLife/assets/115917247/6372e822-fe95-434c-a7a9-bd895a113b7d)



4. Task Suggestions: Receive task suggestions from the app, which you can accept or decline based on your preferences. <br/>
   ![image](https://github.com/SoftNestSol/GamifyLife/assets/115917247/7e067f35-9836-4a42-a045-0b979622d8ec)

6. Gamification: Each completed task helps you increase stats such as fitness, intelligence, and skills, turning productivity into an engaging game. <br/>
   ![image](https://github.com/SoftNestSol/GamifyLife/assets/115917247/954fa2e6-95bc-4896-971d-dad053261ff4)

## User stories + backlog creation
   ![image](https://github.com/SoftNestSol/GamifyLife/assets/115917247/2f5e2576-e4a3-4ce1-ad2d-fef6242e5c77)
   ![image](https://github.com/SoftNestSol/GamifyLife/assets/115917247/d2033c71-2c18-4468-bf3f-0524247315ce)

## Diagrams
![image](https://github.com/SoftNestSol/GamifyLife/assets/115917247/74a8c240-3e70-4619-a06d-5f4fc57b8735)

## Source Control
In our project, we utilized Git for source control to efficiently manage and coordinate our development efforts. We structured our work across three different branches: main, front-end, and back-end.Each new feature or bug fix was developed in its own dedicated branch, branching off from either front-end or back-end.
This practice ensured isolated development environments, reducing the risk of conflicts and enabling focused development. We also regularly merged changes from front-end and back-end into main to keep the main branch up to date with the latest stable code. Utilized pull requests for code reviews, ensuring that all changes were reviewed and approved before being merged into the main branch.Pull requests allowed for discussion, feedback, and improvements, enhancing code quality and collaboration.Throughout the project, we made a total of 133 commits.The commit messages were clear and descriptive, providing a detailed history of the development process and changes made.
![image](https://github.com/SoftNestSol/GamifyLife/assets/115917247/88577357-004a-4979-83d4-510d6fa056e8)
![image](https://github.com/SoftNestSol/GamifyLife/assets/115917247/17113e92-bcc7-4904-8973-66961df060c1)
![image](https://github.com/SoftNestSol/GamifyLife/assets/115917247/67528e89-5a4a-4751-86f6-f9773f4ccf1a)

## Bug Reporting and Resolution
### Calendar Slider Bug
![image](https://github.com/SoftNestSol/GamifyLife/assets/66740435/f96e66dc-9d85-4b08-8e22-5d3dc96af624)
#### Steps to Reproduce
1. Open the app and log in.
2. On the Home screen, there is a Calendar Slider component. You can slide it back and forth and pick a day.
* **BUG:** For quite some time, if you slided too quickly one way or another, it would somehow "gather up speed" and not stop at the week you intended. Instead it would go over one or two weeks more.
##### Commit that fixed the bug: https://github.com/SoftNestSol/GamifyLife/commit/b9b65dd98931a806cd0f28092a74c90b49adf825

### Task Creation Android Bug
![image](https://github.com/SoftNestSol/GamifyLife/assets/66740435/bbecfed8-8a26-43d0-ba61-705cad99a495)
#### Steps to Reproduce
1. Open the app and log in.
2. On the middle of the navbar at the bottom of the screen is the task creation button.
3. When pressed, it takes you to an intermediary screen which presents you with three options: create one of the three types of tasks available. 
* **BUG:** Only on Android devices, the last two buttons were not visible. You could press on the space where they were supposed to be and they would redirect you to the right creation screen, but they didn't appear.
##### Commit that fixed the bug: https://github.com/SoftNestSol/GamifyLife/commit/639e6722af70dc791e92d44b3048c4a89ad64823

### Task Creation Shrinking Bug
![image](https://github.com/SoftNestSol/GamifyLife/assets/66740435/d5c9ef79-d950-4cea-bce1-d1f23b1ac46c)
#### Steps to Reproduce
1. Open the app and log in.
2. Press the middle button on the navbar, which leads to the creation menu.
3. Choose any of the three kinds of tasks available for creation. You would be redirected to a task creation screen full of inputs.
* **BUG:** Only on Android devices, when pressing on an input to complete it, as the keyboard would come up and cover half of the screen, the whole task creation card would shrink trying to fit in the remaining space. You couldn't see what you typed anymore and it would be quite difficult to press on any other input.
##### Commit that fixed the bug: https://github.com/SoftNestSol/GamifyLife/commit/639e6722af70dc791e92d44b3048c4a89ad64823

## Refactoring and Code Standards

## Code Comments
* We tried to keep our code nice and tidy and wrote comments especially on the parts where:
  - the logic got a bit hard to follow for anyone but the one who wrote it
  - more people worked on the same fragments of code
  - we used some unfamiliar concepts / new components
<br/>
https://github.com/SoftNestSol/GamifyLife/assets/66740435/fa186544-4df6-4e42-8e1e-189b2103de8e
!(https://github.com/SoftNestSol/GamifyLife/assets/66740435/a5208ffa-e45a-417e-9de7-04d230b4afb8)
!(https://github.com/SoftNestSol/GamifyLife/assets/66740435/547bfd20-a91f-4008-9327-baa1bc8fad1f)

## Design Patterns
The design patterns we used are : RESTApi,MVC,RepositoryPattern,Middleware Pattern,Front Controller Pattern

## AI Tools


