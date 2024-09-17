  // CLIENT/src/utils/helpers.ts

  let sourceCounter = 0;

  export const generateSourceId = (siteName: string) => {
    sourceCounter += 1; // Increment the counter for each new site
    const shortForm = siteName
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase())
      .join('');
    const formattedId = `${shortForm}-${sourceCounter.toString().padStart(2, '0')}`;
    return formattedId;
  };
