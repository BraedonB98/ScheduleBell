ScheduleBell
This project is designed to allow for easier scheduling of employees for companies without the resources or determination to invest in larger scheduling systems. This software is also designed to allow for employees to work at multiple locations across the organization. The other main object of this project is to make it as easy as possible for managers to accommodate employees personal schedules by allowing them to set their availability in the app and requires and override from the manager to schedule them outside of those times, to hopefully allow employees to increase their work life balance.

-Eventually I would like to allow for a user to work at multiple organizations to help with scheduling employees that have multiples jobs, making it easier for the user to have their schedule coordinated between jobs

Design Decisions to note

- BACKEND
  -Permissions checking:
  for authorization checks for things like creating newUser I could have used a middleware function and included it above the routes that require a higher level of authorization, However due to the amount of different checks ran on each request, I felt like it was better to have a helper function, this prevents having to access database to get user, location, organization, and extra information depending on request before continuing to function. also allows for more specific tailoring to each type of request so you don't check schedules if you're not adding a schedule

  Logo Color Hex #24478f
