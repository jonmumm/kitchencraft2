# Core Thread Routes
/t/{threadId}                    # View a thread
/t/{threadId}/m/{messageId}      # Focus on specific message in thread
/t/{threadId}/m/{messageId}/new  # Create new thread branching from this message

# Example URL Patterns
/t/abc123                        # Original thread about pasta recipe
/t/abc123/m/msg456              # Focused on message about sauce variations
/t/abc123/m/msg456/new          # Create new thread branching from sauce discussion
/t/def789                       # New thread that branched from sauce discussion

# Recipe-Centric Views
/r/{recipeId}                   # View recipe
/r/{recipeId}/threads           # View all threads discussing this recipe
/r/{recipeId}/versions         # View recipe version history

# User-Centric Views
/u/{userId}/threads             # User's participated threads
/u/{userId}/recipes            # User's created/saved recipes
/u/{userId}/branches           # User's branched conversations

# Search/Discovery
/search/threads                # Search all threads
/search/recipes               # Search all recipes
/trending                     # Trending discussions/recipes

# Example User Journey URLs:
1. /t/abc123                   # User starts in pasta discussion
2. /t/abc123/m/msg456         # Finds interesting sauce variation
3. /t/abc123/m/msg456/new     # Creates new thread about sauce
4. /t/def789                  # New thread focused on sauce techniques
5. /t/def789/m/msg123/new     # Branches again for specific ingredient