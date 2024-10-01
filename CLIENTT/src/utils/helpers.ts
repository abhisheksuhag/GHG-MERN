  // In helpers.ts
  let sourceCounter = 0;

  export const generateSourceId = (fieldValue: string) => {
    sourceCounter += 1; // Increment for each new source
    const shortForm = fieldValue
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase())
      .join('');
    const formattedId = `${shortForm}-${sourceCounter.toString().padStart(2, '0')}`;
    return formattedId;
  };
