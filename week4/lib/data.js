import fs from 'fs';
import path from 'path';

// get filepath to data directory
const dataDir = path.join(process.cwd(), 'data');

// function returns ids for all json objects in array
export function getAllIds() {
  // get filepath to json file
  const filePath = path.join(dataDir, 'persons.json');
  const filePath2 = path.join(dataDir, 'persons2.json');
  
  // load json file contents
  const jsonString = fs.readFileSync(filePath, 'utf8');
  const jsonString2 = fs.readFileSync(filePath2, 'utf8');
  // convert string from file into json array object
  const jsonObj = JSON.parse(jsonString);
  const jsonObj2 = JSON.parse(jsonString2);
  // use map() on array to extract just id properties into new array of obj values
const jsonObj3 = jsonObj.concat(jsonObj2);

  
  return jsonObj3.map(item => {
    return {
      params: {
        id: item.id.toString()
      }
    }
  });
  
}


export function getSortedList() {
  
const filePath = path.join(dataDir, 'persons.json');
  const filePath2 = path.join(dataDir, 'persons2.json');
  
  // load json file contents
  const jsonString = fs.readFileSync(filePath, 'utf8');
  const jsonString2 = fs.readFileSync(filePath2, 'utf8');
  // convert string from file into json array object
  const jsonObj = JSON.parse(jsonString);
  const jsonObj2 = JSON.parse(jsonString2);
  // use map() on array to extract just id properties into new array of obj values
const jsonObj3 = jsonObj.concat(jsonObj2);

  jsonObj3.sort(function (a, b) {
      return a.name.localeCompare(b.name);
  });

  
  return jsonObj3.map(item => {
    return {
      id: item.id.toString(),
      name: item.name
    }
  });
}

export async function getData(idRequested) {
  
  const filePath = path.join(dataDir, 'persons.json');
  const filePath2 = path.join(dataDir, 'persons2.json');
  
  // load json file contents
  const jsonString = fs.readFileSync(filePath, 'utf8');
  const jsonString2 = fs.readFileSync(filePath2, 'utf8');
  // convert string from file into json array object
  const jsonObj = JSON.parse(jsonString);
  const jsonObj2 = JSON.parse(jsonString2);
  // use map() on array to extract just id properties into new array of obj values
const jsonObj3 = jsonObj.concat(jsonObj2);
  
  const objMatch = jsonObj3.filter(obj => {
    return obj.id.toString() === idRequested;
  });

  
  let objReturned;
  if (objMatch.length > 0) {
    objReturned = objMatch[0];
  } else {
    objReturned = {};
  }
  
  return objReturned;
}

