# node-react-twitter-fetch
A server and client application allowing the searching and storing of twitter status updates.

Main tech used includes: NPM, React.js, Node.js, Express, Firebase

Check it out here: https://twitter-lookup.firebaseapp.com/

# Installation
Open two windows or tabs in your console and navigate to the root and the client directories. Run 'npm install' in both. When that's done, run 'npm start' in both windows starting with the root directory. Once you run 'npm start' from the second "client" directory, it's scripts will detect the server running at localhost:3000 and will ask if you want to use a different port. Please do that.

From here you navigate to localhost:3000 and login with your google account. Once done you'll be able to make simple searches for status updates. Each resulting set of tweets will be stored in a seperate visual element with which you can both update with recent results and delete. All of these searches and results are tied to your google account.


# Considerations / yammering into the void
Cacheing results app-wide was abandoned after considering how futile a task cacheing search results where content is being added thousands of times every second. Though in retrospect, it seems as though it might make sense to update this functionality in a future iteration in case the Twitter API's rate limit gets exceeded. 