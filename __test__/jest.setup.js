import React from 'react';

jest.mock('', () => ({
    useSelector: jest.fn().mockImplementation(selector => selector()),
  })); // Closing bracket was missing so updated