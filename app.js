//  1
const path = require('path');
const fs = require('fs');

const users = [
    {name: 'Mike', age: 25},
    {name: 'Bob', age: 32},
    {name: 'Nikola', age: 17},
];
const filePath = path.join('src', 'users.js');
const data1 = 'const users = ' + JSON.stringify(users, null, 4).replace(/"([^"]+)":/g, '$1:') + '; ';
fs.writeFile(filePath, data1, (err) => {   
    if (err) {
        console.error('Error', err);
    } else {
        console.log('users.js written to src.');
    }
});



//  2
const data2 = JSON.stringify(users, null, 4);
fs.writeFile('data.json', data2, (err) => {   
    if (err) {
        console.error('Error', err);
    } else {
        console.log('data.json written.');
    }
});



//  3
const newData = [
    {name: 'Anna', age: 24},
    {name: 'Tom', age: 52},
]
const filePath1 = path.join('src', 'users.js');
const data3 = '\nconst newData = ' + JSON.stringify(newData, null, 4).replace(/"([^"]+)":/g, '$1:')+ '; ';
fs.appendFile(filePath1, data3, (err) => {
    if (err) throw err;
    console.log('newData appended to users.js');
    }
);



//  4
const{ promises } = fs;
const setData = async () => {
    try {
        const fileData = await promises.readFile('data.json', 'utf8'); 
        const newDataArray = JSON.parse(fileData);
        newDataArray.push(...newData);
        const newDataString = JSON.stringify(newDataArray, null, 4);
        await promises.truncate('data.json', 0);
        await promises.appendFile('data.json', newDataString); 
        console.log('newData appended to data.json');
    } catch (err) {
        console.error('Error', err);
    }
};
setData();



//  5
const filePath2 = 'data.json'; 
const isExist = async (filePath2) => {
    try {
        await fs.promises.stat(filePath2); 
        return true; 
    } catch (err) {
        return false; 
    }
};  
isExist(filePath2)
    .then(result => {
        if (result) {
            console.log('File data.json exists');
        } else {
            console.log('File data.json does not exist');
        }
    })
    .catch(err => {
        console.error('Error', err);
    }
);