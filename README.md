# Chat Application
Chat Application Built for Advanced Database Systems subject

# Database Diagram

```mermaid
classDiagram
    class User {
        <<JSON>>
        string Id -> "User:id"
        string Username
        string DisplayName
        int Age
    }

    class UserRooms {
        <<SET>>
        "User:UserId:rooms"
        string RoomId
    }

    class Room {
        <<JSON>>
        string Id -> "Room:id"
        List~string~ ParticipantIds
        Timestamp CreatedAt
    }

    class Message {
        <<STREAM>>
        string Id -> "Room:RoomId:Messages:Id"
        string Text
        string SenderId
        Timestamp SentAt
    }

    class LastMessages {
        <<LIST>>
        int Index -> "Room:RoomId:lastMessages"
        string MessagePayload [JSON]
    }

    UserRooms --> User
    Message --> User
    Message --> Room
    LastMessages --> Room
```

> [!NOTE]
> It's hard to visualize the Redis data structures becuase Redis is not a typical collection based NoSQL database.
