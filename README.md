## Attention!

Notarealdb folder contains custom fixes to notarealdb module. Issue to it's owner will come up soon... 
Explanation why is it so is below the guidline.

## Description

With this application you can:
* Use a guest account to:
    * Search pictures
    * Like pictures
    * To see the browsing history
    * To login with username
    * To signup with username
* Use a user's account to:
    * Search pictures
    * Like pictures
    * To see the browsing history
    * To logout

Features:
* Likes save their state on different user accounts
* All photos from queries are written to the history to avoid a query duplication
* History saves personal history of every user, but if user makes a query, the system will look through all history to make sure this query hasn't been done before.

[Unsplash](https://unsplash.com/) Api application. Backend part.

## Installation

```bash
$ npm i
```

## Set up
1. Copy environment variables and fill in a .env file

```bash
$ cp .env.example .env
```

2. Switch notarealdb

2. 1. Go to node_modules/notarealdb
2. 2. Move ./notarealdb with replacement to the node_modules/notarealdb to apply custom fix

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Explanation

In the original version there is no load() method used to update state of the "db". 
Due to this fact, there is a possibility to have in RAM two different states.
So that leads to the situation, when, for example:
We have states A and B.
We add a search request to history of instance A.
And It won't appear in history of instance B, due two the fact, that changes are
stored in the file, but instance B won't check it.

My custom fix solves this trouble.
If you would like, you could delete my custom fix, to install a Notarealdb module and to see how is it going. 