const lastCharacter = function(characterAtEdge){
  if(characterAtEdge=="/"){
    return "\\";
  }
  if(characterAtEdge=="\\"){
    return "/";
  }
  return "*";
}

const repeatString=function(characterForString,timesToRepeat){
  let line="";
  for(let characterCount=0;characterCount<timesToRepeat;characterCount++){
    line+=characterForString;
  }
  return line;
}

const generateLine = function(firstCharacter,lastCharacter,characterToFill,lineNumber,width){
  let line=firstCharacter;
  let spaces="";
  let timesToFill = 2*lineNumber-3;
  line += repeatString(characterToFill,timesToFill);
  line += lastCharacter;
  let numberOfSpaces =(width-line.length)/2;
  spaces += repeatString(" ",numberOfSpaces);
  if(lineNumber==1||lineNumber==width){
    line=firstCharacter;
  }
  return spaces+line+spaces;
}

const generateAngledDiamond=function (height){
  let diamond="";
  let spaces="";
  for(let characterIndex=1;characterIndex<(height/2);characterIndex++){
    spaces+=" ";
  }
  diamond=spaces+"*"+spaces+"\n";
  for(let lineNumber=2;lineNumber<height/2;lineNumber++){
    diamond+=generateLine("/","\\"," ",lineNumber,height)+"\n";
  }
  diamond+=generateLine("*","*"," ",Math.floor(height/2+1),height);
  for(let lineNumber=Math.floor(height/2);lineNumber>1;lineNumber--){
    diamond+="\n"+generateLine("\\","/"," ",lineNumber,height);
  }
  diamond+="\n"+spaces+"*"+spaces;
  return diamond;
}

const generateEmptyDiamond = function(height){
  let diamond="";
  let delimiter="";
  for(let lineNumber=1;lineNumber<=Math.ceil(height/2);lineNumber++){
    diamond+=delimiter+generateLine("*","*"," ",lineNumber,height);
    delimiter = "\n";
  }
  for(let lineNumber=Math.ceil(height/2-1);lineNumber>0;lineNumber--){
    diamond+=delimiter+generateLine("*","*"," ",lineNumber,height);
  }
  return diamond;
} 

const generateFilledDiamond = function(height){
  let diamond="";
  let delimiter="";
  for(let lineNumber=1;lineNumber<=Math.ceil(height/2);lineNumber++){
    diamond+=delimiter+generateLine("*","*","*",lineNumber,height);
    delimiter = "\n";
  }
  for(let lineNumber=Math.ceil(height/2-1);lineNumber>0;lineNumber--){
    diamond+=delimiter+generateLine("*","*","*",lineNumber,height);
  }
  return diamond;

}

const validateHeight=function(height){
  if(height%2==0){
    return height-1;
  }
  return height;
} 

const generateDiamond=function(typeOfDiamond,height){
  let diamond="";
  let delimiter="";
  if(typeOfDiamond=="empty"){
    diamond=generateEmptyDiamond(height)
  }
  if(typeOfDiamond=="angled"){
    diamond=generateAngledDiamond(height);
  }
  if(typeOfDiamond=="filled"){
    diamond=generateFilledDiamond(height);
    delimiter="\n";
  }
  return diamond;
}

const main = function(){
  let typeOfDiamond = process.argv[2];
  let height = validateHeight(+process.argv[3]);
  console.log(generateDiamond(typeOfDiamond,height));
}
main();
