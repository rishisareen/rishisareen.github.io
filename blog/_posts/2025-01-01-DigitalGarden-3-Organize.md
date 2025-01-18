---
layout: post
title: "Digital Garden #3 : Organize - Note Taking App"
date: 2025-01-07
categories: [Digital Garden]
tags: [digitalgarden, obsidian]
---
* Table of Contents
{:toc}

## Note Organization Strategy

Forte recommends the P.A.R.A. (Projects, Areas, Resources, Archives) approach, a set of four (yes!) folders to capture everything,

* **📂 Folder #1: Projects**  
  * These are active projects you’re working on. Projects have a fixed timeline, clear deadlines, and specific tasks you need to complete. Most people have five to fifteen projects going on at the same time. Projects can be anything from writing a book to developing an app or learning a new language.

* **📂 Folder #2: Areas**  
  * Areas are long-term responsibilities and future goals. They focus on specific domains in your life like health, finance, or self-development. Areas are umbrella categories and can spawn individual projects. For instance, the area of “health” can lead to projects like “lose 20 pounds” or “prepare for Ironman 2023.”

* **📂 Folder #3: Resources**  
  * Think of Resources as your Misc folder. If you come across something interesting that doesn’t have a clear connection to one of the active projects or areas, you dump it here. You can create Resources for hobbies and interests, life hacks, or any other topics you may want to reference at some point in the future.

