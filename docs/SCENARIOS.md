## Scenario 1: New Message in Existing Thread

1. Client -> User Actor: 
   - Event: NEW_MESSAGE
   - Data: {text, messageId, threadId}

2. User Actor -> Thread Actor:
   - Event: NEW_MESSAGE
   - Data: {content, sender}

3. Thread Actor -> User Actor(s):
   - Event: MESSAGE_RECEIVED
   - Data: {messageId, threadId, content, sender}
   
4. Thread Actor -> ThreadIndex Actor:
   - Event: MESSAGE_ADDED
   - Data: {messageId, threadId, content}

## Scenario 2: Creating New Thread

1. Client -> User Actor:
   - Event: CREATE_THREAD

2. User Actor -> Thread Actor:
   - Creates new Thread Actor instance
   - Event: INITIALIZE_THREAD

3. Thread Actor -> User Actor:
   - Event: THREAD_CREATED
   - Data: {threadId}

4. Thread Actor -> ThreadIndex Actor:
   - Event: THREAD_CREATED
   - Data: {threadId, creator}

## Scenario 3: Forking Thread from Message

1. Client -> User Actor:
   - Event: CREATE_THREAD
   - Data: {parentMessageId, parentThreadId}

2. User Actor -> Thread Actor (parent):
   - Event: FORK_THREAD
   - Data: {messageId, sender}

3. User Actor -> Thread Actor (new):
   - Creates new Thread Actor instance
   - Event: INITIALIZE_THREAD
   - Data: {parentMessageId, parentThreadId}

4. Thread Actor (new) -> User Actor:
   - Event: THREAD_CREATED
   - Data: {threadId, parentMessageId, parentThreadId}

5. Thread Actor (new) -> ThreadIndex Actor:
   - Event: THREAD_CREATED
   - Data: {threadId, parentMessageId, parentThreadId}
````

Key points:
1. User Actor acts as the gateway for client events
2. Thread Actor maintains its own state and participant list
3. ThreadIndex Actor maintains searchable index of threads and their relationships
4. All inter-actor communication is event-based
5. Each actor can maintain its own SQLite state
6. WebSocket connections are maintained by Thread Actors for real-time updates