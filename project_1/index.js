import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs } from "./schema.js";
import db from "./_db.js";

const resolvers = {
  Query: {
    reviews: () => db.reviews,
    review: (parent, { id }) => db.reviews.find((review) => review.id === id),
    games: () => db.games,
    game: (parent, { id }) => db.games.find((game) => game.id === id),
    authors: () => db.authors,
    author: (parent, { id }) => db.authors.find((author) => author.id === id)
  },
  Game: {
    reviews: (parent) => db.reviews.filter((review) => review.game_id === parent.id)
  },
  Author: {
    reviews: (parent) => db.reviews.filter((review) => review.author_id === parent.id)
  },
  Review: {
    game: (parent) => db.games.find((game) => game.id === parent.game_id),
    author: (parent) => db.authors.find((author) => author.id === parent.author_id)
  },
  Mutation: {
    addGame: (parent, { input }) => {
      const newGame = { id: String(db.games.length + 1), ...input };
      db.games.push(newGame);
      return newGame;
    },
    deleteGame: (parent, { id }) => {
      db.games = db.games.filter((game) => game.id !== id);
      return db.games;
    },
    updateGame: (_, args) => {
      const { id, updates } = args;
      db.games = db.games.map(game => {
        if (game.id === id) {
          return { ...game, ...updates };
        }
        return game;
      })

      return db.games.find(game => game.id === id);
    }}

};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: {
    port: 4004,
  },
});

console.log(`🚀 Server ready at ${url}`);
