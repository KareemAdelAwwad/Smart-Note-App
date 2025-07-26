import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString
} from "graphql";

// User Type Definition
const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString }
  }
});

// Note Type Definition
const NoteType = new GraphQLObjectType({
  name: "Note",
  fields: {
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    userId: { type: GraphQLID },
    owner: { type: UserType },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  }
});

// Pagination Info Type Definition
const PaginationInfoType = new GraphQLObjectType({
  name: "PaginationInfo",
  fields: {
    totalDocs: { type: GraphQLInt },
    limit: { type: GraphQLInt },
    totalPages: { type: GraphQLInt },
    page: { type: GraphQLInt },
    pagingCounter: { type: GraphQLInt },
    hasPrevPage: { type: GraphQLString },
    hasNextPage: { type: GraphQLString },
    prevPage: { type: GraphQLInt },
    nextPage: { type: GraphQLInt }
  }
});

// Notes Response Type Definition
const NotesResponseType = new GraphQLObjectType({
  name: "NotesResponse",
  fields: {
    docs: { type: new GraphQLList(NoteType) },
    pagination: { type: PaginationInfoType }
  }
});

export { NotesResponseType };

