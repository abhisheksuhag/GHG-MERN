// SERVER/utils/helpers.js (backend version)
function generateSourceId(siteName) {
    const initials = siteName.split(' ').map(word => word[0].toUpperCase()).join('');
    const randomNumber = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    
    return `${initials}-${randomNumber}`;
  }
  
  module.exports = { generateSourceId };
  