const express = require("express");
const app = express();
const port = 4890;
const fs = require('fs');


app.get("/", (req, res) => {
    let say = '';
    say += 'challenge started...'
    say += '<br /><a href="/word-challenge">  Go to words challenge #1  </a>'
    res.send(say);
  });

  app.get("/word-challenge/",  async(req, res) => {
      let exportText='';
    const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    let alphabetCount = {"a":0,"b":0,"c":0,"d":0,"e":0,"f":0,"g":0,"h":0,"i":0,"j":0,"k":0,"l":0,
      "m":0,"n":0,"o":0,"p":0,"q":0,"r":0,"s":0,"t":0,"u":0,"v":0,"w":0,"x":0,"y":0,"z":0};
    let coutChar = [];
    let charMostUsed = [];
    let countWords = [];
    try {
        var data = fs.readFileSync('./extraFile/words.txt', 'utf8');
        //console.log(data);    
    } catch(e) {
        console.log('Error:', e.stack);
    }
    data = data.toLowerCase();
    const wordsArray = data.split("\n");
    let rawString = data.replace('\n', '');
    // rawString = rawString.replace(' ', '');
    // rawString = rawString.replace(/\&nbsp;/g, '');


    // I think this is best of mine
    alphabet.forEach((element,index) => {
        var count = [...rawString].filter(x => x === element).length;
        coutChar.push({key:element,count})
        rawString = rawString.replace(element, '');
    });
    let sortedArray =  coutChar.sort(function (a, b) {
        return a.count - b.count;
    }).reverse();
    exportText += 'Top five words used is : ';
    for (let index = 0; index < 5; index++){
        exportText += `<br /> ${sortedArray[index].key} = ${sortedArray[index].count} `
        charMostUsed.push(sortedArray[index].key)
    }
    // start section two
    for (let index = 0; index < wordsArray.length; index++) {
        let sum =0;
        charMostUsed.forEach(char => {
            let count = [...wordsArray[index]].filter(x => x === char).length;
            sum += count;
        });
        countWords.push({key:wordsArray[index],count:sum})
    }
    let sortedWord =  countWords.sort(function (a, b) {
        return a.count - b.count;
    }).reverse();

    exportText += '<br />List of words : ';
    for (let index = 0; index < sortedWord.length; index++) {
        exportText += ` ${sortedWord[index].key} = ${sortedWord[index].count} |`
    }

/*
//second way that worked
    for (const [key, value] of Object.entries(alphabetCount)) {
        var count = [...rawString].filter(x => x === key).length;
        alphabetCount[key] = count;
        coutChar.push({key,count})
        rawString = rawString.replace(key, '');
        //console.log(`${key}: ${value}`);
      }
      // sort by value
    let sortedArray =  coutChar.sort(function (a, b) {
        return a.count - b.count;
    }).reverse();

    /*
      
    /*
    // this first code worked
    arrayOfChar.forEach((element,index) => {
        if(element != ''){
             let count = _.countBy(rawString)[element];
        console.log(element)
        coutChar.push({element:count})
        alphabetCount[element] = count;
        rawString = rawString.replace(element, '');
        for( var i = 0; i < arrayOfChar.length; i++){ 
            if ( arrayOfChar[i] == element) { 
                arrayOfChar.splice(i, 1); 
            }
        }
        }
       
    });
    */

    //let splitStr = str.split("");
    //console.log(coutChar[0]);

      // for (let i = 0; i <myArray.length ; i++) {
      //   let count = (temp.match(/`${a}`/g) || []).length;
      // }
    
      // let temp = "ali";
      // let mine = 'a';
      // let count = (temp.match(/a/g) || []).length;
      // console.log(count)
    
      // console.log(("str1,str2,str3,str4".match(new RegExp("str", "g")) || []).length); //logs 4
    
      // for (let i = 0; i <alphabet.length ; i++) {
      //   let count = (temp.match(/`${mine}`/g) || []).length;
      //
      // }
      // myArray.forEach((element) => {
      //   tags.push(element._id);
      // });
      // var count = (temp.match(/`${a}`/g) || []).length;
    
      res.send(exportText);
    });


    app.listen(port, () => {
        console.log(`app listening at http://localhost:${port}`);
      });
      