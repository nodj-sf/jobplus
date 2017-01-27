'use strict';


// Utility function returns the string value of the Redux action's input (vis–à-vis `YelpID` | `listName`):
export const extractIdentifier = (inputStr, strBase) => inputStr.replace(new RegExp(`^${strBase}`), '');
