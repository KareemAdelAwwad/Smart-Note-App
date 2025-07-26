import {
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} from "graphql";
import { getAllNotes } from "../Resolver/notes.resolver.js";
import { NotesResponseType } from "../Types/notes.types.js";

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      notes: {
        type: NotesResponseType,
        args: {
          userId: { type: GraphQLID },
          title: { type: GraphQLString },
          createdFrom: { type: GraphQLString },
          createdTo: { type: GraphQLString },
          page: { type: GraphQLInt, defaultValue: 1 },
          limit: { type: GraphQLInt, defaultValue: 10 }
        },
        resolve: async (parent, args) => await getAllNotes(args)
      }
    },
  }),
});

export default schema;