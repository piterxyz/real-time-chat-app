import { Conversation, FriendRequest, Message, User } from "@prisma/client";

export type FullFriendRequestType = FriendRequest & {
    sender: User;
    receiver: User;
};

export type FullUserType = User & {
    conversations: FullConversationType[];
    seenMessages: FullMessageType[];
    messages: FullMessageType[];
    outgoingFriendRequests: FriendRequest[];
    incomingFriendRequests: FriendRequest[];
    friends: FullUserType[];
};

export type FullMessageType = Message & {
    author: User;
    seen: User[];
};

export type FullConversationType = Conversation & {
    users: User[];
    messages: FullMessageType[];
};
