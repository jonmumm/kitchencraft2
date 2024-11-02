# Application Routes

This document outlines the routes for our application based on the current database schema.

## Threads

- `GET /threads` - List all threads
- `POST /threads` - Create a new thread
- `GET /threads/:id` - Get a specific thread
- `DELETE /threads/:id` - Delete a thread

## Messages

- `GET /threads/:threadId/messages` - List all messages in a thread
- `POST /threads/:threadId/messages` - Create a new message in a thread
- `GET /messages/:id` - Get a specific message
- `DELETE /messages/:id` - Delete a message

## Recipes

- `GET /recipes` - List all recipes
- `POST /recipes` - Create a new recipe
- `GET /recipes/:id` - Get a specific recipe
- `PUT /recipes/:id` - Update a recipe (create a new version)
- `DELETE /recipes/:id` - Delete a recipe
- `GET /recipes/:id/versions` - List all versions of a recipe
- `GET /recipes/:id/versions/:versionNumber` - Get a specific version of a recipe

## Media

- `GET /media` - List all media
- `POST /media` - Upload a new media file
- `GET /media/:id` - Get a specific media file
- `DELETE /media/:id` - Delete a media file

## Intents

- `POST /threads/:threadId/messages/suggest-ideas`
- `POST /threads/:threadId/messages/adjust-recipe`
- `POST /threads/:threadId/messages/ask-recipe-question`
- `POST /threads/:threadId/messages/process-receipt`

## Search and Filtering

- `GET /recipes/search` - Search recipes (by name, tags, etc.)
- `GET /threads/search` - Search threads (by content, date, etc.)

## Analytics

- `GET /analytics/popular-recipes`
- `GET /analytics/user-activity`

Note: Implement proper authentication and authorization for these routes, especially for operations that modify data. Consider implementing pagination for list endpoints to handle large amounts of data efficiently.