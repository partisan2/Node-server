export const selectType = (fileType) =>{
    switch(fileType){
        case "html":
            return "text/html"
        case "css":
            return "text/css"
        case "jpg":
            return "image/jpg"
        case "jpeg":
            return "image/jpeg"
        case "png":
            return "image/png"
        default:
            return "text/html"
    }
}