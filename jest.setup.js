import React from 'react';
import "core-js"
jest.mock('tinymce/plugins/powerpaste/js/wordimport.js', () => ({
  ey: () => {
    console.log("i am ey and i am a function")
  }
})); // Closing bracket was missing so updated