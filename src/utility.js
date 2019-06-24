function getUserImg(user){
  if (user && user.photo_url){
    return user.photo_url
  }else{
    return null
  }
}

function getUserName(user){
  if (user && user.name){
    return user.nickname || user.name
  }else{
    return null
  }
}

function formatDate(date){
  var y = date.getFullYear();
  var m = ("00" + (date.getMonth()+1)).slice(-2);
  var d = ("00" + date.getDate()).slice(-2);
  var result = y + "/" + m + "/" + d;
  return result;
}

export { getUserImg,  getUserName, formatDate };
