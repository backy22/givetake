function getUserImg(user){
  if (user && user.photo_url){
    return user.photo_url
  }else{
    return null
  }
}

function getUserName(user){
  if (user && user.name){
    return user.name
  }else{
    return null
  }
}

export { getUserImg,  getUserName };
