// utils/paginate.js
async function paginate(
  model,
  query = {},
  options = {},
  populate = "",
  sort = { createdAt: -1 }
) {
  const page = parseInt(options.page, 10) || 1;
  const limit = parseInt(options.limit, 10) || 10;
  const skip = (page - 1) * limit;

  let mongooseQuery = model.find(query).sort(sort).skip(skip).limit(limit);

  // handle populate (string | object | array)
  if (populate) {
    if (Array.isArray(populate)) {
      populate.forEach((p) => {
        mongooseQuery = mongooseQuery.populate(p);
      });
    } else {
      mongooseQuery = mongooseQuery.populate(populate);
    }
  }

  const [results, total] = await Promise.all([
    mongooseQuery,
    model.countDocuments(query),
  ]);

  return {
    results,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1,
    },
  };
}

module.exports = paginate;
