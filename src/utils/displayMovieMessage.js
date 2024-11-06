export const displayMovieMessage = (movies) => {
  let message;
  if (movies.length === 1) return (message = "Showing 1 movie in the database");
  if (movies.length === 0)
    return (message = "There's no movies in the database");
  if (movies.length > 1)
    return (message = `Showing ${movies.length} movies in the database`);
};
