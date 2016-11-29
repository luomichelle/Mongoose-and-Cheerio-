All the News That's Fit to Scrape

Overview

A web app that lets users leave comments on the latest news. But you're not going to actually write any articles; instead, you'll flex your Mongoose and Cheerio muscles to scrape news from another site.

Create an app that follows this user story:

Whenever a user visits your site, the app will scrape stories from a news outlet of your choice. The data should at least include a link to the story and a headline, but feel free to add more content to your database (photos, bylines, and so on).

Use Cheerio to grab the site content and Mongoose to save it to your MongoDB database.
All users can leave comments on the stories you collect. They should also be allowed to delete whatever comments they want removed. All stored comments should be visible to every user.

You'll need to use Mongoose's model system to associate comments with particular articles.


Tips:

Whenever you scrape a site for stories, make sure an article isn't already represented in your database before saving it; we don't want duplicates.

Don't just clear out your database and populate it with scraped articles whenever a user accesses your site.

If your app deletes stories every time someone visits, your users won't be able to see any comments except the ones that they post.
Helpful Links

MongoDB Documentation
Mongoose Documentation
Cheerio Documentation
One Last Thing


Create a Heroku app in your project directory.
Run this command in your Terminal/Bash window:
heroku addons:create mongolab
This command will add the free mLab provision to your project.
You'll need to find the URI string that connects Mongoose to mLab. Run this command to grab that string:
heroku config | grep MONGODB_URI
Notice the value that appears after MONGODB_URI =>. This is your URI string. Copy it to a document for safekeeping.
When you’re ready to connect Mongoose with your remote database, simply paste the URI string as the lone argument of your mongoose.connect() function. That’s it!
Watch this demo of a possible submission.
