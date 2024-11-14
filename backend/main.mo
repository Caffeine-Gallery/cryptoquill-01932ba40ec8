import Func "mo:base/Func";
import Nat "mo:base/Nat";

import Array "mo:base/Array";
import Text "mo:base/Text";
import Time "mo:base/Time";

actor {
    stable var posts : [(Nat, { title : Text; author : Text; body : Text; timestamp : Time.Time })] = [];

    // Function to add a new post
    public shared(msg) func addPost(title : Text, author : Text, body : Text) : async () {
        let timestamp = Time.now();
        let newPost = {
            title = title;
            author = author;
            body = body;
            timestamp = timestamp;
        };
        posts := Array.append<(Nat, { title : Text; author : Text; body : Text; timestamp : Time.Time })>(posts, [(posts.size(), newPost)]);
    };

    // Function to get all posts
    public query func getPosts() : async [(Nat, { title : Text; author : Text; body : Text; timestamp : Time.Time })] {
        return posts;
    };

    // Preupgrade hook to save state
    system func preupgrade() {
        posts := Array.sort<(Nat, { title : Text; author : Text; body : Text; timestamp : Time.Time })>(posts, func (a, b) { 
            if (a.0 < b.0) #less else #greater 
        });
    };

    // Postupgrade hook to restore state
    system func postupgrade() {
        posts := [];
    };
}
