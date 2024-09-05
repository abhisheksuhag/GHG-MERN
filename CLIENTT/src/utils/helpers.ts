let counter = 1;

export function generateSourceId(placeName: string): string {
  const shortForm = placeName
    .split(' ')
    .map((word) => word[0].toUpperCase())
    .join('');
  const formattedId = `${shortForm}-${String(counter).padStart(2, '0')}`;
  counter++;
  return formattedId;
}
