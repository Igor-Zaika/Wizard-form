import { v4 as uuidv4 } from 'uuid';

export const changeLastUpdate = (value) => {
    const newUpdate = {...value}
    newUpdate.update = Date.now();
    return newUpdate;
}

const languages = [
    { value: "English, EN", label: "English, EN" },
    { value: "French, FR", label: 'French, FR' },
    { value: "Spanish, SP", label: 'Spanish, SP' },
    { value: "Arabic, AR", label: 'Arabic, AR' },
    { value: "Mandarin, CMN", label: 'Mandarin, CMN' },
    { value: "Russian, RU", label: 'Russian, RU' },
    { value: "Portuguese, PT", label: 'Portuguese, PT' },
    { value: "German, DE", label: 'German, DE' },
    { value: "Japanese, JA", label: 'Japanese, JA' },
    { value: "Hindi, HI", label: 'Hindi, HI' },
    { value: "Malay, MS", label: 'Malay, MS' },
    { value: "Persian, FA", label: 'Persian, FA' },
    { value: "Swahili, SW", label: 'Swahili, SW' },
    { value: "Tamil, TA", label: 'Tamil, TA' },
    { value: "Italian, IT", label: 'Italian, IT' },
    { value: "Dutch, NL", label: 'Dutch, NL' },
    { value: "Bengali, BN", label: 'Bengali, BN' },
    { value: "Turkish, TR", label: 'Turkish, TR' },
    { value: "Vietnamese, VI", label: 'Vietnamese, VI' },
    { value: "Polish, PL", label: 'Polish, PL' },
    { value: "Javanese, JV", label: 'Javanese, JV' },
    { value: "Punjabi, PA", label: 'Punjabi, PA' },
    { value: "Thai, TH", label: 'Thai, TH' },
    { value: "Korean, KO", label: 'Korean, KO' },
]

const skills = [
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "Javascript", label: "Javascript" },
    { value: "React", label: "React" },
    { value: "Angular", label: "Angular" },
    { value: "jQuery", label: "jQuery" },
    { value: "NodeJS", label: "NodeJS" },
    { value: "Python", label: "Python" },
    { value: "PHP", label: "PHP" },
    { value: "Ruby On Rails", label: "Ruby On Rails" },
    { value: "SQL", label: "SQL" },
    { value: "BackboneJS", label: "BackboneJS" },
    { value: "Web Design", label: "Web Design" },
    { value: "Project management", label: "Project management" },
    { value: "Git", label: "Git" },
    { value: "Docker", label: "Docker" },
    { value: "AWS Lambda", label: "AWS Lambda" },
    { value: "Firebase", label: "Firebase" },
]

const hobbies = [
    "Art",
    "Sport, fitness, aerobica and staff like that",
    "I just want to play games, I'm not living in this life",
    "I'm a female... I'm doing nothing. Every day",
    "Guitar, guitar and guitar again. I'm fall in love with it",
    "WTF is “hobbies”???"
]

const getRandomNum = (min,max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

const getRandomLanguage = () => {
    const rnd = getRandomNum(0,languages.length);
    return languages[rnd];
}

const getRandomItems = (arr,min) => {
    let newArr = [];
    const randomNumber = getRandomNum(min, arr.length);
    for(let i = 0; i < randomNumber; i++){
        const random = arr[getRandomNum(0, arr.length)];
        if(!newArr.includes(random)){
            newArr.push(random)
        }
    }
    return newArr;
}

const possible = "abcdefghijklmnopqrstuvwxyz0123456789";
const possibleLetters = "abcdefghijklmnopqrstuvwxyz";

const getrandomValue = (arg,min,max) => {
    let password = '';
    const randomNumber = getRandomNum(min, max);
    for(let i = 0; i < randomNumber; i++){
        password += arg.charAt(Math.floor(Math.random() * arg.length));
    }
    return password;
}

const getRandomPhoneNumber = () => {
    let number = '';
    for(let i = 0; i <= 9; i++){
        number += getRandomNum(0,10);
    }
    const first = number.slice(0,3);
    const second = number.slice(3,6);
    const theerd = number.slice(6,8);
    const four = number.slice(8,10);
    return `+7 (${first}) ${second}-${theerd}-${four}`
}

const getRandomDateOfBirth = () => {
    const year = (new Date()).getFullYear() - getRandomNum(18,100);
    let month = getRandomNum(1,13);
    month = month < 10 ? '0' + month : month;
    let day = month === 2 ? getRandomNum(1,29) : month === 4 || month === 6 || month === 9 || month === 4 ? getRandomNum(1,31) : getRandomNum(1,32)
    day = day > 10 ? day : '0' + day;
    return `${day}.${month}.${year}`
}


const generateOneRandomUser = () => {
    let user = {};
    user.id = uuidv4();
    user.name = getrandomValue(possibleLetters,1,20);
    user.password = getrandomValue(possible,4,10);
    user.repeatpassword = user.password;
    user.firstname = getrandomValue(possibleLetters,1,20);
    user.lastname = getrandomValue(possibleLetters,1,20);
    user.dateofbirth = getRandomDateOfBirth();
    user.email = getrandomValue(possibleLetters,1,10) + '@gmail.com';
    user.adress = getRandomNum(0,2) === 0 ? getrandomValue(possibleLetters,1,10) : '';
    user.gender = getRandomNum(0,2) === 0 ? "Male" : "Female";
    user.company = getrandomValue(possibleLetters,5,10);
    user.github = getRandomNum(0,2) === 0 ? 'https://github.com/' + getrandomValue(possibleLetters,1,20) : '';
    user.facebook = getRandomNum(0,2) === 0 ? 'https://www.facebook.com/' + getrandomValue(possibleLetters,1,20) : '';
    user.language = getRandomLanguage();
    user.fax = getRandomNum(0,2) === 0 ? getRandomPhoneNumber() : '';
    user.phone1 = getRandomNum(0,2) === 0 ? getRandomPhoneNumber() : '';
    user.phone2 = !user.phone1 ? '' : getRandomNum(0,2) === 0 ? getRandomPhoneNumber() : '';
    user.phone3 = !user.phone2 ? '' : getRandomNum(0,2) === 0 ? getRandomPhoneNumber() : '';
    user.skills = getRandomItems(skills, 3);
    user.info = getRandomNum(0,2) === 0 ? getrandomValue(possibleLetters,1,300) : '';
    user.hobies = getRandomNum(0,2) === 0 ? getRandomItems(hobbies, 0) : '';
    return user
}

export const generateRandomListOfUsers = (num) => {
    let generateList = [];
    for(let i = 0; i < num; i++){
        generateList.push(generateOneRandomUser());
    }
    return generateList;
}

