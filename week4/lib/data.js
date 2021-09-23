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

// called from [id].js getStaticProps() function
export async function getData(idRequested) {
  // get filepath to json file
  const filePath = path.join(dataDir, 'persons.json');
  const filePath2 = path.join(dataDir, 'relations.json');

  // load json file contents
  const jsonString = fs.readFileSync(filePath, 'utf8');
  const jsonString2 = fs.readFileSync(filePath2, 'utf8');

  // convert string from file into json array object
  const jsonObj = JSON.parse(jsonString);
  const jsonObj2 = JSON.parse(jsonString2);

  // find object value in array that has matching id
  const objMatch = jsonObj.filter(obj => {
    return obj.id.toString() === idRequested;
  });

  // extract object value in filtered array if any
  let objReturned;
  if (objMatch.length > 0) {
    objReturned = objMatch[0];

    // find matching owner_id in relations data model
    const objMatch2 = jsonObj2.filter(obj => {
        return obj.owner_id.toString() === idRequested;
      }
    );

    if (objMatch2.length > 0) {
      // since we found an entry in relations, now let's find all the rows
      // of persons that have id in the array of related_ids
      const objMatch3 = jsonObj.filter(obj => {
          return objMatch2[0].related_ids.includes( obj.id );
        }
      );

      if (objMatch3.length > 0) {
        objReturned.related = objMatch3;
      }
    }

  } else {
    objReturned = {};
  }
  
  // console.log(objReturned);

  // return object value found
  return objReturned;
}