* **📂 Folder #4: Archives**  
  * The Archives folder includes completed, canceled, or deferred projects. Any projects you’re not actively working on should end up in the Archives folder. The Archives are a valuable resource when starting new projects, so you should get into the habit of moving notes here rather than deleting them. 

  ![](https://i.imgur.com/UTYr214.png)
  

## Note Taking App 

- Obsidian will be prime app where all the notes will be stored. The structure will be CODE + PARA Method, as recommended by Tiago Forte.

  

## Why Obsidian

While there are multiple options in Note Taking Apps - Evernote, OneNote, Google Keep, Roam, Obsidian meet my criterias:
- Accessible on all the platforms. 
  - Obsidian has app for all the platforms - Windows, Mac, iPhone, iPad. 
  - Vault (base folder) can be created on iCloud Drive (my scenario) or Google Drive. That way notes are accessible everywhere. 
- Support for Markdown 
  - Markdown is my preferred format for two reason - it is text based open format. And it is also format for my blog (Jekyll)
  - Evernote and OneNote have their owned locked proprietary methods, which is a strict no for me. Apps comes and go, one should be able to move the notes across apps.
- No Lock In
  - As the notes are on my computer or cloud storage in markdown, there is no lock in
  - If Obsidian shut down tomorrow, my notes would still remain forever with me.
  
- Automation Capabilities
  - Obsidian support many plugins (topic of another post). With which, automation can be done. Some automations I've done:
    - One click for various note types - Daily Journal, Meeting Notes, Weekly Review
    - Creating Blog Post from Notes with one click
- Data Privacy
  - My files are in my drive and not synced with Obsidian servers. To me, this matters. And I will trust Apple more with my files than Obsidian. 
- Free
  - Base Obsidian is free. One can chose additional services - Obsidian Sync (if you're not using cloud to store your files) or Obsidian Publish. But for my use case, base version is good enough. You do not even need to sign in to Obsidian to start using it.



## Challenges with Obsidian
While Obsidian is meeting my use cases, it is not free from issues. Some of the challenges I've faced and how I've worked around it: 
* **Editor is not as good as Typora**
  * For many years, Typora has been my default markdown editor. It is very clean and minimal editor, meeting my requirements. 
  * **Workaround** : For longer typing sessions, I can still open the files in Typora (right click on Obsidian file -> open in default editor), using Obsidian more for the organization and Typora for editing. While not most convenient, it is a reasonable tradeoff for me.

* **iCloud kinks**
  * iCloud has an annoying habit of removing the unused files from the mapped drive. As Obsidian folder is on iCloud drive, it will sometime wait to load before all iCloud drives are downloaded. Internet forum are filled with this challenge. But now there are improvements on both Obsidian end and iCloud end.
    * Latest release of Obsidian doesn't wait for all files to be downloaded but loads quicker.
    * Latest version of iCloud gives an option to keep the file permanently downloaded on your local computer.
      * **Mac / iPhone** : Right-click the **Obsidian** folder in iCloud Drive and select **Keep Downloaded**.
      * **Windows** : Right-click the **Obsidian** folder in iCloud Drive and select **Always keep on this device**.




## Folder Structure

Following the PARA Approach, my folder structure in Obsidian is

~~~

0 Inbox
  ├── Quick Notes
  ├── Unsorted Ideas
  ├── Meeting Notes
  └── Temporary Tasks

1 Projects
  ├── [Active Project Name 1]
  │     ├── Notes
  │     └── Meeting Summaries
  ├── [Active Project Name 2]
  │     ├── Research
  │     └── Deliverables
  └── [Active Project Name 3]
        ├── Objectives
        └── Timeline

2 Areas
  ├── LifeMap
  │     ├── Daily Journal
  │     │     ├── 2025
  │     │     │     ├── 01 (January)
  │     │     │     ├── 02 (February)
  │     │     │     └── … (Other months)
  │     ├── Weekly Planning
  │     │     └── 2025 (Year-based subfolders if needed)
  │     └── Annual Planning
  │           ├── 2024
  │           │     ├── Annual Review
  │           │     ├── Key Goals
  │           │     └── Milestones
  │           └── 2025
  │                 ├── Annual Review
  │                 ├── Key Goals
  │                 └── Milestones
  ├── Health
  │     ├── Fitness Goals
  │     └── Meal Planning
  ├── Career
  │     ├── Projects
  │     └── Development Goals
  ├── Relationships
  │     ├── Family
  │     └── Friends
  ├── Finance
  │     ├── Budget
  │     └── Investments
  └── Travel
        ├── Destinations
        └── Packing Lists

3 Resources
  ├── Notes
  │     ├── Books
  │     ├── Articles
  │     └── Tutorials
  ├── Templates
  │     ├── Journals
  │     └── Meeting Notes
  └── Ideas
        ├── Writing Prompts
        └── Side Projects

4 Archives
  ├── Completed Projects
  │     └── [Project Name]
  │           ├── Final Report
  │           └── Retrospective
  └── Old Resources
        └── Obsolete Documents
~~~



## Templates

* I also use the template functionality in Obsidian  (Community Plugin - Templater) to auto-create a note based on the defined template. 
* For eg, every morning I right click on "Daily Journal" folder and select "New Note". The rule is created that for Daily Journal, default template is "Daily Journal Template"

![](https://i.imgur.com/LHMjwR9.png)

**Few Templates I use** 

### Daily Journal Template

```
### 🗓️ 2024-12-28 06:41 pm - Daily Journal

### 🌟 Morning Section

**Thoughts in my mind**
* 

**🌞 Gratitude**
1. I am grateful for...
2. I am grateful for...
3. I am grateful for...


🎯 **Intentions for Today**
- **Main Focus:** 
- Secondary Goals:
  - [ ] Task 1
  - [ ] Task 2
  - [ ] Task 3

🌈 Affirmation
- *Write an empowering affirmation for the day.*


📌 Midday Check-In
- How am I feeling right now?  
- Am I on track with my goals?  
- Adjustments needed for the rest of the day:

---

##+ 🌙 Evening Section

🎉 Wins & Highlights

- What went well today?
  - Highlight 1:
  - Highlight 2:

 🕵️‍♂️ Reflections

- How could I improve tomorrow?
- Did I stay true to my intentions?
```

### Weekly Plan Template
```
## 🗓️  Weekly Plan (W52)
Date: 2024-12-28 Saturday (06:41 pm)

## STEP ONE : HOUSEKEEPING / CATCHING UP

**Cleaning up**

- [ ] Clean Wallet
- [ ] Clean Desk

**Get Current - Clean Digital Workspace**

- [ ] Review Calendar
  - Scan the calendar two weeks into the past to look for any items that need follow up actions.
  - Look ahead 2 weeks and see what needs to be planned for
  - If an action is discovered, add it to task manager

- [ ] Review Email
  - Scan email. Decide next action. Put in todo manager. Archive the email. 
  - If action is "reading the email", forward it to Omnivore (or whichever read-it-later app I am using)

- [ ] Review Desktop and Download folder. Goal is to clear it. If any action, put it on Todo

- [ ] Review Notes App
  - Open App and clear inbox. If any Project is done, move it to Archive
  - Add any action item to the task manager

- [ ] Prioritize Work in Todo App
  - [ ] Upcoming Task : Check if Credit card bill to be paid, schedule it.
  - [ ] Upcoming Task : Check if any birthday coming, add to reminder
  - [ ] Scan whatsapp and pending phone call. Schedule in Todo App



**Time: 5-10 min.**

## STEP TWO : CONNECT AND VISUALIZE THE BIG PICTURE

*“The future you see is the future you get.” – Robert G. Allen*

• Take a few minutes to connect to the deeper WHY behind what you are doing each day.
• Write down 3-5 things you appreciate about your current work.
• If there is something that is not in alignment, write down what you would like to see in the future. It's helpful to think about what you DO want versus what you DON'T, and do so with space for opportunities. i.e. I would like to work from home. I want to do something that allows me to be outdoors. Our current frame of reference sometimes only sees a limited amount of opportunities so don't let the 'what' or 'how' stop you. Simply state what you do want.
- Check Annual and Quarterly plan. 

**Time: 2-5 min.**

- [ ] Big Picture Visualization done

## STEP THREE : CELEBRATE LAST WEEK

*“The more you praise and celebrate your life, the more there is in life to celebrate.” ~ Oprah Winfrey*

Write down everything from the past week that you’re proud of. List at least 10 things, and many more if you want. Big or small, anything goes.

**Time: 5-10 min.**
**Good from last week:**

- [wellness]
- [learning]
- ...

## STEP FOUR: ANALYZE WHAT DIDN’T HAPPEN

*“In the end we only regret the chances we didn’t take.” – Lewis Carroll*

• Be honest with yourself
• List the big things that didn’t happen

• Notice why and measure and adjust to see what you can improve for next time.

**Time: 2-5 min.**

**What didn’t Happen: **

* 

## STEP FIVE : CLARIFY AND COMMIT TO YOUR BIGGEST OUTCOMES

*“Focus is the key to the world.” ~ William Dinsmore III*

• Decide on a minimum of 3, maximum of 6-7 outcomes you want to accomplish related to the various areas in your life.
* You want to end each week feeling successful rather than a failure, so pick only a few things that you know you can and will get done… wait for it… that will actually move the needle forward on your area of focus.*
• This could be creating a personal budget, cooking a healthy meal or having a great meeting with a mentor. You get to decide. Just be sure they get you closer to your yearly goals. That’s the key. So “checking Facebook” would not count.
• Keep in mind that the majority of your time should be spent on activities that are in line with your values and that you feel inspired by! If you are enjoying it, and it gets you closer to your goals, it’s a win-win!

**Time: 5-10 min.**

**Top Outcomes:**

- [wellness]

## STEP SIX : SCHEDULE EVERYTHING

*“If you talk about it, it’s a dream, if you envision it, it’s possible, but if you schedule it, it’s real.”  ? Anthony Robbins*

Every task takes time and therefore needs a place on your calendar.

• Look at your 6-7 weekly outcomes and decide what core tasks will need to happen to accomplish these.
• Now spread these out throughout the week.
*Most people can’t accomplish more than 1-3 meaningful things in a day, so that’s your limit.** *

• Pick 1-3 “most important tasks” (MIT’s) related to your outcomes, and schedule them throughout the week:

**Time: 5-15 min.**



## Note to Self : IMPORTANT THINGS TO KEEP IN MIND

1.    **Everything takes longer than we think.**  If you think it’s going   to take an hour to write an article, then schedule an hour and a half. Your worst case scenario is ending up having free time.
2.    **Leave windows of “buffer time”.**  Do not fill in every second of every day. Unexpected things will always come up. Don’t let them snowplough your week. Give yourself time to take care of last-minute stuff that matters, and to be spontaneous with things.
3.    **Know you won’t get it all done.**  Even with great planning, it seems like we tend to be over ambitious. Be okay with leaving something for next week. It gives you something to look forward to anyway.
4.    **Schedule the most important things early in the day and early in the week. **Given the above, front-weight your most important tasks so that no matter what comes up, at least a few of them will get done.

![](_resources/4420542f06fedc6d53f92ee5387dbbed.jpg)





### Updates to Weekly Plan template

* Dec-2024 : Added in section 1 https://twitter.com/dltnio/status/1290026877487181824 / https://fortelabs.com/blog/the-one-touch-guide-to-doing-a-weekly-review/
```

### Book Review Template

~~~
---
layout: post
title: "Book Review: [Book Title]"
date: <% tp.date.now("YYYY-MM-DD") %>
categories: [Book Reviews]
tags: [Books, Reviews, Genre] # Replace 'Genre' with appropriate tags like Fiction, Non-Fiction, etc.

---

# Book Review: *[Book Title]*

<div style="display: flex; align-items: flex-start; gap: 20px;">
  <div style="flex: 0 0 auto; width: 100px; height: auto;">
    <img src="path-to-book-cover.jpg" alt="[Book Title] Cover" style="width: 100px; height: auto; border: 1px solid #ddd; box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);">
  </div>
  <div style="flex: 1;">
    <ul>
      <li><strong>Date Read:</strong> <% tp.date.now("YYYY-MM-DD") %> </li>
      <li><strong>Rating:</strong> 7/10</li>
    </ul>
  </div>
</div>

## Summary
*[Provide a brief summary of the book without spoilers. Mention the central theme or plot points to give readers a sense of what the book is about.]*

## My Notes
- *[Highlight the main themes, messages, or lessons you took away from the book.]*

## Favorite Quotes
> "[Insert a favorite quote from the book here.]"
> "[Insert another quote if applicable.]"

## Links
- [Purchase the Book](link-to-buy)
- [Author's Website](link-to-author-website)
~~~



### Pending Templates

- People Notes
- Food Recipe
- Blog Posts

