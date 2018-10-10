const lastChar = function(characterAtEdge){
  if(characterAtEdge=="/"){
    return "\\";
  }
  if(characterAtEdge=="\\"){
    return "/";
  }
  return "*";
}

const generateLine = function(characterAtEdge,characterToFill,lineNumber,height){
  let line=characterAtEdge;
  characterAtEdge=lastChar(characterAtEdge);
  let space="";
  if(height>2 && lineNumber>1 && lineNumber<height){
    for(let characterCount=1;characterCount<(2*lineNumber-2);characterCount++){
      line+=characterToFill;
    }
    line+=characterAtEdge;
  }
  for(let spaceIndex=0;spaceIndex<(height-line.length)/2;spaceIndex++){
    space+=" ";
  }
  if(lineNumber==1||lineNumber==height){
    line="*";
  }
  return space+line+space;
}

const generateAngledDiamond=function (height){
  let diamond="";
  for(let lineNumber=1;lineNumber<=height/2;lineNumber++){
    diamond+=generateLine("/"," ",lineNumber,height)+"\n";

  }
  diamond+=generateLine("*"," ",Math.floor(height/2+1),height);
  for(let lineNumber=Math.floor(height/2);lineNumber>0;lineNumber--){
    diamond+="\n"+generateLine("\\"," ",lineNumber,height);
  }
  return diamond;
}

const generateDiamond=function(height,characterAtEdge,characterToFill){
  let diamond="";
  let delimiter="";
  for(let lineNumber=1;lineNumber<=Math.ceil(height/2);lineNumber++){
    diamond+=delimiter+generateLine(characterAtEdge,characterToFill,lineNumber,height);
    delimiter="\n";
  }
  for(let lineNumber=Math.ceil(height/2-1);lineNumber>0;lineNumber--){
    diamond+=delimiter+generateLine(characterAtEdge,characterToFill,lineNumber,height);
  }
  return diamond;
}

const validateHeight=function(height){
  if(height==0){
    return 1;
  }
  if(height%2==0){
    return height-1;
  }
  return height;
} 

const determineTypeAndGenerate=function(typeOfDiamond,height){
  let characterToFill="*";
  let characterAtEdge="*";
  let diamond="";
  let delimiter="";
  if(typeOfDiamond=="empty"){
    characterToFill=" ";
  }
  if(typeOfDiamond=="angled"&&height>2){
    diamond=generateAngledDiamond(height);
  }
  if(typeOfDiamond=="empty"||typeOfDiamond=="filled"||height<3){
    diamond+=delimiter+generateDiamond(height,characterAtEdge,characterToFill);
    delimiter="\n";
  }
  return diamond;
}
const main = function(){
  let typeOfDiamond = process.argv[2];
  let height = validateHeight(+process.argv[3]);
  console.log(determineTypeAndGenerate(typeOfDiamond,height));
}
main();
