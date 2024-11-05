export const genres = [
  { _id: "5b21ca3eeb7f6fbccd471818", genre: "Action" },
  { _id: "5b21ca3eeb7f6fbccd471814", genre: "Comedy" },
  { _id: "5b21ca3eeb7f6fbccd471820", genre: "Thriller" },
];

export function getGenres() {
  return genres.filter((g) => g);
}
