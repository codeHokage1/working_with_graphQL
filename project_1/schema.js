export const typeDefs = `#graphql
    type Game {
        id: ID!
        title: String!
        platform: [String!]!
        reviews: [Review!]
    }

    type Review {
        id: ID!
        rating: Int!
        content: String
        game: Game!
        author: Author!
    }

    type Author {
        id: ID!
        name: String!
        verified: Boolean!
        reviews: [Review!]
    }

    type Query {
        reviews: [Review],
        review(id: ID!): Review,
        games: [Game]
        game(id: ID!): Game
        authors: [Author]
        author(id: ID!): Author
    }

    type Mutation{
        addGame(input: GameInput!): Game
        deleteGame(id: ID!): [Game]
        addReview(rating: Int!, content: String, author_id: ID!, game_id: ID!): Review
        addAuthor(name: String!, verified: Boolean!): Author
    }

    input GameInput {
        title: String!
        platform: [String!]!
    }

`