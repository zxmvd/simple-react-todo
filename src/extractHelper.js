export const extractPoint = (str) =>{
    let taskObj = {name:'', points:0}
    let matchedPts = str.match(/\d+pts/gi)
    if(matchedPts){
      taskObj.name = str.slice(0, str.indexOf(matchedPts[0]))
      taskObj.points = matchedPts[0].match(/\d/g).join('')
      return taskObj
    }
    return false
  }