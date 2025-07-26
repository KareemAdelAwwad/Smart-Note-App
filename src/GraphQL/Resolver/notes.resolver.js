import mongoose from "mongoose";
import { Note } from "../../db/models/index.js";

/**
 * Get all notes with filters, pagination and owner information
 * @param {Object} filters - Filter parameters
 * @param {string} filters.userId - Filter by user ID
 * @param {string} filters.title - Filter by title (partial match)
 * @param {string} filters.createdFrom - Filter notes created from this date
 * @param {string} filters.createdTo - Filter notes created to this date
 * @param {number} filters.page - Page number for pagination
 * @param {number} filters.limit - Number of items per page
 * @returns {Promise<Object>} Paginated notes with owner information
 */

export const getAllNotes = async (filters = {}) => {
  try {
    const { userId, title, createdFrom, createdTo, page = 1, limit = 10 } = filters;
    const query = {};

    // Filter by userId
    if (userId) {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid userId format");
      }
      query.userId = new mongoose.Types.ObjectId(userId);
    }

    // Filter by title
    if (title) {
      query.title = { $regex: title, $options: "i" };
    }

    // Filter by date range
    if (createdFrom || createdTo) {
      query.createdAt = {};

      if (createdFrom) {
        const fromDate = new Date(createdFrom);
        if (isNaN(fromDate.getTime())) {
          throw new Error("Invalid createdFrom date format");
        }
        query.createdAt.$gte = fromDate;
      }

      if (createdTo) {
        const toDate = new Date(createdTo);
        if (isNaN(toDate.getTime())) {
          throw new Error("Invalid createdTo date format");
        }
        query.createdAt.$lte = toDate;
      }
    }

    // Pagination options
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      populate: {
        path: "userId",
        select: "_id name email",
        model: "User"
      },
      sort: { createdAt: -1 }, // Sort by newest first
      lean: false
    };
    const result = await Note.paginate(query, options);

    const transformedDocs = result.docs.map(note => ({
      _id: note._id.toString(),
      title: note.title,
      content: note.content,
      userId: note.userId._id.toString(),
      owner: {
        _id: note.userId._id.toString(),
        name: note.userId.name,
        email: note.userId.email
      },
      createdAt: note.createdAt.toISOString(),
      updatedAt: note.updatedAt.toISOString()
    }));

    return {
      docs: transformedDocs,
      pagination: {
        totalDocs: result.totalDocs,
        limit: result.limit,
        totalPages: result.totalPages,
        page: result.page,
        pagingCounter: result.pagingCounter,
        hasPrevPage: result.hasPrevPage ? "true" : "false",
        hasNextPage: result.hasNextPage ? "true" : "false",
        prevPage: result.prevPage,
        nextPage: result.nextPage
      }
    };
  } catch (error) {
    throw new Error("Error fetching notes: " + error.message);
  }
};