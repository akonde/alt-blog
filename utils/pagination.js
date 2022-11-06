exports.preparePagination = (pagination) => {
    const page = Number(pagination.page);
    let limit = Number(pagination.limit);
  
    limit = limit && limit > 0 ? limit : 20;
  
    return {
      limit,
      page: page && page > 0 ? (page - 1) * limit : 0,
    };
  };