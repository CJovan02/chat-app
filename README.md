# Chat Application
Chat Application Built for Advanced Database Systems subject

# Database Diagram

```mermaid
classDiagram
    class User {
        <<JSON>>
        string Id -> "user:id"
        string Username
        string DisplayName
        int Age
    }

    class UserRooms {
        <<SET>>
        "user:userId:rooms"
        string RoomId
    }

    class Room {
        <<JSON>>
        string Id -> "room:id"
        List~string~ ParticipantIds
        Timestamp CreatedAt
    }

    class Message {
        <<STREAM>>
        string Id -> "room:roomId:messages:Id"
        string Text
        string SenderId
        Timestamp SentAt
    }

    class LastMessages {
        <<LIST>>
        int Index -> "room:roomId:lastMessages"
        string MessagePayload [JSON]
    }

    UserRooms --> User
    Message --> User
    Message --> Room
    LastMessages --> Room
```

> [!NOTE]
> It's hard to visualize the Redis data structures becuase Redis is not a typical collection based NoSQL database.
